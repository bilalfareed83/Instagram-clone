export const initialState = null;

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'USER':
      return payload;

    default:
      return state;
  }
};
