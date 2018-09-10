import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DatePicker } from './DatePicker';

configure({ adapter: new Adapter() });

const props = {
  yearInit: Math.random().toFixed(4)*4,
  monthInit: Math.random().toFixed(2)*2,
  dayInit: Math.random().toFixed(2)*4,
  changeDay: jest.fn(),
  changeYearAndMonth: jest.fn(),
}

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DatePicker {...props}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});