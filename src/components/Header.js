import { AppBar, Container, MenuItem, Select, Toolbar, Typography, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext'
const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "30"
    }
}))
const Header = () => {
    const history = useHistory();
    const classes = useStyles()
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark"
        }
    })
    const { currency, setCurrency } = CryptoState()
    console.log(currency);
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography className={classes.title} onClick={() => history.push("/")}>Crypto</Typography>
                        <Select variant="outlined" style={{
                            width: 100,
                            height: 40,
                            marginRight: 15,
                        }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}


                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'INR'}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
};

export default Header;
