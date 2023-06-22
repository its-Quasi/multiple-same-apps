package com.example.springtasks.controller;

import com.example.springtasks.entity.Estado;
import com.example.springtasks.repo.EstadoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estado")
public class EstadoController {

    @Autowired
    private EstadoRepo estadoRepo;

    @GetMapping("/lista")
    public List<Estado> getAllEstado(){
        return estadoRepo.findAll();
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<Estado> getById(@PathVariable("id") int id){
        if(!estadoRepo.existsById(id))
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        Estado estado = estadoRepo.getReferenceById(id);
        return new ResponseEntity<Estado>(estado, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){
        if(!estadoRepo.existsById(id))
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        estadoRepo.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody Estado estado){
        if(!estadoRepo.existsById(id))
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        Estado estado1 = estadoRepo.getOne(id);
        estado1.setEstado(estado.getEstado());
        estadoRepo.save(estado1);
        return new ResponseEntity(HttpStatus.OK);
    }
}
