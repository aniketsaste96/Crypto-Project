
import './App.css';
import Home from './Pages/Home';
import { Switch, Route } from "react-router-dom";
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: "white",
      minHeight: "100vh"
    },
  }))
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route exact path="/Home">

        </Route>
        <Route exact path="/coins/:id">
          <CoinPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
