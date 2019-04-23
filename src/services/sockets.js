import { eventChannel } from 'redux-saga'
import { SOCKET_BASE_URL } from '../config'

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

export const buildTickerChannels = (primaryCurrencies, secondaryCurrency) =>
  primaryCurrencies
    .map((primary) => `ticker-${primary.name}-${secondaryCurrency}`)
    .join(',')

export default new Socket()
