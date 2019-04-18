import { schema } from 'normalizr'
import { FETCH_CURRENCIES_SUCCESS } from '../ducks/currencies'

export const currencyKey = 'currencies'
export const currency = new schema.Entity(
  currencyKey,
  {},
  { idAttribute: 'name' }
)

export const actionsMeta = {
  [FETCH_CURRENCIES_SUCCESS]: { schema: [currency], key: currencyKey }
}
