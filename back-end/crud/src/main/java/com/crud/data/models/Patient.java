package com.crud.data.models;

import java.time.OffsetDateTime;
import java.util.Collections;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity

@Table(name = "`infotable`")

public class Patient {

    @Id

    @GeneratedValue(strategy = GenerationType.AUTO, generator = "incrementDomain")
    
    @GenericGenerator(name = "incrementDomain", strategy = "increment")

    @Column(name = "patient_id",nullable=false)

    public Long id;


    @Column(name = "name",nullable=false)

    public String name;


    @Column(name = "gender",nullable=false)

    public String gender;
    
    @Column(name = "age",nullable=false)

    public int age;
    
    @Column(name = "email",nullable=true)

    public String email;
    
    @Column(name = "phone_number",nullable=false)

    public String phone_number;
    
    @Column(name = "created_at",nullable=false)

    public OffsetDateTime created_at;
    
    @Column(name = "updated_at",nullable=false)

    public OffsetDateTime updated_at;
    
    
    public Patient() {}


    public Patient(long patient_id, String name, String gender,int age, String email, String phone_number,OffsetDateTime created_at, OffsetDateTime updated_at) {
        this.id=patient_id;
        this.name = name;
        this.gender=gender;      
        this.age=age;        
        this.email=email;
        this.phone_number=phone_number;
        this.created_at=created_at;
        this.updated_at=updated_at;

    }
    public boolean checkFilter(Patient p) {
    	if(!name.equals(p.name) && p.name!=null) return false; 
    	if(!gender.equals(p.gender)&&(p.gender!=""&&p.gender!=null)) return false;
    	if(age!=p.age&&p.age!=0) return false;
    	if(p.email!=null) {
    		if(email==null) return false;
    		if(!email.equals(p.email)) return false;
    	}
    	if(!phone_number.equals(p.phone_number)&&p.phone_number!=null) return false;
    	return true;
    	
    }
    
    @Override
    public String toString() {

        StringBuilder builder = new StringBuilder();

        builder.append(String.valueOf(id));
        builder.append(", ");
        builder.append(name);
        builder.append(", ");
        builder.append(gender);
        builder.append(", ");
        builder.append(age);
        builder.append(", ");
        builder.append(email);
        builder.append(", ");
        builder.append(phone_number);
        builder.append(", ");
        builder.append(created_at);
        builder.append(", ");
        builder.append(updated_at);

        return builder.toString();
    }


	

}

