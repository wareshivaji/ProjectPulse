package com.ProjectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ProjectManagement.repository.RoleRepository;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

//    public boolean hasPermission(Long roleId, String permission) {
//        return roleRepository.hasPermission(roleId, permission);
//    }
    
    public ResponseEntity<?> hasPermission(Long roleId, String permission) {
        if (!roleRepository.existsById(roleId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Role not found");
        }

        boolean hasPermission = roleRepository.hasPermission(roleId, permission);
        if (hasPermission) {
            return ResponseEntity.ok("Permission granted");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Permission denied");
        }
    }
}

