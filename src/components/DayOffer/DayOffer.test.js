import React from "react";
import { mount, configure } from "enzyme";
import { MOCKED_DAY_OFFER } from "../../services/ProductService";
import { expect } from "chai";
import Adapter from 'enzyme-adapter-react-16';
import DayOffer from "./DayOffer";
configure({ adapter: new Adapter() });
jest.mock('../../services/ProductService');

global.jestExpect = global.expect;
global.expect = expect;

it("Correta formatação de valor de desconto do produto", (done) => {
    const mounted = mount(<DayOffer product={MOCKED_DAY_OFFER} fakedValue={MOCKED_DAY_OFFER.value} discountValue={MOCKED_DAY_OFFER.discountPercent} />);
    expect(mounted.text()).to.contains("R$ 9,35").and.contains("15 %");
    done()
})