import React from 'react';
import { shallow } from 'enzyme';
import { Unwrapped as UnwrappedPortfolio } from '../Portfolio';

describe('Portfolio', () => {
  const shallowComponent = shallow(
    <UnwrappedPortfolio
      store={[]}
      selectedHoldings={[]}
      handleSetHoldings={() => {}}
      handleRemoveBookings={() => {}} />
    );
  test('Portfolio snapshot has not changed', () => {
    expect(shallowComponent).toMatchSnapshot();
  });
});