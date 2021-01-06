import React from "react";
import { shallow } from "enzyme";
import Navigation from "./Navigation";

describe("Navigation", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper).toMatchSnapshot();
  });
});
