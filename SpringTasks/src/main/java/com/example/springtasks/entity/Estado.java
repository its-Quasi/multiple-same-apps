package com.example.springtasks.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "estado")
@Entity
public class Estado {

    @Id
    private int id;
    private String estado;
}
