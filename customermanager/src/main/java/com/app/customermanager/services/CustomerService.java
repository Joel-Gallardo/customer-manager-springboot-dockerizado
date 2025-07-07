package com.app.customermanager.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customermanager.entities.Customer;
import com.app.customermanager.repository.CustomerRepository;

@Service
public class CustomerService {
    
    @Autowired
    private CustomerRepository customerRepository;

    // Endpoint to get a customer by ID
    public Customer getCustomerById(Integer id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            return customer.get();
        }
        return null;

    }

    // Endpoint to get all customers
    public List<Customer> getAllCustomers() {
        List<Customer> customers =  new ArrayList<>();
        customerRepository.findAll().forEach(customers::add);

        return customers;
    } 

    // Endpoint to delete a customer
    public void deleteCustomer(Integer id) {
       customerRepository.deleteById(id);
    }

    // Endpoint to add a new customer
    public Customer addCustomer(Customer customer) {
       return customerRepository.save(customer);
    }

    // Endpoint to update an existing customer
    public Customer updateCustomer(Integer id, Customer updatedCustomer) {
        updatedCustomer.setId(id);
        return customerRepository.save(updatedCustomer);
    }

    public List<Customer> searchCustomers(String email, String address) {

        // This method searches for customers by email or address.
        // It uses the repository method to find customers whose email or address contains the specified strings, and ignores case.
        return customerRepository.findByEmailContainingIgnoreCaseOrAddressContainingIgnoreCase(email, address);


        
    }
}

