'use strict';

import ItemTitle from './itemTitle.js';
import {shallow, mount} from 'enzyme';
import React from 'react';

describe('Item Title', () => {
  it('should show title text', () => {
    const titleText = 'Hello';
    const wrapper = mount(<ItemTitle title={titleText} />);
    expect(wrapper.find({'data-hook': 'item-title'}).text()).toBe(titleText);

  });
});
