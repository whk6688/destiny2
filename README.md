# 算命H5页面使用说明

## 项目概述
这是一个基于纯HTML5、CSS3和JavaScript开发的移动端算命应用，具有炫酷的UI设计和流畅的交互体验。用户可以输入生日，点击算命按钮后将请求大模型API，并以优雅的方式展示返回的命运解读结果。

## 项目特点
- 炫酷的星空背景和动态浮动元素
- 响应式设计，完美适配移动端
- 自定义生日选择器和流畅动画效果
- 集成多种大模型API（OpenAI、百度文心一言）
- 优化的结果展示，包括打字机效果、关键词高亮和分段处理

## 本地使用指南

### 环境要求
- 现代浏览器（Chrome、Firefox、Safari、Edge等）
- 可选：本地Web服务器（如果需要在本地运行）

### 使用步骤
1. 解压项目文件到任意目录
2. 直接在浏览器中打开index.html文件，或通过本地Web服务器访问

## API配置
项目默认使用本地模拟数据，如需连接真实大模型API，请在`js/ai-service.js`中配置您的API密钥：

1. 对于OpenAI API:
   - 修改`getOpenAIKey()`方法，返回您的OpenAI API密钥

2. 对于百度文心一言API:
   - 修改`getBaiduApiKey()`和`getBaiduSecretKey()`方法，返回您的百度API密钥

## 项目结构
- `index.html` - 主页面HTML结构
- `css/style.css` - 样式文件，包含所有UI和动画效果
- `js/script.js` - 主要JavaScript逻辑，包含页面交互和动画
- `js/ai-service.js` - 大模型API服务，处理API请求和响应

## 自定义与扩展
- 修改`css/style.css`中的颜色变量可更改整体配色
- 在`js/script.js`中可调整星空和浮动元素的数量和动画效果
- 在`js/ai-service.js`中可添加更多大模型API集成

## 部署说明
项目是纯静态网站，可部署到任何支持静态网站托管的服务，如GitHub Pages、Netlify、Vercel等。

## 注意事项
- 大模型API可能需要付费使用，请注意控制API调用频率
- 本地模拟数据仅作为API不可用时的备选方案
- 移动端体验最佳，但也支持桌面端访问
