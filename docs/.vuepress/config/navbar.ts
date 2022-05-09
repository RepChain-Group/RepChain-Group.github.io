export const navbar = [
  { text: '指南', link: '/docs/guide/introduce' },
  { text: '文档',
    children: [
      { text: '文档目录', link: '/docs/doc/menu' },
      {
        text: 'Repchain',
        children: [
          { text: '1.1', link: 'https://btajl.gitee.io/rcdevelop-docs/#/' },
        ]
      },
      {
        text: '合约开发',
        children: [
          { text: '1.1', link: 'https://btajl.gitee.io/repchain-tpldevelop/#/' },
        ]
      },
      {
        text: 'Dashboard',
        children: [
          { text: '1.3', link: 'https://linkel_1.gitee.io/repchain-dashboard-client/1.3/' },
          { text: '1.1', link: 'https://linkel_1.gitee.io/repchain-dashboard-client/1.1/' },
        ]
      },
      {
        text: '接口协同',
        children: [
          { text: '1.0.2', link: 'https://btajl.gitee.io/api-coord/' },
        ]
      },
      {
        text: '客户端',
        children: [
          { text: 'RCJS', link: 'https://gitee.com/BTAJL/RCJS' },
          { text: 'RCJava', link: 'https://gitee.com/BTAJL/RCJava-core' },
          { text: 'RCPython', link: 'https://gitee.com/BTAJL/RCPython' },
        ]
      }
    ]
  },
  {
    text: '版本',
    children: [
      { text: '2.x(alpha)', link: 'http://v2.vuepress-reco.recoluan.com/' },
      { text: '1.x', link: 'https://vuepress-theme-reco.recoluan.com/views/1.x/' },
    ],
  },
  // { text: '留言板', link: '/docs/message-board' },
  { text: 'Git', link: 'https://gitee.com/BTAJL/repchain' },
]
