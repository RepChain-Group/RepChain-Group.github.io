import { defineAsyncComponent } from 'vue'

export default ({ app }) => {
  app.component("demo", defineAsyncComponent(() => import("E:/repchain-net/RepChain-Group.github.io/docs/.vuepress/vue-previews/demo.vue")))
}
