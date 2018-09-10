import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TimePicker } from './TimePicker';

configure({ adapter: new Adapter() });

const props = {
  changeSession: jest.fn(),
};

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TimePicker {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
