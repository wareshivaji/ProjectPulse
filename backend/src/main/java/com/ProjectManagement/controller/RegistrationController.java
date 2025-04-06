package com.ProjectManagement.controller;

import com.ProjectManagement.dto.UserRegistrationDTO;
import com.ProjectManagement.security.JwtUtil;
import com.ProjectManagement.Model.User;
import com.ProjectManagement.service.RegistrationService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final JwtUtil jwtUtil;

    public RegistrationController(RegistrationService registrationService, JwtUtil jwtUtil) {
        this.registrationService = registrationService;
        this.jwtUtil = jwtUtil;
    }

    // New version with JWT token in response
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@Valid @RequestBody UserRegistrationDTO registrationDTO) {
        try {
            User registeredUser = registrationService.registerUser(registrationDTO);

            // Generate token using email and role
            String token = jwtUtil.generateToken(
                registeredUser.getEmail(),
                Collections.singletonList(registeredUser.getRole().getName().name())
            );

            Map<String, Object> response = new HashMap<>();
            response.put("user", registeredUser);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                Collections.singletonMap("error", e.getMessage())
            );
        }
    }

    // Optional: Original version without token (can be removed if no longer needed)
    @PostMapping("/register-old")
    public ResponseEntity<?> registerUserOld(@Valid @RequestBody UserRegistrationDTO registrationDTO) {
        try {
            User registeredUser = registrationService.registerUser(registrationDTO);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                new ErrorResponse(e.getMessage())
            );
        }
    }

    // Helper class for error responses
    private record ErrorResponse(String message) {}
}
