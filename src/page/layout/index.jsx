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

// 底部导航栏的配置数据
const tabs = [
  {
    key: '/month',
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
    title: '/年度账单',
    icon: <CalculatorOutline />,
  },
];

const Layout = () => {
  const dispatch = useDispatch();

  // 页面加载时获取账单列表
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);

  return (
    <div className="layout">
      {/* 内容区域 */}
      <div className="container">
        <Outlet />
      </div>

      {/* 底部导航栏 */}
      <div className="footer">
        <TabBar>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default Layout;