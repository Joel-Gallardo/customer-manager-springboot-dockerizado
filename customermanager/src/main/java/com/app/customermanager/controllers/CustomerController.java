package com.app.customermanager.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.app.customermanager.entities.Customer;
import com.app.customermanager.services.CustomerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow all origins for CORS
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Endpoint to get a customer by ID
    @GetMapping("/customer/{id}")
    public Customer getCustomerById(@PathVariable Integer id) {
        return customerService.getCustomerById(id);
    }

    // Endpoint to get all customers
    @GetMapping("/customer")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // Endpoint to delete a customer
    @DeleteMapping("/customer/{id}")
    public void deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
    }

    // Endpoint to add a new customer
    @PostMapping("/customer")
    public Customer addCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

    // Endpoint to update an existing customer
    @PutMapping("/customer/{id}")
    public Customer updateCustomer(@PathVariable Integer id, @RequestBody Customer updatedCustomer) {
        return customerService.updateCustomer(id, updatedCustomer);
    }

    @GetMapping("/customer/search")
    public List<Customer> searchCustomers(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String address) {
        return customerService.searchCustomers(email, address);
    }
}
