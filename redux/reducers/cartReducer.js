let defaultState = {
  selectedItems: { items: [], restaurantName: "" },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };

      if (action.payload.checkboxValue) {
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        let newItems = newState.selectedItems.items.filter(item => item.title !== action.payload.title);
        newState.selectedItems = {
          items: newItems,
          restaurantName: newItems.length === 0 ? "" : newItems[0].restaurantName,
        }
      }
    
      return newState;
    }
    case 'CLEAR_CART': {
      let newState = {...state};
      newState.selectedItems = {items: [], restaurantName: ""};
      return newState;
    }
    

    default:
      return state;
  }
};
export default cartReducer;
