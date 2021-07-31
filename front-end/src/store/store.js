import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice.js'
import counterReducer from './counterSlice.js'
import mainDataReducer from './mainDataSlice.js'
import filterDataReducer from './filterDataSlice.js'
export default configureStore({
  reducer: {
      filter: filterReducer,
      counterMain: counterReducer,
      counterFilter: counterReducer,
      mainData: mainDataReducer,
      filterData: filterDataReducer
  },
})