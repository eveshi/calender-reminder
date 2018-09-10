import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calender from './Calender';

configure({ adapter: new Adapter() });

const props = {
  year: 2033,
  month: 6,
  day: 2,
  onClick: jest.fn,
};

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Calender {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
