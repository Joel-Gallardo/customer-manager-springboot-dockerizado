package com.app.customermanager.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.app.customermanager.entities.Customer;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Integer>{

    // It returns a list of customers whose email or address contains the specified strings, ignoring case
    List<Customer> findByEmailContainingIgnoreCaseOrAddressContainingIgnoreCase(String email, String address);

    // Custom query to search for customers by email or address, ignoring case
    // @Query(" SELECT c FROM Customer c WHERE c.email LIKE %:email% OR c.address LIKE %:address% ")
    // List<Customer> searchCustomers(@Param("email") String email, @Param("address") String address);
}
