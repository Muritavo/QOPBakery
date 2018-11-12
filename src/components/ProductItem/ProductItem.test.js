import React from "react";
import { mount, configure } from "enzyme";
import ProductItem from "./ProductItem";
import { MOCKED_PRODUCTS } from "../../services/ProductService";
import { expect } from "chai";
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
jest.mock('../../services/ProductService');

global.jestExpect = global.expect;
global.expect = expect;

it("Correta formatação de valor do produto", (done) => {
    const mounted = mount(<ProductItem product={MOCKED_PRODUCTS[0]} />);
    expect(mounted.text()).to.contains("R$ 10,00");
    done()
})