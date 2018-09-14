import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { EditReminder } from './EditReminder';

configure({ adapter: new Adapter() });

const props = {
  yearPicked: 2019,
  monthPicked: 8,
  dayPicked: 3,
  preDate: '20200312',
  preID: 1330515905123,
  preTime: 1604,
  hourPicked: '00',
  minutePicked: '00',
  datePicked: '20190803',
  timePicked: 1708,
  reminder: 'Dinner',
  cleanSession: jest.fn(),
  postReminder: jest.fn(),
  putReminder: jest.fn(),
  changeSessionReminder: jest.fn(),
  changeDay: jest.fn(),
  changeYearAndMonth: jest.fn(),
};

jest.mock('../../../components/DatePicker/DatePicker.js', () => () => (
  <div id="DatePicker">
    DatePicker
  </div>));

jest.mock('../../../components/TimePicker/TimePicker.js', () => () => (
  <div id="TimePicker">
    TimePicker
  </div>));

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <EditReminder {...props} />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
