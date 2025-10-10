# My Bill - 个人记账应用

这是一个基于 React 技术栈构建的个人记账应用程序。用户可以记录每天的收入和支出，并在月度视图中查看详细的账单信息和统计数据。

## 功能截图

**月度账单页面**
![月度账单页面截图](https://github.com/CCCwx/My-bill/blob/main/month_bill.png)
*在这里插入你的月度账单页面截图*

**记一笔页面**
![记一笔页面截图](https://github.com/CCCwx/My-bill/blob/main/record.png)
*在这里插入你的记一笔页面截图*

## 技术栈

本项目采用了一系列现代前端技术和库来构建：

* **框架与库**:
    * React 19
    * React Router 7
    * React Redux 9
* **状态管理**:
    * Redux Toolkit
* **UI 组件库**:
    * Ant Design Mobile 5
* **构建工具**:
    * Vite
* **数据请求**:
    * Axios
* **样式**:
    * Sass (SCSS)
* **模拟后端**:
    * json-server
* **工具库**:
    * Day.js (日期处理)
    * Lodash (数据处理)
    * classnames (CSS 类名管理)

## 项目结构
-   `/` (项目根目录)
    -   `server/`
        -   `data.json`
    -   `src/`
        -   `assets/`
        -   `components/`
            -   `index.jsx`
        -   `page/`
            -   `layout/`
            -   `month/`
            -   `new/`
            -   `year/`
        -   `router/`
            -   `index.jsx`
        -   `store/`
            -   `index.jsx`
            -   `modules/`
                -   `billstore.jsx`
        -   `App.jsx`
        -   `main.jsx`
        -   `index.css`
    -   `vite.config.js`
    -   `package.json`

## 功能特性

1.  **账单列表**:
    * 应用启动时自动加载所有账单数据。
    * 在月度视图 (`/`) 中，默认显示当前月份的账单。
    * 月度视图会统计该月的总收入、总支出和结余。
    * 月度账单按天分组，并可展开/折叠查看当日详情。

2.  **新建账单**:
    * 在记一笔页面 (`/new`)，用户可以选择“支出”或“收入”类型。
    * 页面提供了预设的消费/收入分类（如餐饮、交通、工资等）供用户选择。
    * 用户可以输入金额并选择日期（默认为今天）。
    * 点击“SAVE”按钮后，新账单会通过异步 action 发送到后端并更新 Redux store。

3.  **导航**:
    * 应用底部有一个常驻的标签栏，用于在“月度账单”、“记一笔”和“年度账单”页面之间切换。

## 安装与启动

1.  **克隆项目**
    ```bash
    git clone <repository-url>
    cd my-bill
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动模拟后端**
    项目使用 `json-server` 模拟后端 API。在一个新的终端窗口中运行：
    ```bash
    npm run server
    ```
    服务将启动在 `http://localhost:8888`。

4.  **启动前端开发服务器**
    在另一个终端窗口中运行：
    ```bash
    npm run dev
    ```
    项目将启动，你可以在浏览器中访问 `http://localhost:5173` (或 Vite 指定的其他端口)。

## 核心逻辑解析

### 数据流与状态管理

* **数据源**: 所有账单数据都由 `json-server` 提供，该服务基于 `server/data.json` 文件。
* **Redux Store**:
    * `src/store/modules/billstore.jsx` 定义了与账单相关的 state 和 actions。
    * `getBillList`: 这是一个异步 thunk action，负责在应用加载时通过 Axios 从 `http://localhost:8888/ka` 获取所有账单数据，并存入 Redux store。
    * `addBillList`: 这是一个异步 thunk action，负责将新创建的账单对象 POST 到服务器。
* **组件内数据消费**:
    * 在 `Layout` 组件中，`useEffect` hook 在组件首次渲染时 dispatch `getBillList` action，实现数据的初始化加载。
    * 在 `Month` 组件中，通过 `useSelector` 从 Redux store 中获取 `billList`。
    * `useMemo` 和 `lodash.groupBy` 被用来对账单列表进行高效的二次处理，先按月份分组，再按天分组，以供渲染。

### 路由配置

路由配置在 `src/router/index.jsx` 文件中，使用 `react-router-dom` 的 `createBrowserRouter` API。

* `path: '/'`: 主路由，使用 `Layout` 组件作为布局。
    * `index: true`: 默认子路由，渲染 `Month` 组件。
    * `path: 'year'`: 渲染 `Year` 组件。
* `path: '/new'`: 独立路由，渲染 `New` 组件，不使用主布局（因为它有自己的导航栏和全屏样式）。
