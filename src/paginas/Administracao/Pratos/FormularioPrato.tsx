import React from "react"
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"




const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tags, setTags] = useState<ITag[]>([])
    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [imagem, setImagem] = useState<File | null>(null)

    useEffect(() => {
        http.get<{ tags: ITag[] }>('v2/tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData();
        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)

        if (imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'v2/pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                setNomePrato('')
                setDescricao('')
                setTag('')
                setRestaurante('')
                alert('Prato cadastrado com sucesso!')
            })
            .catch(erro => console.log(erro))


    }

    return (
        <Box>
            <Container maxWidth="lg" sx={{ mt: 1 }}>
                <Paper sx={{ p: 2 }}>
                    {/* Conteudo da pagina */}
                    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', marginTop: 5, border: '1px solid', padding: '10px', boxShadow: '5px 10px blue', flexGrow: 1 }}>
                        <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
                        <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                            <TextField
                                value={nomePrato}
                                onChange={evento => setNomePrato(evento.target.value)}
                                label="Nome do Prato"
                                variant="standard"
                                fullWidth
                                required
                                margin="dense"
                                sx={{ paddingBottom: '1%' }}
                            />
                            <TextField
                                value={descricao}
                                onChange={evento => setDescricao(evento.target.value)}
                                label="Descrição do Prato"
                                variant="standard"
                                fullWidth
                                required
                                margin="dense"
                                sx={{ paddingBottom: '1%' }}
                            />

                            <FormControl margin="dense" fullWidth sx={{ paddingTop: '1%' }}>
                                <InputLabel id="select-tag" required>Tag</InputLabel>
                                <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                                    {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                                        {tag.value}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>

                            <FormControl margin="dense" fullWidth sx={{ paddingTop: '1%' }}>
                                <InputLabel id="select-restaurante" required>Restaurante</InputLabel>
                                <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                                    {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                        {restaurante.nome}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>

                            <input type="file" onChange={selecionarArquivo} />

                            <Button type="submit" variant="outlined" color="inherit" sx={{ color: 'black', borderColor: 'white', backgroundColor: 'lightBlue', marginTop: 1 }} fullWidth>Salvar</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>

    )
}

export default FormularioPrato