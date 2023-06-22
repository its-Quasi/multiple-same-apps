const express = require('express');
const router = express.Router();
const pool = require('../database.js');
const schemaMateria = require('../lib/validator/materia.js');

router.post('/agregarMateria', async (req, res) => {
    try {
        const nombre = req.body.nombre;
        console.log(nombre);
        const validacion = await schemaMateria.validate(req.body);
        if (validacion.error) {
            return res.status(400).json({
                error: validacion.error.details[0].message
            });
        } else {
            const materia = {
                nombre: nombre
            };
            const resultado = await pool.query('INSERT INTO materia SET?', materia);
            return res.status(200).redirect('/materias');
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

router.get('/materias', async (req, res) => {
    try {
        const materias = await pool.query('SELECT * FROM materia');
        console.log(materias);
        return res.status(200).render('index', {
            materias
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
})


router.get('/', async (req, res) => {
    try {
        const materias = await pool.query('SELECT * FROM materia');
        console.log(materias);
        return res.status(200).render('index', {
            materias
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
})


router.post('/actualizarMateria/:idMateria', async (req, res) => {
    try {
        const id = req.params.idMateria;
        const nombre = req.body.nombre;
        const validacion = await schemaMateria.validate(req.body);
        if (validacion.error) {
            return res.status(400).json({
                error: validacion.error.details[0].message
            });
        } else {
            const materia = {
                nombre: nombre
            };
            await pool.query('UPDATE materia SET ? WHERE idMateria = ?', [materia, id]);
            return res.status(200).redirect('/materias');
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

router.get('/borrarMateria/:idMateria', async (req, res) => {
    try {
        const id = req.params.idMateria;
        await pool.query('DELETE FROM materia WHERE idMateria = ?', [id]);
        return res.status(200).redirect('/materias');
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});


module.exports = router;