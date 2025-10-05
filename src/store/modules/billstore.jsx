//账单相关的store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const billStore = createSlice({
    name:'bill',
    initialState:{
        billList:[]
    },
    reducer:{
        changeBillList(state, action){
            state.billList = action.payload
        }
    }
})

//解构actionCreator
const {changeBillList} = billStore.actions

//编写异步
const getBillList = ()=>{
    return async (dispatch) =>{
        //编写异步请求
        const res = await axios.get('http://localhost:8888/ka')
        //触发同步reducer
        dispatch(changeBillList(res.data))
    }
}

export {getBillList}
const billReducer = billStore.reducer
// export default billstore
export default billReducer
