import React from 'react';
import Renderer from "react-test-renderer";
import ProductService, { MOCKED_PRODUCTS } from "../../services/ProductService";
import Week from "./Week";
import { mount } from "enzyme";
import ProductItem from '../../components/ProductItem/ProductItem';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from "chai";
import WeekProducts from '../../components/WeekProducts/WeekProducts';
import AddProduct from '../AddProduct/AddProduct';
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

it('Add product to week', async (done) => {
    const nameEvent = { target: { value: "Bolo de chocolate" } };
    const priceEvent = { target: { value: 8.56 } };
    const ingredientEvent = { target: { value: "Nata" } };
    const otherIngredientEvent = { target: { value: "Doce de leite" } };
    const anotherIngredientEvent = { target: { value: "Granulado" } };
    let wrapperP = mount(<AddProduct />);
    wrapperP.find("#name").hostNodes().simulate('change', nameEvent);
    wrapperP.find("#value").hostNodes().simulate('change', priceEvent);
    wrapperP.find("#newIngredient").hostNodes().simulate('blur', ingredientEvent);
    wrapperP.find("#newIngredient").hostNodes().simulate('blur', otherIngredientEvent);
    wrapperP.find("#newIngredient").hostNodes().simulate('blur', anotherIngredientEvent);
    await wrapperP.find("#submit").hostNodes().props().onClick();

    let wrapper = await mount(<Week />);
    process.nextTick(async () => {
        await wrapper.update();

        //Expect to the columns to be rendered correctly
        expect(wrapper.find(WeekProducts).at(0).find(ProductItem)).to.have.lengthOf(2);
        expect(wrapper.find(WeekProducts).at(1).find(ProductItem)).to.have.lengthOf(2);
        expect(wrapper.find(WeekProducts).at(2).find(ProductItem)).to.have.lengthOf(1);
        expect(wrapper.find(WeekProducts).at(3).find(ProductItem)).to.have.lengthOf(1);
        expect(wrapper.find(WeekProducts).at(4).find(ProductItem)).to.have.lengthOf(1);
        expect(wrapper.find(WeekProducts).at(5).find(ProductItem)).to.have.lengthOf(1);
        expect(wrapper.find(WeekProducts).at(6).find(ProductItem)).to.have.lengthOf(1);
        await wrapper.find(WeekProducts).at(6).find("#addButton").hostNodes().props().onClick();
        await wrapper.update();

        //Expect to add to the week and update the product list
        await wrapper.find("#modal").find(ProductItem).last().props().onClick();
        await wrapper.update();
        expect(wrapper.find(WeekProducts).at(6).find(ProductItem)).to.have.lengthOf(2);

        //Expect to click the product and remove from the week
        await wrapper.find(WeekProducts).at(1).find(ProductItem).last().props().onClick();
        await wrapper.update();
        expect(wrapper.find(WeekProducts).at(1).find(ProductItem)).to.have.lengthOf(1);
        done();
    })
})
