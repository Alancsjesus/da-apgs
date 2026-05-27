package handlers

import (
	"errors"
	"net/http"
	"os"

	"github.com/da-apgs/api/internal/repository"
	"github.com/gin-gonic/gin"
)

func ListNoticias(c *gin.Context) {
	noticias, err := repository.GetNoticias()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Não foi possível carregar as notícias"})
		return
	}
	c.JSON(http.StatusOK, noticias)
}

func GetNoticia(c *gin.Context) {
	slug := c.Param("slug")
	noticia, err := repository.GetNoticiaBySlug(slug)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			c.JSON(http.StatusNotFound, gin.H{"erro": "Notícia não encontrada"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao buscar notícia"})
		return
	}
	c.JSON(http.StatusOK, noticia)
}

func ListEventos(c *gin.Context) {
	eventos, err := repository.GetEventos()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Não foi possível carregar os eventos"})
		return
	}
	c.JSON(http.StatusOK, eventos)
}
