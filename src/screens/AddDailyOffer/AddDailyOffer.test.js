import React from 'react';
import ProductService, { MOCKED_DAY_OFFER } from "../../services/ProductService";
import { mount } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from "chai";
import Products from '../Products/Products';
import ProductItem from '../../components/ProductItem/ProductItem';
import AddDailyOffer from './AddDailyOffer';
import { Dialog } from '@material-ui/core';
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
    const fakedValueEvent = { target: { value: 9.99 } };
    const discountPriceEvent = { target: { value: 25 } };
    let wrapper = mount(<AddDailyOffer />);
    process.nextTick(async () => {
        wrapper.update();
        await wrapper.find("#setProduct").hostNodes().props().onClick();
        wrapper.update();
        await wrapper.find(Dialog).find(ProductItem).first().props().onClick();
        wrapper.find("#fakedValue").hostNodes().simulate('change', fakedValueEvent);
        wrapper.find("#discountValue").hostNodes().simulate('change', discountPriceEvent);
        await wrapper.find("#submit").hostNodes().props().onClick();
        let listProductsWrapper = mount(<Products />);

        process.nextTick(async () => {
            listProductsWrapper.update();
            expect(listProductsWrapper.text())
                .to.contain(discountPriceEvent.target.value)
                .and.contain(fakedValueEvent.target.value.toFixed(2).replace(".", ","));
            done()
        })
    })
})
