import { eventChannel } from 'redux-saga'
import { SOCKET_BASE_URL } from '../config'

const CHANNEL_TICKER = 'ticker'
const CHANNEL_ORDEBOOK = 'orderbook'

class Socket {
  init = ({ url, processMessage }) => {
    return eventChannel((emitter) => {
      const ws = new WebSocket(`${SOCKET_BASE_URL}?subscribe=${url}`)

      ws.onmessage = (e) => {
        let msg = null
        try {
          msg = JSON.parse(e.data)
        } catch (e) {
          console.error(`Error parsing : ${e.data}`)
        }
        if (msg) {
          processMessage(emitter, msg)
        }
      }

      return () => {}
    })
  }
}

export const buildTickerChannel = (primaryCurrencies, secondaryCurrencies) =>
  buildChannel(CHANNEL_TICKER, primaryCurrencies, secondaryCurrencies)

export const buildOrderBookChannel = (primaryCurrencies, secondaryCurrencies) =>
  buildChannel(CHANNEL_ORDEBOOK, primaryCurrencies, secondaryCurrencies)

const buildChannel = (channel, primaryCurrencies, secondaryCurrencies) =>
  primaryCurrencies
    .map((primaryCurrency) =>
      secondaryCurrencies.map(
        (secondaryCurrency) =>
          `${channel}-${primaryCurrency}-${secondaryCurrency}`
      )
    )
    .join(',')

export default new Socket()
