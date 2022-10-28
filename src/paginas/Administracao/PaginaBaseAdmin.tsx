import { AppBar, Box, Button, Link, Paper, TextField, Toolbar, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { Link as RouterLink, Outlet } from "react-router-dom"



const PaginaBaseAdmin = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth='xl' sx={{ backgroundColor: 'blue' }}>
                    <Toolbar>
                        <Typography variant="h6" >
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ color: 'white', my: 3, marginLeft: 4 }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ color: 'white', my: 3, marginLeft: 4 }}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>

    )
}

export default PaginaBaseAdmin