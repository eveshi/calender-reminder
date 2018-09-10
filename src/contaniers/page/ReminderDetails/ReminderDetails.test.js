
import React from 'react';
import renderer from 'react-test-renderer';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ReminderDetails } from './ReminderDetails';

configure({ adapter: new Adapter() });

const props = {
  year: Math.random().toFixed(4)*4,
  month: Math.random().toFixed(2)*2,
  day: Math.random().toFixed(2)*2,
  id: '12345678',
  time: Math.random().toFixed(4)*4,
  reminder: 'abcdefg',
  deleteReminder: jest.fn(),
}

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ReminderDetails />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});