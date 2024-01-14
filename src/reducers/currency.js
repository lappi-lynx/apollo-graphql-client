const initialState = {
  selectedCurrency: 'CHF',
};

function currency(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENCY':
      return {
        ...state,
        selectedCurrency: action.payload,
      };
    default:
      return state;
  }
}

export default currency;
