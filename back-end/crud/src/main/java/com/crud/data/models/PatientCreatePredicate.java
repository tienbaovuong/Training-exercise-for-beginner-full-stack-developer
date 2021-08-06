package com.crud.data.models;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;

public class PatientCreatePredicate {
	static public Predicate createPredicate(Patient patient) {
	    QPatient qpatient = QPatient.patient;
	    BooleanBuilder booleanBuilder = new BooleanBuilder();
	    if(patient.id!=null) {
	    	booleanBuilder.and(qpatient.id.eq(patient.id));
	    }
	    if(patient.name!=null) {
	    	booleanBuilder.and(qpatient.name.eq(patient.name));
	    }
	    if(patient.gender!=null) {
	    	booleanBuilder.and(qpatient.gender.eq(patient.gender));
	    }
	    if(patient.age!=0) {
	    	booleanBuilder.and(qpatient.age.eq(patient.age));
	    }
	    if(patient.email!=null) {
	    	booleanBuilder.and(qpatient.email.eq(patient.email));
	    }
	    if(patient.phone_number!=null) {
	    	booleanBuilder.and(qpatient.phone_number.eq(patient.phone_number));
	    }
	    return booleanBuilder.getValue();
	  }
}
