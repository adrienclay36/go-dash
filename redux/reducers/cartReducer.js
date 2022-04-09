let defaultState = {
  selectedItems: { items: [], restaurantName: "", groceryCart: [], groceryCartOpen: false, },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };

      if (action.payload.checkboxValue) {
        newState.selectedItems = {
          ...newState.selectedItems,
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        let newItems = newState.selectedItems.items.filter(
          (item) => item.title !== action.payload.title
        );
        newState.selectedItems = {
          ...newState.selectedItems,
          items: newItems,
          restaurantName:
            newItems.length === 0 ? "" : newItems[0].restaurantName,
        };
      }

      return newState;
    }
    case "CLEAR_CART": {
      let newState = { ...state };
      newState.selectedItems = { ...newState.selectedItems, items: [], restaurantName: "" };
      return newState;
    }
    case 'ADD_GROCERY': {
      let newState = { ...state };

      if (action.payload.checkboxValue) {
        newState.selectedItems = {
          ...newState.selectedItems,
          groceryCart: [...newState.selectedItems.groceryCart, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        let newItems = newState.selectedItems.groceryCart.filter(
          (item) => item.title !== action.payload.title
        );
        newState.selectedItems = {
          ...newState.selectedItems,
          groceryCart: newItems,
          restaurantName:
            newItems.length === 0 ? "" : newItems[0].restaurantName,
        };
      }
      return newState;
    }
    case 'CLEAR_GROCERY': {
      let newState = { ...state };
      newState.selectedItems = { ...newState.selectedItems, groceryCart: [], restaurantName: "" };
      return newState;
    }
    case 'OPEN_GROCERY': {
      let newState = { ...state };
      newState.selectedItems = { ...newState.selectedItems, groceryCartOpen: true };
      return newState;
    }
    case 'CLOSE_GROCERY': {
      let newState = { ...state };
      newState.selectedItems = { ...newState.selectedItems, groceryCartOpen: false };
      return newState;
    }

    default:
      return state;
  }
};
export default cartReducer;
