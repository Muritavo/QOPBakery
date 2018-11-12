import React, { PureComponent } from "react";
import { withSnackbar } from "notistack";
import ProductService from "../../services/ProductService";
import { Button, Typography, Paper, Dialog, DialogTitle, FormControl, TextField, List } from "@material-ui/core";
import ProductItem from "../../components/ProductItem/ProductItem";

class Products extends PureComponent {
    count = 0;
    constructor() {
        super();
        this.service = new ProductService();
    }
    state = {
        products: undefined,
        selectedProduct: undefined,
        fakedValue: 0,
        discountValue: 0,
        isModalOpen: undefined
    }

    async _loadProducts() {
        try {
            const products = await this.service.getProducts();
            this.setState({ products });
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

    async _saveDayOffer() {
        try {
            await this.service.setTodayOffer(this.state.selectedProduct.id, this.state.fakedValue, this.state.discountValue);
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
        const { fakedValue, discountValue } = this.state;
        return (
            <Paper style={{ flexDirection: "column", display: "flex", alignItems: "flex-start" }}>
                <Typography variant="h2">Cadastrar produto do dia</Typography>
                {!!this.state.selectedProduct && <ProductItem product={this.state.selectedProduct} />}
                <Button id="setProduct" onClick={() => this.setState({ isModalOpen: true })}>Escolher produto</Button>

                <FormControl style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                    <Typography variant="subtitle1" style={{ marginRight: 8 }}>R$</Typography>
                    <TextField type="number" min="0" value="0" step="0.01" id="fakedValue" value={fakedValue} label="Valor a ser mostrado para o client" onChange={({ target: { value } }) => this.setState({ fakedValue: value })} />
                </FormControl>
                <FormControl style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                    <Typography variant="subtitle1" style={{ marginRight: 8 }}>%</Typography>
                    <TextField type="number" min="0" value="0" step="0.01" id="discountValue" value={discountValue} label="Valor do produto" onChange={({ target: { value } }) => this.setState({ discountValue: value })} />
                </FormControl>
                <Button id="submit" variant="contained" color="primary" onClick={() => this._saveDayOffer()}>Salvar oferta do dia</Button>
                {this.state.isModalOpen && <Dialog open={true} onClose={() => this.setState({ isModalOpen: false })}>
                    <DialogTitle>Escolha o produto da oferta do dia</DialogTitle>
                    <List>
                        {this.state.products.map((p, i) => <ProductItem key={i} product={p} onClick={() => this.setState({ selectedProduct: p, fakedValue: p.value, discountValue: this.state.discountValue || 15 })} />)}
                    </List>
                </Dialog>}
            </Paper>
        )
    }
}

export default withSnackbar(Products);