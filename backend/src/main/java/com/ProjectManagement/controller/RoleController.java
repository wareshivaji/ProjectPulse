package com.ProjectManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ProjectManagement.service.RoleService;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

//    @GetMapping("/{roleId}/has-permission")
//    public ResponseEntity<Boolean> checkPermission(@PathVariable Long roleId, @RequestParam String permission) {
//        return ResponseEntity.ok(roleService.hasPermission(roleId, permission));
//    }
    
    @GetMapping("/{roleId}/has-permission")
    public ResponseEntity<?> checkPermission(@PathVariable Long roleId, @RequestParam String permission) {
        return roleService.hasPermission(roleId, permission);
    }

}
