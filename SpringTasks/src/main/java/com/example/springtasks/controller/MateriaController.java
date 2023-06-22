package com.example.springtasks.controller;


import com.example.springtasks.entity.Materia;
import com.example.springtasks.repo.MateriaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@RestController
@RequestMapping("/materias")
public class MateriaController {
    @Autowired
    private MateriaRepo materiaRepo;

    @GetMapping("/lista")
    public List<Materia> getAllMateria(Model model) {
        return materiaRepo.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") int id){
        if(!materiaRepo.existsById(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        materiaRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/insert")
    public Materia insert(@RequestBody Materia materia) {
        return materiaRepo.save(materia);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody Materia materia){
        if(!materiaRepo.existsById(id))
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        Materia materia1 = materiaRepo.getOne(id);
        materia1.setNombre(materia.getNombre());
        materiaRepo.save(materia1);
        return new ResponseEntity(HttpStatus.OK);
    }
}
