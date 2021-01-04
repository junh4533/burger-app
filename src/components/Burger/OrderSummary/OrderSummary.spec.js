import React from "react";
import { shallow } from "enzyme";
import OrderSummary from "./OrderSummary";

describe("OrderSummary", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<OrderSummary />);
    expect(wrapper).toMatchSnapshot();
  });
});
