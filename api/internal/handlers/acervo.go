package handlers

import (
	"net/http"

	"github.com/da-apgs/api/internal/repository"
	"github.com/gin-gonic/gin"
)

func ListTrabalhos(c *gin.Context) {
	trabalhos, err := repository.GetTrabalhos()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao carregar trabalhos"})
		return
	}
	c.JSON(http.StatusOK, trabalhos)
}

func ListDisciplinas(c *gin.Context) {
	disciplinas, err := repository.GetDisciplinas()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao carregar disciplinas"})
		return
	}
	c.JSON(http.StatusOK, disciplinas)
}
