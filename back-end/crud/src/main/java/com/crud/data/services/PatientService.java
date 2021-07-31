package com.crud.data.services;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crud.data.models.Patient;
@Service
public interface PatientService {
	Long findNumberOfPatient();
	List<Patient> findPatientByPage(int i);
	Optional<Patient> findPatientById(long i);
	List<Patient> filter(Patient p);
    List<Patient> filterByPage(Patient p, long page);
    Long filterCounter(Patient p);
    Patient insert(Patient p);
    boolean delete(long id);
    boolean update(Patient p);
}
