import React, { PureComponent } from "react";
import { withSnackbar } from "notistack";
import ProductService from "../../services/ProductService";
import { Button, Typography, Paper } from "@material-ui/core";
import ProductItem from "../../components/ProductItem/ProductItem";
import DayOffer from "../../components/DayOffer/DayOffer";

class Products extends PureComponent {
    count = 0;
    constructor() {
        super();
        this.service = new ProductService();
    }
    state = {
        products: undefined
    }

    async _loadProducts() {
        try {
            const products = await this.service.getProducts();
            const dayOffer = await this.service.getTodayOffer();
            this.setState({ products, dayOffer });
        } catch (e) {
            this.props.enqueueSnackbar(
                e.message,
                {
                    variant: "error",
                    action: <Button color="inherit" onClick={() => this._loadProducts()}>Tentar novamente</Button>
                }
            );
        }
    }

    async componentDidMount() {
        await this._loadProducts();
    }

    render() {
        return (
            <Paper>
                <Typography variant="h2">Aqui estão todas as nossas receitas {this.count++}</Typography>
                {!!this.state.products ? this.state.products.map((p, i) => <ProductItem key={i} product={p} />) : <Typography>Não há receitas cadastradas no momento</Typography>}
                {!!this.state.dayOffer && <DayOffer product={this.state.dayOffer} discountValue={this.state.dayOffer.discountPercent} fakedValue={this.state.dayOffer.value} />}
            </Paper>
        )
    }
}

export default withSnackbar(Products);