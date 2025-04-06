package com.ProjectManagement.service;

import com.ProjectManagement.Model.*;
import com.ProjectManagement.dto.UserRegistrationDTO;
import com.ProjectManagement.repository.UserRepository;
import com.ProjectManagement.repository.RoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class RegistrationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public RegistrationService(UserRepository userRepository, 
                             RoleRepository roleRepository,
                             PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerUser(UserRegistrationDTO registrationDTO) {
        // Validate email uniqueness
        if (userRepository.existsByEmail(registrationDTO.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        // Find the selected role
        Role role = roleRepository.findByName(registrationDTO.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found: " + registrationDTO.getRole()));

        // Create and save new user
        User user = new User();
        user.setFirstName(registrationDTO.getFirstName());
        user.setLastName(registrationDTO.getLastName());
        user.setEmail(registrationDTO.getEmail());
        user.setPhoneNo(registrationDTO.getPhoneNo());
        user.setTechStack(registrationDTO.getTechStack() != null ? 
                         registrationDTO.getTechStack() : Collections.emptyList());
        user.setAddress(registrationDTO.getAddress());
        user.setPostalCode(registrationDTO.getPostalCode());
        user.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setRole(role);
        
        // Set empty teams list (will be populated later if added to teams)
        user.setTeams(Collections.emptyList());

        return userRepository.save(user);
    }
}