import React from 'react';
import Renderer from "react-test-renderer";
import ProductService, { MOCKED_DAY_OFFER } from "../../services/ProductService";
import DayOffers from "./DayOffers";
import { mount } from "enzyme";
import ProductItem from '../../components/ProductItem/ProductItem';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from "chai";
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

it('renders a list of products', (done) => {
    let wrapper = mount(<DayOffers />);
    expect(wrapper.find(ProductItem)).to.have.lengthOf(0);
    process.nextTick(() => {
        wrapper.update()
        expect(wrapper.find(ProductItem)).to.have.lengthOf(2);
        done();
    })
})
