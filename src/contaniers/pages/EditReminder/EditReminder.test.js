import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { EditReminder } from './EditReminder';

configure({ adapter: new Adapter() });

const props = {
  year: 2033,
  month: 7,
  day: 18,
  postReminder: jest.fn(),
  putReminder: jest.fn(),
  changeSessionReminder: jest.fn(),
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
