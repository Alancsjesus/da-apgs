package handlers

import (
	"net/http"

	"github.com/da-apgs/api/internal/models"
	"github.com/da-apgs/api/internal/repository"
	"github.com/gin-gonic/gin"
)

func SubmeterDemanda(c *gin.Context) {
	var demanda models.Demanda
	if err := c.ShouldBindJSON(&demanda); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "Dados inválidos: " + err.Error()})
		return
	}

	if err := repository.SalvarDemanda(demanda); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Não foi possível registrar a demanda"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"mensagem": "Demanda registrada com sucesso. Retornaremos em até 7 dias úteis.",
	})
}
