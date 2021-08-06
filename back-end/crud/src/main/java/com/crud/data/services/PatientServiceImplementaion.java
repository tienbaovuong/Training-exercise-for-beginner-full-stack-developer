package com.crud.data.services;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.crud.data.models.PatientCreatePredicate;
import com.crud.data.models.Patient;
import com.crud.data.repositories.PatientRepository;
import com.querydsl.core.types.Predicate;


@Service
public class PatientServiceImplementaion implements PatientService {
	@Autowired
	private PatientRepository repository;

	@Override
	public Long findNumberOfPatient() {
	   return  repository.count();
	   
	}
	@Override
	public List<Patient> findPatientByPage(int page){	
		int size=0;
		if(page==Math.ceil(findNumberOfPatient()/4.0)) size=(int) (findNumberOfPatient()%4);
		if(size==0) size=4;
		Pageable pageWithFourElement = PageRequest.of(page-1, size,Sort.Direction.ASC,"id");
		return repository.findAll(pageWithFourElement).toList();
	}
	@Override
	public Optional<Patient> findPatientById(long i){
		return repository.findById(i);
	}
	@Override
	public Patient insertUpdate(Patient p,String type) {
		if(type=="Post") {
			p.created_at=OffsetDateTime.now();
	    	p.updated_at=p.created_at;
		}
		else if(type=="Put") {
			p.created_at=findPatientById(p.id).orElse(null).created_at;
	    	p.updated_at=OffsetDateTime.now();
		}
	    return repository.save(p);
	}

	@Override
	public boolean delete(long id) {
	    try {
	        repository.deleteById(id);
	        return true;
	    } catch (Exception e) {
	        System.out.println(e.getMessage());
	        return false;
	    }
	}
	@Override
	public List<Patient> filterByPage(long page,Patient patient){
		Predicate predicate=PatientCreatePredicate.createPredicate(patient);
		long count=filterCounter(patient);
		int size=0;
		if(page==Math.ceil(count/4.0)) size= (int) (count%4);
		if(size==0) size=4;
		return repository.findAll(predicate, PageRequest.of((int) (page-1), size,Sort.Direction.ASC, "id")).toList();
	}
	@Override
	public long filterCounter(Patient patient) {
		Predicate predicate=PatientCreatePredicate.createPredicate(patient);
		return repository.count(predicate);
	}
}
 