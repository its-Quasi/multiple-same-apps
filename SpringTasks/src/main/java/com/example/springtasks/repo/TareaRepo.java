package com.example.springtasks.repo;

import com.example.springtasks.entity.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TareaRepo extends JpaRepository<Tarea, Integer> {
}
