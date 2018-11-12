import React, { PureComponent } from "react";
import { withSnackbar } from "notistack";
import ProductService from "../../services/ProductService";
import { Button, Typography, Paper, TextField, FormControl } from "@material-ui/core";

class AddProduct extends PureComponent {
    constructor() {
        super();
        this.service = new ProductService();
    }

    state = {
        name: '',
        imageUrl: '',
        value: '',
        ingredients: [],
        saved: false
    }

    _validate() {
        const { name, ingredients, imageUrl, value } = this.state;
        const errors = [];
        if (!name)
            errors.push("É necessário fornecer um nome");
        if (ingredients.length == 0)
            errors.push("É necessário definir pelo menos um ingrediente");
        if (!value)
            errors.push("É necessário definir um valor para o produto");
        if (errors.length > 0)
            throw { errors }
    }

    async _saveProduct() {
        const { name, ingredients, imageUrl, value } = this.state;
        try {
            this._validate();
            const product = await this.service.addProduct(name, imageUrl, ingredients, value);
            this.setState({ saved: true });
        } catch (e) {
            console.warn(e);

            if (e.errors)
                e.errors.forEach(error => this.props.enqueueSnackbar(
                    error,
                    {
                        variant: "error",
                        autoHideDuration: 2000
                    }
                ));
            else
                this.props.enqueueSnackbar(
                    e.message,
                    {
                        variant: "error",
                        autoHideDuration: 2000
                    }
                );
        }
    }

    _updateIngredient(index, newValue) {
        if (newValue.length == 0)
            this.state.ingredients.splice(index, 1);
        else
            this.state.ingredients[index] = newValue;
        this.forceUpdate();
    }

    _addNewIngredient(value) {
        if (this.state.ingredients.indexOf(value) == -1) {
            this.state.ingredients.push(value);
            this.forceUpdate();
        }
    }

    componentDidUpdate() {

    }

    render() {
        const { name, ingredients, imageUrl, value } = this.state;
        return (
            <Paper style={{ flexDirection: "column", display: "flex", alignItems: "flex-start" }}>
                <Typography variant="h2">Cadastrar novo produto</Typography>
                <TextField id="name" value={name} label="Nome do produto" onChange={({ target: { value } }) => this.setState({ name: value })} />
                <FormControl style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                    <Typography variant="subtitle1" style={{ marginRight: 8 }}>R$</Typography>
                    <TextField type="number" min="0" value="0" step="0.01" id="value" value={value} label="Valor do produto" onChange={({ target: { value } }) => this.setState({ value: value })} />
                </FormControl>
                <Typography variant="h6">Ingredientes</Typography>
                {!!ingredients && ingredients.map(
                    (i, index) => <TextField key={index} value={i} onChange={({ target: { value } }) => this._updateIngredient(index, value)} />
                )}
                <TextField
                    id="newIngredient"
                    placeholder="Ingrediente"
                    onKeyPress={({ key, target: { value } }) => (value.length > 0 && key == "Enter") && this._addNewIngredient(value)}
                    onBlur={({ target: { value } }) => value.length > 0 && this._addNewIngredient(value)} />
                <Button id="submit" variant="contained" color="primary" onClick={() => this._saveProduct()}>Cadastrar</Button>
            </Paper>
        )
    }
}

export default withSnackbar(AddProduct);