import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState:{
            id:null,
            name:null,
            gender:null,
            age:null,
            email:null,
            phone_number:null
        
    },
    reducers: {
        changeFilter: (state,action) =>{
            state=action.payload
            console.log(state);
        },
    }

})
export const{changeFilter}=filterSlice.actions

export default filterSlice.reducer