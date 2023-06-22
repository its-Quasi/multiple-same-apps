const express = require('express');
const router = express.Router();
const pool = require('../database.js');
const schemaTarea = require('../lib/validator/tareas.js');

router.post('/agregarTarea', async (req, res) => {
    try {
        const {descripcion, nombre, prioridad, entrega, idEstado, idMateria} = req.body;
        console.log(req.body.entrega);
        console.log(nombre);
        const validacion = await schemaTarea.validateAsync(req.body);
        if (validacion.error) {
            return res.status(400).json({
                error: validacion.error.details[0].message
            });
        } else {
            const tarea = {
                nombre: nombre,
                descripcion: descripcion,
                prioridad: prioridad,
                entrega: entrega,
                idEstado: idEstado
            };
            const resultado = await pool.query('INSERT INTO tarea SET?', tarea);
            const tareaid = resultado.insertId
            
            materiaasociada={
                idMateria: idMateria,
                idTarea: tareaid
            }
            const materiaTarea = await pool.query('INSERT INTO materia_tarea SET?', materiaasociada)
            return res.status(200).redirect('/tareas/'+idMateria);
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});


router.get('/eliminarTarea/:idTarea', async (req, res) => {
    try {
      const idTarea = req.params.idTarea;
      
      // Eliminar el registro de tarea en la tabla tarea
      await pool.query('DELETE FROM tarea WHERE idTarea = ?', idTarea);
  
  
      return res.status(200).redirect('/tareas');
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  });
  

  

router.get('/tareas/:idMateria', async (req, res) => {
    try {
        const idMateria = req.params.idMateria;
        const tareas = await pool.query('SELECT t.* FROM tarea AS t JOIN materia_tarea AS mt ON t.idTarea = mt.idTarea JOIN materia AS m ON mt.idMateria = m.idMateria WHERE m.idMateria = ?', idMateria);
        const nombreMateria = await pool.query('SELECT nombre  FROM materia WHERE idMateria = ?', idMateria);
        const nombre = nombreMateria[0].nombre
        console.log(nombreMateria);
        console.log(idMateria);
        return res.status(200).render('tasklist', {tareas, idMateria, nombre} );
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
})

router.put('/actualizarTarea/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {descripcion, nombre, prioridad, entrega, idEstado, idMateria} = req.body;
        const validacion = await schemaTarea.validateAsync(req.body);
        if (validacion.error) {
            return res.status(400).json({
                error: validacion.error.details[0].message
            });
        } else {
            const tarea = {
                nombre: nombre,
                descripcion: descripcion,
                prioridad: prioridad,
                entrega: entrega,
                idEstado: idEstado
            };
            await pool.query('UPDATE tarea SET ? WHERE idTarea = ?', [tarea, id]);
            materiaasociada={
                idMateria: idMateria,
                idTarea: id
            }
            const materiaTarea = await pool.query('UPDATE materia_tarea SET ? WHERE idTarea = ? AND idMateria = ?', [materiaasociada, id, idMateria]);
            return res.status(200).json({
                message: 'Tarea actualizada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});


module.exports = router;