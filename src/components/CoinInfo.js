import React, { useState, useEffect } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api'
import { Button, createTheme, ThemeProvider, makeStyles, CircularProgress } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import SelectButton from '../components/SelectButton'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { chartDays } from '../config/data';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);


const CoinInfo = ({ coin }) => {
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState()

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
        setHistoricalData(data.prices)
    }
    useEffect(() => {
        fetchHistoricalData()
    }, [currency, days]);
    console.log(historicalData);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark"
        }
    })
    const useStyles = makeStyles((theme) => ({
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0
            }
        }

    }))

    const classes = useStyles();
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {/* chart */}
                {!historicalData ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                ) : (
                    <>
                        <Line
                            data={{
                                labels: historicalData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`
                                    return days === 1 ? time : date.toLocaleDateString();

                                }),
                                datasets: [
                                    {
                                        data: historicalData.map((coin) =>
                                            coin[1]
                                        ),
                                        label: `Price (Past ${days} Days) in ${currency}`,
                                        borderColor: "#EEBC1D"

                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    points: {
                                        radius: 0,
                                    },
                                },
                            }}

                        />
                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            {chartDays.map((day) => {
                                return <SelectButton
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={day.value === days}


                                >

                                    {day.label}
                                </SelectButton>
                            })}
                        </div>
                    </>
                )}

                {/* buttons  */}
            </div>

        </ThemeProvider>
    )
};

export default CoinInfo;
