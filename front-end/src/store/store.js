import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice.js'
import counterReducer from './counterSlice.js'
import counterFilterReducer from './counterFilterSlice.js'
import mainDataReducer from './mainDataSlice.js'
import filterDataReducer from './filterDataSlice.js'
export default configureStore({
  reducer: {
      filter: filterReducer,
      counterMain: counterReducer,
      counterFilter: counterFilterReducer,
      mainData: mainDataReducer,
      filterData: filterDataReducer
  },
})