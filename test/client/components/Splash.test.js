import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Splash from '../../../app/components/Splash';
import Messages from '../../../app/components/Messages';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Splash component', () => {
  const component = shallow(<Splash store={mockStore({ messages: {} })}/>).shallow();

  it('contains 1 headings', () => {
    expect(component.find('h3')).to.have.length(1);
  });

  it('contains flash messages component', () => {
    expect(component.find(Messages)).to.have.length(1);
  });
});
