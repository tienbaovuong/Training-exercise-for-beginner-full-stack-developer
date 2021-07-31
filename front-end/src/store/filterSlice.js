import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState:{
            id:null,
            name:null,
            gender:null,
            age:0,
            email:null,
            phone_number:null
        
    },
    reducers: {
        changeFilter: (state,action) =>{
            state=action.payload
        },
    }

})
export const{changeFilter}=filterSlice.actions

export default filterSlice.reducer