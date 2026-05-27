package models

import "time"

type Noticia struct {
	Slug      string    `json:"slug"`
	Titulo    string    `json:"titulo"`
	Resumo    string    `json:"resumo"`
	Conteudo  string    `json:"conteudo"`
	Categoria string    `json:"categoria"`
	Imagem    string    `json:"imagem,omitempty"`
	PublicadoEm time.Time `json:"publicado_em"`
	Autor     string    `json:"autor"`
}

type Evento struct {
	Slug      string    `json:"slug"`
	Titulo    string    `json:"titulo"`
	Descricao string    `json:"descricao"`
	Local     string    `json:"local"`
	DataEvento time.Time `json:"data_evento"`
	Tipo      string    `json:"tipo"`
}

type Documento struct {
	Slug        string    `json:"slug"`
	Titulo      string    `json:"titulo"`
	Tipo        string    `json:"tipo"`
	DriveURL    string    `json:"drive_url"`
	PublicadoEm time.Time `json:"publicado_em"`
	Responsavel string    `json:"responsavel"`
}

type EdicaoRevista struct {
	Slug     string    `json:"slug"`
	Volume   int       `json:"volume"`
	Numero   int       `json:"numero"`
	Ano      int       `json:"ano"`
	Titulo   string    `json:"titulo"`
	Descricao string   `json:"descricao"`
	DriveURL string    `json:"drive_url"`
	Artigos  []Artigo  `json:"artigos"`
}

type Artigo struct {
	Titulo   string   `json:"titulo"`
	Autores  []string `json:"autores"`
	Resumo   string   `json:"resumo"`
	DriveURL string   `json:"drive_url"`
	PalavrasChave []string `json:"palavras_chave"`
}

type Trabalho struct {
	Slug      string   `json:"slug"`
	Titulo    string   `json:"titulo"`
	Tipo      string   `json:"tipo"`
	Autores   []string `json:"autores"`
	Orientador string  `json:"orientador,omitempty"`
	Ano       int      `json:"ano"`
	Resumo    string   `json:"resumo"`
	DriveURL  string   `json:"drive_url"`
	PalavrasChave []string `json:"palavras_chave"`
}

type Disciplina struct {
	Slug      string   `json:"slug"`
	Nome      string   `json:"nome"`
	Semestre  int      `json:"semestre"`
	Area      string   `json:"area"`
	Ementa    string   `json:"ementa"`
	Bibliografias []string `json:"bibliografias"`
	Materiais []Material `json:"materiais"`
}

type Material struct {
	Titulo   string `json:"titulo"`
	DriveURL string `json:"drive_url"`
	Tipo     string `json:"tipo"`
}

type Demanda struct {
	Tipo      string `json:"tipo" binding:"required"`
	Descricao string `json:"descricao" binding:"required,min=20"`
	Anonimo   bool   `json:"anonimo"`
	Nome      string `json:"nome,omitempty"`
	Email     string `json:"email,omitempty"`
}
