package validator

import (
	"github.com/go-playground/validator/v10"
	"regexp"
)

type Materia struct {
	Nombre string `json:"nombre" validate:"required,max=50,regex=^[a-zA-Z0-9\s]+$"`
}

func NewMateriaValidator() *validator.Validate {
	validate := validator.New()
	validate.RegisterValidation("regex", regexValidation)
	return validate
}

func regexValidation(fl validator.FieldLevel) bool {
	// Expresión regular para verificar letras, números y espacios
	regex := "^[a-zA-Z0-9\\s]+$"
	return regexp.MustCompile(regex).MatchString(fl.Field().String())
}