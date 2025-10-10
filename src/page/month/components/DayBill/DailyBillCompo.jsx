import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'
import _ from 'lodash'
import { useState } from 'react'
import Icon from '@/components'
const DailyBill = ({date, billList}) => {
  const dailyResult = useMemo(()=>{
      //const safeBillList = billList || []; 
      //支出 /收入 /结余
      const pay = billList.filter(item=>item.type === 'pay').reduce((a,c) => a+c.money, 0)
      const income = billList.filter(item => item.type === 'income').reduce((a,c) => a + c.money, 0)
      return {
        pay,
        income,
        total: -pay + income
      }
    }, [billList])

  const [visible, setVisible] = useState(false)

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          {/*expand */}
          <span className={classNames('arrow', visible && 'expand')} onClick = {() => { setVisible(!visible) }}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">Payment</span>
            <span className="money">{dailyResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">Income</span>
            <span className="money">{dailyResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">Balance</span>
            <span className="type">{dailyResult.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/*单日列表组件 */}
      <div className="billList" style={{display: visible? 'block':'none'}}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              {/*渲染图标 */}
              <Icon type = {item.useFor}/>
              <div className="detail">
                <div className="billType">{item.useFor}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
</div>
    </div>
  )
}
export default DailyBill