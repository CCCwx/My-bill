//账单相关的store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const billStore = createSlice({
    name:'bill',
    initialState:{
        billList:[]
    },
    reducers:{
        changeBillList(state, action){
            state.billList = action.payload
        },
        //new这个page中点击save后同步添加账单
        addBill(state, action){
            state.billList = action.payload
        }
    }
})

//解构actionCreator
const {changeBillList, addBill} = billStore.actions

//编写异步
const getBillList = ()=>{
    return async (dispatch) =>{
        //编写异步请求
        const res = await axios.get('http://localhost:8888/ka')
        //触发同步reducer
        dispatch(changeBillList(res.data))
    }
}

//编写new这个page中点击save后同步添加账单
const addBillList = (data)=>{
    return async (dispatch) =>{
        const res = await axios.post('http://localhost:8888/ka', data)
        dispatch(addBill(res.data))
    }
}

export {getBillList,addBillList}
const billReducer = billStore.reducer
// export default billstore
export default billReducer
