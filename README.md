# My Bill - Personal Accounting App

This is a personal accounting application built with the React technology stack. Users can record their daily income and expenses and view detailed bill information and statistics in a monthly view.

## Feature Screenshots

<p align="center">
    **Monthly Bill Page**
    <br>
    <img src="https://github.com/CCCwx/My-bill/blob/main/month_bill.png" alt="月度账单页面截图" width="50%">
</p>

<p align="center">
    **Record New Transaction Page**
    <br>
    <img src="https://github.com/CCCwx/My-bill/blob/main/record.png" alt="记一笔页面截图" width="50%">
</p>


## Technology Stack

* **Frameworks & Libraries**:
    * React 19
    * React Router 7
    * React Redux 9
* **State Management**:
    * Redux Toolkit
* **UI Component Library**:
    * Ant Design Mobile 5
* **Build Tool**:
    * Vite
* **Data Fetching**:
    * Axios
* **Styling**:
    * Sass (SCSS)
* **Mock Backend**:
    * json-server
* **Utility Libraries**:
    * Day.js (日期处理)
    * Lodash (数据处理)
    * classnames (CSS 类名管理)

## Project Structure
-   `/` (Project Root)
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

## Key Features


1.  **Bill List**:
    * Automatically loads all bill data upon application startup.
    * In the monthly view (/), the current month's bills are displayed by default.
    * The monthly view calculates the total income, total expenditure, and balance for the month.
    * Monthly bills are grouped by day and can be expanded/collapsed to view daily details.

2.  **New Bill Creation**:
    * On the record new transaction page (/new), users can select "Expense" or "Income" type.
    * The page provides preset consumption/income categories (e.g., Dining, Transport, Salary) for the user to choose from.
    * Users can input the amount and select the date (defaults to today).
    * After clicking the "SAVE" button, the new bill is sent to the backend via an asynchronous action and updates the Redux store.

3.  **Navigation**:
    * The application features a persistent tab bar at the bottom for switching between "Monthly Bill," "Record New Transaction," and "Annual Bill" pages.

## Installation and Startup

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd my-bill
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Mock Backend**
    The project uses json-server to simulate the backend API. Run the following command in a new terminal window:
    ```bash
    npm run server
    ```
    The service will start at http://localhost:8888.

4.  **Start the Frontend Development Server**
    Run the following command in another terminal window:
    ```bash
    npm run dev
    ```
    The project will start, and you can access it in your browser at http://localhost:5173 (or another port specified by Vite).
    

