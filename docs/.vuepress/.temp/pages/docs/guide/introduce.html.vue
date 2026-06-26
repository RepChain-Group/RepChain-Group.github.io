<template><h2 id="repchain2-0免编译版本发布" tabindex="-1"><a class="header-anchor" href="#repchain2-0免编译版本发布" aria-hidden="true">#</a> RepChain2.0免编译版本发布</h2>
<ul>
<li><a href="https://github.com/RepChain-Group/repchain-package/releases" target="_blank" rel="noopener noreferrer">RepChain免编译版本下载<ExternalLinkIcon/></a> ——为方便用户使用，提供了免编译版本，此版本不需要编译即可直接运行</li>
</ul>
<h2 id="一、快速部署" tabindex="-1"><a class="header-anchor" href="#一、快速部署" aria-hidden="true">#</a> 一、快速部署</h2>
<h3 id="配置环境" tabindex="-1"><a class="header-anchor" href="#配置环境" aria-hidden="true">#</a> 配置环境</h3>
<ul>
<li>下载jdk13(推荐zulu版本)到需要部署的机器上。</li>
<li>下载RepChain2.0免编译版本到部署的机器上。</li>
</ul>
<h3 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h3>
<blockquote>
<p>部署方式提供两种，单机多节点和多机多节点。</p>
</blockquote>
<h4 id="方式一-单机多节点" tabindex="-1"><a class="header-anchor" href="#方式一-单机多节点" aria-hidden="true">#</a> 方式一：单机多节点</h4>
<ol>
<li>解压RepChain.tar.gz</li>
<li>修改启动脚本<code>start.sh</code>（主要修改java相关内容）</li>
<li>启动脚本<code>start.sh</code></li>
<li>浏览器输入<code>http://ip:9081</code>查看区块链状态</li>
<li>停止脚本为<code>stop.sh</code></li>
</ol>
<h4 id="方式二-多机多节点" tabindex="-1"><a class="header-anchor" href="#方式二-多机多节点" aria-hidden="true">#</a> 方式二：多机多节点：</h4>
<blockquote>
<p>此处假设有5个节点及5个机器作为组网，且每台机器已经配置好jdk13。</p>
<p>除了node1,每台配置几乎一样，此处仅对一台配置进行说明，此处为配置node1节点。</p>
</blockquote>
<ol>
<li>解压RepChain.tar.gz到第一台机器上台机器上。</li>
<li>修改node1节点内容，<code>conf/xxx.node1/system.conf</code>：
<ul>
<li>修改通信地址 <code>akka.remote.artery.canonical.hostname</code> 配置，此处需要配置其他节点可访问的域名或IP.</li>
<li>修改通信端口 <code>akka.remote.artery.canonical.port</code> 配置，此处需要配置对外开放的端口
<blockquote>
<p>如果网络为NAT环境，可参考<a href="https://repcas.gitee.io/repchain-doc/deploy/#_14" target="_blank" rel="noopener noreferrer">链接<ExternalLinkIcon/></a>进行配置</p>
</blockquote>
</li>
<li>修改种子节点配置 <code>akka.cluster.seed-nodes</code>
<blockquote>
<p>此处如果为node1，需要配置node1和node2的ip及端口。</p>
<p>此处如果为其他节点，可以只填写node1的ip及端口。</p>
</blockquote>
</li>
<li>修改HTTP端口 <code>system.api.http_service_port</code> 配置，此处默认为9081，用于sdk等服务访问的api端口，不冲突可以不用修改。</li>
<li>组网ID <code>system.chain_network_id</code>,默认为<code>identity-net</code>,如果不是，请修改为<code>identity-net</code>.</li>
<li>缓存持久化 <code>system.is_persistence_tx_to_db</code> 默认为0(关闭)，如果并发要求不高，建议打开，此配置极大的保证数据可靠性，但是会牺牲一些性能。
<blockquote>
<p>持久化打开后，可以进行不停止节点，组网迁移。需要注意，新节点启动前需要关闭旧节点。</p>
</blockquote>
</li>
<li>修改共识节点数量 <code>system.vote.vote_node_list</code>，默认5个节点，可以不用修改。</li>
</ul>
</li>
<li>修改管理服务，<code>conf/management/system.conf</code>
<ul>
<li>修改管理服务通信端口 <code>akka.remote.artery.canonical.port</code>，默认22520，端口如果不冲突可以不用修改。</li>
<li>修改管理服务HTTP端口 <code>system.api.http_service_port</code> ，默认为7081，端口不冲突可以不用修改。</li>
</ul>
</li>
<li>修改启动脚本<code>start01.sh</code>（主要修改java相关内容，其他节点需要修改相对应的启动脚本）。
<blockquote>
<p>此处节点1（node1）修改start01.sh并启动，其他节点X，修改脚本start0X.sh并启动。</p>
</blockquote>
</li>
<li>每个机器进行上述配置后启动。</li>
<li>浏览器输入<code>http://[任意已启动节点的通信地址]:[HTTP端口]</code>查看区块链状态。</li>
<li>停止脚本为<code>stop.sh</code>。</li>
</ol>
<h3 id="对外开放端口" tabindex="-1"><a class="header-anchor" href="#对外开放端口" aria-hidden="true">#</a> 对外开放端口</h3>
<ol>
<li>需要对外开放通信端口，配置文件中 <code>akka.remote.artery.canonical.port</code>。</li>
<li>需要开发HTTP端口，配置文件中 <code>system.api.http_service_port</code>。</li>
</ol>
<h3 id="持久化" tabindex="-1"><a class="header-anchor" href="#持久化" aria-hidden="true">#</a> 持久化</h3>
<blockquote>
<p>数据持久化位于RepChain根目录<code>repchaindata</code>文件夹下。
可以对此文件夹下数据进行备份，迁移等操作。</p>
</blockquote>
<h3 id="迁移或故障重新部署" tabindex="-1"><a class="header-anchor" href="#迁移或故障重新部署" aria-hidden="true">#</a> 迁移或故障重新部署</h3>
<blockquote>
<p>需要部署方式为多机多节点，如果打开持久化配置（system.is_persistence_tx_to_db：1），可进行热迁移。否则，需要将全部节点停掉，迁移后再启动。</p>
<p>注意，迁移时，打包出块的TPS会收到影响。</p>
</blockquote>
<ol>
<li>将任意节点文件夹打包。</li>
<li>按照上述多机多节点步骤进行修改配置并启动节点。</li>
<li>若为迁移操作，需要先将旧节点停止，再启动新的迁移后的节点。</li>
</ol>
<h3 id="详细部署文档" tabindex="-1"><a class="header-anchor" href="#详细部署文档" aria-hidden="true">#</a> 详细部署文档</h3>
<p>详细部署可参考<a href="https://repcas.gitee.io/repchain-doc/deploy/" target="_blank" rel="noopener noreferrer">部署文档<ExternalLinkIcon/></a></p>
<h2 id="二、开发环境运行" tabindex="-1"><a class="header-anchor" href="#二、开发环境运行" aria-hidden="true">#</a> 二、开发环境运行</h2>
<h3 id="参考阅读" tabindex="-1"><a class="header-anchor" href="#参考阅读" aria-hidden="true">#</a> 参考阅读</h3>
<ul>
<li><a href="https://akka.io/" target="_blank" rel="noopener noreferrer">akka<ExternalLinkIcon/></a> ——系统内部模块采用akka actor实现</li>
<li><a href="http://doc.akka.io/docs/akka/current/scala/remoting.html" target="_blank" rel="noopener noreferrer">akka remoting security<ExternalLinkIcon/></a> ——节点之间安全通信采用akka Remote支持的TLS</li>
<li><a href="http://doc.akka.io/docs/akka/current/scala/serialization.html" target="_blank" rel="noopener noreferrer">akka serialization<ExternalLinkIcon/></a>——节点之间消息交互采用protobuf序列化</li>
<li><a href="https://scalapb.github.io/" target="_blank" rel="noopener noreferrer">scalaPB<ExternalLinkIcon/></a>——从proto定义生成Scala类的工具</li>
<li><a href="https://github.com/dcodeIO/ProtoBuf.js/" target="_blank" rel="noopener noreferrer">protobufjs<ExternalLinkIcon/></a>——在web端根据proto定义，反序列化protobuf字节流</li>
<li><a href="https://github.com/swagger-api/swagger-scala-module" target="_blank" rel="noopener noreferrer">swagger-scala<ExternalLinkIcon/></a>——API支持Swagger UI</li>
<li><a href="https://github.com/json4s/json4s" target="_blank" rel="noopener noreferrer">json4s<ExternalLinkIcon/></a>——在API层提供输入对象的json反序列化，返回结果的json序列化</li>
<li><a href="https://github.com/d3/d3-3.x-api-reference/blob/master/Force-Layout.md" target="_blank" rel="noopener noreferrer">d3.js-force layout<ExternalLinkIcon/></a>——入／离网节点的自动布局</li>
<li><a href="https://github.com/dain/leveldb" target="_blank" rel="noopener noreferrer">leveldb for java<ExternalLinkIcon/></a>——存取Blocks、Transactions索引</li>
<li><a href="http://docs.oracle.com/javase/8/docs/technotes/guides/security/index.html" target="_blank" rel="noopener noreferrer">java security<ExternalLinkIcon/></a>——hash、签名、密钥对及证书管理均采用jdk内置方法</li>
</ul>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<ul>
<li>install <a href="https://www.azul.com/downloads/zulu-community/?&amp;architecture=x86-64-bit&amp;package=jdk" target="_blank" rel="noopener noreferrer">zuluJdk11+<ExternalLinkIcon/></a></li>
<li>install <a href="http://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">Python<ExternalLinkIcon/></a></li>
<li>install <a href="https://www.scala-lang.org/download/" target="_blank" rel="noopener noreferrer">Scala<ExternalLinkIcon/></a></li>
<li>install <a href="http://www.scala-sbt.org/release/docs/Setup.html" target="_blank" rel="noopener noreferrer">SBT<ExternalLinkIcon/></a></li>
<li>install <a href="https://www.jetbrains.com/idea/download/#section=windows" target="_blank" rel="noopener noreferrer">Idea IDE<ExternalLinkIcon/></a></li>
<li>install <a href="http://keystore-explorer.org/" target="_blank" rel="noopener noreferrer">keystore-explorer<ExternalLinkIcon/></a> ——用于生成密钥对的工具,非必须</li>
<li>install <a href="https://github.com/Enide/polyglot-maven-editors" target="_blank" rel="noopener noreferrer">protobuf editor<ExternalLinkIcon/></a>——编辑protobuf定义工具，非必须</li>
</ul>
<h3 id="分层架构" tabindex="-1"><a class="header-anchor" href="#分层架构" aria-hidden="true">#</a> 分层架构</h3>
<p><img src="/img/113645_f9476663_1598833.webp" alt="RepChain系统分层图"></p>
<ul>
<li>数据层：负责数据格式定义，数据结构采用Protocol Buffers定义文件，并以此为基础实现数据的交换、验证、存储、读取及检索</li>
<li>网络层：采用JDK内置的TLS实现，支持入网许可验证，在此基础上进行去中心化的gossip组网，网络传播支持P2P和Pub/Sub两种方式</li>
<li>共识层：完成区块的输入共识和输出共识。采用兼顾实时性和安全性的CFRD算法，既照顾到交易的实时性要求，又能在一定程度防止节点串通作弊；输入共识对入块的交易顺序达成一致，输出共识对交易顺序执行的结果达成一致</li>
<li>合约层：为合约执行提供上下文环境，支持合约的动态部署、运行时加载和编译执行</li>
<li>API层：提供外部接口，允许第三方应用以Restful的形式与系统交互，并允许开发者通过Swagger UI进行在线测试。API层提供交易签名提交、区块和交易检索等基本功能</li>
<li>监控层：在区块链网络中收集事件/日志,并将其以Protocol Buffers的格式推送至Web端,以H5图形技术进行实时状态的可视化展示和日志回放</li>
</ul>
<h3 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h3>
<ul>
<li><code> 下载项目到本地</code>
<ul>
<li>git clone https://gitee.com/BTAJL/repchain.git</li>
</ul>
</li>
<li><code>导入</code>
<ul>
<li>打开Idea IDE，File-&gt;New-&gt;Project or Project from VersionControl</li>
<li>使用Idea的sbt插件导入</li>
<li>使用sbt shell 进行compile</li>
</ul>
</li>
<li>右键单击 rep.app.Repchain.scala，Run 'RepChain'(单机组网4个节点)</li>
<li>运行配置VM参数 -Dlogback.configurationFile=conf/logback.xml (使logback配置生效)</li>
<li>查看实时图 http://localhost:8081/web/g1.html
<img src="/img/174424_b02748a4_1598833.webp" alt="实时状态图"></li>
<li>查看API  http://localhost:8081/swagger/index.html
<img src="/img/165836_553469bc_1598833.webp" alt="Swagger-UI" title="swagger-ui.png"></li>
</ul>
<h3 id="修改配置" tabindex="-1"><a class="header-anchor" href="#修改配置" aria-hidden="true">#</a> 修改配置</h3>
<ul>
<li>生成RepChain节点密钥对及信任证书列表（见<a href="https://gitee.com/BTAJL/repchain/attach_files/235993/download" target="_blank" rel="noopener noreferrer">《RepChain开发者指南》<ExternalLinkIcon/></a> 2.1.5）</li>
<li>制作创世区块（见<a href="https://gitee.com/BTAJL/repchain/attach_files/235993/download" target="_blank" rel="noopener noreferrer">《RepChain开发者指南》<ExternalLinkIcon/></a> 2.1.6）</li>
<li>调整系统配置参数（见<a href="https://gitee.com/BTAJL/repchain/attach_files/235993/download" target="_blank" rel="noopener noreferrer">《RepChain开发者指南》<ExternalLinkIcon/></a> 2.1.7）</li>
</ul>
<h3 id="打包" tabindex="-1"><a class="header-anchor" href="#打包" aria-hidden="true">#</a> 打包</h3>
<ul>
<li>assembly
<ul>
<li>打包成jar包，进行分布式部署</li>
</ul>
</li>
</ul>
<h2 id="示范应用" tabindex="-1"><a class="header-anchor" href="#示范应用" aria-hidden="true">#</a> 示范应用</h2>
<ul>
<li><a href="https://gitee.com/linkel/bar" target="_blank" rel="noopener noreferrer">BAR<ExternalLinkIcon/></a>(Base App of RepChain)：提供了通用的基础功能实现，区块链应用实施者既可以直接复用其提供的功能， 也可以在其源代码的基础上进行开发，快速开发自己的DAppp</li>
<li><a href="https://gitee.com/JayTsang/bar" target="_blank" rel="noopener noreferrer">SBR<ExternalLinkIcon/></a>(Storage Based on RepChain)：基于BAR开发的可举证云存储应用示例</li>
<li><a href="https://gitee.com/linkel/CRBBV1.0" target="_blank" rel="noopener noreferrer">CRBB<ExternalLinkIcon/></a>(Copyright Register Based on Blockchain)：基于RepChain的数字版权登记保护应用示例</li>
</ul>
<h2 id="repchain文档" tabindex="-1"><a class="header-anchor" href="#repchain文档" aria-hidden="true">#</a> RepChain文档</h2>
<p><a href="https://gitee.com/BTAJL/repchain/attach_files" target="_blank" rel="noopener noreferrer">RepChain文档<ExternalLinkIcon/></a>   <a href="https://iscas1-my.sharepoint.cn/:v:/g/personal/zhengls_iscas1_partner_onmschina_cn/EaghaEdYxndOm1f7H01RNVoBRqWm7v5kCFXUZ4QwVVP7Wg?e=fIa58e" target="_blank" rel="noopener noreferrer">单机多节点部署<ExternalLinkIcon/></a>   <a href="https://iscas1-my.sharepoint.cn/:v:/g/personal/zhengls_iscas1_partner_onmschina_cn/Ebk4-kDPg25KjE-9oSBKTuEBwD9pTJeQAgal_AYquLPHzg?e=D9tQNF" target="_blank" rel="noopener noreferrer">多机多节点部署<ExternalLinkIcon/></a></p>
</template>
