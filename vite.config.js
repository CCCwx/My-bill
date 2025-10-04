import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'; // 引入 Node.js 的 path 模块

// 1. 引入需要的函数
import { fileURLToPath } from 'url';

// 2. 构造 __dirname 的替代变量
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 配置路径别名
  resolve: {
    alias: {
      // 这里的 '@' 就可以代表 'src' 目录的绝对路径
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
