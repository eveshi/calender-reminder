import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DatePicker } from './DatePicker';

configure({ adapter: new Adapter() });

const props = {
  yearPicked: 2019,
  monthPicked: 8,
  dayPicked: 3,
  yearArray: [
    2019,
    2020,
    2021,
  ],
  monthArray: [{
    index: 8,
    string: 'Sep',
  }],
  dayArray: [
    1, 2, 3, 4, 5,
  ],
  changeDay: jest.fn(),
  changeYearAndMonth: jest.fn(),
  datePickerDisabled: true,
  dayPickerDisabled: true,
  applyButtonDisabled: true,
  changeSessionYear: jest.fn(),
  changeSessionMonth: jest.fn(),
  changeSessionDay: jest.fn(),
};

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DatePicker {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
