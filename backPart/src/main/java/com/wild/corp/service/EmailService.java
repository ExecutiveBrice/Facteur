package com.wild.corp.service;


import com.wild.corp.model.Email;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;



@Component
    public class EmailService {
    public static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private Boolean inProgress = false;

    private Integer restant;
    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private Environment environment;
    public void sendMessage(Email mail) {
        inProgress = true;
        restant=0;
        MimeMessage message = emailSender.createMimeMessage();

        MailingList.getInstance().getListing().forEach(strings -> strings.forEach(s -> {
            MimeMessageHelper helper = null;
            restant++;
            try {
                helper = new MimeMessageHelper(message, true);
                helper.setTo(s);
                helper.setSubject(mail.getSubject());
                helper.setText(mail.getText(),true);
            } catch (MessagingException e) {
                logger.error("create mail MessagingException " + e);
            }

            try {
                emailSender.send(message);
            } catch (MailException e) {
                logger.error("send mail MailException " + e);
            }
        }));

        inProgress=false;
    }

    public Boolean isInProgress() {
        return inProgress;
    }

    public Integer getRestant() {
        return restant;
    }
}
