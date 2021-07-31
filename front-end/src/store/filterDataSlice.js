import { createSlice } from '@reduxjs/toolkit'

export const filterDataSlice = createSlice({
    name: 'counter',
    initialState:[]
    ,
    reducers: {
        changeFilterData: (state,action) =>{
            state[action.payload.numPage-1]=action.payload.data;
        },
    }

})
export const{changeFilterData}=filterDataSlice.actions

export default filterDataSlice.reducer