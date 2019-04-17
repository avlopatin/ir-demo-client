import { normalize } from 'normalizr'
import { actionsMeta } from './schemas'

const middleware = () => (next) => (action) => {
  const types = Object.keys(actionsMeta)
  if (types.indexOf(action.type) >= 0) {
    const meta = actionsMeta[action.type]
    const { entities } = normalize(action.payload, meta.schema)
    return next({ ...action, payload: entities[meta.key] })
  }
  return next(action)
}

export default middleware
