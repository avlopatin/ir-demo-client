import {
  ORDER_BOOK_ORDER_CREATED,
  ORDER_BOOK_ORDER_CANCELLED,
  ORDER_BOOK_ORDER_CHANGED,
  ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED,
  WS_ORDER_TYPE_LIMIT_BID,
  WS_ORDER_TYPE_LIMIT_OFFER
} from './constants'

export const orderCreated = (order) => ({
  type: ORDER_BOOK_ORDER_CREATED,
  payload: order
})

export const orderCancelled = (order) => ({
  type: ORDER_BOOK_ORDER_CANCELLED,
  payload: order
})

export const orderChanged = (order) => ({
  type: ORDER_BOOK_ORDER_CHANGED,
  payload: order
})

export const bidsPageIndexChanged = (index) => ({
  type: ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED,
  payload: {
    type: WS_ORDER_TYPE_LIMIT_BID,
    index
  }
})

export const offersPageIndexChanged = (index) => ({
  type: ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED,
  payload: {
    type: WS_ORDER_TYPE_LIMIT_OFFER,
    index
  }
})
