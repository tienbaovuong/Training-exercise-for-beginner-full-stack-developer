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
    List<Patient> filterByPage(long page,Patient patient);
    long filterCounter(Patient patient);
    Patient insertUpdate(Patient p,String type);
    boolean delete(long id);

}
