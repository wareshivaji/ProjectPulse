package com.ProjectManagement.security;

import com.ProjectManagement.Model.ERole;
import com.ProjectManagement.Model.Permission;
import com.ProjectManagement.Model.Role;
import com.ProjectManagement.repository.PermissionRepository;
import com.ProjectManagement.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.util.Arrays;
import java.util.HashSet;

@Configuration
public class DataInitializer {

    @Bean
    @Order(1)
    CommandLineRunner initPermissions(PermissionRepository permissionRepository) {
        return args -> {
            // Only initialize if no permissions exist
            if (permissionRepository.count() == 0) {
                // Create basic CRUD permissions
                Permission create = new Permission();
                create.setName("CREATE");
                permissionRepository.save(create);

                Permission read = new Permission();
                read.setName("READ");
                permissionRepository.save(read);

                Permission update = new Permission();
                update.setName("UPDATE");
                permissionRepository.save(update);

                Permission delete = new Permission();
                delete.setName("DELETE");
                permissionRepository.save(delete);

                // Special permissions
                Permission manageTeam = new Permission();
                manageTeam.setName("MANAGE_TEAM");
                permissionRepository.save(manageTeam);

                Permission changeRole = new Permission();
                changeRole.setName("CHANGE_ROLE");
                permissionRepository.save(changeRole);
            }
        };
    }

    @Bean
    @Order(2)
    CommandLineRunner initRoles(RoleRepository roleRepository, PermissionRepository permissionRepository) {
        return args -> {
            // Only initialize if no roles exist
            if (roleRepository.count() == 0) {
                // Get all permissions
                Permission create = permissionRepository.findByName("CREATE")
                        .orElseThrow(() -> new RuntimeException("CREATE permission not found"));
                Permission read = permissionRepository.findByName("READ")
                        .orElseThrow(() -> new RuntimeException("READ permission not found"));
                Permission update = permissionRepository.findByName("UPDATE")
                        .orElseThrow(() -> new RuntimeException("UPDATE permission not found"));
                Permission delete = permissionRepository.findByName("DELETE")
                        .orElseThrow(() -> new RuntimeException("DELETE permission not found"));
                Permission manageTeam = permissionRepository.findByName("MANAGE_TEAM")
                        .orElseThrow(() -> new RuntimeException("MANAGE_TEAM permission not found"));
                Permission changeRole = permissionRepository.findByName("CHANGE_ROLE")
                        .orElseThrow(() -> new RuntimeException("CHANGE_ROLE permission not found"));

                // Create roles with permissions according to your requirements

                // Manager: CRD operations
                Role manager = new Role();
                manager.setName(ERole.MANAGER);
                manager.setPermissions(new HashSet<>(Arrays.asList(create, read, delete)));
                roleRepository.save(manager);

                // Team Lead: CRU operations
                Role teamLead = new Role();
                teamLead.setName(ERole.TEAM_LEAD);
                teamLead.setPermissions(new HashSet<>(Arrays.asList(create, read, update)));
                roleRepository.save(teamLead);

                // Sr. Developer: CR operations
                Role srDeveloper = new Role();
                srDeveloper.setName(ERole.SR_DEVELOPER);
                srDeveloper.setPermissions(new HashSet<>(Arrays.asList(create, read)));
                roleRepository.save(srDeveloper);

                // Jr. Developer: R operations
                Role jrDeveloper = new Role();
                jrDeveloper.setName(ERole.JR_DEVELOPER);
                jrDeveloper.setPermissions(new HashSet<>(Arrays.asList(read)));
                roleRepository.save(jrDeveloper);

                // HR: Special permissions
                Role hr = new Role();
                hr.setName(ERole.HR);
                hr.setPermissions(new HashSet<>(Arrays.asList(read, manageTeam, changeRole)));
                roleRepository.save(hr);
            }
        };
    }
}