import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { themeConfig } from './config/index'

export default defineUserConfig<DefaultThemeOptions>({
  title: 'RepChain',
  description: 'RepChain（Reactive Permissioned Chain）是第一款采用响应式编程实现的自主可控的区块链基础组件。由中国科学院软件研究所、贵阳信息技术研究院、中科软科技股份有限公司和北京连琪科技有限公司共同研发，支持单位有广州软件应用技术研究院、中科嘉速、中科金审和广州中科易德。RepChain已通过工信部信通院“2019、2020可信区块链”功能测试和性能测试。',
  theme: 'reco',
  themeConfig,
  // debug: true,
})
