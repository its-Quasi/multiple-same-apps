package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/carl0s25/trelloGo/database.go"
	"github.com/carl0s25/trelloGo/lib/validator/materia.go"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Crear una instancia del pool de la base de datos
	db := database.NewPool()

	// Validador de materia
	materiaValidator := validator.NewSchemaMateria()

	// Ruta para agregar una materia
	router.POST("/agregarMateria", func(c *gin.Context) {
		var materia struct {
			Nombre string `json:"nombre"`
		}
		if err := c.ShouldBindJSON(&materia); err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := materiaValidator.Validate(materia); err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := db.InsertMateria(materia.Nombre); err != nil {
			c.JSON(500, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"message": "Materia agregada",
		})
	})

	// Ruta para obtener todas las materias
	router.GET("/materias", func(c *gin.Context) {
		materias, err := db.GetMaterias()
		if err != nil {
			c.JSON(500, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"materias": materias,
		})
	})

	// Ruta para actualizar una materia
	router.PUT("/actualizarMateria/:id", func(c *gin.Context) {
		id := c.Param("id")
		var materia struct {
			Nombre string `json:"nombre"`
		}
		if err := c.ShouldBindJSON(&materia); err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := materiaValidator.Validate(materia); err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := db.UpdateMateria(id, materia.Nombre); err != nil {
			c.JSON(500, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"message": "Materia actualizada",
		})
	})

	return router
}