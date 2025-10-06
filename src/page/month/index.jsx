//二级路由
import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState } from 'react'
import classNames from 'classnames'
import { data } from 'react-router-dom'
import dayjs from 'dayjs'

const Month = () => {
  //要牢记视图的显示离不开状态，也就是useState
  //控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)

  //控制事件选择
  const [date, setDate] = useState(()=>{
    return dayjs(new Date()).format('YYYY | MM')
  })

  const onConfirm = (date)=>{
    setDateVisible(false)
    const formatDate = dayjs(date).format('YYYY | MM')
    setDate(formatDate)
  }
  
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
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
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
      </div>
    </div >
  )
}

export default Month