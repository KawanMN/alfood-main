import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"



const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')


    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })
        } else {
            http.post('v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
        }
    }

    return (
        <Box>
            <Container maxWidth="lg" sx={{ mt: 1 }}>
                <Paper sx={{ p: 2 }}>
                    {/* Conteudo da pagina */}
                    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', marginTop: 5, border: '1px solid', padding: '10px', boxShadow: '5px 10px blue', flexGrow: 1 }}>
                        <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                        <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                            <TextField
                                value={nomeRestaurante}
                                onChange={evento => setNomeRestaurante(evento.target.value)}
                                label="Nome do Restaurante"
                                variant="standard"
                                fullWidth
                                required
                            />
                            <Button type="submit" variant="outlined" color="inherit" sx={{ color: 'black', borderColor: 'white', backgroundColor: 'lightBlue', marginTop: 1 }} fullWidth>Salvar</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>

    )
}

export default FormularioRestaurante