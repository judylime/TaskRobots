package com.project.autoexpress.handler.controller;

import com.project.autoexpress.holder.request.RegisterRequestBody;
import com.project.autoexpress.handler.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RegistrationController {

  @Autowired
  private CustomerService customerService;

  @RequestMapping(value = "/register", method = RequestMethod.POST)
  public ResponseEntity<Object> registerCustomer(@RequestBody RegisterRequestBody request) {
    // request containing the request body.
    int status = customerService.addCustomer(request);
    if (status == -1) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(null, HttpStatus.CREATED);
  }
}
