package com.crud.data.repositories;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.crud.data.models.Patient;

public interface PatientRepository extends PagingAndSortingRepository<Patient, Long>{
	List<Patient> findByOrderByIdAsc(PageRequest pageRequest);
	List<Patient> findByOrderByIdAsc();
}
