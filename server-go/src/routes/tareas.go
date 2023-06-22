package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/carl0s25/trelloGo/database.go"
	"github.com/carl0s25/trelloGo/lib/validator/tareas.go"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Crear una instancia del pool de la base de datos
	db := database.NewPool()

	// Validador de tarea
	tareaValidator := validator.NewSchemaTarea()

	// Ruta para agregar una tarea
	router.POST("/agregarTarea", func(c *gin.Context) {
		var tarea struct {
			Descripcion string `json:"descripcion"`
			Nombre      string `json:"nombre"`
			Prioridad   string `json:"prioridad"`
			Entrega     string `json:"entrega"`
			IdEstado    int    `json:"idEstado"`
			IdMateria   int    `json:"idMateria"`
		}
		if err := c.ShouldBindJSON(&tarea); err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := tareaValidator.Validate(tarea); err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := db.InsertTarea(tarea.Nombre, tarea.Descripcion, tarea.Prioridad, tarea.Entrega, tarea.IdEstado, tarea.IdMateria); err != nil {
			c.JSON(500, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"message": "Tarea agregada",
		})
	})

	// Ruta para obtener todas las tareas
	router.GET("/tareas", func(c *gin.Context) {
		tareas, err := db.GetTareas()
		if err != nil {
			c.JSON(500, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"tareas": tareas,
		})
	})

	// Ruta para actualizar una tarea
	router.PUT("/actualizarTarea/:id", func(c *gin.Context) {
		id := c.Param("id")
		var tarea struct {
			Descripcion string `json:"descripcion"`
			Nombre      string `json:"nombre"`
			Prioridad   string `json:"prioridad"`
			Entrega     string `json:"entrega"`
			IdEstado    int    `json:"idEstado"`
			IdMateria   int    `json:"idMateria"`
		}
		if err := c.ShouldBindJSON(&tarea); err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := tareaValidator.Validate(tarea); err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := db.UpdateTarea(id, tarea.Nombre, tarea.Descripcion, tarea.Prioridad, tarea.Entrega, tarea.IdEstado, tarea.IdMateria); err != nil {
			c.JSON(500, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"message": "Tarea actualizada",
		})
	})

	return router
}