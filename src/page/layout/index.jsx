//这个是布局容器
import { Outlet } from 'react-router-dom'; 
import { Button } from 'antd-mobile';
const Layout = () =>{
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