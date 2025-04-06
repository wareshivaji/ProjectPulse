package com.ProjectManagement.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ProjectManagement.Model.Task;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Removed findByTaskId as JpaRepository provides findById(Long id)
}