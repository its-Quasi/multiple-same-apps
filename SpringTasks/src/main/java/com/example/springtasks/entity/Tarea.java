package com.example.springtasks.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "tarea")
@Entity
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idtarea;
    private String descripcion;
    private String nombre;
    private int prioridad;
    private Date entrega;
    @ManyToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name="idestado",referencedColumnName = "id")
    private Estado idestado;

    @ManyToMany(mappedBy = "tareas")
    private List<Materia> materias = new ArrayList<>();;

}
