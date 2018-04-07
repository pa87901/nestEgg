import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
  const shallowComponent = shallow(<App />);

  test('App snapshot has not changed', () => {
    expect(shallowComponent).toMatchSnapshot();
  });
});