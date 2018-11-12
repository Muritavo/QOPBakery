import React, { PureComponent } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from "@material-ui/core";

export default class ProductItem extends PureComponent {
    render() {
        const { name, imageUrl, value, ingredients } = this.props.product;
        return (
            <Card style={{ display: "flex", flexDirection: "row" }}>
                <CardActionArea onClick={() => !!this.props.onClick && this.props.onClick(this.props.product)}>
                    {!!imageUrl && <CardMedia title={name} image={imageUrl} style={{ height: 75, width: 75 }} />}
                    <CardContent style={{ textAlign: "left", flex: 1 }}>
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="subtitle2" style={{ color: "#999" }}>Ingredientes: {ingredients.join(",\t")}</Typography>
                    </CardContent>
                    <CardContent style={{ textAlign: "right", justifyContent: "center" }}>
                        <Typography variant="display1">R$ {value.toFixed(2).replace(".", ",")}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}
