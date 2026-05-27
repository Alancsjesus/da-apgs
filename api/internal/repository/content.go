package repository

import (
	"encoding/json"
	"os"
	"path/filepath"
	"sort"
	"time"

	"github.com/da-apgs/api/internal/models"
)

var contentRoot = func() string {
	root := os.Getenv("CONTENT_ROOT")
	if root == "" {
		return filepath.Join("..", "..", "content")
	}
	return root
}

func loadJSON(path string, dest any) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	return json.Unmarshal(data, dest)
}

func GetNoticias() ([]models.Noticia, error) {
	var noticias []models.Noticia
	path := filepath.Join(contentRoot(), "noticias", "index.json")
	if err := loadJSON(path, &noticias); err != nil {
		return nil, err
	}
	sort.Slice(noticias, func(i, j int) bool {
		return noticias[i].PublicadoEm.After(noticias[j].PublicadoEm)
	})
	return noticias, nil
}

func GetNoticiaBySlug(slug string) (*models.Noticia, error) {
	noticias, err := GetNoticias()
	if err != nil {
		return nil, err
	}
	for _, n := range noticias {
		if n.Slug == slug {
			return &n, nil
		}
	}
	return nil, os.ErrNotExist
}

func GetEventos() ([]models.Evento, error) {
	var eventos []models.Evento
	path := filepath.Join(contentRoot(), "eventos", "index.json")
	if err := loadJSON(path, &eventos); err != nil {
		return nil, err
	}
	now := time.Now()
	var futuros []models.Evento
	for _, e := range eventos {
		if e.DataEvento.After(now) {
			futuros = append(futuros, e)
		}
	}
	sort.Slice(futuros, func(i, j int) bool {
		return futuros[i].DataEvento.Before(futuros[j].DataEvento)
	})
	return futuros, nil
}

func GetDocumentos(tipo string) ([]models.Documento, error) {
	var docs []models.Documento
	path := filepath.Join(contentRoot(), "transparencia", tipo+".json")
	if err := loadJSON(path, &docs); err != nil {
		return nil, err
	}
	sort.Slice(docs, func(i, j int) bool {
		return docs[i].PublicadoEm.After(docs[j].PublicadoEm)
	})
	return docs, nil
}

func GetEdicoes() ([]models.EdicaoRevista, error) {
	var edicoes []models.EdicaoRevista
	path := filepath.Join(contentRoot(), "revista", "index.json")
	if err := loadJSON(path, &edicoes); err != nil {
		return nil, err
	}
	return edicoes, nil
}

func GetEdicaoBySlug(slug string) (*models.EdicaoRevista, error) {
	edicoes, err := GetEdicoes()
	if err != nil {
		return nil, err
	}
	for _, e := range edicoes {
		if e.Slug == slug {
			return &e, nil
		}
	}
	return nil, os.ErrNotExist
}

func GetTrabalhos() ([]models.Trabalho, error) {
	var trabalhos []models.Trabalho
	path := filepath.Join(contentRoot(), "acervo", "trabalhos.json")
	if err := loadJSON(path, &trabalhos); err != nil {
		return nil, err
	}
	return trabalhos, nil
}

func GetDisciplinas() ([]models.Disciplina, error) {
	var disciplinas []models.Disciplina
	path := filepath.Join(contentRoot(), "acervo", "disciplinas.json")
	if err := loadJSON(path, &disciplinas); err != nil {
		return nil, err
	}
	sort.Slice(disciplinas, func(i, j int) bool {
		return disciplinas[i].Semestre < disciplinas[j].Semestre
	})
	return disciplinas, nil
}

func SalvarDemanda(d models.Demanda) error {
	path := filepath.Join(contentRoot(), "escuta", "demandas.json")

	var demandas []map[string]any
	_ = loadJSON(path, &demandas)

	entry := map[string]any{
		"tipo":      d.Tipo,
		"descricao": d.Descricao,
		"anonimo":   d.Anonimo,
		"recebido_em": time.Now().Format(time.RFC3339),
	}
	if !d.Anonimo {
		entry["nome"] = d.Nome
		entry["email"] = d.Email
	}

	demandas = append(demandas, entry)
	data, err := json.MarshalIndent(demandas, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(path, data, 0644)
}
