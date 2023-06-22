package com.example.springtasks.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "materia")
@Entity
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idmateria;
    private  String nombre;

    @ManyToMany(cascade=CascadeType.PERSIST)
    @JoinTable(
            name = "materia_tarea",
            joinColumns = @JoinColumn(name = "idmateria"),
            inverseJoinColumns = @JoinColumn(name = "idtarea")
    )
    private List<Tarea> tareas= new ArrayList<>();
}
