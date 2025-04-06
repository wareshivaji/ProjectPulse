package com.ProjectManagement.controller;

import com.ProjectManagement.Model.ERole;
import com.ProjectManagement.Model.Role;
import com.ProjectManagement.Model.User;
import com.ProjectManagement.dto.ProfileUpdateDTO;
import com.ProjectManagement.repository.RoleRepository;
import com.ProjectManagement.repository.UserRepository;
import com.ProjectManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;

    @PutMapping("/{userId}/assign-role/{roleId}")
    public ResponseEntity<User> assignRole(@PathVariable Long userId, @PathVariable Long roleId) {
        return ResponseEntity.ok(userService.assignRoleToUser(userId, roleId));
    }
    
    @PutMapping("/{userId}/change-role")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<User> changeUserRole(
        @PathVariable Long userId, 
        @RequestParam ERole newRole) {
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if(user.getRole().getName() == ERole.HR && newRole != ERole.HR) {
            throw new RuntimeException("Cannot change HR role");
        }
        
        Role role = roleRepository.findByName(newRole)
            .orElseThrow(() -> new RuntimeException("Role not found"));
        
        user.setRole(role);
        return ResponseEntity.ok(userRepository.save(user));
    }

    // New endpoint for profile updates
    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            @RequestBody ProfileUpdateDTO updateDTO,
            Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setPhoneNo(updateDTO.getPhoneNo());
        user.setTechStack(updateDTO.getTechStack());
        user.setAddress(updateDTO.getAddress());
        user.setPostalCode(updateDTO.getPostalCode());
        
        return ResponseEntity.ok(userRepository.save(user));
    }
}