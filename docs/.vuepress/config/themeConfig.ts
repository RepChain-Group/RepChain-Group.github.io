import { navbar } from './navbar'
import { series } from './series'
import { bulletin } from './bulletin'
import { valineConfig } from './valineConfig'

export const themeConfig = {
  style: '@vuepress-reco/style-default',
  logo: '/logo_Model_single.png',
  author: 'repchain',
  docsRepo: 'https://gitee.com/BTAJL/repchain',
  docsBranch: 'main',
  docsDir: '/',
  lastUpdatedText: '最后更新时间',
  navbar,
  series,
  // valineConfig,
  vuePreviewsDir: './docs/.vuepress/vue-previews',
  // bulletin
}
