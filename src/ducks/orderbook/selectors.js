import { page } from '../../common/models'
import { createSelector } from 'reselect'
import {
  WS_ORDER_TYPE_LIMIT_BID,
  WS_ORDER_TYPE_LIMIT_OFFER,
  moduleName
} from './constants'
import { DECIMAL_PLACES } from '../../config'

const stateSelector = (state) => state[moduleName]

const currencyPairSelector = (state, primaryCurrency, secondaryCurrency) => {
  return {
    primaryCurrency,
    secondaryCurrency
  }
}

const currencyPairEntitiesSelector = createSelector(
  [stateSelector, currencyPairSelector],
  (state, { primaryCurrency, secondaryCurrency }) => {
    return state.getIn([
      'entities',
      `${primaryCurrency}`,
      `${secondaryCurrency}`
    ])
  }
)

const bidsSelector = createSelector(
  currencyPairEntitiesSelector,
  (entities) =>
    prepareOrderBookSide(
      entities,
      WS_ORDER_TYPE_LIMIT_BID,
      (a, b) => b.price - a.price
    )
)

const offersSelector = createSelector(
  currencyPairEntitiesSelector,
  (entities) =>
    prepareOrderBookSide(
      entities,
      WS_ORDER_TYPE_LIMIT_OFFER,
      (a, b) => a.price - b.price
    )
)

const prepareOrderBookSide = (entities, type, sortProcessor) => {
  if (!entities) return null
  const requiredData = entities.get(type)
  if (!requiredData) return null

  return requiredData
    .valueSeq()
    .toArray()
    .sort(sortProcessor)
}

const paginationSelector = createSelector(
  stateSelector,
  (state) => state.get('pagination')
)

const bidsPagination = createSelector(
  paginationSelector,
  (pagination) => {
    return pagination.get(WS_ORDER_TYPE_LIMIT_BID)
  }
)

const offersPagination = createSelector(
  paginationSelector,
  (pagination) => {
    return pagination.get(WS_ORDER_TYPE_LIMIT_OFFER)
  }
)

export const offersPageSelector = createSelector(
  [offersSelector, offersPagination],
  (offers, pagination) => page(offers, pagination.size, pagination.index)
)

export const bidsPageSelector = createSelector(
  [bidsSelector, bidsPagination],
  (bids, pagination) => page(bids, pagination.size, pagination.index)
)

const bestValueOfSide = (data) =>
  data != null && data.length > 0 ? data[0].price : 0
const bestBidSelector = createSelector(
  bidsSelector,
  (bids) => bestValueOfSide(bids)
)
const bestOfferSelector = createSelector(
  offersSelector,
  (offers) => bestValueOfSide(offers)
)
export const spreadSelector = createSelector(
  [bestBidSelector, bestOfferSelector],
  (bestBid, bestOffer) => {
    if (bestBid === 0 && bestOffer === 0) return null
    return Math.abs(bestBid - bestOffer).toFixed(DECIMAL_PLACES)
  }
)
