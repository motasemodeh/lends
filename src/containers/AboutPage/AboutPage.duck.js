// loadData for AboutPage should return a thunk
export const loadData = () => (dispatch, getState) => {
  return Promise.resolve();
};

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  return state;
}
