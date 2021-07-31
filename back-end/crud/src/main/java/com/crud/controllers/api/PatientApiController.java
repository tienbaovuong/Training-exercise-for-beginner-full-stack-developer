package com.crud.controllers.api;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.crud.data.models.Patient;
import com.crud.data.services.PatientServiceImplementaion;
import com.crud.data.services.PatientService;
@CrossOrigin(origins = "http://localhost:8080")
@RestController()

@RequestMapping("/api/patient")

public class PatientApiController {
	@Autowired
    PatientService patientService;
	@Bean
	public WebMvcConfigurer CORSConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**")
	                    .allowedOrigins("*")
	                    .allowedHeaders("*")
	                    .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD")
	                    .maxAge(-1)   // add maxAge
	                    .allowCredentials(false);
	        }
	    };
	}
	@GetMapping("")
	public List<Patient> getAllPatient(@RequestParam  int page) {
	    return patientService.findPatientByPage(page);
	}
	@GetMapping("/count")
	public Long getNumberOfPatient() {
		return patientService.findNumberOfPatient();
	}
	@PostMapping("/filter/{page}")
	public List<Patient> getPatient(@RequestBody Patient patient,@PathVariable("page") long page) {
	    return patientService.filterByPage(patient,page);
	}
	@PostMapping("filter/count")
	public Long getNumberOfFilterPatient(@RequestBody Patient patient) {
		return patientService.filterCounter(patient);
	}
	@PostMapping("")
	public String addPatient(@RequestBody Patient patient) {

	    if(patient != null) {
	    	patient.created_at=OffsetDateTime.now();
	    	patient.updated_at=patient.created_at;
	        patientService.insert(patient);
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
	    if(patient != null) {
	    	patient.created_at=patientService.findPatientById(patient.id).orElse(null).created_at;
	    	patient.updated_at=OffsetDateTime.now();
	        patientService.update(patient);
	        return "Updated patient.";
	    } else {
	        return "Request does not contain a body";
	    }
	}
}