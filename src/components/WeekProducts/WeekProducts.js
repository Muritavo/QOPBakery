import React, { PureComponent } from 'react';
import { Card, CardMedia, CardContent, Typography, Paper, Button } from "@material-ui/core";
import ProductItem from '../ProductItem/ProductItem';

export default class WeekProducts extends PureComponent {
    render() {
        return (
            <Paper style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h5">{this.props.title}</Typography>
                <Paper style={{ display: "flex", flex: 1, flexDirection: "inherit" }}>
                    {this.props.products.map((p, i) => <ProductItem key={i} product={p} onClick={async () => await this.props.onClickRemoveProduct(p)} />)}
                </Paper>
                <Button id="addButton" onClick={async () => await this.props.onClickAddProduct()}>Adicionar produto</Button>
            </Paper>
        )
    }
}
