import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TimePicker } from './TimePicker';

configure({ adapter: new Adapter() });

const props = {
  hourPicked: '00',
  minutePicked: '00',
  hourArray: ['00', '01'],
  minuteArray: ['00', '01'],
  changeSessionHour: jest.fn(),
  changeSessionMinute: jest.fn(),
};

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TimePicker {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
