import React from 'react';
import Renderer from "react-test-renderer";
import ProductService, { MOCKED_DAY_OFFER } from "../../services/ProductService";
import { mount } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from "chai";
import AddProduct from './AddProduct';
import Products from '../Products/Products';
import ProductItem from '../../components/ProductItem/ProductItem';
jest.mock('../../services/ProductService');

global.jestExpect = global.expect;
global.expect = expect;

configure({ adapter: new Adapter() });

const DATE_TO_USE = new Date('2018');
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;

beforeEach(() => {
    ProductService.mockClear();
})

it('Adds a product to the main list', async (done) => {
    const nameEvent = { target: { value: "Bolo de chocolate" } };
    const priceEvent = { target: { value: 8.56 } };
    const ingredientEvent = { target: { value: "Nata" } };
    const otherIngredientEvent = { target: { value: "Doce de leite" } };
    const anotherIngredientEvent = { target: { value: "Granulado" } };
    let wrapper = mount(<AddProduct />);
    wrapper.find("#name").hostNodes().simulate('change', nameEvent);
    wrapper.find("#value").hostNodes().simulate('change', priceEvent);
    wrapper.find("#newIngredient").hostNodes().simulate('blur', ingredientEvent);
    wrapper.find("#newIngredient").hostNodes().simulate('blur', otherIngredientEvent);
    wrapper.find("#newIngredient").hostNodes().simulate('blur', anotherIngredientEvent);
    await wrapper.find("#submit").hostNodes().props().onClick();
    let listProductsWrapper = mount(<Products />);
    process.nextTick(() => {
        listProductsWrapper.update();
        expect(listProductsWrapper.find(ProductItem).last().text())
            .to.contain(nameEvent.target.value)
            .and.contain(priceEvent.target.value.toFixed(2).replace(".", ","))
            .and.contain(ingredientEvent.target.value)
            .and.contain(otherIngredientEvent.target.value)
            .and.contain(anotherIngredientEvent.target.value);
        done()
    })
})
