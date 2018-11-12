import React, { Component } from 'react';
import './App.css';
import ProductItem from './components/ProductItem/ProductItem';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { AppBar, Typography, Toolbar, CssBaseline, Paper, Button } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import DayOffers from './screens/DayOffers/DayOffers';
import Products from './screens/Products/Products';
import AddProduct from './screens/AddProduct/AddProduct';
import Week from './screens/Week/Week';
import AddDailyOffer from "./screens/AddDailyOffer/AddDailyOffer";

class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <SnackbarProvider>
        <BrowserRouter>
          <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed">
              <Toolbar>
                <Typography color="inherit" variant="h6" style={{ flex: 1 }}><Link to={"/"} style={{ textDecoration: 'none', color: "inherit" }}>QOPBakery</Link></Typography>
                <Button component={Link} to="/cadastrar/produto" color="inherit">Adicionar</Button>
                <Button component={Link} to="/produtos" color="inherit">Produtos</Button>
                <Button component={Link} to="/doDia" color="inherit">Oferta do dia</Button>
                <Button component={Link} to="/semana" color="inherit">Semana</Button>
              </Toolbar>
            </AppBar>
            <Paper style={{ paddingTop: 64, textAlign: "center" }}>
              <Switch>
                <Route exact path="/doDia" component={AddDailyOffer} />
                <Route exact path="/semana" component={Week} />
                <Route exact path="/cadastrar/produto" component={AddProduct} />
                <Route exact path="/produtos" component={Products} />
                <Route exact path="/" component={DayOffers} />
              </Switch>
            </Paper>
          </React.Fragment>
        </BrowserRouter>
      </SnackbarProvider>
    );
  }
}

export default App;
