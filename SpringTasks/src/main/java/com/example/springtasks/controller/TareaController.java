package com.example.springtasks.controller;

import com.example.springtasks.entity.Estado;
import com.example.springtasks.entity.Materia;
import com.example.springtasks.entity.Tarea;
import com.example.springtasks.repo.EstadoRepo;
import com.example.springtasks.repo.TareaRepo;
import com.example.springtasks.repo.MateriaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@RestController
@RequestMapping("/materias/{materiaId}")
public class TareaController {

    @Autowired
    private TareaRepo tareaRepo;

    @Autowired
    private MateriaRepo materiaRepo;

    @Autowired
    private EstadoRepo estadoRepo;

    @GetMapping("/tareas")
    public List<Tarea> getAllTarea(){
        return tareaRepo.findAll();
    }

    @GetMapping("/tareas/{id}")
    public ResponseEntity<Tarea> getTaskById(@PathVariable("id") int id){
        if(!tareaRepo.existsById(id))
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        Tarea tarea = tareaRepo.getReferenceById(id);
        return new ResponseEntity<Tarea>(tarea, HttpStatus.OK);
    }

    @PostMapping("/updateStatusTask/{id}")
    public String updateStatusTask(@PathVariable("id") int id, RedirectAttributes redirectAttributes) {
        System.out.println("that's ID: " + id);
        Tarea tarea = tareaRepo.findById(id).orElse(null);

        if (tarea != null) {
            System.out.println(tarea.getDescripcion());


            if (tarea.getIdestado().getId() == 1) {
                tarea.setIdestado(estadoRepo.findById(2).orElse(null));
            } else {
                tarea.setIdestado(estadoRepo.findById(1).orElse(null));
            }

            tareaRepo.save(tarea);
            System.out.println(tarea.getIdtarea());

            redirectAttributes.addAttribute("id", tarea.getIdtarea());
        }

        return "redirect:/materias/{materiaId}/tareas/{id}";
    }
    //@PostMapping("/insert")
    //public Tarea insert(@RequestBody Tarea tarea){
    //    return tareaRepo.save(tarea);
    //}
    @PostMapping("/tareas")
    public ResponseEntity<String> agregarTareaAMateria(@PathVariable int materiaId, @RequestBody Tarea tarea) {
        Materia materia = materiaRepo.findById(materiaId).orElse(null);

        if (materia == null) {
            return ResponseEntity.notFound().build();
        }

        // Asocia la tarea a la materia y guarda la relación en la tabla intermedia
        materia.getTareas().add(tarea);
        tarea.getMaterias().add(materia);
        tareaRepo.save(tarea);

        return ResponseEntity.ok("Tarea agregada exitosamente a la materia");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") int id){
        if(!tareaRepo.existsById(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        tareaRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody Tarea tarea){
        if(!tareaRepo.existsById(id))
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        Tarea tarea1 = tareaRepo.getOne(id);
        tarea1.setNombre(tarea.getNombre());
        tareaRepo.save(tarea1);
        return new ResponseEntity(HttpStatus.OK);
    }
}
