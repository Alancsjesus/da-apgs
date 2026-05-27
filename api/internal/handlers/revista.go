package handlers

import (
	"errors"
	"net/http"
	"os"

	"github.com/da-apgs/api/internal/repository"
	"github.com/gin-gonic/gin"
)

func ListEdicoes(c *gin.Context) {
	edicoes, err := repository.GetEdicoes()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao carregar edições"})
		return
	}
	c.JSON(http.StatusOK, edicoes)
}

func GetEdicao(c *gin.Context) {
	slug := c.Param("slug")
	edicao, err := repository.GetEdicaoBySlug(slug)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			c.JSON(http.StatusNotFound, gin.H{"erro": "Edição não encontrada"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao buscar edição"})
		return
	}
	c.JSON(http.StatusOK, edicao)
}
