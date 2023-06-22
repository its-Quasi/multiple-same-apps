package com.example.springtasks.repo;

import com.example.springtasks.entity.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstadoRepo  extends JpaRepository<Estado, Integer> {
}
