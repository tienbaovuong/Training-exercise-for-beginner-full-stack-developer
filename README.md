# Training-exercise-for-beginner-full-stack-developer
Open back-end folder with ide:
 - Locate to src/main/resource/application.propoties to set up your connection to PostgreSQL(url,username,password)
 - set spring.jpa.hibernate.ddl-auto = create and run  CrudApplication.java in crud/src/main/java/com/crud
to generate the table
 - set spring.jpa.hibernate.ddl-auto = update after that and run CrudApplication.java again and your server is running
 - requestURL: http://localhost:8080/api/patient
	+GET will return all patients from the database
	+POST add a patient to the database with info from the request body
	+PUT edit a patient with info from request body
 - requestURL: http://localhost:8080/api/patient/filter
	+POST return a list of patients that fit the filter from the request body
 - requestURL: http://localhost:8080/api/patient/{id}
	+DELETE delete the patient with the corresponding id

Open front-end folder with cmd and use    npm-start
The app is now running on http:/localhost:3000 
