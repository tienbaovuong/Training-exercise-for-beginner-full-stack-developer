import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    returned: []
}
export const filterDataSlice = createSlice({
    name: 'counter',
    initialState:[]
    ,
    reducers: {
        changeFilterData: (state,action) =>{
            state[action.payload.numPage-1]=action.payload.data;
        },
        resetFilterData() {return initialState}
    },

})
export const{changeFilterData, resetFilterData}=filterDataSlice.actions

export default filterDataSlice.reducer