---
title: 指南
date: 2024-03-18 16:50:52
description: RepChain简单的使用指南
head:
  - - meta
    - name: keywords
      content: repchain,享链,指南,概要说明,使用说明,享链
---

## RepChain2.0免编译版本发布
- [RepChain免编译版本下载](https://github.com/RepChain-Group/repchain-package/releases) ——为方便用户使用，提供了免编译版本，此版本不需要编译即可直接运行

## 一、快速部署

### 配置环境

* 下载jdk13(推荐zulu版本)到需要部署的机器上。
* 下载RepChain2.0免编译版本到部署的机器上。

### 部署
   > 部署方式提供两种，单机多节点和多机多节点。
#### 方式一：单机多节点

1. 解压RepChain.tar.gz
2. 修改启动脚本`start.sh`（主要修改java相关内容）
3. 启动脚本`start.sh`
4. 浏览器输入`http://ip:9081`查看区块链状态
5. 停止脚本为`stop.sh`

#### 方式二：多机多节点：

> 此处假设有5个节点及5个机器作为组网，且每台机器已经配置好jdk13。
>
> 除了node1,每台配置几乎一样，此处仅对一台配置进行说明，此处为配置node1节点。

1. 解压RepChain.tar.gz到第一台机器上台机器上。
2. 修改node1节点内容，`conf/xxx.node1/system.conf`：
   * 修改通信地址 `akka.remote.artery.canonical.hostname` 配置，此处需要配置其他节点可访问的域名或IP.
   * 修改通信端口 `akka.remote.artery.canonical.port` 配置，此处需要配置对外开放的端口
     > 如果网络为NAT环境，可参考[链接](https://repcas.gitee.io/repchain-doc/deploy/#_14)进行配置
   * 修改种子节点配置 `akka.cluster.seed-nodes`
     > 此处如果为node1，需要配置node1和node2的ip及端口。
     >
     > 此处如果为其他节点，可以只填写node1的ip及端口。
   * 修改HTTP端口 `system.api.http_service_port` 配置，此处默认为9081，用于sdk等服务访问的api端口，不冲突可以不用修改。
   * 组网ID `system.chain_network_id`,默认为`identity-net`,如果不是，请修改为`identity-net`.
   * 缓存持久化 `system.is_persistence_tx_to_db` 默认为0(关闭)，如果并发要求不高，建议打开，此配置极大的保证数据可靠性，但是会牺牲一些性能。
     > 持久化打开后，可以进行不停止节点，组网迁移。需要注意，新节点启动前需要关闭旧节点。
   * 修改共识节点数量 `system.vote.vote_node_list`，默认5个节点，可以不用修改。
3. 修改管理服务，`conf/management/system.conf`
   * 修改管理服务通信端口 `akka.remote.artery.canonical.port`，默认22520，端口如果不冲突可以不用修改。
   * 修改管理服务HTTP端口 `system.api.http_service_port` ，默认为7081，端口不冲突可以不用修改。
4. 修改启动脚本`start01.sh`（主要修改java相关内容，其他节点需要修改相对应的启动脚本）。
    > 此处节点1（node1）修改start01.sh并启动，其他节点X，修改脚本start0X.sh并启动。
5. 每个机器进行上述配置后启动。
6. 浏览器输入`http://[任意已启动节点的通信地址]:[HTTP端口]`查看区块链状态。
7. 停止脚本为`stop.sh`。

### 对外开放端口

1. 需要对外开放通信端口，配置文件中 `akka.remote.artery.canonical.port`。
2. 需要开发HTTP端口，配置文件中 `system.api.http_service_port`。

### 持久化

> 数据持久化位于RepChain根目录`repchaindata`文件夹下。
> 可以对此文件夹下数据进行备份，迁移等操作。

### 迁移或故障重新部署

> 需要部署方式为多机多节点，如果打开持久化配置（system.is_persistence_tx_to_db：1），可进行热迁移。否则，需要将全部节点停掉，迁移后再启动。
>
> 注意，迁移时，打包出块的TPS会收到影响。

1. 将任意节点文件夹打包。
2. 按照上述多机多节点步骤进行修改配置并启动节点。
3. 若为迁移操作，需要先将旧节点停止，再启动新的迁移后的节点。

### 详细部署文档

详细部署可参考[部署文档](https://repcas.gitee.io/repchain-doc/deploy/)

## 二、开发环境运行

### 参考阅读
- [akka](https://akka.io/) ——系统内部模块采用akka actor实现
- [akka remoting security](http://doc.akka.io/docs/akka/current/scala/remoting.html) ——节点之间安全通信采用akka Remote支持的TLS
- [akka serialization](http://doc.akka.io/docs/akka/current/scala/serialization.html)——节点之间消息交互采用protobuf序列化
- [scalaPB](https://scalapb.github.io/)——从proto定义生成Scala类的工具
- [protobufjs](https://github.com/dcodeIO/ProtoBuf.js/)——在web端根据proto定义，反序列化protobuf字节流
- [swagger-scala](https://github.com/swagger-api/swagger-scala-module)——API支持Swagger UI
- [json4s](https://github.com/json4s/json4s)——在API层提供输入对象的json反序列化，返回结果的json序列化
- [d3.js-force layout](https://github.com/d3/d3-3.x-api-reference/blob/master/Force-Layout.md)——入／离网节点的自动布局
- [leveldb for java](https://github.com/dain/leveldb)——存取Blocks、Transactions索引
- [java security](http://docs.oracle.com/javase/8/docs/technotes/guides/security/index.html)——hash、签名、密钥对及证书管理均采用jdk内置方法

### 安装
- install [zuluJdk11+](https://www.azul.com/downloads/zulu-community/?&architecture=x86-64-bit&package=jdk)
- install [Python](http://www.python.org/downloads/)
- install [Scala](https://www.scala-lang.org/download/)
- install [SBT](http://www.scala-sbt.org/release/docs/Setup.html)
- install [Idea IDE](https://www.jetbrains.com/idea/download/#section=windows)
- install [keystore-explorer](http://keystore-explorer.org/) ——用于生成密钥对的工具,非必须
- install [protobuf editor](https://github.com/Enide/polyglot-maven-editors)——编辑protobuf定义工具，非必须

### 分层架构
![RepChain系统分层图](/img/113645_f9476663_1598833.webp)
- 数据层：负责数据格式定义，数据结构采用Protocol Buffers定义文件，并以此为基础实现数据的交换、验证、存储、读取及检索
- 网络层：采用JDK内置的TLS实现，支持入网许可验证，在此基础上进行去中心化的gossip组网，网络传播支持P2P和Pub/Sub两种方式
- 共识层：完成区块的输入共识和输出共识。采用兼顾实时性和安全性的CFRD算法，既照顾到交易的实时性要求，又能在一定程度防止节点串通作弊；输入共识对入块的交易顺序达成一致，输出共识对交易顺序执行的结果达成一致
- 合约层：为合约执行提供上下文环境，支持合约的动态部署、运行时加载和编译执行
- API层：提供外部接口，允许第三方应用以Restful的形式与系统交互，并允许开发者通过Swagger UI进行在线测试。API层提供交易签名提交、区块和交易检索等基本功能
- 监控层：在区块链网络中收集事件/日志,并将其以Protocol Buffers的格式推送至Web端,以H5图形技术进行实时状态的可视化展示和日志回放

### 运行
- ` 下载项目到本地`
  - git clone https://gitee.com/BTAJL/repchain.git
- `导入`
  - 打开Idea IDE，File->New->Project or Project from VersionControl
  - 使用Idea的sbt插件导入
  - 使用sbt shell 进行compile
- 右键单击 rep.app.Repchain.scala，Run 'RepChain'(单机组网4个节点)
- 运行配置VM参数 -Dlogback.configurationFile=conf/logback.xml (使logback配置生效)
- 查看实时图 http://localhost:8081/web/g1.html
  ![实时状态图](/img/174424_b02748a4_1598833.webp)
- 查看API  http://localhost:8081/swagger/index.html
  ![Swagger-UI](/img/165836_553469bc_1598833.webp "swagger-ui.png")

### 修改配置
- 生成RepChain节点密钥对及信任证书列表（见[《RepChain开发者指南》](https://gitee.com/BTAJL/repchain/attach_files/235993/download) 2.1.5）
- 制作创世区块（见[《RepChain开发者指南》](https://gitee.com/BTAJL/repchain/attach_files/235993/download) 2.1.6）
- 调整系统配置参数（见[《RepChain开发者指南》](https://gitee.com/BTAJL/repchain/attach_files/235993/download) 2.1.7）

### 打包
- assembly
  - 打包成jar包，进行分布式部署

## 示范应用
- [BAR](https://gitee.com/linkel/bar)(Base App of RepChain)：提供了通用的基础功能实现，区块链应用实施者既可以直接复用其提供的功能， 也可以在其源代码的基础上进行开发，快速开发自己的DAppp
- [SBR](https://gitee.com/JayTsang/bar)(Storage Based on RepChain)：基于BAR开发的可举证云存储应用示例
- [CRBB](https://gitee.com/linkel/CRBBV1.0)(Copyright Register Based on Blockchain)：基于RepChain的数字版权登记保护应用示例

## RepChain文档
[RepChain文档](https://gitee.com/BTAJL/repchain/attach_files)   [单机多节点部署](https://iscas1-my.sharepoint.cn/:v:/g/personal/zhengls_iscas1_partner_onmschina_cn/EaghaEdYxndOm1f7H01RNVoBRqWm7v5kCFXUZ4QwVVP7Wg?e=fIa58e)   [多机多节点部署](https://iscas1-my.sharepoint.cn/:v:/g/personal/zhengls_iscas1_partner_onmschina_cn/Ebk4-kDPg25KjE-9oSBKTuEBwD9pTJeQAgal_AYquLPHzg?e=D9tQNF)

