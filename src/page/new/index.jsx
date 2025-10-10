import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components'
import './index.scss'
import classNames from 'classnames'
//import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/modules/billstore'
import { useDispatch } from 'react-redux'

const billListData = {
  pay: [
    {
      name: 'FOOD',
      bills: [
        { type: 'food' },
        { type: 'drinks' },
        { type: 'dessert' },
      ],
    },
    {
      name: 'TRAVEL',
      bills: [
        { type: 'taxi' },
        { type: 'longdistance' },
      ],
    },
    {
      name: 'RECREATION',
      bills: [
        { type: 'bodybuilding' },
        { type: 'game' },
        { type: 'audio' },
        { type: 'travel' },
      ],
    },
    {
      name: 'DAILY',
      bills: [
        { type: 'clothes' },
        { type: 'bag' },
        { type: 'book' },
        { type: 'promote' },
        { type: 'home' },
      ],
    },
    {
      name: 'OTHERS',
      bills: [{ type: 'community' }],
    },
  ],
  income: [
    {
      name: 'PROFESSIONAL',
      bills: [
        { type: 'salary' },
        { type: 'overtimepay' },
        { type: 'bonus' },
      ],
    },
    {
      name: 'OTHERS',
      bills: [
        { type: 'financial' },
        { type: 'cashgift' },
      ],
    },
  ],
}



const New = () => {
  const navigate = useNavigate()
  
  //收集金额
  const [money, setMoney] = useState(0)
  const moneychange = (value)=>{
    setMoney(value)
  }

  //收集账单类型
  const [useFor, setUseFor] = useState('')
  const disptach = useDispatch()

  //保存账单
  const saveBill = ()=>{
    //收集表单数据
    const data = {
      type: billtype,
      money: billtype === 'pay' ? -money:+money, //看billtype
      date: new Date().toISOString(),
      useFor: useFor
    }
    //console.log(data)
    disptach(addBillList(data))
  }

  //1. 准备一个控制收入支出的状态
  const [billtype, setBillType] = useState('pay')
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        RECORD
      </NavBar>
      
      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billtype === 'pay' ? 'selected' : '')}
            onClick={()=>{setBillType('pay')}}
          >
            PAYMENT
          </Button>
          <Button
            className={classNames(billtype === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={()=>{setBillType('income')}}
          >
            INCOME
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{'TODAY'}</span>
              <DatePicker
                className="kaDate"
                title="RECORD DATE"
                max={new Date()}
              />
            </div>
            {/*这个是用户输入框 */}
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneychange}
              />
              <span className="iconYuan">$</span>
            </div>
          </div>
        </div>
      </div>


      <div className="kaTypeList">
        
        {billListData[billtype].map(category => {
         //console.log('正在处理的 category 是:', category);
          return (
            //category.name作为key和标题
            <div className="kaType" key={category.name}>
              <div className="title">{category.name}</div>
              <div className="list">
                {/*这里就是category.bills */}
                {category.bills.map(bill => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        ''
                      )}
                      key={bill.type}
                      onClick={()=>setUseFor(bill.type)}
                    >
                      <div className="icon">
                        <Icon type={bill.type} />
                      </div>
                      <div className="text">{bill.type}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill} >
          SAVE
        </Button>
      </div>
    </div>
  )
}

export default New