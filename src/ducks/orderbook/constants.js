import { appName } from '../../config'

export const moduleName = 'orderbook'
export const prefix = `${appName}/${moduleName}`
export const WS_EVENT_ORDER_CREATED = 'NewOrder'
export const WS_EVENT_ORDER_CANCELLED = 'OrderCanceled'
export const WS_EVENT_ORDER_CHANGED = 'OrderChanged'
export const WS_ORDER_TYPE_LIMIT_OFFER = 'LimitOffer'
export const WS_ORDER_TYPE_LIMIT_BID = 'LimitBid'
export const ORDER_BOOK_MONITOR_START = `${prefix}/ORDER_BOOK_MONITOR_START`
export const ORDER_BOOK_ORDER_CREATED = `${prefix}/ORDER_BOOK_ORDER_CREATED`
export const ORDER_BOOK_ORDER_CANCELLED = `${prefix}/ORDER_BOOK_ORDER_CANCELLED`
export const ORDER_BOOK_ORDER_CHANGED = `${prefix}/ORDER_BOOK_ORDER_CHANGED`
export const ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED = `${prefix}/ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED`
export const ORDER_BOOK_SIDE_PAGE_SIZE_CHANGED = `${prefix}/ORDER_BOOK_SIDE_PAGE_SIZE_CHANGED`
