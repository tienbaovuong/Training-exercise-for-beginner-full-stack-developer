import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducer/filterSlice.js'
import counterReducer from './reducer/counterSlice.js'
import counterFilterReducer from './reducer/counterFilterSlice.js'
import mainDataReducer from './reducer/mainDataSlice.js'
import filterDataReducer from './reducer/filterDataSlice.js'
export default configureStore({
  reducer: {
      filter: filterReducer,
      counterMain: counterReducer,
      counterFilter: counterFilterReducer,
      mainData: mainDataReducer,
      filterData: filterDataReducer
  },
})