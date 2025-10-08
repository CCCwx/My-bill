//二级路由
import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import {useEffect, useState } from 'react'
import classNames from 'classnames'
//import { data } from 'react-router-dom'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import _ from 'lodash'
import DailyBill from './components/DayBill/DailyBillCompo'
//import { map } from 'lodash'

const Month = () => {
  //按月做数据的分组
  //从redux拿到数据
  const billList = useSelector(state => state.bill.billList)
  //useMemo对数据二次处理
  //monthGroup是全部月份（即所有）的数据
  const monthGroup = useMemo(()=>{
    //return出去计算出去的数值
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  //console.log(monthGroup)

  //要牢记视图的显示离不开状态，也就是useState
  //控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)

  //控制事件选择
  //点击确认切换时间显示
  const [date, setDate] = useState(()=>{
    return dayjs(new Date()).format('YYYY-MM')
  })

  //这个是当前月份的数据
  const [curMonthList,  setCurMontList] = useState([])
  const monthResult = useMemo(()=>{
    //支出 /收入 /结余
    const pay = curMonthList.filter(item=>item.type === 'pay').reduce((a,c) => a+c.money, 0)
    const income = curMonthList.filter(item => item.type === 'income').reduce((a,c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [curMonthList])

  //初始化的时候把当前月的统计数据显示出来
  useEffect(()=>{
    const nowDate = dayjs().format('YYYY-MM') //不传参数就是获取当前时间
    //看monthGroup是否为空
    if (monthGroup[nowDate]){
      setCurMontList(monthGroup[nowDate])
    }
  }, [monthGroup])

  const onConfirm = (date)=>{
    setDateVisible(false)
    const formatDate = dayjs(date).format('YYYY-MM')

    const listForMonth = monthGroup[formatDate];
    //要检测是否为空数组
    if (listForMonth && listForMonth.length > 0) {
        setCurMontList(listForMonth);
    } else {
        // 如果 listForMonth 是 undefined 或者是一个空数组，都设置为 []
        setCurMontList([]);
    }
    setDate(formatDate)
  }

  //当前月按照日来做分组
  const dailyGroup = useMemo(()=>{
    const groupDate = _.groupBy(curMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    const key = Object.keys(groupDate)
    return{
      groupDate,
      key
    }
  }, [curMonthList]) 



  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick = {() => setDateVisible(true)}>
            <span className="text">
              {/*这里加一个空字符串是要把date变成字符串对象，要不然无法正常渲染 */}
              {date + ''} 月账单
            </span>
            {/*这个是箭头
            思路：根据当前坦克狂打开的状态控制expand类名是否存在
            */}
            <span className= {classNames('arrow', dateVisible && 'expand')}></span> {/*这是那个箭头 */}
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            //更改为我的state变量
            //visible变量为true就会打开
            visible={dateVisible}
            max={new Date()}
            //这两绑定点击 1.取消, 2.确认, 3.蒙版都能关闭
            onCancel={()=> setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={()=>setDateVisible(false)}
          />
        </div>
        {/*单日列表统计
        调用子组件
        */}
          
        {
          dailyGroup.key.map(key =>{
            return <DailyBill key = {key} date = {key} billList={dailyGroup.groupDate[key]}/>
          })
        }
      </div>
    </div >
  )
}

export default Month