package com.crud.data.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.crud.data.models.Patient;

public interface PatientRepository extends CrudRepository<Patient,Long>{
	
	List<Patient> findByOrderByIdAsc();
}
