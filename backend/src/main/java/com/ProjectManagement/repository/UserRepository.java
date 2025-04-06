package com.ProjectManagement.repository;

import com.ProjectManagement.Model.ERole;
import com.ProjectManagement.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    // Find users by role (useful for HR operations)
    List<User> findByRole_Name(ERole roleName);
    
    // Find users not assigned to any team
    @Query("SELECT u FROM User u WHERE u.teams IS EMPTY")
    List<User> findUsersWithoutTeams();
    
    // Find users by tech stack (case insensitive search)
    @Query("SELECT DISTINCT u FROM User u JOIN u.techStack t WHERE LOWER(t) LIKE LOWER(concat('%', :tech, '%'))")
    List<User> findByTechStackContaining(@Param("tech") String tech);
}