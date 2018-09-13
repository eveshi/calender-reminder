import reducer from './sessionReducer';

const initState = {
  date: null,
  time: null,
  reminder: {
    id: null,
    time: null,
    reminder: null,
  },
};

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });
});