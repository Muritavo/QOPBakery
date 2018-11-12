import React, { PureComponent } from "react";
import { withSnackbar } from "notistack";
import ProductService from "../../services/ProductService";
import { Button, Typography, Paper } from "@material-ui/core";
import ProductItem from "../../components/ProductItem/ProductItem";

class DayOffers extends PureComponent {
    service;
    constructor() {
        super();
        this.service = new ProductService();
    }
    state = {
        products: undefined
    }

    async _loadOffers() {
        try {
            const products = await this.service.getProducts(new Date().getDay());
            this.setState({ products });
        } catch (e) {
            this.props.enqueueSnackbar(
                e.message,
                {
                    variant: "error",
                    action: <Button color="inherit" onClick={() => this._loadOffers()}>Tentar novamente</Button>
                }
            );
        }
    }

    async componentDidMount() {
        await this._loadOffers();
    }

    render() {
        return (
            <Paper>
                <Typography variant="h2">Nossas receitas do dia</Typography>
                {!!this.state.products ? this.state.products.map((p, i) => <ProductItem key={i} product={p} />) : <Typography>Não há ofertas para hoje</Typography>}
            </Paper>
        )
    }
}

export default withSnackbar(DayOffers);