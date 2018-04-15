import React from 'react';
import { shallow } from 'enzyme';
import { Unwrapped as UnwrappedClipboard } from '../Clipboard';

describe('Clipboard', () => {
  const shallowComponent = shallow(<UnwrappedClipboard store={[]} handleSetTransactions={() => {}} />);

  test('Clipboard snapshot has not changed', () => {
    expect(shallowComponent).toMatchSnapshot();
  });
});