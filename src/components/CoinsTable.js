import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, LinearProgress, Table, makeStyles, TableContainer, TextField, ThemeProvider, Typography, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { numberWithCommas } from './Banner/Carousel'
import { Pagination } from '@material-ui/lab';





const CoinsTable = () => {
    const { currency, symbol } = CryptoState()
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState([]);
    const history = useHistory()

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data);
        setLoading(false)
    }
    console.log(coins);
    useEffect(() => {
        fetchCoins()
    }, [currency]);



    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: "dark"

        }
    })

    const useStyles = makeStyles(() => ({
        row: {
            backgroundColo: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111"
            },
            fontFamily: "Monserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            }
        }
    }))

    const classes = useStyles()
    const handleSearch = () => {
        return coins.filter((coin) => {
            return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        })
    }
    console.log(handleSearch());
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Container style={{ textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        style={{ margin: 18, fontFamily: "Montserrat" }}
                    >
                        Crptocurrency price by market cap
                    </Typography>
                    <TextField label="Search for Crypto Currency..." variant="outlined" style={{ marginBottom: 20, width: "100%" }} onChange={(e) => setSearch(e.target.value)} />
                    <TableContainer>
                        {loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (
                            <>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                        <TableRow>
                                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (

                                                <TableCell
                                                    style={{
                                                        color: "black",
                                                        fontWeight: "700",
                                                        fontFamily: "Montserrat",
                                                    }}
                                                    key={head}
                                                    align={head === "Coin" ? "" : "right"}
                                                >
                                                    {head}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {handleSearch()
                                            .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                            .map((row) => {
                                                const profit = row.price_change_percentage_24h > 0;

                                                return (
                                                    <TableRow
                                                        onClick={() => history.push(`/coins/${row.id}`)

                                                        } className={classes.row}
                                                        key={row.name}>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            styles={{
                                                                display: "flex",
                                                                gap: 15,
                                                            }}
                                                        >
                                                            <img src={row?.image} alt={row.name}
                                                                height="50"
                                                                style={{ marginBottom: 10 }}

                                                            />
                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                <span style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22
                                                                }}>
                                                                    {row.symbol}
                                                                </span>
                                                                <span style={{ color: "darkgrey" }}>{row.name}</span>
                                                            </div>

                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {symbol}{" "}
                                                            {numberWithCommas(row.current_price.toFixed(2))}

                                                        </TableCell>
                                                        <TableCell align="right"
                                                            style={{
                                                                color: profit > 0 ? "green" : "red",
                                                                fontWeight: 800
                                                            }}
                                                        >
                                                            {profit && "+"}
                                                            {row.price_change_percentage_24h.toFixed(2)}%

                                                        </TableCell>
                                                        <TableCell align="right" >

                                                            {symbol}{" "}
                                                            {numberWithCommas(row.market_cap.toString().slice(0, -6))} M

                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>



                            </>
                        )}
                    </TableContainer>
                    <Pagination
                        style={{
                            padding: 20,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}
                        //pagination functionality
                        classes={{ ul: classes.pagination }}
                        count={(handleSearch()?.length / 10).toFixed(0)}
                        onChange={(_, value) => {
                            setPage(value);
                            //scroll window to top when we click
                            window.scroll(0, 450)
                        }}

                    />
                </Container>
            </ThemeProvider>

        </>
    )
};

export default CoinsTable;
