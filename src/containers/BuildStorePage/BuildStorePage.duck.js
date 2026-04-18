// loadData for BuildStorePage should return a thunk
export const loadData = () => (dispatch, getState) => {
  return Promise.resolve();
};

const initialState = {};

export default function BuildStorePageReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
