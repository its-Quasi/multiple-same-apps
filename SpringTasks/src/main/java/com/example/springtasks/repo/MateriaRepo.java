package com.example.springtasks.repo;

import com.example.springtasks.entity.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MateriaRepo extends JpaRepository<Materia, Integer> {
}
