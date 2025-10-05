import { TabBar } from 'antd-mobile';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBillList } from '@/store/modules/billstore'; // 假设的路径，实际可能需要调整
import './index.scss'; // 假设的路径

import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from 'antd-mobile-icons'; // 从 antd-mobile-icons 导入图标
import { useNavigate } from 'react-router-dom';

// 底部导航栏的配置数据
const tabs = [
  {
    //这里我们设置month为一级路由，因此key为/
    key: '/',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
];

const Layout = () => {
  const dispatch = useDispatch();

  // 页面加载时获取账单列表
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);

  const navigate = useNavigate()
  const switchRoute = (path) =>{
    console.log(path)
    navigate(path)
  }
  return (
    <div className="layout">
      {/* 内容区域 */}
      <div className="container">
        <Outlet />
      </div>

      {/* 底部导航栏 */}
      <div className="footer">
        {/*点击 TabBar.Item 时，它的 key 自动作为参数传递给 onChange 函数——是 Ant Design Mobile (Antm) 这个库特有的设计机制。 */}
        <TabBar onChange = {switchRoute}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default Layout;