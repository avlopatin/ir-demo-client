import { schema } from 'normalizr'
import {
  FETCH_PRIMARY_CURRENCIES_SUCCESS,
  FETCH_SECONDARY_CURRENCIES_SUCCESS
} from '../ducks/currencies'

export const currencyKey = 'currencies'
export const currency = new schema.Entity(
  currencyKey,
  {},
  { idAttribute: 'name' }
)

export const actionsMeta = {
  [FETCH_PRIMARY_CURRENCIES_SUCCESS]: { schema: [currency], key: currencyKey },
  [FETCH_SECONDARY_CURRENCIES_SUCCESS]: { schema: [currency], key: currencyKey }
}
