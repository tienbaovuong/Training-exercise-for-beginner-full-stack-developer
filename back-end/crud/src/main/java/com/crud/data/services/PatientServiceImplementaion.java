package com.crud.data.services;

import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.crud.data.models.Patient;
import com.crud.data.repositories.PatientRepository;

import ch.qos.logback.classic.spi.TurboFilterList;

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
		return (List<Patient>)repository.findByOrderByIdAsc().subList(4*page-4, 4*page-4+size);
	}
	@Override
	public Optional<Patient> findPatientById(long i){
		return repository.findById(i);
	}
	@Override
	public Patient insert(Patient p) {
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
	public List<Patient> filter(Patient p){
		List<Patient> filterList=repository.findByOrderByIdAsc();
		if(p.id!=null) {
			filterList.clear();
			Optional<Patient> theChosenOne= repository.findById(p.id);
			if(theChosenOne.orElse(null)==null) return filterList;
			else filterList.add(theChosenOne.orElse(null));	
		}
		Iterator<Patient> it = filterList.iterator();
		while(it.hasNext()) {
			Patient e=it.next();
			if(!e.checkFilter(p)) {
				it.remove();
			}
		}
		return filterList;
	}
	@Override
	public List<Patient> filterByPage(Patient p,long page){
		List<Patient> list=filter(p);
		int size=0;
		if(page==Math.ceil(list.size()/4.0)) size=list.size()%4;
		if(size==0) size=4;
		return filter(p).subList(4*((int)page-1),4*(int)page-4+size);
	}
	@Override
	public Long filterCounter(Patient p) {
		return (long) filter(p).size();
	}
	@Override
	public boolean update(Patient p) {
	    try {
	        repository.save(p);
	        return true;
	    } catch (Exception e) {
	        System.out.println(e.getMessage());
	        return false;
	    }
	}
}
 