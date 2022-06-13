import { combineReducers } from '@reduxjs/toolkit'

import { arbitrumReducers } from '../Arbitrum/ArbitrumBridge.reducer'
import { socketReducers } from '../Socket/Socket.reducer'
import { xdaiReducers } from '../Xdai/XdaiBridge.reducer'
import { reducer as commonReducer } from './Common.reducer'
import { reducer as uiReducer } from './UI.reducer'

const ecoBridgeReducer = combineReducers({
  ui: uiReducer,
  common: commonReducer,
  ...arbitrumReducers,
  ...socketReducers,
  ...xdaiReducers,
})

export default ecoBridgeReducer
