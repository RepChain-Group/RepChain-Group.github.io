import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":""},["/index.html","/README.md"]],
  ["v-ea2b3f18","/docs/message-board.html",{"title":"留言板"},["/docs/message-board","/docs/message-board.md"]],
  ["v-465b93c3","/docs/contect/email.html",{"title":"联系我们"},["/docs/contect/email","/docs/contect/email.md"]],
  ["v-2c34d997","/docs/case/list.html",{"title":"RepChain应用场景及案例"},["/docs/case/list","/docs/case/list.md"]],
  ["v-028a7ca8","/docs/doc/menu.html",{"title":"文档目录"},["/docs/doc/menu","/docs/doc/menu.md"]],
  ["v-30363d5e","/docs/gongzhong/gongzhong.html",{"title":"RepChain公众号"},["/docs/gongzhong/gongzhong","/docs/gongzhong/gongzhong.md"]],
  ["v-63bd45f0","/docs/guide/introduce.html",{"title":"指南"},["/docs/guide/introduce","/docs/guide/introduce.md"]],
  ["v-4bd2290a","/docs/mainnet/mainnet.html",{"title":"RepChain基础链·主网/测试网（即将开放）"},["/docs/mainnet/mainnet","/docs/mainnet/mainnet.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
  ["v-01560935","/timeline/",{"title":""},["/timeline/index.html"]],
  ["v-03d52fd3","/posts/1/",{"title":""},["/posts/1/index.html"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
