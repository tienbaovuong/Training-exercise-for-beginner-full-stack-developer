package com.crud.data.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.crud.data.models.Patient;

public interface PatientRepository extends QuerydslPredicateExecutor<Patient>,JpaRepository<Patient, Long> {
	
}
