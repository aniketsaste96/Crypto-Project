import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import axios from 'axios';
//axios should not be in curly braces 
import { useEffect } from 'react';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core'
import CoinInfo from '../components/CoinInfo'
import Header from '../components/Header'
import { numberWithCommas } from '../components/Banner/Carousel'


const CoinPage = () => {
    const { id } = useParams()
    const [coin, setCoin] = useState();
    const { currency, symbol } = CryptoState()
    const fetchCoin = async () => {
        //import api link from api.js
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data)
        console.log(data);
    }

    useEffect(() => {
        fetchCoin()
        //rerender when currency(dependacny) is change
    }, [currency])

    //material UI styling classes.<>
    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center"
            },
        },
        sidebar: {
            width: "30%",
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
            padding: 10,
            fontSize: "20px",
            borderRight: "2px solid grey",
        },
        heading: {
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat"
        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            //Making it responsive
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            }
        }

    }))
    const classes = useStyles();

    //liner progression
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
    return (
        <>
            <Header />
            <div className={classes.container}>

                <div className={classes.sidebar}>
                    <img src={coin?.image.large}
                        alt={coin?.name}
                        height="200"
                        style={{ marginBottom: 20 }}
                    />
                    <Typography variant="h3" className={classes.heading}>
                        {coin?.name}
                    </Typography>

                    <Typography variant="subtitle" className={classes.description}>
                        {/* {description is too large so split first part when full stops is there} */}
                        {(coin?.description.en.split(". ")[0])}
                    </Typography>
                    &nbsp;
                    &nbsp;
                    <div className={classes.marketData}>
                        <span style={{ display: "flex" }}>
                            <Typography variant="h5" className={classes.heading}>
                                Rank: {coin?.market_cap_rank}

                            </Typography>
                        </span>

                    </div>
                    <div className={classes.marketData}>
                        <span style={{ display: "flex" }}>
                            <Typography variant="h5" className={classes.heading}>
                                Current Price:   {symbol} {" "} {coin?.market_data.current_price[currency.toLowerCase()]}

                            </Typography>
                        </span>

                    </div>
                    <div className={classes.marketData}>
                        <span style={{ display: "flex" }}>
                            <Typography variant="h5" className={classes.heading}>
                                Market Cap:
                                {symbol} {" "}

                                {/* {numberWithCommas to make 000,000,000} */}
                                {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                                    .toString()
                                    .slice(0, -6)
                                )}

                            </Typography>
                        </span>

                    </div>


                </div>
                <CoinInfo coin={coin} />

            </div>
        </>
    )
};

export default CoinPage;
