package com.crud.data.services;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crud.data.models.Patient;
@Service
public interface PatientService {
	List<Patient> findAllPatient();
	Optional<Patient> findPatientById(long i);
    List<Patient> filter(Patient p);
    Patient insert(Patient p);
    boolean delete(long id);
    boolean update(Patient p);
}
