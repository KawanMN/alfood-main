import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import { Link as RouterLink } from 'react-router-dom'
import IPrato from "../../../interfaces/IPrato"



const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('v2/pratos/')
            .then(resposta => setPratos(resposta.data))
    }, [])

    const excluir = (pratoAhSerExcluirdo: IPrato) => {
        http.delete(`v2/pratos/${pratoAhSerExcluirdo.id}/`)
            .then(() => {
                const listaPratos = pratos.filter(prato => prato.id !== pratoAhSerExcluirdo.id)
                setPratos([...listaPratos])
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
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos.map(prato =>
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noreferrer">Ver Imagem</a>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" sx={{ color: 'white', borderColor: 'black', backgroundColor: 'lightGreen' }}>
                                    <RouterLink to={`/admin/pratos/${prato.id}`}>Editar</RouterLink>
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" sx={{ color: 'black', borderColor: 'black', backgroundColor: 'red' }} onClick={() => excluir(prato)}>Excluir</Button>
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer >

    )
}

export default AdministracaoPratos