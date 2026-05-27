package main

import (
	"log"
	"os"

	"github.com/da-apgs/api/internal/handlers"
	"github.com/da-apgs/api/internal/middleware"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := gin.Default()
	r.Use(middleware.CORS())

	api := r.Group("/api/v1")
	{
		api.GET("/noticias", handlers.ListNoticias)
		api.GET("/noticias/:slug", handlers.GetNoticia)

		api.GET("/eventos", handlers.ListEventos)

		api.GET("/transparencia/atas", handlers.ListAtas)
		api.GET("/transparencia/relatorios", handlers.ListRelatorios)
		api.GET("/transparencia/prestacoes", handlers.ListPrestacoes)

		api.GET("/revista", handlers.ListEdicoes)
		api.GET("/revista/:slug", handlers.GetEdicao)

		api.GET("/acervo/trabalhos", handlers.ListTrabalhos)
		api.GET("/acervo/disciplinas", handlers.ListDisciplinas)

		api.POST("/escuta", handlers.SubmeterDemanda)
	}

	log.Printf("Servidor DA APGS iniciado na porta :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
