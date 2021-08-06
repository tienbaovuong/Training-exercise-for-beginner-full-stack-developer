import { createSlice } from '@reduxjs/toolkit'

export const mainDataSlice = createSlice({
    name: 'mainData',
    initialState:[],
    reducers: {
        changeMainData: (state,action) =>{
            state[action.payload.numPage-1]=action.payload.data
        },
    }

})
export const{changeMainData}=mainDataSlice.actions

export default mainDataSlice.reducer