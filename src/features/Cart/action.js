import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS, SET_ITEMS } from "./constats";

export function addItem(item) {
  return {
    type: ADD_ITEM,
    item: {
      ...item,
      product: item.product || item,
    },
  };
}

// Action Hapus Item
export function removeItem(item) {
  return {
    type: REMOVE_ITEM,
    item,
  };
}

export function clearItems() {
  return {
    type: CLEAR_ITEMS,
  };
}

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items,
  };
}
