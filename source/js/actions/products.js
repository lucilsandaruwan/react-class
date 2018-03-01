export const GET_PRODUCTS_START = 'GET_PRODUCTS_START';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';


export function getProducts() {
  return {
    type: GET_PRODUCTS_START,
  };
}
