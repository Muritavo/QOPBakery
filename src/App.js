import React, { Component } from 'react';
import './App.css';
import ProductItem from './components/ProductItem/ProductItem';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppBar, Typography, Toolbar, CssBaseline, Paper } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import DayOffers from './screens/DayOffers/DayOffers';
import Products from './screens/Products/Products';
import AddProduct from './screens/AddProduct/AddProduct';

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
                <Typography color="inherit" variant="h6">QOPBakery</Typography>
              </Toolbar>
            </AppBar>
            <Paper style={{ paddingTop: 64 }}>
              <Switch>
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
