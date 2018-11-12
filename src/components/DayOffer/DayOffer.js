import React, { PureComponent } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Snackbar } from "@material-ui/core";

export default class DayOffer extends PureComponent {
    render() {
        const { name, imageUrl, value, ingredients } = this.props.product;
        const { fakedValue, discountValue } = this.props;
        return (
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={true}
                message={
                    <Card style={{ display: "flex", flexDirection: "row" }}>
                        <CardActionArea onClick={() => !!this.props.onClick && this.props.onClick(this.props.product)}>
                            {!!imageUrl && <CardMedia title={name} image={imageUrl} style={{ height: 75, width: 75 }} />}
                            <CardContent style={{ textAlign: "left", flex: 1 }}>
                                <Typography variant="h6">{name}</Typography>
                                <Typography variant="subtitle2" style={{ color: "#999" }}>Ingredientes: {ingredients.join(",\t")}</Typography>
                            </CardContent>
                            <CardContent style={{ textAlign: "right", justifyContent: "center" }}>
                                <Typography variant="display1" style={{ textDecorationLine: "line-through" }}>R$ {fakedValue.toFixed(2).replace(".", ",")}</Typography>
                                <Typography variant="display1">R$ {(fakedValue * (1 - discountValue / 100)).toFixed(2).replace(".", ",")}</Typography>
                                <Typography variant="display1">{discountValue} % de desconto</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                } />
        )
    }
}
