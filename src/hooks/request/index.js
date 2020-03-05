import { useReducer, useCallback } from 'react'
import reducer, { initialState } from './reducer'
import { fetching, success, error } from './actionCreators'
import { isEmpty } from '../../utils'

const useApiRequest = (url, { verb = 'GET', params = {} } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const apiKey = 'udyw9zudgaK5k1fcEv4DCxAAGNLapAEG'

  const makeRequest = useCallback(async () => {
    dispatch(fetching())
    try {
      const response = await fetch(`${url}?api-key=${apiKey}`, {
        method: verb,
        headers: {
          'Content-Type': 'application/json'
        },
        body: !isEmpty(params) ? params : null
      })
      const data = await response.json()
      dispatch(success(data))
    } catch (e) {
      dispatch(error(e))
    }
  }, [url, verb, params])

  return [state, makeRequest]
}

export default useApiRequest
