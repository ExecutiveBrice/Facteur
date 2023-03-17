package com.wild.corp;

import com.wild.corp.service.MailingList;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;




@SpringBootApplication(scanBasePackages={"com.wild.corp"})// same as @Configuration @EnableAutoConfiguration @ComponentScan
public class RunWebApp {

public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(RunWebApp.class);
		springApplication.addListeners(new ApplicationPidFileWriter("facteur.pid"));
		springApplication.run(args);

	}

	@PostConstruct
	private void init() {
		MailingList.getInstance();
	}
}