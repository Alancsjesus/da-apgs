package handlers

import (
	"net/http"

	"github.com/da-apgs/api/internal/repository"
	"github.com/gin-gonic/gin"
)

func ListAtas(c *gin.Context) {
	docs, err := repository.GetDocumentos("atas")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao carregar atas"})
		return
	}
	c.JSON(http.StatusOK, docs)
}

func ListRelatorios(c *gin.Context) {
	docs, err := repository.GetDocumentos("relatorios")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao carregar relatórios"})
		return
	}
	c.JSON(http.StatusOK, docs)
}

func ListPrestacoes(c *gin.Context) {
	docs, err := repository.GetDocumentos("prestacoes")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao carregar prestações de contas"})
		return
	}
	c.JSON(http.StatusOK, docs)
}
