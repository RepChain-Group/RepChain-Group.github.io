export const themeData = {
  "style": "@vuepress-reco/style-default",
  "logo": "/logo_Model_single.png",
  "author": "repchain",
  "docsRepo": "https://gitee.com/BTAJL/repchain",
  "docsBranch": "main",
  "docsDir": "/",
  "lastUpdatedText": "最后更新时间",
  "navbar": [
    {
      "text": "指南",
      "link": "/docs/guide/introduce"
    },
    {
      "text": "应用案例",
      "link": "/docs/case/list"
    },
    {
      "text": "文档",
      "children": [
        {
          "text": "文档目录",
          "link": "/docs/doc/menu"
        },
        {
          "text": "Repchain",
          "children": [
            {
              "text": "2.0",
              "link": "https://zls201624.github.io/repchain-doc/"
            }
          ]
        },
        {
          "text": "isCL合约语言",
          "children": [
            {
              "text": "1.0",
              "link": "https://zls201624.github.io/iscl-doc/"
            }
          ]
        },
        {
          "text": "Dashboard",
          "children": [
            {
              "text": "2.0",
              "link": "https://zls201624.github.io/dashboard-doc/"
            }
          ]
        },
        {
          "text": "跨链组件",
          "children": [
            {
              "text": "2.0",
              "link": "https://zls201624.github.io/cross-docs/"
            }
          ]
        },
        {
          "text": "接口协同",
          "children": [
            {
              "text": "rc2.0.0",
              "link": "http://repchain.net/api-coord-docs/"
            }
          ]
        },
        {
          "text": "客户端",
          "children": [
            {
              "text": "RCJS",
              "link": "https://gitee.com/BTAJL/RCJS"
            },
            {
              "text": "RCJava",
              "link": "https://gitee.com/BTAJL/RCJava-core"
            },
            {
              "text": "RCPython",
              "link": "https://gitee.com/BTAJL/RCPython"
            }
          ]
        }
      ]
    },
    {
      "text": "RepChain基础链",
      "link": "/docs/mainnet/mainnet"
    },
    {
      "text": "联系我们",
      "link": "/docs/contect/email"
    },
    {
      "text": "Git",
      "link": "https://gitee.com/BTAJL/repchain"
    }
  ],
  "series": {
    "/docs/guide/": [
      "introduce"
    ],
    "/docs/gongzhong/": [
      "gongzhong"
    ],
    "/docs/doc/": [
      "menu"
    ],
    "/docs/case/": [
      "list"
    ],
    "/docs/contect/": [
      "email"
    ],
    "/docs/mainnet/": [
      "mainnet"
    ]
  },
  "vuePreviewsDir": "./docs/.vuepress/vue-previews"
}
