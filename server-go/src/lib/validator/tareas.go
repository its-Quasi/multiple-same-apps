package validator

import (
	"database/sql"

	"github.com/go-playground/validator/v10"
	_ "github.com/go-sql-driver/mysql"
)

type Tarea struct {
	Descripcion string    `json:"descripcion" validate:"omitempty,max=200"`
	Nombre      string    `json:"nombre" validate:"required,max=100"`
	Prioridad   int       `json:"prioridad" validate:"required,max=99999999999"`
	Entrega     time.Time `json:"entrega" validate:"required"`
	IdEstado    int       `json:"idEstado" validate:"required,max=99999999999,external=validateEstadoId"`
	IdMateria   int       `json:"idMateria" validate:"required,max=99999999999,external=validateMateriaId"`
}

func NewTareaValidator(db *sql.DB) *validator.Validate {
	validate := validator.New()
	validate.RegisterValidation("validateEstadoId", validateEstadoId(db))
	validate.RegisterValidation("validateMateriaId", validateMateriaId(db))
	return validate
}

func validateEstadoId(db *sql.DB) validator.Func {
	return func(fl validator.FieldLevel) bool {
		id := fl.Field().Int()
		var count int
		err := db.QueryRow("SELECT COUNT(*) FROM estado WHERE id = ?", id).Scan(&count)
		if err != nil {
			return false
		}
		return count > 0
	}
}

func validateMateriaId(db *sql.DB) validator.Func {
	return func(fl validator.FieldLevel) bool {
		id := fl.Field().Int()
		var count int
		err := db.QueryRow("SELECT COUNT(*) FROM materia WHERE id = ?", id).Scan(&count)
		if err != nil {
			return false
		}
		return count > 0
	}
}