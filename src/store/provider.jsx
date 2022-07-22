import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import authReducer from './auth/auth.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}