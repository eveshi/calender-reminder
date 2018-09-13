import reducer from './sessionReducer';
import * as actionTypes from '../actions/actionTypes';

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

  it('should handle CHANGE_SESSION_DATE', () => {
    expect(
      reducer(initState, {
        type: actionTypes.CHANGE_SESSION_DATE,
        date: '20180930',
      }),
    ).toEqual(
      {
        date: '20180930',
        time: null,
        reminder: {
          id: null,
          time: null,
          reminder: null,
        },
      },
    );
  });
});
