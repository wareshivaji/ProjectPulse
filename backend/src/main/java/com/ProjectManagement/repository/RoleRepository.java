package com.ProjectManagement.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ProjectManagement.Model.ERole;
import com.ProjectManagement.Model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
    
//    @Query("SELECT COUNT(rp) > 0 FROM Role r JOIN r.permissions rp WHERE r.id = :roleId AND rp.name = :permission")
//    boolean hasPermission(@Param("roleId") Long roleId, @Param("permission") String permission);
    
    @Query("SELECT COUNT(p) > 0 FROM Role r JOIN r.permissions p WHERE r.id = :roleId AND p.name = :permission")
    boolean hasPermission(@Param("roleId") Long roleId, @Param("permission") String permission);
}