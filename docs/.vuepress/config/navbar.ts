export const navbar = [
  { text: '指南', link: '/docs/guide/introduce' },
  { text: '应用案例', link: '/docs/case/list' },
  { text: '文档',
    children: [
      { text: '文档目录', link: '/docs/doc/menu' },
      {
        text: 'Repchain',
        children: [
          { text: '2.0 RC1', link: 'https://btajl.gitee.io/repchain/RepChain-2.0/' },
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
          { text: 'rc2.0.0', link: 'https://btajl.gitee.io/api-coord/' },
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
  { text: '联系我们', link: '/docs/contect/email' },
  { text: 'Git', link: 'https://gitee.com/BTAJL/repchain' },
]
