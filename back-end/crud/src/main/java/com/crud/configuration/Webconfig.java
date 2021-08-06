package com.crud.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Webconfig {
	public final static String crossOrigin="http://localhost:8080";
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
}
