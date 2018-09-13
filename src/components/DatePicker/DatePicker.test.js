import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DatePicker } from './DatePicker';

configure({ adapter: new Adapter() });

const props = {
  yearInit: 2032,
  monthInit: 6,
  dayInit: 28,
  changeDay: jest.fn(),
  changeYearAndMonth: jest.fn(),
  changeSessionDate: jest.fn(),
};

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DatePicker {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
