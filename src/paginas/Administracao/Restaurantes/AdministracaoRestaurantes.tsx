import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Link as RouterLink } from 'react-router-dom'



const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const excluir = (restauranteAhSerExcluirdo: IRestaurante) => {
        http.delete(`v2/restaurantes/${restauranteAhSerExcluirdo.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluirdo.id)
                setRestaurantes([...listaRestaurante])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" sx={{ color: 'white', borderColor: 'black', backgroundColor: 'lightGreen' }}>
                                    <RouterLink to={`/admin/restaurantes/${restaurante.id}`}>Editar</RouterLink>
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" sx={{ color: 'black', borderColor: 'black', backgroundColor: 'red' }} onClick={() => excluir(restaurante)}>Excluir</Button>
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer >

    )
}

export default AdministracaoRestaurantes