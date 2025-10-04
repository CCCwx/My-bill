//创建路由实例
import Layout from "@/page/layout";
import Month from "@/page/month";
import New from "@/page/new";
import Year from "@/page/year";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Month />
            },
            {
                path: 'year',
                element: <Year />
            }
        ]
    },
    {
        path:'/new',
        element:<New/>
    }
])

export default router