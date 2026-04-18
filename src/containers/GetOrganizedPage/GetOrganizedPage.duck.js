// loadData for GetOrganizedPage should return a thunk
export const loadData = () => (dispatch, getState) => {
  return Promise.resolve();
};

const initialState = {};

export default function GetOrganizedPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
