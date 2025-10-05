//这个是布局容器
import { Outlet } from 'react-router-dom'; 
import { Button } from 'antd-mobile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBillList } from '@/store/modules/billstore';
const Layout = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBillList)
    }, [dispatch])
    return (
        <div>
            <Outlet/>  
            {/*测试全局生效样式 */}
            <Button color = "primary">global</Button>
            <div className="purple">
                <Button color = "primary">local</Button>
            </div>
        </div>
    )
}

export default Layout