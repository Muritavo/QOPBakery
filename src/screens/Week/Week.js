import React, { PureComponent, Component } from "react";
import { withSnackbar } from "notistack";
import ProductService from "../../services/ProductService";
import { Button, Typography, Paper, Dialog, DialogTitle, List } from "@material-ui/core";
import ProductItem from "../../components/ProductItem/ProductItem";
import WeekProducts from "../../components/WeekProducts/WeekProducts";

class Week extends Component {
    constructor() {
        super();
        this.service = new ProductService();
    }
    state = {
        products: [],
        isModalOpen: false,
        weekDay: undefined
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

    async componentDidMount() {
        await this._loadProducts();
    }

    _onClickAddProducts(weekDay) {
        this.setState({ isModalOpen: true, weekDay: weekDay });
    }

    async _setProductWeekDay(product) {
        try {
            await this.service.addToWeek(product.id, this.state.weekDay);
            await this._loadProducts();
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

    async _onClickRemoveProducts(weekDay, product) {
        try {
            await this.service.removeFromWeek(product.id, weekDay);
            await this._loadProducts();
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

    render() {
        return (
            <Paper>
                <Typography variant="h2">Estes são os produtos cadastrados por dia</Typography>
                <Paper style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                    <WeekProducts onClickRemoveProduct={async (product) => await this._onClickRemoveProducts(0, product)} onClickAddProduct={async () => await this._onClickAddProducts(0)} products={this.state.products.filter(p => !!p.weekDays && p.weekDays.indexOf(0) != -1)} title="Domingo" />
                    <WeekProducts onClickRemoveProduct={async (product) => await this._onClickRemoveProducts(1, product)} onClickAddProduct={async () => await this._onClickAddProducts(1)} products={this.state.products.filter(p => !!p.weekDays && p.weekDays.indexOf(1) != -1)} title="Segunda" />
                    <WeekProducts onClickRemoveProduct={async (product) => await this._onClickRemoveProducts(2, product)} onClickAddProduct={async () => await this._onClickAddProducts(2)} products={this.state.products.filter(p => !!p.weekDays && p.weekDays.indexOf(2) != -1)} title="Terça" />
                    <WeekProducts onClickRemoveProduct={async (product) => await this._onClickRemoveProducts(3, product)} onClickAddProduct={async () => await this._onClickAddProducts(3)} products={this.state.products.filter(p => !!p.weekDays && p.weekDays.indexOf(3) != -1)} title="Quarta" />
                    <WeekProducts onClickRemoveProduct={async (product) => await this._onClickRemoveProducts(4, product)} onClickAddProduct={async () => await this._onClickAddProducts(4)} products={this.state.products.filter(p => !!p.weekDays && p.weekDays.indexOf(4) != -1)} title="Quinta" />
                    <WeekProducts onClickRemoveProduct={async (product) => await this._onClickRemoveProducts(5, product)} onClickAddProduct={async () => await this._onClickAddProducts(5)} products={this.state.products.filter(p => !!p.weekDays && p.weekDays.indexOf(5) != -1)} title="Sexta" />
                    <WeekProducts onClickRemoveProduct={async (product) => await this._onClickRemoveProducts(6, product)} onClickAddProduct={async () => await this._onClickAddProducts(6)} products={this.state.products.filter(p => !!p.weekDays && p.weekDays.indexOf(6) != -1)} title="Sábado" />
                </Paper>
                {this.state.isModalOpen &&
                    <Dialog id="modal" open={true} onClose={() => this.setState({ isModalOpen: false, weekDay: undefined })}>
                        <DialogTitle>Adicionar produto</DialogTitle>
                        <List>
                            {this.state.products.map((p, i) => <ProductItem key={i} product={p} onClick={async () => await this._setProductWeekDay(p)} />)}
                        </List>
                    </Dialog>
                }
            </Paper>
        )
    }
}

export default withSnackbar(Week);