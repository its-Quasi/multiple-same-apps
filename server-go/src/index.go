package main

import (
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Procenter API REST
// @version 1.0
// @description API documentation for Procenter

// @host localhost:4000
// @BasePath /api
func main() {
	r := gin.Default()

	// Configuración de vistas
	r.LoadHTMLGlob(path.Join(".", "views", "*"))
	r.Static("/public", "./public")

	// Rutas
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	r.GET("/api-docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Rutas adicionales
	r.GET("/api/tareas", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Obtener tareas"})
	})

	r.GET("/api/materias", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Obtener materias"})
	})

	r.POST("/api/tareas", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Crear tarea"})
	})

	r.POST("/api/materias", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Crear materia"})
	})

	r.PUT("/api/tareas/:id", func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{"message": "Actualizar tarea", "id": id})
	})

	r.PUT("/api/materias/:id", func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{"message": "Actualizar materia", "id": id})
	})

	// Puerto de escucha
	r.Run(":4000")
}
 

