package com.crud.controllers.api;
import java.util.List;


import com.crud.configuration.Webconfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.crud.data.models.Patient;
import com.crud.data.services.PatientService;
@CrossOrigin(origins = Webconfig.crossOrigin)
@RestController()

@RequestMapping("/api/patient")

public class PatientApiController {
	@Autowired
    PatientService patientService;
	
	@GetMapping("")
	public List<Patient> getAllPatient(@RequestParam  int page) {
	    return patientService.findPatientByPage(page);
	}
	@GetMapping("/count")
	public Long getNumberOfPatient() {
		return patientService.findNumberOfPatient();
	}
	@PostMapping("/filter/{page}")
	public List<Patient> getPatient(@PathVariable("page") long page, @RequestBody Patient patient) {
	    return patientService.filterByPage(page,patient);
	}
	@PostMapping("filter/count")
	public Long getNumberOfFilterPatient(@RequestBody Patient patient) {
		return (long) patientService.filterCounter(patient);
	}
	@PostMapping("")
	public String addPatient(@RequestBody Patient patient) {
		String type="Post";
	    if(patient != null) {
	        patientService.insertUpdate(patient,type);
	        return "Added a patient";
	    } else {
	        return "Request does not contain a body";
	    }
	}

	@DeleteMapping("{id}")
	public String deletePatient(@PathVariable("id") long id) {

	    if(id > 0) {
	        if(patientService.delete(id)) {
	            return "Deleted the patient.";
	        } else {
	            return "Cannot delete the patient.";
	        }
	    }
	    return "The id is invalid for the patient.";
	}

	@PutMapping("")
	public String updatePerson(@RequestBody Patient patient) {
		String type="Put";
	    if(patient != null) {
	    	
	        patientService.insertUpdate(patient,type);
	        return "Updated patient.";
	    } else {
	        return "Request does not contain a body";
	    }
	}
}