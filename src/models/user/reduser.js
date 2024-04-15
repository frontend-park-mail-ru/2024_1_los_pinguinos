// для будущей переработки в ts
const initialState = {
  token: null,
};

export const userReducer = (state = initialState, action) => {
  let key = null;
  let value = null;
  if (action.payload) {
    key = Object.keys(action.payload)[0];
    value = action.payload[key];
  }
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        // ...state,
        ...action.payload,
      };
    case 'UPDATE_SOMETHING':
      return {
        ...state,
        [key]: value,
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
