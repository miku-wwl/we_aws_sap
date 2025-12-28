# AWS SAP 真题收藏（306题）

### 单选题 1/306

一家公司希望将其网站迁移到 AWS。该网站使用在本地自管理的 Kubernetes 集群中部署的容器。网站的所有数据都存储在本地 PostgreSQL 数据库中。公司已决定将本地 Kubernetes 集群迁移到 Amazon Elastic Kubernetes Service (Amazon EKS) 集群。EKS 集群将使用具有静态节点数的 EKS 托管节点组。公司还将将本地数据库迁移到 Amazon RDS for PostgreSQL 数据库。解决方案架构师需要在迁移之前估算此工作负载的总拥有成本 (TCO)。哪种解决方案将提供所需的 TCO 信息？

- A. 请求访问迁移评估工具。运行迁移评估收集器并导入数据。配置一个场景。从迁移评估工具中导出快速洞察报告。
- B. 启动 AWS 数据库迁移服务 (AWS DMS) 用于本地数据库。生成评估报告。在 AWS 定价计算器中为 EKS 迁移成本创建估算。
- C. 初始化 AWS 应用迁移服务。将本地服务器添加为源服务器。启动一个测试实例。从应用迁移服务输出 TCO 报告。
- D. 访问 AWS 云经济学中心网页，评估 AWS 云价值框架。从云价值框架创建 AWS 成本和使用报告。

---

### 多选题 2/306

一家公司从大量 IoT 设备中收集数据。数据存储在 Amazon S3 数据湖中。数据科学家在 VPC 中的两个公共子网中运行的 Amazon EC2 实例上执行分析。数据科学家需要从 EC2 实例访问数据湖。EC2 实例已经有一个分配的角色，具有访问 Amazon S3 的权限。根据公司政策，只有授权的网络才被允许访问 IoT 数据。解决方案架构师应该采取哪两个步骤来满足这些要求？

- A. 在数据科学家的 VPC 中为 Amazon S3 创建一个网关 VPC 端点。
- B. 在数据科学家的 AWS 账户中为数据湖创建一个 S3 访问点。
- C. 更新 EC2 实例角色。添加一个策略，条件是允许 s3:GetObject 操作，当 s3:DataAccessPointArn 条件键的值为有效的访问点 ARN 时。
- D. 更新 VPC 路由表，将 S3 流量路由到 S3 访问点。
- E. 向 S3 存储桶策略添加一个条件，允许 s3:GetObject 操作，当 s3:DataAccessPointArn 条件键的值为有效的访问点 ARN 时。

---

### 单选题 3/306

Accompany 正在构建一个应用程序，用于收集和传输来自工厂的传感器数据。该应用程序将使用 AWS IoT Core 从数百个设备发送数据到 Amazon S3 数据湖。公司必须在将数据加载到 Amazon S3 之前丰富数据。应用程序每 5 秒传输一次传感器数据。新传感器数据必须在应用程序收集数据后不到 30 分钟内可用于 Amazon S3。没有其他应用程序处理来自 AWS IoT Core 的传感器数据。哪种解决方案将以最具成本效益的方式满足这些要求？

- A. 在 AWS IoT Core 中创建一个主题以接收传感器数据。创建一个 AWS Lambda 函数来丰富数据并将其写入 Amazon S3。配置一个 AWS IoT 规则操作来调用 Lambda 函数。
- B. 使用 AWS IoT Core Basic Ingest 来接收传感器数据。配置一个 AWS IoT 规则操作将数据写入 Amazon Kinesis Data Firehose。将 Kinesis Data Firehose 缓冲间隔设置为 900 秒。使用 Kinesis Data Firehose 调用一个 AWS Lambda 函数来丰富数据，配置 Kinesis Data Firehose 将数据传递到 Amazon S3。
- C. 在 AWS IoT Core 中创建一个主题以接收传感器数据。配置一个 AWS IoT 规则操作将数据发送到 Amazon Timestream 表。创建一个 AWS Lambda 函数来读取 Timestream 中的数据。配置 Lambda 函数来丰富数据并将其写入 Amazon S3。
- D. 使用 AWS IoT Core Basic Ingest 来接收传感器数据。配置一个 AWS IoT 规则操作将数据写入 Amazon Kinesis Data Streams。创建一个消费者 AWS Lambda 函数来处理来自 Kinesis Data Streams 的数据并丰富数据。从 Lambda 函数调用 S3 PutObject API 操作将数据写入 Amazon S3。

---

### 单选题 4/306

一家公司在 AWS 上托管了一个应用程序，该项目将运行接下来的 3 年。该应用程序由 20 个 Amazon EC2 按需实例组成，这些实例注册在网络负载均衡器 (NLB） 的目标组中。实例分布在两个可用区。该应用程序是无状态的，并且每天 24 小时，每周 7 天运行。公司收到用户报告，称他们从应用程序收到的响应速度慢。性能指标显示，在正常应用程序使用期间，实例的 CPU 利用率为 10%。然而，在高峰时段，CPU 利用率会增加到 100%，这些时段通常持续几个小时。公司需要一个新的架构来解决应用程序响应速度慢的问题。哪种解决方案将以最具成本效益的方式满足这些要求？

- A. 创建一个自动扩展组。将自动扩展组附加到 NLB 的目标组。将最小容量设置为 20，期望容量设置为 28。购买 20 个实例的预留实例。
- B. 创建一个 Spot Fleet，请求类型为 "request"。将 TotalTargetCapacity 参数设置为 20。将 DefaultTargetCapacityType 参数设置为 On-Demand。在创建 Spot Fleet 时指定 NLB。
- C. 创建一个 Spot Fleet，请求类型为 "maintain"。将 TotalTargetCapacity 参数设置为 20。将 DefaultTargetCapacityType 参数设置为 Spot。用应用程序负载均衡器替换 NLB。
- D. 创建一个自动扩展组。将自动扩展组附加到 NLB 的目标组。将最小容量设置为 4，最大容量设置为 28。购买四个实例的预留实例。

---

### 单选题 5/306

一家公司迁移到 AWS，并使用 AWS 商业支持。公司希望监控跨 AWS 账户的 Amazon EC2 实例的成本效益。EC2 实例有部门、业务单元和环境的标签。开发 EC2 实例成本高但利用率低。公司需要检测并停止任何利用率低的开发 EC2 实例。如果实例在过去 14 天中有至少 4 天的平均每日 CPU 利用率为 10% 或更低，且网络 I/O 为 5 MB 或更少，则认为实例的利用率低。哪种解决方案将以最小的运营开销满足这些要求？

- A. 配置 Amazon CloudWatch 仪表板以监控基于部门、业务单元和环境标签的 EC2 实例利用率。创建一个 Amazon EventBridge 规则，调用 AWS Lambda 函数以停止利用率低的开发 EC2 实例。
- B. 配置 AWS 系统管理器以跟踪 EC2 实例利用率，并将利用率低的实例报告给 Amazon CloudWatch。按部门、业务单位和环境标签过滤 CloudWatch 数据。创建一个 Amazon EventBridge 规则，调用 AWS Lambda 函数以停止利用率低的开发 EC2 实例。
- C. 创建一个 Amazon EventBridge 规则以检测由 AWS Trusted Advisor 报告的 EC2 实例的低利用率。配置规则以调用一个 AWS Lambda 函数，该函数按部门、业务单位和环境标签过滤数据，并停止利用率低的开发 EC2 实例。
- D. 创建一个 AWS Lambda 函数，每天运行以检索所有 EC2 实例的利用率数据。将数据保存到 Amazon DynamoDB 表中。创建一个使用 DynamoDB 表作为数据源的 Amazon QuickSight 仪表板，以识别并停止利用率低的开发 EC2 实例。

---

### 单选题 6/306

一家美国公司收购了一家欧洲公司。两家公司都使用 AWS Cloud。美国公司构建了一个新的具有微服务架构的应用程序。美国公司在 `us-east-2` 区域跨越五个 VPC 托管该应用程序。该应用程序必须能够访问 `eu-west-1` 区域中的一个 VPC 中的资源。然而，该应用程序不能访问任何其他 VPC。两个区域中的 VPC 没有重叠的 CIDR 范围。所有账户已经在 AWS Organizations 中统一。哪种解决方案将以最具成本效益的方式满足这些要求？

- A. 在 `eu-west-1` 创建一个传输网关。将 `us-east-2` 中的 VPC 和 `eu-west-1` 中的 VPC 附加到传输网关。在每个 VPC 中创建必要的路由条目，以便流量通过传输网关路由。
- B. 在每个区域创建一个传输网关。将涉及的子网附加到区域传输网关。在每个子网的关联路由表中创建必要的路由条目，以便流量通过区域传输网关路由。对两个传输网关进行对等。
- C. 配置所有 VPC 之间的完全网状 VPC 对等连接配置。在每个 VPC 中创建必要的路由条目，以便流量通过 VPC 对等连接路由。
- D. 为 `us-east-2` 中的每个 VPC 到 `eu-west-1` 中的 VPC 创建一个 VPC 对等连接。在每个 VPC 中创建必要的路由条目，以便流量通过 VPC 对等连接路由。

---

### 单选题 7/306

一家公司正在改变其在应用程序账户中处理 Amazon EC2 实例补丁的方式。公司目前通过使用应用程序账户中的 NAT 网关，在互联网上对实例进行补丁。公司在核心账户中的专用私有 VPC 设置了 EC2 实例作为补丁源存储库。公司希望使用 AWS 系统管理器补丁管理器和核心账户中的补丁源存储库来补丁应用程序账户中的 EC2 实例。公司必须防止应用程序账户中的所有 EC2 实例访问互联网。应用程序账户中的 EC2 实例需要访问 Amazon S3，其中存储了应用程序数据。这些 EC2 实例需要连接到系统管理器和核心账户中私有 VPC 中的补丁源存储库。哪种解决方案将满足这些要求？

- A. 创建一个阻止出站流量端口 80 的网络 ACL。将网络 ACL 与应用程序账户中的所有子网关联。在应用程序账户和核心账户中部署一个运行自定义 VPN 服务器的 EC2 实例。创建一个 VPN 隧道以访问私有 VPC。更新应用程序账户中的路由表。
- B. 为系统管理器和 Amazon S3 创建私有 VPC 端点。删除应用程序账户 VPC 中的 NAT 网关。创建一个传输网关以访问核心账户中的补丁源存储库 EC2 实例。更新核心账户中的路由表。
- C. 为系统管理器和 Amazon S3 创建 VPC 端点。删除应用程序账户 VPC 中的 NAT 网关。创建一个 VPC 对等连接以访问核心账户中的补丁源存储库 EC2 实例。更新两个账户中的路由表。
- D. 创建一个阻止入站流量端口 80 的网络 ACL。将网络 ACL 与应用程序账户中的所有子网关联。创建一个传输网关以访问核心账户中的补丁源存储库 EC2 实例。更新两个账户中的路由表。

---

### 单选题 8/306

一家公司计划将几个应用程序迁移到AWS。公司对其整个应用程序资产没有很好的了解。这些资产包括物理机器和虚拟机的混合。其中一个公司将要迁移的应用程序有许多依赖项，这些依赖项对延迟非常敏感。公司不确定所有依赖项是什么。然而，公司知道低延迟通信使用一个自定义的基于IP的协议，运行在端口1000上。公司希望同时迁移应用程序和这些依赖项，将所有低延迟接口一起移动到AWS。公司已经安装了AWS应用程序发现代理，并且已经收集了几个月的数据。为了识别需要与应用程序在同一阶段迁移的依赖项，公司应该怎么办？

- A. 使用AWS迁移中心，并选择托管应用程序的服务器。可视化网络图，以找到与应用程序交互的服务器。在Amazon Athena上打开数据探索。查询服务器之间传输的数据，以识别在端口1000上通信的服务器。返回到迁移中心。根据Athena查询的结果创建一个移动组。
- B. 使用AWS应用程序迁移服务，并选择托管应用程序的服务器。可视化网络图，以找到与应用程序交互的服务器。配置应用程序迁移服务为所有与应用程序交互的服务器启动测试实例。对测试实例执行验收测试。如果没有发现问题，根据测试过的服务器创建一个移动组。
- C. 使用AWS迁移中心，并选择托管应用程序的服务器。在网络访问分析器中打开数据探索。使用网络访问分析器控制台选择托管应用程序的服务器。选择端口1000的网络访问范围，并记录匹配的服务器。返回到迁移中心。根据网络访问分析器的发现创建一个移动组。
- D. 使用AWS迁移中心，并选择托管应用程序的服务器。通过使用AWS应用程序发现代理，将Amazon CloudWatch代理推送到已识别的服务器。将代理收集的CloudWatch日志导出到Amazon S3。使用Amazon Athena查询日志，以找到在端口1000上通信的服务器。返回到迁移中心。根据Athena查询的结果创建一个移动组。

---

### 单选题 9/306

一家公司的解决方案架构师正在评估几年前部署的AWS工作负载。应用程序层是无状态的，运行在一个大型Amazon EC2实例上，该实例是从AMI启动的。应用程序将数据存储在运行在单个EC2实例上的MySQL数据库中。应用程序服务器EC2实例的CPU利用率经常达到100%，导致应用程序停止响应。公司手动在实例上安装补丁。补丁过去曾导致停机。公司需要使应用程序高度可用。哪种解决方案以最少的开发工作量满足这些要求？

- A. 将应用程序层移动到AWS Lambda函数中，位于现有的VPC。创建一个应用程序负载均衡器来分散Lambda函数的流量。使用Amazon GuardDuty扫描Lambda函数。将数据库迁移到Amazon DocumentDB（与MongoDB兼容）。
- B. 将EC2实例类型更改为较小的基于Graviton的实例类型。使用现有的AMI创建一个启动模板，用于自动扩展组。创建一个应用程序负载均衡器来分散自动扩展组中的实例流量。设置自动扩展组根据CPU利用率进行扩展。将数据库迁移到Amazon DynamoDB。
- C. 将应用程序层移动到使用Docker的容器中。在Amazon Elastic Container Service（Amazon ECS）上使用EC2实例运行容器。创建一个应用程序负载均衡器来分散ECS集群的流量。配置ECS集群根据CPU利用率进行扩展。将数据库迁移到Amazon Neptune。
- D. 创建一个新的配置有AWS Systems Manager Agent（SSM Agent）的AMI。使用新AMI创建一个启动模板，用于自动扩展组。在自动扩展组中使用较小的实例。创建一个应用程序负载均衡器来分散自动扩展组中的实例流量。设置自动扩展组根据CPU利用率进行扩展。将数据库迁移到Amazon Aurora MySQL。

---

### 单选题 10/306

一家公司在单一AWS区域运行一个电子商务应用程序。该应用程序使用一个五节点的Amazon Aurora MySQL数据库集群来存储有关客户及其最近订单的信息。数据库集群全天经历大量的写事务。公司需要将Aurora数据库中的数据复制到另一个区域，以满足灾难恢复要求。公司有一个1小时的RPO。哪种解决方案以最低成本满足这些要求？

- A. 修改Aurora数据库为Aurora全局数据库。在另一个区域创建第二个Aurora数据库。
- B. 为Aurora数据库启用Backtrack功能。创建一个AWS Lambda函数，每天运行一次，将数据库的快照复制到备份区域。
- C. 使用AWS数据库迁移服务（AWS DMS）。创建一个DMS变更数据捕获（CDC）任务，将Aurora数据库中的持续变化复制到另一个区域的Amazon S3存储桶中。
- D. 关闭Aurora的自动备份。将Aurora备份配置为每小时备份一次。指定另一个区域作为目标区域。选择Aurora数据库作为资源分配。

---

### 单选题 11/306

一个应用程序部署在运行在自动扩展组中的Amazon EC2实例上。自动扩展组配置只使用一种类型的实例。CPU和内存利用率指标显示实例使用不足。解决方案架构师需要实施一个解决方案，以永久降低EC2成本并提高利用率。哪种解决方案以最少的配置更改满足这些要求？

- A. 列出与当前实例具有相似属性的实例类型。修改自动扩展组的启动模板配置，以使用列表中的多个实例类型。
- B. 使用有关应用程序的CPU和内存利用率的信息，选择一个符合要求的实例类型。通过添加新实例类型来修改自动扩展组的配置。从配置中删除当前实例类型。
- C. 使用有关应用程序的CPU和内存利用率的信息，指定CPU和内存要求，在自动扩展组的启动模板中创建一个新修订版。从配置中删除当前实例类型。
- D. 创建一个脚本，从AWS价格列表批量API中选择适当的实例类型。使用选定的实例类型创建自动扩展组的启动模板的新修订版。

---

### 单选题 12/306

一家公司使用AWS组织来管理公司的AWS账户。公司使用AWS CloudFormation部署所有基础设施。财务团队想要构建一个收费模型。财务团队要求每个业务单元使用预定义的项目值列表来标记资源。当财务团队使用AWS成本和使用报告在AWS成本探索器中进行过滤时，团队注意到项目值不符合规定。公司希望强制使用项目标签以创建新资源。哪种解决方案以最少的努力满足这些要求？

- A. 在组织的管理账户中创建一个包含允许的项目标签值的标签策略。创建一个SCP，除非添加了项目标签，否则拒绝cloudformation:CreateStack API操作。将SCP附加到每个OU。
- B. 在每个OU中创建一个包含允许的项目标签值的标签策略。创建一个SCP，除非添加了项目标签，否则拒绝cloudformation:CreateStack API操作。将SCP附加到每个OU。
- C. 在AWS管理账户中创建一个包含允许的项目标签值的标签策略。创建一个IAM策略，除非添加了项目标签，否则拒绝cloudformation:CreateStack API操作。将策略分配给每个用户。
- D. 使用AWS服务目录管理CloudFormation堆栈作为产品。使用TagOptions库控制项目标签值。与组织中的所有OU共享产品组合。

---

### 单选题 13/306

解决方案架构师在Amazon EC2实例上部署了一个操作工作负载，这些实例运行在一个自动扩展组中。VPC架构跨越两个可用区（AZ），每个AZ中都有一个子网，自动扩展组针对这些子网。VPC连接到本地环境，连接不能中断。自动扩展组的最大实例数为20个。VPC的IPv4地址如下：VPC CIDR：10.0.0.0/23AZ1子网CIDR：10.0.0.0/24AZ2子网CIDR：10.0.1.0/24自部署以来，该区域已新增第三个AZ。解决方案架构师希望采用新的AZ，而不添加额外的IPv4地址空间，也不造成服务中断。哪种解决方案将满足这些要求？

- A. 更新自动扩展组以仅使用AZ2子网。删除并重新创建AZ1子网，使用前一个地址空间的一半。调整自动扩展组以再次使用新的AZ1子网。当实例健康时，调整自动扩展组以仅使用AZ1子网。删除当前的AZ2子网。使用原始AZ1子网地址空间的另一半创建一个新的AZ2子网。使用原始AZ2子网地址空间的一半创建一个新的AZ3子网，然后更新自动扩展组以针对所有三个新子网。
- B. 在AZ1子网中终止EC2实例。删除并重新创建AZ1子网，使用一半的地址空间。更新自动扩展组以使用这个新子网。对第二个AZ重复此操作。在AZ3中定义一个新的子网，然后更新自动扩展组以针对所有三个新子网。
- C. 使用相同的IPv4地址空间创建一个新的VPC，并定义三个子网，每个AZ一个。更新现有的自动扩展组以针对新VPC中的新子网。
- D. 更新自动扩展组以仅使用AZ2子网。更新AZ1子网，使其拥有前一个地址空间的一半。再次调整自动扩展组以使用AZ1子网。当实例健康时，调整自动扩展组以仅使用AZ1子网。更新当前的AZ2子网，并分配原始AZ1子网地址空间的另一半。使用原始AZ2子网地址空间的一半创建一个新的AZ3子网，然后更新自动扩展组以针对所有三个新子网。

---

### 单选题 14/306

一家公司需要将本地SFTP站点迁移到AWS。SFTP站点目前在Linux虚拟机上运行。上传的文件通过NFS共享对下游应用程序可用。作为迁移到AWS的一部分，解决方案架构师必须实现高可用性。该解决方案必须为外部供应商提供一组静态公共IP地址，供供应商允许。公司已经在其本地数据中心和VPC之间设置了AWS Direct Connect连接。哪种解决方案以最小的运营开销满足这些要求？

- A. 创建AWS Transfer Family服务器。为Transfer Family服务器配置面向互联网的VPC端点。为每个子网指定一个弹性IP地址。将Transfer Family服务器配置为将文件放入跨多个可用区部署的Amazon Elastic File System（Amazon EFS）文件系统中。修改下游应用程序的配置，使它们挂载EFS端点，而不是访问现有的NFS共享。
- B. 创建AWS Transfer Family服务器。为Transfer Family服务器配置公开可访问的端点。将Transfer Family服务器配置为将文件放入跨多个可用区部署的Amazon Elastic File System（Amazon EFS）文件系统中。修改下游应用程序的配置，使它们挂载EFS端点，而不是访问现有的NFS共享。
- C. 使用AWS Application Migration Service将现有Linux虚拟机迁移到Amazon EC2实例。将弹性IP地址分配给EC2实例。将Amazon Elastic File System（Amazon EFS）文件系统挂载到EC2实例。将SFTP服务器配置为将文件放入EFS文件系统中。修改下游应用程序的配置，使它们挂载EFS端点，而不是访问现有的NFS共享。
- D. 使用AWS Application Migration Service将现有Linux虚拟机迁移到AWS Transfer Family服务器。为Transfer Family服务器配置公开可访问的端点。将Transfer Family服务器配置为将文件放入跨多个可用区部署的Amazon FSx for Lustre文件系统中。修改下游应用程序的配置，使它们挂载FSx for Lustre端点，而不是访问现有的NFS共享。

---

### 单选题 15/306

一家公司摄取并处理流市场数据。数据速率是恒定的。一个夜间处理过程计算聚合统计数据，需要4小时才能完成。统计分析对业务并不关键，如果特定运行失败，数据点可以在下一次迭代中处理。当前架构使用一组带有1年预留的Amazon EC2预留实例。这些EC2实例全天候运行，以摄取并存储流数据到附加的Amazon Elastic Block Store（Amazon EBS）卷中。一个定时脚本每晚启动EC2按需实例来执行夜间处理。实例从摄取服务器上的NFS共享访问存储的数据。脚本在处理完成后终止实例。预留实例的预留即将到期。公司需要决定是购买新的预留还是实施新的设计。哪种解决方案最具成本效益？

- A. 更新摄取过程，使用Amazon Kinesis Data Firehose将数据保存到Amazon S3。使用定时脚本每晚启动一组EC2按需实例来执行S3数据的批量处理。配置脚本在处理完成后终止实例。
- B. 更新摄取过程，使用Amazon Kinesis Data Firehose将数据保存到Amazon S3。使用AWS Batch和Spot实例进行夜间处理，设置最大Spot价格为按需价格的50%。
- C. 更新摄取过程，使用一组带有3年预留的EC2预留实例，位于网络负载均衡器后面。使用AWS Batch和Spot实例进行夜间处理，设置最大Spot价格为按需价格的50%。
- D. 更新摄取过程，使用Amazon Kinesis Data Firehose将数据保存到Amazon Redshift。使用Amazon EventBridge安排一个AWS Lambda函数每晚运行，查询Amazon Redshift生成日常统计数据。

---

### 单选题 16/306

一家公司通过一个可通过互联网访问的SFTP服务器向其客户提供文件服务。SFTP服务器运行在一台带有附加弹性IP地址的单个Amazon EC2实例上。客户通过其弹性IP地址连接到SFTP服务器，并使用SSH进行身份验证。EC2实例还有一个附加的安全组，允许所有客户IP地址的访问。解决方案架构师必须实施一个解决方案，以提高可用性，最小化基础设施管理的复杂性，并最小化对访问文件的客户的干扰。该解决方案不得改变客户的连接方式。哪种解决方案将满足这些要求？

- A. 从EC2实例中解关联弹性IP地址。创建一个用于SFTP文件托管的Amazon S3存储桶。创建一个AWS Transfer Family服务器。将Transfer Family服务器配置为具有公共可访问端点。将SFTP弹性IP地址与新端点关联。将Transfer Family服务器指向S3存储桶。将所有文件从SFTP服务器同步到S3存储桶。
- B. 从EC2实例中解关联弹性IP地址。创建一个用于SFTP文件托管的Amazon S3存储桶。创建一个AWS Transfer Family服务器。将Transfer Family服务器配置为具有VPC托管的互联网面向端点。将SFTP弹性IP地址与新端点关联。将带有客户IP地址的安全组附加到新端点。将Transfer Family服务器指向S3存储桶。将所有文件从SFTP服务器同步到S3存储桶。
- C. 从EC2实例中解关联弹性IP地址。创建一个新的Amazon Elastic File System（Amazon EFS）文件系统，用于SFTP文件托管。创建一个AWS Fargate任务定义，运行SFTP服务器。在任务定义中指定EFS文件系统作为挂载点。使用任务定义创建Fargate服务，并在服务前面放置一个网络负载均衡器（NLB）。在配置服务时，将带有客户IP地址的安全组附加到运行SFTP服务器的任务。将弹性IP地址与NLB关联。将所有文件从SFTP服务器同步到S3存储桶。
- D. 从EC2实例中解关联弹性IP地址。创建一个用于SFTP文件托管的多附加Amazon Elastic Block Store（Amazon EBS）卷。创建一个带有附加弹性IP地址的网络负载均衡器（NLB）。创建一个运行SFTP服务器的EC2实例的Auto Scaling组。在Auto Scaling组中定义，启动的实例应该附加新的多附加EBS卷。配置Auto Scaling组自动在NLB后面添加实例。配置Auto Scaling组使用允许客户IP地址的安全组，用于Auto Scaling组启动的EC2实例。将所有文件从SFTP服务器同步到新的多附加EBS卷。

---

### 单选题 17/306

一家公司在us-east-1区域的Amazon RDS for MySQL DB实例上部署了其数据库。公司需要使其数据对欧洲客户可用。欧洲客户必须能够访问与美国客户相同的数据，并且不会容忍高应用程序延迟或数据过时。欧洲和美国的客户都需要写入数据库。两组客户都需要实时看到另一组客户的更新。哪种解决方案将满足这些要求？

- A. 创建RDS for MySQL DB实例的Amazon Aurora MySQL副本。暂停对RDS DB实例的应用程序写入。提升Aurora副本为独立的DB集群。重新配置应用程序以使用Aurora数据库并恢复写入。将eu-west-1添加为DB集群的次要区域。在DB集群上启用写入转发。在eu-west-1部署应用程序。配置应用程序以使用eu-west-1中的Aurora MySQL端点。
- B. 为RDS for MySQL DB实例添加eu-west-1的跨区域副本。配置副本将写查询复制回主DB实例。在eu-west-1部署应用程序。配置应用程序以使用eu-west-1中的RDS for MySQL端点。
- C. 从RDS for MySQL DB实例复制最近的快照到eu-west-1。在eu-west-1中从快照创建一个新的RDS for MySQL DB实例。从us-east-1配置到eu-west-1的MySQL逻辑复制。在DB集群上启用写入转发。在eu-west-1部署应用程序。配置应用程序以使用eu-west-1中的RDS for MySQL端点。
- D. 将RDS for MySQL DB实例转换为Amazon Aurora MySQL DB集群。将eu-west-1作为次要区域添加到DB集群。在DB集群上启用写入转发。在eu-west-1部署应用程序。配置应用程序以使用eu-west-1中的Aurora MySQL端点。

---

### 单选题 18/306

一家公司正在构建一个网络图像服务，允许用户上传和搜索随机照片。在高峰使用期间，全球多达10,000名用户将上传他们的图像。然后，他们将在上传的图像上叠加文本，这些图像随后将发布在公司网站上。解决方案架构师应该实施哪种设计？

- A. 将上传的图像存储在Amazon Elastic File System（Amazon EFS）中。将有关每个图像的应用程序日志信息发送到Amazon CloudWatch Logs。创建一个使用CloudWatch Logs来确定哪些图像需要处理的Amazon EC2实例队列。将处理后的图像放置在Amazon EFS中的另一个目录中。启用Amazon CloudFront，并配置原始源为EC2实例队列中的一个。
- B. 将上传的图像存储在一个Amazon S3存储桶中，并配置S3存储桶事件通知，向Amazon Simple Notification Service（Amazon SNS）发送消息。创建一个Amazon EC2实例队列，位于应用程序负载均衡器（ALB）后面，以从Amazon SNS拉取消息来处理图像，并将它们放置在Amazon Elastic File System（Amazon EFS）中。使用Amazon CloudWatch指标监控SNS消息量，以扩展EC2实例。启用Amazon CloudFront，并配置原始源为EC2实例前面的ALB。
- C. 将上传的图像存储在一个Amazon S3存储桶中，并配置S3存储桶事件通知，向Amazon Simple Queue Service（Amazon SQS）队列发送消息。创建一个Amazon EC2实例队列，以从SQS队列中拉取消息来处理图像，并将它们放置在另一个S3存储桶中。使用Amazon CloudWatch指标监控队列深度，以扩展EC2实例。启用Amazon CloudFront，并配置原始源为包含处理后图像的S3存储桶。
- D. 将上传的图像存储在一个共享的Amazon Elastic Block Store（Amazon EBS）卷上，该卷挂载到一个Amazon EC2 Spot实例队列上。创建一个包含有关每个上传图像及其是否已处理的信息的Amazon DynamoDB表。使用Amazon EventBridge规则来扩展EC2实例。启用Amazon CloudFront，并配置原始源引用前面EC2实例队列的弹性负载均衡器。

---

### 单选题 19/306

一家公司在AWS组织中集中管理着数百个AWS账户。公司最近开始允许产品团队在他们的账户中创建和管理自己的S3访问点。S3访问点只能在VPC内部访问，而不能在互联网上访问。最具操作效率的方式来强制执行这一要求是什么？

- A. 将S3访问点资源策略设置为除非s3:AccessPointNetworkOrigin条件键评估为VPC，否则拒绝s3:CreateAccessPoint操作。
- B. 在组织根级别创建一个SCP，除非s3:AccessPointNetworkOrigin条件键评估为VPC，否则拒绝s3:CreateAccessPoint操作。
- C. 使用AWS CloudFormation StackSets在每个AWS账户中创建一个新的IAM策略，该策略仅当s3:AccessPointNetworkOrigin条件键评估为VPC时，才允许s3:CreateAccessPoint操作。
- D. 将S3存储桶策略设置为除非s3:AccessPointNetworkOrigin条件键评估为VPC，否则拒绝s3:CreateAccessPoint操作。

---

### 多选题 20/306

一家公司希望将其本地系统的数据显示在Amazon S3存储桶中。公司在三个不同的账户中创建了S3存储桶。公司必须私下发送数据，而不是通过互联网传输数据。公司没有现有的专用连接到AWS。解决方案架构师应该采取哪两个步骤来满足这些要求？

- A. 在AWS云中建立一个网络账户。在网络账户中创建一个私有VPC。在本地环境和私有VPC之间设置AWS Direct Connect连接，使用私有VIF。
- B. 在AWS云中建立一个网络账户。在网络账户中创建一个私有VPC。在本地环境和私有VPC之间设置AWS Direct Connect连接，使用公共VIF。
- C. 在网络账户中创建一个Amazon S3接口端点。
- D. 在网络账户中创建一个Amazon S3网关端点。
- E. 在AWS云中创建一个网络账户，在该账户中创建一个私有VPC。将托管S3存储桶的账户中的VPC与网络账户中的VPC建立对等连接。

---

### 单选题 21/306

一家大公司最近经历了Amazon RDS和Amazon DynamoDB成本的意外增加。公司需要提高对AWS计费和成本管理细节的可见性。组织中包括多个与AWS相关的账户，包括许多开发和生产账户。整个组织没有一致的标记策略，但有指导方针要求所有基础设施都必须使用一致的标记部署AWS CloudFormation。管理层要求所有现有和未来的DynamoDB表和RDS实例都必须有成本中心号码和项目ID号码。解决方案架构师应该提供哪种策略来满足这些要求？

- A. 使用标签编辑器对现有资源进行标记。创建成本分配标签以定义成本中心和项目ID，并允许24小时标签传播到现有资源。
- B. 使用AWS Config规则来提醒财务团队未标记的资源。创建一个集中的基于AWS Lambda的解决方案，使用跨账户角色每小时标记未标记的RDS数据库和DynamoDB资源。
- C. 使用标签编辑器对现有资源进行标记。创建成本分配标签以定义成本中心和项目ID。使用SCP限制资源创建，如果资源没有成本中心和项目ID标签。
- D. 创建成本分配标签以定义成本中心和项目ID，并允许24小时标签传播到现有资源。更新现有的联合角色，以限制不包含资源的成本中心和项目ID的资源供应特权。

---

### 单选题 22/306

一家公司从一群物联网设备收集大量数据。数据以优化行列存储（ORC）文件的形式存储在Hadoop分布式文件系统（HDFS）上，这些系统位于持久的Amazon EMR集群上。公司的数据分析团队使用Apache Presto中的SQL查询数据，该集群也部署在同一EMR集群上。查询扫描大量数据，运行时间总是少于15分钟，并且只在下午5点到晚上10点之间运行。公司对当前解决方案的高成本感到担忧。解决方案架构师必须提出最具成本效益的解决方案，以允许SQL数据查询。哪种解决方案将满足这些要求？

- A. 将数据存储在Amazon S3中。使用Amazon Redshift Spectrum查询数据。
- B. 将数据存储在Amazon S3中。使用AWS Glue数据目录和Amazon Athena查询数据。
- C. 将数据存储在EMR文件系统（EMRFS）中。使用Amazon EMR中的Presto查询数据。
- D. 将数据存储在Amazon Redshift中。使用Amazon Redshift查询数据。

---

### 单选题 23/306

一家公司拥有一个基于Windows的桌面应用程序，该程序被打包并部署到用户的Windows机器上。该公司最近收购了另一家公司，该公司的员工主要使用Linux操作系统的机器。收购公司决定将基于Windows的桌面应用程序迁移并重新托管到AWS上。所有员工在使用应用程序之前都必须经过身份验证。收购公司在本地使用Active Directory，但希望简化管理所有员工在AWS上对应用程序的访问。哪种解决方案将以最少的开发工作量重新托管应用程序到AWS？

- A. 为每个员工设置和配置Amazon Workspaces虚拟桌面。使用Amazon Cognito身份池进行身份验证。指示员工从他们配置的Workspaces虚拟桌面运行应用程序。
- B. 创建一个基于Windows的Amazon EC2实例的Auto Scaling组。将每个EC2实例加入到公司的Active Directory域。使用在本地运行的Active Directory进行身份验证。指示员工使用Windows远程桌面运行应用程序。
- C. 使用Amazon AppStream 2.0图像构建器创建一个包含应用程序和所需配置的图像。为运行图像配置一个AppStream 2.0按需车队，并使用动态车队自动缩放策略。使用AppStream 2.0用户池进行身份验证。指示员工通过启动基于浏览器的AppStream 2.0流会话来访问应用程序。
- D. 重构和容器化应用程序，使其作为基于Web的应用程序运行。在AWS Fargate上的Amazon Elastic Container Service（Amazon ECS）中运行应用程序，并使用步骤缩放策略。使用Amazon Cognito用户池进行身份验证。指示员工从他们的浏览器运行应用程序。

---

### 单选题 24/306

一家公司使用AWS CloudFormation在连接到传输网关的多个VPC中部署应用程序。每个发送流量到公共互联网的VPC都必须通过共享服务VPC发送流量。每个VPC中的子网都使用默认的VPC路由表，流量被路由到传输网关。传输网关对其任何VPC连接使用其默认路由表。安全审计显示，部署在VPC中的Amazon EC2实例可以与部署在公司其他VPC中的EC2实例通信。解决方案架构师需要限制VPC之间的流量。每个VPC只能与预先定义的、有限的一组授权VPC通信。解决方案架构师应该采取哪些措施来满足这些要求？

- A. 更新每个VPC中每个子网的网络ACL，以仅允许出站流量到授权的VPC。除了默认的拒绝规则外，删除所有拒绝规则。
- B. 更新VPC中使用的所有安全组，以拒绝出站流量到未授权VPC中使用的安全组。
- C. 为每个VPC连接创建一个专用的传输网关路由表。仅将流量路由到授权的VPC。
- D. 更新每个VPC的主路由表，以仅通过传输网关将流量路由到授权的VPC。

---

### 单选题 25/306

一家公司计划在Amazon EC2实例上部署一个新的私有内部服务，该服务位于VPC内。AWS站点到站点VPN连接VPC到公司的本地网络。新服务必须能够与现有的本地服务通信。本地服务可以通过使用公司.example DNS区域中的主机名访问。此DNS区域完全托管在本地，并且仅在公司的私有网络上可用。解决方案架构师必须确保新服务能够解析company.example域上的主机名，以与现有服务集成。哪种解决方案满足这些要求？

- A. 在Amazon Route 53中为company.example创建一个空的私有区域。向公司本地company.example区域添加一个额外的NS记录，指向Route 53中新私有区域的权威名称服务器。
- B. 打开VPC的DNS主机名。使用Amazon Route 53 Resolver配置一个新的出站端点。创建一个Resolver规则，将company.example的请求转发到本地名称服务器。
- C. 打开VPC的DNS主机名。使用Amazon Route 53 Resolver配置一个新的入站解析器端点。配置本地DNS服务器，将company.example的请求转发到新的解析器。
- D. 使用AWS系统管理器配置一个运行文档，该文档将安装一个包含任何所需主机名的hosts文件。使用Amazon EventBridge规则在实例进入运行状态时运行该文档。

---

### 多选题 26/306

一家公司使用AWS Step Functions自动化其机器学习模型的夜间重新训练。工作流程由多个使用AWS Lambda的步骤组成。每个步骤都可能因各种原因失败，任何失败都会导致整个工作流程失败。审查发现，重新训练已经连续多个晚上失败，而公司没有注意到失败。解决方案架构师需要改进工作流程，以便在重新训练过程中发送所有类型故障的通知。解决方案架构师应采取哪三个步骤来满足这些要求？

- A. 创建一个Amazon Simple Notification Service（Amazon SNS）主题，订阅类型为“Email”，目标是团队的邮件列表。
- B. 创建一个名为“Email”的任务，将输入参数转发到SNS主题。
- C. 向所有具有“ErrorEquals”：[“States.ALL”]和“Next”：“Email”的Task、Map和Parallel状态添加Catch字段。
- D. 向Amazon Simple Email Service（Amazon SES）添加一个新的电子邮件地址。验证电子邮件地址。
- E. 创建一个名为“Email”的任务，将输入参数转发到SES电子邮件地址。
- F. 向所有具有“ErrorEquals”：[“States.Runtime”]和“Next”：“Email”的Task、Map和Parallel状态添加Catch字段。

---

### 多选题 27/306

一家公司计划将Amazon RDS for Oracle数据库迁移到另一个AWS账户中的RDS for PostgreSQL DB实例。解决方案架构师需要设计一个迁移策略，该策略将不需要停机时间，并且最小化完成迁移所需的时间。迁移策略必须复制所有现有数据以及在迁移期间创建的任何新数据。目标数据库在迁移过程完成时必须与源数据库完全相同。所有应用程序当前使用Amazon Route 53 CNAME记录作为它们与RDS for Oracle DB实例通信的端点。RDS for Oracle DB实例位于私有子网中。解决方案架构师应采取哪三个步骤来满足这些要求？

- A. 在目标账户中创建一个新的RDS for PostgreSQL DB实例。使用AWS Schema Conversion Tool（AWS SCT）将数据库架构从源数据库迁移到目标数据库。
- B. 使用AWS Schema Conversion Tool（AWS SCT）在目标账户中创建一个新的RDS for PostgreSQL DB实例，并使用源数据库的架构和初始数据。
- C. 在两个AWS账户的VPC之间配置VPC对等连接，以提供对两个DB实例的连接。
- D. 暂时允许源DB实例可以公开访问，以提供来自目标账户VPC的连接。
- E. 使用目标账户中的AWS Database Migration Service（AWS DMS）执行从源数据库到目标数据库的全量加载加变更数据捕获（CDC）迁移。迁移完成后，更改CNAME记录以指向目标DB实例端点。
- F. 使用目标账户中的AWS Database Migration Service（AWS DMS）执行从源数据库到目标数据库的变更数据捕获（CDC）迁移。迁移完成后，更改CNAME记录以指向目标DB实例端点。

---

### 单选题 28/306

一家公司的应用程序生成报告并将它们存储在Amazon S3存储桶中。当用户访问他们的报告时，应用程序生成一个签名URL以允许用户下载报告。公司的安全团队发现文件是公开的，任何人都可以在未经认证的情况下下载它们。公司已暂停生成新报告，直到问题得到解决。将立即采取哪一套行动来解决安全问题，而不会影响应用程序的正常工作流程？

- A. 创建一个AWS Lambda函数，对未经认证的用户应用拒绝所有策略。创建一个计划事件来调用Lambda函数。
- B. 查看AWS Trusted Advisor存储桶权限检查，并实施推荐的行动。
- C. 运行一个脚本，在存储桶中的所有对象上放置私有ACL。
- D. 在Amazon S3中使用阻止公共访问功能，将IgnorePublicAcls选项设置为TRUE。

---

### 单选题 29/306

一家公司希望重构其零售订单Web应用程序，该应用程序当前使用负载均衡的Amazon EC2实例集群进行Web托管、数据库API服务和业务逻辑。公司需要创建一个解耦的、可扩展的架构，并具有保留失败订单的机制，同时还要最小化运营成本。哪种解决方案将满足这些要求？

- A. 使用Amazon S3进行Web托管，使用Amazon API Gateway提供数据库API服务。使用Amazon Simple Queue Service（Amazon SQS）进行订单排队。使用Amazon Elastic Container Service（Amazon ECS）进行业务逻辑处理，并使用Amazon SQS长轮询来保留失败的订单。
- B. 使用AWS Elastic Beanstalk进行Web托管，使用Amazon API Gateway提供数据库API服务。使用Amazon MQ进行订单排队。使用AWS Step Functions进行业务逻辑处理，并使用Amazon S3 Glacier Deep Archive来保留失败的订单。
- C. 使用Amazon S3进行Web托管，使用AWS AppSync提供数据库API服务。使用Amazon Simple Queue Service（Amazon SQS）进行订单排队。使用AWS Lambda进行业务逻辑处理，并使用Amazon SQS死信队列来保留失败的订单。
- D. 使用Amazon Lightsail进行Web托管，使用AWS AppSync提供数据库API服务。使用Amazon Simple Email Service（Amazon SES）进行订单排队。使用Amazon Elastic Kubernetes Service（Amazon EKS）进行业务逻辑处理，并使用Amazon OpenSearch Service来保留失败的订单。

---

### 单选题 30/306

一家公司的网站在四个Amazon EC2实例上运行，这些实例位于应用程序负载均衡器（ALB）后面。当ALB检测到一个EC2实例不再可用时，一个Amazon CloudWatch警报进入ALARM状态。然后，公司运营团队的一名成员手动添加一个新的EC2实例到ALB后面。解决方案架构师需要设计一个高可用性解决方案，自动处理EC2实例的替换。公司需要在切换到新解决方案时最小化停机时间。解决方案架构师应该采取哪一系列步骤来满足这些要求？

- A. 删除现有的ALB。创建一个Auto Scaling组，配置为处理Web应用程序流量。附加一个新的启动模板到Auto Scaling组。创建一个新的ALB。将Auto Scaling组附加到新的ALB。将现有的EC2实例附加到Auto Scaling组。
- B. 创建一个Auto Scaling组，配置为处理Web应用程序流量。附加一个新的启动模板到Auto Scaling组。将Auto Scaling组附加到现有的ALB。将现有的EC2实例附加到Auto Scaling组。
- C. 删除现有的ALB和EC2实例。创建一个Auto Scaling组，配置为处理Web应用程序流量。附加一个新的启动模板到Auto Scaling组。创建一个新的ALB。将Auto Scaling组附加到新的ALB。等待Auto Scaling组启动最小数量的EC2实例。
- D. 创建一个Auto Scaling组，配置为处理Web应用程序流量。附加一个新的启动模板到Auto Scaling组。将Auto Scaling组附加到现有的ALB。等待现有的ALB注册现有的EC2实例与Auto Scaling组。

---

### 单选题 31/306

一家公司已将旧版应用程序迁移到AWS Cloud。该应用程序在三个Amazon EC2实例上运行，这些实例分布在三个可用区（AZ）中。每个AZ中都有一个EC2实例。EC2实例运行在VPC的三个私有子网中，并设置为应用程序负载均衡器（ALB）的目标，该ALB与三个公共子网相关联。应用程序需要与本地系统通信。只有来自公司IP地址范围的流量才被允许访问本地系统。公司的安全团队只将其内部IP地址范围中的一个IP地址带到云端。公司已将此IP地址添加到公司防火墙的允许列表中。公司还为此IP地址创建了一个弹性IP地址。解决方案架构师需要创建一个解决方案，使应用程序能够与本地系统通信。该解决方案还必须能够自动减轻故障。哪种解决方案将满足这些要求？

- A. 在每个公共子网中部署三个NAT网关。将弹性IP地址分配给NAT网关。打开NAT网关的健康检查。如果NAT网关未通过健康检查，请重新创建NAT网关，并将弹性IP地址分配给新的NAT网关。
- B. 将ALB替换为网络负载均衡器（NLB）。将弹性IP地址分配给NLB。打开NLB的健康检查。如果NLB未通过健康检查，请在不同的子网中重新部署NLB。
- C. 在公共子网中部署单个NAT网关。将弹性IP地址分配给NAT网关。使用Amazon CloudWatch和自定义指标监控NAT网关。如果NAT网关不健康，请调用AWS Lambda函数在不同的子网中创建新的NAT网关。将弹性IP地址分配给新的NAT网关。
- D. 将弹性IP地址分配给ALB。创建一个带有弹性IP地址值的Amazon Route 53简单记录。创建Route 53健康检查。如果健康检查失败，请在不同的子网中重新创建ALB。

---

### 单选题 32/306

解决方案架构师需要审查使用EMR文件系统（EMRFS）的Amazon EMR集群的设计。该集群执行对业务需求至关重要的任务。集群始终使用Amazon EC2按需实例运行所有任务、主节点和核心节点。EMR任务每天早晨1:00开始运行，并在6小时内完成。完成处理所需的时间不是优先考虑的，因为数据直到当天晚些时候才被引用。解决方案架构师必须审查架构并提出一种解决方案，以最小化计算成本。解决方案架构师应该推荐哪种解决方案来满足这些要求？

- A. 在实例队列中启动所有任务、主节点和核心节点的Spot实例。在处理完成后终止集群，包括所有实例。
- B. 在按需实例上启动主节点和核心节点。在实例队列中启动任务节点的Spot实例。在处理完成后终止集群，包括所有实例。购买计算节省计划以覆盖按需实例使用。
- C. 继续在所有节点上启动按需实例。在处理完成后终止集群，包括所有实例。购买计算节省计划以覆盖按需实例使用。
- D. 在按需实例上启动主节点和核心节点。在实例队列中启动任务节点的Spot实例。仅在处理完成后终止任务节点实例。购买计算节省计划以覆盖按需实例使用。

---

### 单选题 33/306

一家公司希望管理与20个不经常使用但仍然关键的应用程序相关的成本，通过迁移到AWS来实现。这些应用程序是Java和Node.js的混合体，分布在不同的实例集群中。公司希望在标准化使用单一部署方法的同时最小化成本。大多数应用程序是月末处理例程的一部分，只有少数并发用户，但它们偶尔也会在其他时间运行。平均应用程序内存消耗少于1 GB，尽管有些应用程序在高峰处理期间使用高达2.5 GB的内存。该组中最重要的应用程序是一个用Java编写的账单报告，它访问多个数据源，并且经常运行数小时。哪种是最具有成本效益的解决方案？

- A. 为每个应用程序部署一个单独的AWS Lambda函数。使用AWS CloudTrail日志和Amazon CloudWatch警报来验证关键作业的完成。
- B. 在Amazon EC2上部署Amazon ECS容器，并为内存利用率配置75%的自动扩展。为每个迁移的应用程序部署一个ECS任务，并使用ECS任务扩展。使用Amazon CloudWatch监视服务和主机。
- C. 为每个应用程序部署AWS Elastic Beanstalk，并确保所有请求都有足够的资源进行自动扩展。使用CloudWatch警报监视每个AWS Elastic Beanstalk部署。
- D. 部署一个新的Amazon EC2实例集群，通过使用EC2自动扩展和应用程序负载均衡器共同托管所有应用程序。根据自动扩展组的GroupMaxSize参数设置自定义指标来扩展集群大小。购买等于自动扩展组的GroupMaxSize参数的3年预留实例。

---

### 多选题 34/306

一家公司拥有许多单独的AWS账户，并且没有中央计费或管理。每个AWS账户托管着公司不同部门的服务。公司拥有一个已部署的Microsoft Azure Active Directory。解决方案架构师需要集中公司的AWS账户的计费和管理。公司想开始使用身份联合，而不是手动用户管理。公司还希望使用临时凭证，而不是长期使用访问密钥。哪些组合的步骤将满足这些要求？（选择三个）

- A. 创建一个新的AWS账户作为管理账户。在AWS组织中部署一个组织。邀请每个现有的AWS账户加入该组织。确保每个账户接受邀请。
- B. 将每个AWS账户的电子邮件地址配置为aws+@example.com，以便账户管理电子邮件消息和发票发送到同一个地方。
- C. 在管理账户中部署AWS IAM身份中心（AWS Single Sign-On），将其连接到Azure Active Directory。配置IAM身份中心以自动同步用户和组。
- D. 在管理账户中部署一个AWS托管的Microsoft AD目录。使用AWS资源访问管理器（AWS RAM）与组织中的所有其他账户共享目录。
- E. 创建AWS IAM身份中心（AWS Single Sign-On）权限集。将权限集附加到适当的IAM身份中心组和AWS账户。
- F. 在每个AWS账户中配置AWS身份和访问管理（IAM），以使用AWS托管的Microsoft AD进行身份验证和授权。

---

### 单选题 35/306

一家公司在Amazon EC2实例上运行一个应用程序，这些实例位于应用程序负载均衡器（ALB）后面。实例是自动扩展组的一部分。应用程序的负载不可预测，经常向外扩展和向内收缩。公司的开发团队想要分析应用程序日志，以找到改进应用程序性能的方法。然而，在实例向内收缩后，日志不再可用。哪种解决方案能让开发团队在缩容事件后查看应用程序日志？

- A. 为ALB启用访问日志。将日志存储在Amazon S3存储桶中。
- B. 配置EC2实例使用统一的CloudWatch代理将日志发布到Amazon CloudWatch Logs。
- C. 修改自动扩展组以使用阶梯扩展策略。
- D. 使用AWS X-Ray跟踪对应用程序进行仪表化。

---

### 单选题 36/306

一家公司在本地数据中心运行应用程序。该应用程序使用户能够上传媒体文件。文件保留在文件服务器上。Web应用程序有许多用户。应用程序服务器过度利用，导致数据上传偶尔失败。公司经常向文件服务器添加新存储。公司希望通过迁移到AWS来解决这些挑战。美国和加拿大的用户访问该应用程序。只有经过身份验证的用户才能访问应用程序上传文件。公司将考虑重构应用程序的解决方案，并且公司需要加速应用程序开发。哪种解决方案最能满足这些要求，同时操作开销最小？

- A. 使用AWS应用程序迁移服务将应用程序服务器迁移到Amazon EC2实例。为EC2实例创建自动扩展组。使用应用程序负载均衡器分发请求。修改应用程序以使用Amazon S3持久保存文件。使用Amazon Cognito对用户进行身份验证。
- B. 使用AWS应用程序迁移服务将应用程序服务器迁移到Amazon EC2实例。为EC2实例创建自动扩展组。使用应用程序负载均衡器分发请求。设置AWS IAM身份中心（AWS Single Sign-On）让用户能够登录应用程序。修改应用程序以使用Amazon S3持久保存文件。
- C. 创建一个用于上传媒体文件的静态网站。将静态资源存储在Amazon S3中。使用AWS AppSync创建API。使用AWS Lambda解析器将媒体文件上传到Amazon S3。使用Amazon Cognito对用户进行身份验证。
- D. 使用AWS Amplify创建一个用于上传媒体文件的静态网站。使用Amplify托管通过Amazon CloudFront提供网站服务。使用Amazon S3存储上传的媒体文件。使用Amazon Cognito对用户进行身份验证。

---

### 单选题 37/306

一家公司在Amazon S3存储桶中有数百万对象。这些对象处于S3标准存储类别。所有S3对象都被频繁访问。访问对象的用户和应用程序的数量正在迅速增加。这些对象使用AWS KMS密钥（SSE-KMS）进行服务器端加密。解决方案架构师审查了公司的月度AWS发票，注意到由于来自Amazon S3的大量请求，AWS KMS成本正在增加。解决方案架构师需要在对应用程序进行最小更改的情况下优化成本。哪种解决方案最能满足这些要求，同时操作开销最小？

- A. 创建一个新的S3存储桶，使用客户提供的密钥（SSE-C）作为加密类型。复制现有对象到新的S3存储桶。指定SSE-C。
- B. 创建一个新的S3存储桶，使用Amazon S3管理的密钥（SSE-S3）作为加密类型。使用S3批量操作复制现有对象到新的S3存储桶。指定SSE-S3。
- C. 使用AWS CloudHSM存储加密密钥。创建一个新的S3存储桶。使用S3批量操作将现有对象复制到新的S3存储桶。使用CloudHSM中的密钥加密对象。
- D. 使用S3智能分层存储类别为S3存储桶。为S3智能分层创建一个归档配置，将90天内未访问的对象转换为S3 Glacier Deep Archive。

---

### 多选题 38/306

一家公司正在创建一个在Amazon EC2上运行的集中日志服务，该服务将接收并分析来自数百个AWS账户的日志。AWS PrivateLink被用来提供客户端服务和日志服务之间的连接。在每个拥有客户端的AWS账户中，都为日志服务创建了一个接口端点，并且是可用的。部署在不同子网中的EC2实例上的日志服务，带有网络负载均衡器（NLB）。客户端无法使用VPC端点提交日志。解决方案架构师应该采取哪两个步骤来解决这个问题？

- A. 检查NACL是否附加到日志服务子网，以允许与NLB子网的通信。检查NACL是否附加到NLB子网，以允许与运行在EC2实例上的日志服务子网的通信。
- B. 检查NACL是否附加到日志服务子网，以允许与接口端点子网的通信。检查NACL是否附加到接口端点子网，以允许与运行在EC2实例上的日志服务子网的通信。
- C. 检查运行在EC2实例上的日志服务的安全组，确保它允许从NLB子网进入。
- D. 检查运行在EC2实例上的日志服务的安全组，确保它允许来自客户端的进入。
- E. 检查NLB的安全组，确保它允许来自接口端点子网的进入。

---

### 单选题 39/306

一家金融服务公司将数百万历史股票交易加载到Amazon DynamoDB表中。该表使用按需容量模式。每天午夜，会有数百万新记录被加载到表中。应用程序对表的读取活动在一天中以突发的方式进行，并且一组有限的键被重复查询。公司需要降低与DynamoDB相关的成本。解决方案架构师应该推荐哪种策略来满足这一要求？

- A. 在DynamoDB表前部署一个Amazon ElastiCache集群。
- B. 部署DynamoDB Accelerator（DAX）。配置DynamoDB自动扩展。在成本探索器中购买节省计划。
- C. 使用预配置容量模式。在成本探索器中购买节省计划。
- D. 部署DynamoDB Accelerator（DAX）。使用预配置容量模式。配置DynamoDB自动扩展。

---

### 单选题 40/306

一家公司正在创建一个REST API，用于与位于美国的六个合作伙伴共享信息。公司创建了一个Amazon API Gateway区域端点。每个合作伙伴将每天访问API一次，发布每日销售数字。在最初部署后，公司观察到每秒有来自世界各地500个不同IP地址的1,000个请求。公司认为这些流量来自僵尸网络，希望在最小化成本的同时保护其API。公司应该采取哪种方法来保护其API？

- A. 创建一个带有API作为源的Amazon CloudFront分发。创建一个AWS WAF Web ACL，并设置一条规则，阻止每天提交超过五个请求的客户端。将Web ACL与CloudFront分发关联。使用源访问身份（OAI）配置CloudFront，并将其与分发关联。配置API Gateway以确保只有OAI可以运行POST方法。
- B. 创建一个带有API作为源的Amazon CloudFront分发。创建一个AWS WAF Web ACL，并设置一条规则，阻止每天提交超过五个请求的客户端。将Web ACL与CloudFront分发关联。向CloudFront分发添加一个自定义标头，用API密钥填充。配置API以在POST方法上要求API密钥。
- C. 创建一个AWS WAF Web ACL，并设置一条规则，允许访问六个合作伙伴使用的IP地址。将Web ACL与API关联。创建一个资源策略，设置请求限制，并将其与API关联。配置API在POST方法上要求API密钥。
- D. 创建一个AWS WAF Web ACL，并设置一条规则，允许访问六个合作伙伴使用的IP地址。将Web ACL与API关联。创建一个使用请求限制的使用计划，并将其与API关联。创建一个API密钥，将其添加到使用计划中。

---

### 单选题 41/306

一家公司有一个新的应用程序，需要在单个AWS区域中的五台Amazon EC2实例上运行。该应用程序需要在所有将运行应用程序的EC2实例之间进行高吞吐量、低延迟的网络连接。该应用程序没有容错要求。哪种解决方案将满足这些要求？

- A. 将五台新的EC2实例启动到一个集群放置组中。确保EC2实例类型支持增强网络。
- B. 将五台新的EC2实例启动到同一可用区的自动扩展组中。为每个EC2实例附加额外的弹性网络接口。
- C. 将五台新的EC2实例启动到一个分区放置组中。确保EC2实例类型支持增强网络。
- D. 将五台新的EC2实例启动到一个分散放置组中。为每个EC2实例附加额外的弹性网络接口。

---

### 单选题 42/306

一家公司运营一个本地软件即服务（SaaS）解决方案，该解决方案每天处理多个文件。公司为其客户提供多个公共SFTP端点以方便文件传输。客户将SFTP端点IP地址添加到其防火墙允许列表中，以允许出站流量。不允许更改SFTP端点IP地址。公司希望将SaaS解决方案迁移到AWS并降低文件传输服务的操作开销。哪种解决方案满足这些要求？

- A. 在公司的AWS账户中注册客户拥有的IP地址块。从地址池中创建弹性IP地址，并将它们分配给AWS Transfer for SFTP端点。使用AWS Transfer将文件存储在Amazon S3中。
- B. 将包含客户拥有的IP地址块的子网添加到VPC中。从地址池中创建弹性IP地址，并将它们分配给应用程序负载均衡器（ALB）。在ALB后面的自动扩展组中启动托管FTP服务的EC2实例。将文件存储在附加的Amazon弹性块存储（Amazon EBS）卷中。
- C. 将客户拥有的IP地址块与Amazon Route 53注册。在Route 53中创建指向网络负载均衡器（NLB）的别名记录。在NLB后面的自动扩展组中启动托管FTP服务的EC2实例。将文件存储在Amazon S3中。
- D. 在公司AWS账户中注册客户拥有的IP地址块。从地址池中创建弹性IP地址，并将它们分配给Amazon S3 VPC端点。在S3存储桶上启用SFTP支持。

---

### 单选题 43/306

一家教育公司正在运行一个由全球大学生使用的Web应用程序。该应用程序在自动扩展组后面的应用程序负载均衡器（ALB）中的Amazon Elastic Container Service（Amazon ECS）集群中运行。系统管理员发现每周登录失败尝试的数量激增，这压垮了应用程序的认证服务。所有登录失败尝试都来自大约500个不同的IP地址，这些地址每周都在变化。解决方案架构师必须防止登录失败尝试压垮认证服务。哪种解决方案以最具操作效率的方式满足这些要求？

- A. 使用AWS防火墙管理器创建一个安全组和安全组策略，拒绝来自IP地址的访问。
- B. 创建一个AWS WAF Web ACL，设置基于速率的规则，并将规则操作设置为阻止。将Web ACL连接到ALB。
- C. 使用AWS防火墙管理器创建一个安全组和安全组策略，仅允许特定CIDR范围的访问。
- D. 创建一个AWS WAF Web ACL，设置IP集匹配规则，并将规则操作设置为阻止。将Web ACL连接到ALB。

---

### 单选题 44/306

一家公司需要从中心位置为多个部门创建和管理多个AWS账户。安全团队需要从自己的AWS账户中对所有账户进行只读访问。公司正在使用AWS组织，并为安全团队创建了一个账户。解决方案架构师应如何满足这些要求？

- A. 使用OrganizationAccountAccessRole IAM角色在每个成员账户中创建一个新的IAM策略，并具有只读访问权限。在每个成员账户中的IAM策略和安全账户之间建立信任关系。要求安全团队使用IAM策略获得访问权限。
- B. 使用OrganizationAccountAccessRole IAM角色在每个成员账户中创建一个新的IAM角色，并具有只读访问权限。在每个成员账户中的IAM角色和安全账户之间建立信任关系。要求安全团队使用IAM角色获得访问权限。
- C. 要求安全团队使用AWS安全令牌服务（AWS STS）调用管理账户中的OrganizationAccountAccessRole IAM角色的AssumeRole API，从安全账户中。使用生成的临时凭证获得访问权限。
- D. 要求安全团队使用AWS安全令牌服务（AWS STS）调用成员账户中的OrganizationAccountAccessRole IAM角色的AssumeRole API，从安全账户中。使用生成的临时凭证获得访问权限。

---

### 多选题 45/306

一家公司有五个开发团队，每个团队都创建了五个AWS账户来开发和托管应用程序。为了跟踪支出，开发团队每个月都会登录到每个账户，记录AWS计费和成本管理控制台中的当前成本，并将信息提供给公司的财务团队。公司有严格的合规要求，需要确保仅在美国的AWS区域中创建资源。然而，一些资源已经在其他区域中创建。解决方案架构师需要实施一个解决方案，使财务团队能够跟踪和合并所有账户的支出。该解决方案还必须确保公司只能在美国的区域中创建资源。哪种组合的步骤将以最具操作效率的方式满足这些要求？（选择三个）

- A. 创建一个新账户作为管理账户。为财务团队创建一个Amazon S3存储桶。使用AWS成本和使用报告创建月度报告，并将数据存储在财务团队的S3存储桶中。
- B. 创建一个新账户作为管理账户。在AWS组织中部署一个组织，并启用所有功能。邀请所有现有账户加入组织。确保每个账户接受邀请。
- C. 创建一个包含所有开发团队的OU。创建一个SCP，允许仅在美国的区域中创建资源。将SCP应用于OU。
- D. 创建一个包含所有开发团队的OU。创建一个SCP，拒绝在美国以外的区域创建资源。将SCP应用于OU。
- E. 在管理账户中创建一个IAM角色。附加一个策略，包括查看计费和成本管理控制台的权限。允许财务团队用户承担该角色。使用AWS成本探索器和计费和成本管理控制台分析成本。
- F. 在每个AWS账户中创建一个IAM角色。附加一个策略，包括查看计费和成本管理控制台的权限。允许财务团队用户承担该角色。

---

### 单选题 46/306

一家公司开发了一个混合解决方案，连接其数据中心和AWS。公司使用Amazon VPC和Amazon EC2实例，这些实例将应用程序日志发送到Amazon CloudWatch。EC2实例从多个位于本地的关系数据库读取数据。公司希望在接近实时的情况下监控连接到数据库的EC2实例。公司已经在本地使用Splunk进行监控解决方案。解决方案架构师需要确定如何将网络流量发送到Splunk。解决方案架构师应如何满足这些要求？

- A. 启用VPC流量日志，并将其发送到CloudWatch。创建一个AWS Lambda函数，使用预定义的导出功能定期将CloudWatch日志导出到Amazon S3存储桶。生成ACCESS_KEY和SECRET_KEY AWS凭证。配置Splunk使用这些凭证从S3存储桶中拉取日志。
- B. 创建一个Amazon Kinesis Data Firehose传输流，将Splunk作为目标。配置一个预处理AWS Lambda函数，使用Kinesis Data Firehose流处理器从CloudWatch日志订阅过滤器发送的记录中提取单独的日志事件。启用VPC流量日志，并将其发送到CloudWatch。创建一个CloudWatch日志订阅，将日志事件发送到Kinesis Data Firehose传输流。
- C. 要求公司记录对数据库的每个请求以及EC2实例IP地址。将CloudWatch日志导出到Amazon S3存储桶。使用Amazon Athena按数据库名称对日志进行分组查询。将Athena结果导出到另一个S3存储桶。调用AWS Lambda函数，自动将放入S3存储桶的任何新文件发送到Splunk。
- D. 将CloudWatch日志发送到Amazon Kinesis数据流，使用Amazon Kinesis Data Analytics for SQL Applications。配置1分钟滑动窗口收集事件。创建一个SQL查询，使用异常检测模板在接近实时的情况下监控任何网络流量异常。将结果发送到Amazon Kinesis Data Firehose传输流，将Splunk作为目标。

---

### 多选题 47/306

一家公司在Amazon S3中拥有一个数据湖，需要被多个AWS账户中的数百个应用程序访问。公司的信息安全政策规定，S3存储桶不能通过公共互联网访问，每个应用程序应具有运行所需的最小权限。为了满足这些要求，解决方案架构师计划使用仅限于每个应用程序特定VPC的S3访问点。解决方案架构师应采取哪两个组合步骤来实施此解决方案？

- A. 在拥有S3存储桶的AWS账户中为每个应用程序创建一个S3访问点。配置每个访问点仅从应用程序的VPC访问。更新存储桶策略，要求通过访问点访问。
- B. 在每个应用程序的VPC中创建Amazon S3的接口端点。配置端点策略以允许访问S3访问点。为S3端点创建VPC网关附加。
- C. 在每个应用程序的VPC中为Amazon S3创建网关端点。配置端点策略以允许访问S3访问点。指定用于访问访问点的路由表。
- D. 在每个AWS账户中为每个应用程序创建一个S3访问点，并将访问点附加到S3存储桶。配置每个访问点仅从应用程序的VPC访问。更新存储桶策略，要求通过访问点访问。
- E. 在数据湖的VPC中为Amazon S3创建一个网关端点。附加一个端点策略以允许访问S3存储桶。指定用于访问存储桶的路由表。




### 单选题 48/306

一家公司制造智能车辆。公司使用自定义应用程序收集车辆数据。车辆使用 MQTT 协议连接到应用程序。公司每 5 分钟处理一次数据。然后，公司将车辆远程信息处理数据复制到本地存储。自定义应用程序分析这些数据以检测异常。发送数据的车辆数量在不断增长。较新的车辆产生大量数据。本地存储解决方案无法扩展以应对高峰流量，导致数据丢失。公司必须现代化解决方案并将解决方案迁移到 AWS 以解决扩展挑战。哪种解决方案将以最少的操作开销满足这些要求？

- A. 使用 AWS IoT Greengrass 将车辆数据发送到 Amazon Managed Streaming for Apache Kafka (Amazon MSK)。创建一个 Apache Kafka 应用程序将数据存储在 Amazon S3 中。使用 Amazon SageMaker 中的预训练模型来检测异常。
- B. 使用 AWS IoT Core 接收车辆数据。配置规则将数据路由到 Amazon Kinesis Data Firehose 传输流，该传输流将数据存储在 Amazon S3 中。创建一个 Amazon Kinesis Data Analytics 应用程序，从传输流中读取以检测异常。
- C. 使用 AWS IoT FleetWise 收集车辆数据。将数据发送到 Amazon Kinesis 数据流。使用 Amazon Kinesis Data Firehose 传输流将数据存储在 Amazon S3 中。使用 AWS Glue 中的内置机器学习转换来检测异常。
- D. 使用 Amazon MQ for RabbitMQ 收集车辆数据。将数据发送到 Amazon Kinesis Data Firehose 传输流，以将数据存储在 Amazon S3 中。使用 Amazon Lookout for Metrics 来检测异常。

---

### 多选题 49/306

一家公司最近开始在 AWS 云中托管新的应用程序工作负载。公司正在使用 Amazon EC2 实例、Amazon Elastic File System (Amazon EFS) 文件系统和 Amazon RDS DB 实例。为了满足监管和业务要求，公司必须对数据备份进行以下更改：

- 备份必须根据自定义的每日、每周和每月要求保留。
- 备份必须在捕获后立即复制到至少另一个 AWS 地区。
- 备份解决方案必须在 AWS 环境中提供单一的备份状态来源。
- 备份解决方案必须在任何资源备份失败时立即发送通知。

哪种组合的步骤将以最少的操作开销满足这些要求？（选择三个）

- A. 创建一个带有每个保留要求的备份规则的 AWS Backup 计划。
- B. 配置 AWS Backup 计划以将备份复制到另一个地区。
- C. 创建一个 AWS Lambda 函数以复制备份到另一个地区，并在失败时发送通知。
- D. 将 Amazon Simple Notification Service (Amazon SNS) 主题添加到备份计划中，以发送任何状态不是 BACKUP_JOB_COMPLETED 的完成作业的通知。
- E. 为每个保留要求创建一个 Amazon Data Lifecycle Manager (Amazon DLM) 快照生命周期策略。
- F. 在每个数据库上设置 RDS 快照。

---

### 单选题 50/306

一家公司正在设计一个 AWS Organizations 结构。公司希望标准化一个在整个组织中应用标签的过程。公司在用户创建新资源时需要具有特定值的标签。公司的每个 OU 都将具有独特的标签值。哪种解决方案将满足这些要求？

- A. 使用 SCP 拒绝创建没有所需标签的资源。创建一个标签策略，包括公司分配给每个 OU 的标签值。将标签策略附加到 OUs。
- B. 使用 SCP 拒绝创建没有所需标签的资源。创建一个标签策略，包括公司分配给每个 OU 的标签值。将标签策略附加到组织的管理账户。
- C. 使用 SCP 允许仅当资源具有所需标签时才创建资源。创建一个标签策略，包括公司分配给每个 OU 的标签值。将标签策略附加到 OUs。
- D. 使用 SCP 拒绝创建没有所需标签的资源。定义标签列表。将 SCP 附加到 OUs。

---

### 多选题 51/306

一家公司在 AWS 中构建了一个高性能计算 (HPC) 集群，用于一个紧密耦合的工作负载，该工作负载生成大量存储在 Amazon EFS 中的共享文件。当集群中的 Amazon EC2 实例数量为 100 时，集群表现良好。然而，当公司将集群规模扩大到 1000 个 EC2 实例时，整体性能远低于预期。解决方案架构师应该做出哪些设计选择，以实现 HPC 集群的最大性能？（选择三个）

- A. 确保 HPC 集群在单个可用区内启动。
- B. 以四的倍数启动 EC2 实例并附加弹性网络接口。
- C. 选择启用了弹性织物适配器 (EFA) 的 EC2 实例类型。
- D. 确保集群在多个可用区启动。
- E. 用多个 Amazon EBS 卷的 RAID 数组替换 Amazon EFS。
- F. 用 Amazon FSx for Lustre 替换 Amazon EFS。

---

### 单选题 52/306

一家公司想使用 AWS 为其本地应用程序进行灾难恢复。公司有数百台基于 Windows 的服务器运行该应用程序。所有服务器都挂载了一个公共共享。公司有一个 15 分钟的 RTO 和一个 5 分钟的 RPO。解决方案必须支持本地故障转移和回退功能。哪种解决方案将最符合成本效益地满足这些要求？

- A. 创建一个 AWS 存储网关文件网关。安排每日 Windows 服务器备份。将数据保存到 Amazon S3。在灾难发生时，从备份中恢复本地服务器。在回退期间，在 Amazon EC2 实例上运行本地服务器。
- B. 创建一组 AWS CloudFormation 模板以创建基础设施。使用 AWS DataSync 将所有数据复制到 Amazon Elastic File System (Amazon EFS)。在灾难发生时，使用 AWS CodePipeline 部署模板以恢复本地服务器。使用 DataSync 回退数据。
- C. 创建一个 AWS Cloud Development Kit (AWS CDK) 管道，在 AWS 上建立一个多站点活动-活动环境。使用 s3 sync 命令将数据复制到 Amazon S3。在灾难发生时，交换 DNS 端点以指向 AWS。使用 s3 sync 命令回退数据。
- D. 使用 AWS 弹性灾难恢复复制本地服务器。使用 AWS DataSync 将数据复制到 Amazon FSx for Windows File Server 文件系统。将文件系统挂载到 AWS 服务器。在灾难发生时，将本地服务器故障转移到 AWS。使用弹性灾难恢复回退到新的或现有的服务器。

---

### 多选题 53/306

一家公司的解决方案架构师正在分析多应用程序环境的成本。该环境部署在单个 AWS 地区的多个可用区中。在最近的一次收购之后，公司在 AWS Organizations 中管理着两个组织。公司在一个组织中创建了多个服务提供商应用程序作为 AWS PrivateLink 支持的 VPC 端点服务。公司在另一个组织中创建了多个服务消费者应用程序。数据传输费用远高于公司预期，解决方案架构师需要降低成本。解决方案架构师必须为开发人员推荐在部署服务时要遵循的准则。这些准则必须最小化整个环境的数据传输费用。这些准则满足这些要求吗？（选择两个）

- A. 使用 AWS 资源访问管理器共享托管服务提供商应用程序的子网与其他组织中的账户。
- B. 将服务提供商应用程序和服务消费者应用程序放置在同一个组织的 AWS 账户中。
- C. 为所有服务提供商应用程序部署关闭跨区域负载均衡的网络负载均衡器。
- D. 确保服务消费者计算资源使用可用区特定的端点服务，使用端点的本地 DNS 名称。
- E. 为组织计划的跨可用区数据传输使用创建节省计划。

---

### 单选题 54/306

解决方案架构师计划将关键的 Microsoft SQL Server 数据库迁移到 AWS。由于数据库是遗留系统，解决方案架构师将把数据库迁移到现代数据架构中。解决方案架构师必须以接近零停机时间迁移数据库。哪种解决方案将满足这些要求？

- A. 使用 AWS 应用迁移服务和 AWS 架构转换工具 (AWS SCT)。在迁移前执行就地升级。在切换后将迁移的数据导出到 Amazon Aurora Serverless。将应用程序指向 Amazon Aurora。
- B. 使用 AWS 数据库迁移服务 (AWS DMS) 重新托管数据库。将 Amazon S3 设置为目标。设置变更数据捕获 (CDC) 复制。当源和目标完全同步时，从 Amazon S3 加载数据到 Amazon RDS for Microsoft SQL Server DB 实例。
- C. 使用本地数据库高可用性工具。将源系统连接到 Amazon RDS for Microsoft SQL Server DB 实例。相应地配置复制。当数据复制完成后，将工作负载转移到 Amazon RDS for Microsoft SQL Server DB 实例。
- D. 使用 AWS 应用迁移服务。在 Amazon EC2 上重新托管数据库服务器。当数据复制完成后，分离数据库，将数据库移动到 Amazon RDS for Microsoft SQL Server DB 实例。重新附加数据库，然后切换所有网络。

---

### 单选题 55/306

一家公司为艺术品提供拍卖服务，并拥有北美和欧洲的用户。公司在 us-east-1 地区的 Amazon EC2 实例中托管其应用程序。艺术家从他们的移动电话上传他们作品的高分辨率大尺寸图像文件到在 us-east-1 地区创建的集中式 Amazon S3 存储桶。欧洲的用户报告他们的图像上传性能缓慢。解决方案架构师如何提高图像上传过程的性能？

- A. 重新部署应用程序以使用 S3 多部分上传。
- B. 创建一个指向应用程序作为自定义源的 Amazon CloudFront 分发。
- C. 配置存储桶使用 S3 传输加速。
- D. 为 EC2 实例创建自动缩放组并创建缩放策略。

---

### 单选题 56/306

一家公司在 AWS 上运行许多工作负载，并使用 AWS Organizations 管理其账户。工作负载托管在 Amazon EC2、AWS Fargate 和 AWS Lambda 上。一些工作负载的需求不可预测。一些月份账户记录了高使用量，而在其他月份使用量较低。公司希望在未来 3 年内优化其计算成本。解决方案架构师获得了组织中每个账户过去 6 个月的平均使用量来计算使用情况。哪种解决方案将为组织的所有计算使用提供最大的成本节省？

- A. 为组织购买与成员账户中最常见 EC2 实例的大小和数量相匹配的预留实例。
- B. 通过使用管理账户级别的建议，从管理账户购买组织的计算节省计划。
- C. 根据过去 6 个月的数据，为每个有高 EC2 使用量的成员账户购买预留实例。
- D. 根据过去 6 个月的 EC2 使用数据，从管理账户为每个成员账户购买 EC2 实例节省计划。

---

### 单选题 57/306

一家公司正在开发一个基于微服务的新的按需视频应用程序。该应用程序在启动时将拥有 500 万用户，并在 6 个月后将拥有 3000 万用户。公司已将应用程序部署在 AWS Fargate 上的 Amazon Elastic Container Service (Amazon ECS)。公司使用 ECS 服务开发了使用 HTTPS 协议的应用程序。解决方案架构师需要使用蓝/绿部署来实施应用程序的更新。该解决方案必须通过负载均衡器将流量分配到每个 ECS 服务。应用程序必须能够根据 Amazon CloudWatch 警报自动调整任务数量。哪种解决方案将满足这些要求？

- A. 配置 ECS 服务以使用蓝/绿部署类型和网络负载均衡器。请求增加每个服务的任务服务配额以满足需求。
- B. 配置 ECS 服务以使用蓝/绿部署类型和网络负载均衡器。为每个 ECS 服务实施使用集群自动缩放器的自动缩放组。
- C. 配置 ECS 服务以使用蓝/绿部署类型和应用程序负载均衡器。为每个 ECS 服务实施使用集群自动缩放器的自动缩放组。
- D. 配置 ECS 服务以使用蓝/绿部署类型和应用程序负载均衡器。为每个 ECS 服务实施服务自动缩放。

---

### 多选题 58/306

一家公司想要运行一个自定义的网络分析软件包，以检查进出 VPC 的流量。公司已通过 AWS CloudFormation 在三个 Amazon EC2 实例上的 Auto Scaling 组中部署了解决方案。所有网络路由都已建立，以将流量定向到 EC2 实例。当分析软件停止工作时，Auto Scaling 组会替换一个实例。实例替换时，网络路由没有更新。哪种组合的步骤将解决此问题？（选择三项）

- A. 基于 EC2 状态检查指标创建警报，这将导致 Auto Scaling 组替换失败的实例。
- B. 更新 CloudFormation 模板，以在 EC2 实例上安装 Amazon CloudWatch 代理。配置 CloudWatch 代理发送应用程序的进程指标。
- C. 更新 CloudFormation 模板，以在 EC2 实例上安装 AWS 系统管理器代理。配置系统管理器代理发送应用程序的进程指标。
- D. 为 Amazon CloudWatch 中的自定义指标创建警报，以用于故障场景。配置警报发布消息到 Amazon 简单通知服务（Amazon SNS）主题。
- E. 创建一个 AWS Lambda 函数，响应 Amazon 简单通知服务（Amazon SNS）消息，将实例从服务中取出。更新网络路由以指向替换实例。
- F. 在 CloudFormation 模板中编写一个条件，当启动替换实例时更新网络路由。

---

### 单选题 59/306

一家公司在 AWS 上建立了其整个基础设施。公司使用 Amazon EC2 实例托管其电子商务网站，并使用 Amazon S3 存储静态数据。公司的三名工程师通过一个 AWS 账户处理云管理和开发。偶尔，一名工程师更改了另一名工程师的 EC2 安全组配置，并导致环境中出现不符合规范的问题。解决方案架构师必须设置一个跟踪工程师所做更改的系统。该系统必须在工程师对 EC2 实例的安全设置进行不符合规范的更改时发送警报。什么是满足这些要求的最快方法？

- A. 为公司设置 AWS 组织。应用 SCP 以管理和跟踪对 AWS 账户所做的不符合规范的安全组更改。
- B. 启用 AWS CloudTrail 以捕获对 EC2 安全组的更改。启用 Amazon CloudWatch 规则，在检测到不符合规范的安全设置时提供警报。
- C. 在 AWS 账户上启用 SCP 以在对环境进行不符合规范的安全组更改时提供警报。
- D. 启用 AWS Config 以跟踪 EC2 安全组的任何不符合规范的更改。通过 Amazon Simple Notification Service（Amazon SNS）主题发送更改作为警报。

---

### 单选题 60/306

一家公司在 AWS 云中运行应用程序。该应用程序由在多个可用区背后的应用程序负载均衡器上运行的 Amazon EC2 实例组成的微服务组成。公司最近新增了一个在 Amazon API Gateway 中实现的新 REST API。一些旧的在 EC2 实例上运行的微服务需要调用这个新 API。公司不希望 API 从公共互联网上访问，也不希望专有数据穿越公共互联网。解决方案架构师应该怎么办以满足这些要求？

- A. 在 VPC 和 API Gateway 之间创建 AWS 站点到站点 VPN 连接。使用 API Gateway 为每个微服务生成唯一的 API 密钥。配置 API 方法以要求密钥。
- B. 为 API Gateway 创建接口 VPC 端点，并设置端点策略，仅允许访问特定 API。向 API Gateway 添加资源策略，仅允许从 VPC 端点访问。将 API Gateway 端点类型更改为私有。
- C. 修改 API Gateway 使用 IAM 认证。更新分配给 EC2 实例的 IAM 角色的 IAM 策略，以允许访问 API Gateway。将 API Gateway 移至新 VPC。部署传输网关并连接 VPC。
- D. 在 AWS Global Accelerator 中创建加速器，并将其连接到 API Gateway。更新所有 VPC 子网的路由表，以指向创建的 Global Accelerator 端点 IP 地址。为每个服务添加 API 密钥以用于身份验证。

---

### 单选题 61/306

一家公司使用 Grafana 数据可视化解决方案，该解决方案运行在单个 Amazon EC2 实例上，用于监控公司 AWS 工作负载的健康状况。公司已经投入时间和努力创建了想要保留的仪表板。仪表板需要高度可用，并且不能超过 10 分钟的停机时间。公司需要最小化持续运营。哪种解决方案将以最小的运营开销满足这些要求？

- A. 迁移到 Amazon CloudWatch 仪表板。重新创建与现有 Grafana 仪表板相匹配的仪表板。尽可能使用自动仪表板。
- B. 创建 Amazon Managed Grafana 工作区。配置新的 Amazon CloudWatch 数据源。从现有的 Grafana 实例导出仪表板。将仪表板导入新的工作区。
- C. 创建一个预安装 Grafana 的 AMI。将现有仪表板存储在 Amazon Elastic File System（Amazon EFS）中。创建一个使用新 AMI 的 Auto Scaling 组。将 Auto Scaling 组的最小、期望和最大实例数设置为一。创建至少服务两个可用区的应用程序负载均衡器。
- D. 配置 AWS Backup 每小时备份一次运行 Grafana 的 EC2 实例。在需要时从最近的快照中恢复 EC2 实例到另一个可用区。

---

### 单选题 62/306

一家公司在 AWS 云中运行 IoT 应用程序。该公司拥有数百万传感器，从美国的家庭收集数据。传感器使用 MQTT 协议连接并向自定义 MQTT 代理发送数据。MQTT 代理将数据存储在单个 Amazon EC2 实例上。传感器通过域名 iot.example.com 连接到代理。公司使用 Amazon Route 53 作为其 DNS 服务。公司将数据存储在 Amazon DynamoDB 中。在几个场合，数据量超载了 MQTT 代理，导致传感器数据丢失。公司必须提高解决方案的可靠性。哪种解决方案将满足这些要求？

- A. 创建应用程序负载均衡器（ALB）和 MQTT 代理的 Auto Scaling 组。将 Auto Scaling 组作为 ALB 的目标。更新 Route 53 中的 DNS 记录为别名记录。将别名记录指向 ALB。使用 MQTT 代理存储数据。
- B. 设置 AWS IoT Core 接收传感器数据。创建并配置连接到 AWS IoT Core 的自定义域。更新 Route 53 中的 DNS 记录，指向 AWS IoT Core Data-ATS 端点。配置 AWS IoT 规则以存储数据。
- C. 创建网络负载均衡器（NLB）。将 MQTT 代理设置为目标。创建 AWS Global Accelerator 加速器。将 NLB 设置为加速器的端点。更新 Route 53 中的 DNS 记录为多值回答记录。将 Global Accelerator IP 地址设置为值。使用 MQTT 代理存储数据。
- D. 设置 AWS IoT Greengrass 接收传感器数据。更新 Route 53 中的 DNS 记录，指向 AWS IoT Greengrass 端点。配置 AWS IoT 规则调用 AWS Lambda 函数以存储数据。

---

### 单选题 63/306

一家软件即服务（SaaS）提供商通过应用程序负载均衡器（ALB）公开 API。ALB 连接到部署在美国东部（北弗吉尼亚）区域的 Amazon Elastic Kubernetes Service（Amazon EKS）集群。公开的 API 包含一些非标准 REST 方法：LINK、UNLINK、LOCK 和 UNLOCK。美国以外的用户报告说，这些 API 的响应时间漫长且不一致。解决方案架构师需要解决这个问题，同时最小化运营开销。哪种解决方案符合这些要求？

- A. 添加 Amazon CloudFront 分发。将 ALB 配置为起源。
- B. 添加 Amazon API Gateway 边缘优化 API 端点以公开 API。将 ALB 配置为目标。
- C. 添加 AWS Global Accelerator 加速器。将 ALB 配置为起源。
- D. 将 API 部署到两个额外的 AWS 区域：eu-west-1 和 ap-southeast-2。在 Amazon Route 53 中添加基于延迟的路由记录。

---

### 单选题 64/306

一家在线零售公司正在将其传统的本地 .NET 应用程序迁移到 AWS。该应用程序运行在负载均衡的前端 Web 服务器、负载均衡的应用服务器和 Microsoft SQL Server 数据库上。公司希望尽可能使用 AWS 托管服务，并且不想重写应用程序。解决方案架构师需要实现一种解决方案，以解决扩展问题并最小化随着应用程序扩展的许可成本。哪种解决方案将以最具成本效益的方式满足这些要求？

- A. 在 Web 层和应用层的 Auto Scaling 组中部署 Amazon EC2 实例。使用开启 Babelfish 的 Amazon Aurora PostgreSQL 重新部署 SQL Server 数据库。
- B. 使用 AWS Database Migration Service（AWS DMS）创建所有服务器的镜像。部署基于本地导入的 Amazon EC2 实例。在 Web 层和应用层的 Auto Scaling 组中部署实例，位于 Network Load Balancer 后面。使用 Amazon DynamoDB 作为数据库层。
- C. 容器化 Web 前端层和应用层。配置 Amazon Elastic Kubernetes Service（Amazon EKS）集群。在 Web 层和应用层的 Auto Scaling 组中创建 Network Load Balancer。使用 Amazon RDS for SQL Server 托管数据库。
- D. 将应用程序功能拆分为 AWS Lambda 函数。使用 Amazon API Gateway 用于 Web 前端层和应用层。将数据迁移到 Amazon S3。使用 Amazon Athena 查询数据。

---

### 多选题 65/306

一家公司正在设计一个托管静态内容的新网站。网站将使用户能够上传和下载大文件。根据公司要求，所有数据在传输和静态存储时都必须加密。解决方案架构师正在使用 Amazon S3 和 Amazon CloudFront 构建解决方案。哪种组合的步骤将满足加密要求？（选择三项）

- A. 为 Web 应用程序使用的 S3 存储桶打开 S3 服务器端加密。
- B. 在 S3 ACL 中为读写操作添加策略属性 "aws:SecureTransport": "true"。
- C. 创建一个存储桶策略，拒绝任何未加密的 S3 存储桶操作。
- D. 通过使用 AWS KMS 密钥（SSE-KMS）配置 CloudFront 的静态加密。
- E. 在 CloudFront 中配置将 HTTP 请求重定向为 HTTPS 请求。
- F. 在为 Web 应用程序使用的 S3 存储桶创建预定 URL 时，使用 RequireSSL 选项。

---

### 单选题 66/306

一家公司在 AWS 云中有应用程序。该应用程序在 20 个 Amazon EC2 实例上运行。EC2 实例是持久的，并在多个附加的 Amazon Elastic Block Store（Amazon EBS）卷上存储数据。公司必须在另一个 AWS 区域中维护备份。公司必须能够在 1 个工作日内恢复 EC2 实例及其配置，数据丢失不超过 1 天。公司员工有限，需要一个优化运营效率和成本的备份解决方案。公司已经创建了一个 AWS CloudFormation 模板，可以在次要区域部署所需的网络配置。哪种解决方案将满足这些要求？

- A. 创建第二个 CloudFormation 模板，可以在次要区域重新创建 EC2 实例。使用 AWS Systems Manager 自动化运行簿运行每日多卷快照。将快照复制到次要区域。在发生故障时启动 CloudFormation 模板，从快照中恢复 EBS 卷，并转移使用到次要区域。
- B. 使用 Amazon Data Lifecycle Manager（Amazon DLM）创建 EBS 卷的每日多卷快照。在发生故障时，启动 CloudFormation 模板并使用 Amazon DLM 恢复 EBS 卷，并将使用转移到次要区域。
- C. 使用 AWS Backup 创建 EC2 实例的定期每日备份计划。配置备份任务将备份复制到次要区域的备份库中。在发生故障时，启动 CloudFormation 模板，从备份库中恢复实例卷和配置，并转移使用到次要区域。
- D. 在次要区域部署与主区域相同大小和配置的 EC2 实例。配置 AWS DataSync 每天从主区域复制数据到次要区域。在发生故障时，启动 CloudFormation 模板并转移使用到次要区域。

---

### 单选题 67/306

一家公司计划将本地 MySQL 数据库一次性迁移到美国东部（弗吉尼亚北部）区域的 Amazon Aurora MySQL。公司当前的互联网连接带宽有限。本地 MySQL 数据库大小为 60 TB。公司估计使用当前互联网连接将数据传输到 AWS 需要一个月的时间。公司需要一个迁移解决方案，能够更快地迁移数据库。哪种解决方案将在最短的时间内迁移数据库？

- A. 请求 AWS Direct Connect 1 Gbps 连接，在本地数据中心和 AWS 之间使用 AWS Database Migration Service（AWS DMS）迁移本地 MySQL 数据库到 Aurora MySQL。
- B. 使用当前互联网连接使用 AWS DataSync 加速本地数据中心和 AWS 之间的数据传输。使用 AWS Application Migration Service 迁移本地 MySQL 数据库到 Aurora MySQL。
- C. 订购 AWS Snowball Edge 设备。使用 S3 接口将数据加载到 Amazon S3 存储桶中。使用 AWS Database Migration Service（AWS DMS）将数据从 Amazon S3 迁移到 Aurora MySQL。
- D. 订购 AWS Snowball 设备。使用 Snowball 的 S3 适配器将数据加载到 Amazon S3 存储桶中。使用 AWS Application Migration Service 将数据从 Amazon S3 迁移到 Aurora MySQL。

---

### 多选题 68/306

一家公司在 AWS Organizations 中使用组织来管理数百个 AWS 账户。解决方案架构师正在为 Open Web Application Security Project（OWASP）前 10 个 Web 应用程序漏洞提供基线保护的解决方案。解决方案架构师在组织内为所有现有和新的 Amazon CloudFront 分发部署了 AWS WAF。解决方案架构师应采取哪些组合的步骤来提供基线保护？（选择三项）

- A. 在所有账户中启用 AWS Config
- B. 在所有账户中启用 Amazon GuardDuty
- C. 启用组织的所有功能
- D. 使用 AWS Firewall Manager 在所有账户中为所有 CloudFront 分发部署 AWS WAF 规则
- E. 使用 AWS Shield Advanced 在所有账户中为所有 CloudFront 分发部署 AWS WAF 规则
- F. 使用 AWS Security Hub 在所有账户中为所有 CloudFront 分发部署 AWS WAF 规则

---

### 多选题 69/306

一家公司在 AWS Organizations 中使用组织来管理数百个 AWS 账户。解决方案架构师正在为 Open Web Application Security Project（OWASP）前 10 个 Web 应用程序漏洞提供基线保护的解决方案。解决方案架构师在组织内为所有现有和新的 Amazon CloudFront 分发部署了 AWS WAF。解决方案架构师应采取哪些组合的步骤来提供基线保护？（选择三项）

- A. 在所有账户中启用 AWS Config
- B. 在所有账户中启用 Amazon GuardDuty
- C. 启用组织的所有功能
- D. 使用 AWS Firewall Manager 在所有账户中为所有 CloudFront 分发部署 AWS WAF 规则
- E. 使用 AWS Shield Advanced 在所有账户中为所有 CloudFront 分发部署 AWS WAF 规则
- F. 使用 AWS Security Hub 在所有账户中为所有 CloudFront 分发部署 AWS WAF 规则

---

### 多选题 70/306

一家公司在 Amazon S3 存储桶中存储敏感数据。公司必须记录 S3 存储桶中对象的所有活动，并且必须将日志保留 5 年。公司的安全团队还必须在每次尝试从 S3 存储桶中删除数据时收到电子邮件通知。哪种组合的步骤将以最具成本效益的方式满足这些要求？（选择三项）

- A. 配置 AWS CloudTrail 记录 S3 数据事件。
- B. 为 S3 存储桶配置服务器访问日志。
- C. 配置 Amazon S3 将对象删除事件发送到 Amazon Simple Email Service（Amazon SES）。
- D. 配置 Amazon S3 将对象删除事件发送到 Amazon EventBridge 事件总线，该事件总线发布到 Amazon Simple Notification Service（Amazon SNS）主题。
- E. 配置 Amazon S3 将日志发送到 Amazon Timestream，并具有数据存储分层。
- F. 配置一个新的 S3 存储桶来存储日志，并使用 S3 生命周期策略。

---

### 多选题 71/306

解决方案架构师正在设计一个应用程序，以接受员工通过他们的移动设备提交的时间表条目。时间表将每周提交一次，大部分提交发生在星期五。数据必须以一种格式存储，允许工资管理员运行月度报告。基础设施必须是高可用的，并且能够根据传入数据和报告请求的速率进行扩展。哪种组合的步骤满足这些要求，同时最小化运营开销？（选择两项）

- A. 在多个可用区中使用按需 Amazon EC2 实例部署应用程序，并使用负载均衡。使用预定的 Amazon EC2 自动缩放，在星期五的高提交量之前增加容量。
- B. 使用 Amazon Elastic Container Service（Amazon ECS）在容器中部署应用程序，并在多个可用区中使用负载均衡。使用预定的服务自动缩放，在星期五的高提交量之前增加容量。
- C. 将应用程序前端部署到 Amazon S3 存储桶，由 Amazon CloudFront 提供服务。使用 Amazon API Gateway 与 AWS Lambda 代理集成部署应用程序后端。
- D. 将时间表提交数据存储在 Amazon Redshift 中。使用 Amazon QuickSight 生成报告，使用 Amazon Redshift 作为数据源。
- E. 将时间表提交数据存储在 Amazon S3 中。使用 Amazon Athena 和 Amazon QuickSight 生成报告，使用 Amazon S3 作为数据源。

---

### 单选题 72/306

一家大型教育公司最近引入了 Amazon Workspaces，为多所大学提供访问内部应用程序的权限。公司在 Amazon FSx for Windows File Server 文件系统上存储用户配置文件。文件系统配置了 DNS 别名，并连接到自管理的 Active Directory。随着越来越多的用户开始使用 Workspaces，登录时间增加到了不可接受的水平。调查发现文件系统的性能下降。公司在 HDD 存储上创建了文件系统，吞吐量为 16 MBps。解决方案架构师必须在定义的维护窗口期间提高文件系统的性能。解决方案架构师应如何以最小的行政努力满足这些要求？

- A. 使用 AWS Backup 创建文件系统的点播备份。将备份还原到新的 FSx for Windows File Server 文件系统。选择 SSD 作为存储类型。选择 32 MBps 作为吞吐量容量。完成备份和还原过程后，相应地调整 DNS 别名。删除原始文件系统。
- B. 断开用户与文件系统的连接。在 Amazon FSx 控制台中，将吞吐量容量更新为 32 MBps。将存储类型更新为 SSD。重新连接用户到文件系统。
- C. 在新的 Amazon EC2 实例上部署 AWS DataSync 代理。创建任务。将现有文件系统配置为源位置。将新的 FSx for Windows File Server 文件系统配置为 SSD 存储和 32 MBps 的吞吐量作为目标位置。安排任务。任务完成后，相应地调整 DNS 别名。删除原始文件系统。
- D. 使用 Windows PowerShell 命令在现有文件系统上启用阴影副本。安排阴影副本作业创建文件系统的点播备份。选择恢复以前的版本。创建一个新的 FSx for Windows File Server 文件系统，使用 SSD 存储和 32 MBps 的吞吐量。复制作业完成后，调整 DNS 别名。删除原始文件系统。

---

### 单选题 73/306

一家公司在 AWS 云中运行应用程序。核心业务逻辑运行在 Auto Scaling 组中的一组 Amazon EC2 实例上。应用程序负载均衡器（ALB）将流量分配给 EC2 实例。Amazon Route 53 记录 api.example.com 指向 ALB。公司的开发团队对业务逻辑进行了重大更新。公司有一条规则，即在部署更改时，只能在测试窗口期间让 10% 的客户接收新的逻辑。客户必须在测试窗口期间使用相同版本的业务逻辑。公司应如何部署更新以满足这些要求？

- A. 创建第二个 ALB，并在新的 Auto Scaling 组中部署新逻辑到一组 EC2 实例。配置 ALB 将流量分配给 EC2 实例。更新 Route 53 记录以使用加权路由，并将记录指向两个 ALB。
- B. 创建第二个目标组，由 ALB 引用。在新的 EC2 实例中部署新逻辑到这个新目标组。更新 ALB 监听器规则以使用加权目标组。配置 ALB 目标组粘性。
- C. 为 Auto Scaling 组创建一个新的启动配置。指定启动配置使用 AutoScalingRollingUpdate 策略，并将 MaxBatchSize 选项设置为 10。替换 Auto Scaling 组上的启动配置。部署更改。
- D. 创建第二个 Auto Scaling 组，由 ALB 引用。在这个新的 Auto Scaling 组中部署新逻辑到一组 EC2 实例。更改 ALB 路由算法为最少未完成请求（LOR）。配置 ALB 会话粘性。

---

### 单选题 74/306

一家公司在 AWS 上运行一个 Web应用程序。该 Web 应用程序从 Amazon S3 存储桶传递静态内容，该存储桶位于 Amazon CloudFront 分发后面。应用程序通过使用应用程序负载均衡器（ALB）提供动态内容，该负载均衡器将请求分配给 Auto Scaling 组中的 Amazon EC2 实例集群。应用程序使用在 Amazon Route 53 中设置的域名。一些用户报告说，在高峰时段尝试访问网站时偶尔会出现问题。运营团队发现 ALB 有时返回 HTTP 503 服务不可用错误。公司希望在出现这些错误时显示自定义错误消息页面。该页面应立即为这个错误代码显示。哪种解决方案将以最小的运营开销满足这些要求？

- A. 设置 Route 53 故障转移路由策略。配置健康检查以确定 ALB 端点的状态，并在故障转移时指向故障转移 S3 存储桶端点。
- B. 创建第二个 CloudFront 分发和一个 S3 静态网站来托管自定义错误页面。设置 Route 53 故障转移路由策略。在两个分发之间使用主动-被动配置。
- C. 创建一个具有两个来源的 CloudFront 来源组。将 ALB 端点设置为第一来源。对于第二来源，设置一个配置为托管静态网站的 S3 存储桶。为 CloudFront 分配设置来源故障转移。更新 S3 静态网站以包含自定义错误页面。
- D. 创建一个 CloudFront 函数，验证 ALB 返回的每个 HTTP 响应代码。在 S3 存储桶中创建一个静态网站。将自定义错误页面上传到 S3 存储桶作为故障转移。更新该函数以读取 S3 存储桶并向最终用户服务错误页面。

---

### 多选题 75/306

一家公司正在更新客户用于在线订购的应用程序。最近，针对该应用程序的恶意行为者的攻击数量有所增加。公司将在 Amazon Elastic Container Service（Amazon ECS）集群上托管更新后的应用程序。公司将使用 Amazon DynamoDB 存储应用程序数据。公共应用程序负载均衡器（ALB）将为最终用户提供访问应用程序的权限。公司必须防止攻击，并确保在持续攻击期间业务连续性，服务中断最小。哪种组合的步骤将以最具成本效益的方式满足这些要求？（选择两项）

- A. 创建一个带有 ALB 作为起源的 Amazon CloudFront 分发。在 CloudFront 域上添加自定义标头和随机值。配置 ALB 条件性转发流量，如果标头和值匹配。
- B. 在两个 AWS 区域中部署应用程序。配置 Amazon Route 53 以等权重路由到两个区域。
- C. 为 Amazon ECS 任务配置自动缩放。创建 DynamoDB 加速器（DAX）集群。
- D. 配置 Amazon ElastiCache 以减少对 DynamoDB 的开销。
- E. 部署包含适当规则组的 AWS WAF Web ACL。将 Web ACL 与 Amazon CloudFront 分发关联。

---

### 多选题 76/306

解决方案架构师正在创建一个应用程序，该程序在 Amazon S3 存储桶中存储对象。解决方案架构师必须在两个 AWS 区域中部署应用程序，这两个 S3 存储桶中的对象必须保持同步。哪种组合的步骤将以最小的运营开销满足这些要求？（选择三项）

- A. 创建一个 S3 多区域访问点。将应用程序更改为引用多区域访问点。
- B. 在两个 S3 存储桶之间配置双向 S3 跨区域复制（CRR）。
- C. 修改应用程序以在每个 S3 存储桶中存储对象。
- D. 为每个 S3 存储桶创建一个 S3 生命周期规则，以将对象从一个 S3 存储桶复制到另一个 S3 存储桶。
- E. 为每个 S3 存储桶启用 S3 版本控制。
- F. 为每个 S3 存储桶配置事件通知，调用 AWS Lambda 函数以将对象从一个 S3 存储桶复制到另一个 S3 存储桶。

---

### 单选题 77/306

一家公司使用 AWS 组织来管理 AWS 云中的多账户设置。公司的财务团队拥有一个数据处理应用程序，该应用程序使用 AWS Lambda 和 Amazon DynamoDB。公司的市场营销团队想要访问存储在 DynamoDB 表中的数据。解决方案架构师应该如何提供市场营销团队对 DynamoDB 表的适当访问？

- A. 为市场营销团队的 AWS 账户创建一个 SCP，授予对 DynamoDB 表特定属性的访问权限。将 SCP 附加到财务团队的 OU。
- B. 在财务团队的账户中创建一个 IAM 角色，使用 IAM 策略条件针对特定的 DynamoDB 属性（细粒度访问控制）。建立与市场营销团队账户的信任关系。在市场营销团队的账户中，创建一个 IAM 角色，该角色具有假设财务团队账户中 IAM 角色的权限。
- C. 创建一个资源型 IAM 策略，包括针对特定 DynamoDB 属性的条件（细粒度访问控制）。将策略附加到 DynamoDB 表。在市场营销团队的账户中，创建一个 IAM 角色，该角色具有访问财务团队账户中的 DynamoDB 表的权限。
- D. 在财务团队的账户中创建一个 IAM 角色以访问 DynamoDB 表。使用 IAM 权限边界限制对特定属性的访问。在市场营销团队的账户中，创建一个 IAM 角色，该角色具有假设财务团队账户中的 IAM 角色的权限。

---

### 单选题 78/306

一家公司的公共 API 作为任务在 Amazon Elastic Container Service (Amazon ECS) 上运行。这些任务在 AWS Fargate 上运行，并位于应用程序负载均衡器(ALB)后面，并且已配置基于 CPU 使用率的 Service Auto Scaling 来扩展任务。这项服务已经稳定运行了几个月。最近，API 性能下降，使应用程序无法使用。公司发现 API 遭受了大量的 SQL 注入攻击，并且 API 服务已扩展到其最大容量。解决方案架构师需要实施一种解决方案，以防止 SQL 注入攻击到达 ECS API 服务。该解决方案必须允许合法流量通过，并且必须最大化运营效率。哪种解决方案满足这些要求？

- A. 为转发到 ECS 任务前面的 ALB 的 HTTP 请求和 HTTPS 请求创建一个新的 AWS WAF Web ACL。
- B. 为 AWS WAF Bot Control 实施新的创建。在 AWS WAF Bot Control 管理规则组中添加一条规则以监控流量，并只允许合法流量到达 ECS 任务前面的 ALB。
- C. 为 SQL 数据库规则组匹配的请求创建一个新的 AWS WAF Web ACL。设置 Web ACL 以允许所有其他不匹配这些规则的流量。将 Web ACL 附加到 ECS 任务前面的 ALB。
- D. 为 AWS WAF 创建一个新的 Web ACL。在 AWS WAF 中创建一个新的空 IP 集。将新规则添加到 Web ACL，以阻止来自新 IP 集中的 IP 地址的请求。创建一个 AWS Lambda 函数，用于从 API 日志中抓取 IP 地址，这些 IP 地址发送 SQL 注入攻击，并将这些 IP 地址添加到 IP 集中。将 Web ACL 附加到 ECS 任务前面的 ALB。

---

### 单选题 79/306

一家公司在 AWS 云中运行一个处理引擎。该引擎处理来自物流中心的环境数据以计算可持续性指数。公司在遍布欧洲的物流中心拥有数百万设备。设备通过 RESTful API 将信息发送到处理引擎。API 经历了不可预测的流量突发。公司必须实施一个解决方案来处理设备发送给处理引擎的所有数据。数据丢失是不可接受的。哪种解决方案满足这些要求？

- A. 为 RESTful API 创建一个应用程序负载均衡器(ALB)。创建一个 Amazon Simple Queue Service (Amazon SQS) 队列。为 ALB 创建一个监听器和一个目标组。将 SQS 队列添加为目标。使用在 Amazon Elastic Container Service (Amazon ECS) 中运行的容器，使用 Fargate 启动类型来处理队列中的消息。
- B. 创建一个实现 RESTful API 的 Amazon API Gateway HTTP API。创建一个 Amazon Simple Queue Service (Amazon SQS) 队列。创建一个 API Gateway 服务集成到 SQS 队列。创建一个 AWS Lambda 函数来处理 SQS 队列中的消息。
- C. 创建一个实现 RESTful API 的 Amazon API Gateway REST API。创建一个 Auto Scaling 组中的 Amazon EC2 实例集群。创建一个 API Gateway Auto Scaling 组代理集成。使用 EC2 实例来处理传入的数据。
- D. 为 RESTful API 设置一个 Amazon CloudFront 分发。在 Amazon Kinesis Data Streams 中创建一个数据流。将数据流设置为分发的起源。创建一个 AWS Lambda 函数来消费和处理数据流中的数据。

---

### 单选题 80/306

一家公司运行一个应用程序，该程序从几个不同的来源整理数据。公司使用专有算法执行数据转换和聚合。公司在执行 ETL 过程后，将结果存储在 Amazon Redshift 表中。公司将这些数据出售给其他公司。公司从 Amazon Redshift 表中下载数据文件，并通过 FTP 将文件传输给几个数据客户。数据客户的数量显著增长。数据客户的管理变得困难。公司将使用 AWS Data Exchange 创建一个数据产品，以便公司可以与客户共享数据。公司希望在共享数据之前确认客户的身份。客户还需要在公司发布数据时访问到最新的数据。哪种解决方案以最小的运营开销满足这些要求？

- A. 使用 AWS Data Exchange for APIs 与客户共享数据。配置订阅验证。在生产数据的公司的 AWS 账户中，创建一个 Amazon API Gateway Data API 服务集成与 Amazon Redshift。要求数据客户订阅数据产品。
- B. 在生产数据的公司的 AWS 账户中，创建一个 AWS Data Exchange 数据共享，通过 AWS Data Exchange 连接到 Redshift 集群。配置订阅验证。要求数据客户订阅数据产品。
- C. 定期从 Amazon Redshift 表下载数据到 Amazon S3 存储桶。使用 AWS Data Exchange for S3 与客户共享数据。配置订阅验证。要求数据客户订阅数据产品。
- D. 将 Amazon Redshift 数据发布到 AWS Data Exchange 的开放数据。要求客户在 AWS Data Exchange 中订阅数据产品。在生产数据的公司的 AWS 账户中，附加 IAM 基于资源的策略到 Amazon Redshift 表，以仅允许经过验证的 AWS 账户访问。

---

### 单选题 81/306

一家公司正在使用 Amazon Connect 构建呼叫中心。公司的操作团队正在定义跨 AWS 区域的灾难恢复(DR)策略。联系中心拥有数十个联系流程、数百个用户和数十个已认领的电话号码。哪种解决方案提供最低的 RTO 灾难恢复？

- A. 创建一个 AWS Lambda 函数来检查 Amazon Connect 实例的可用性，并在不可用时向操作团队发送通知。创建一个 Amazon EventBridge 规则，每 5 分钟调用一次 Lambda 函数。通知后，指导操作团队使用 AWS 管理控制台在第二区域配置新的 Amazon Connect 实例。使用 AWS CloudFormation 模板部署联系流程、用户和已认领的电话号码。
- B. 在第二区域预配置一个新的 Amazon Connect 实例，包括所有现有用户。创建一个 AWS Lambda 函数来检查 Amazon Connect 实例的可用性。创建一个 Amazon EventBridge 规则，每 5 分钟调用一次 Lambda 函数。在出现问题时，配置 Lambda 函数部署一个 AWS CloudFormation 模板，该模板在第二区域配置联系流程和已认领的号码。
- C. 在第二区域预配置一个新的 Amazon Connect 实例，包括所有现有的联系流程和已认领的电话号码。为 Amazon Connect 实例的 URL 创建一个 Amazon Route 53 健康检查。为失败的健康检查创建一个 Amazon CloudWatch 警报。创建一个 AWS Lambda 函数部署一个 AWS CloudFormation 模板，该模板在第二区域配置所有用户。将警报配置为调用 Lambda 函数。
- D. 在第二区域预配置一个新的 Amazon Connect 实例，包括所有现有的用户和联系流程。为 Amazon Connect 实例的 URL 创建一个 Amazon Route 53 健康检查。为失败的健康检查创建一个 Amazon CloudWatch 警报。创建一个 AWS Lambda 函数部署一个 AWS CloudFormation 模板，该模板在第二区域配置已认领的电话号码。将警报配置为调用 Lambda 函数。

---

### 单选题 82/306

一家公司有一个应用程序，作为 Amazon Elastic Kubernetes Service (Amazon EKS) 集群中的多个 pod 的副本集(ReplicaSet)运行。EKS 集群的节点分布在多个可用区(Availability Zones)。应用程序生成许多小文件，这些文件必须对所有运行中的应用程序实例可访问。公司需要备份这些文件，并将备份保存 1 年。哪种解决方案在满足这些要求的同时，提供最快的存储性能？

- A. 创建一个 Amazon Elastic File System (Amazon EFS) 文件系统，为 EKS 集群中包含节点的每个子网创建一个挂载目标。配置副本集挂载文件系统。指导应用程序将文件存储在文件系统中。配置 AWS Backup 备份数据，并保留 1 年的副本。
- B. 创建一个 Amazon Elastic Block Store (Amazon EBS) 卷。启用 EBS 多附加功能。配置副本集挂载 EBS 卷。指导应用程序将文件存储在 EBS 卷中。配置 AWS Backup 备份数据，并保留 1 年的副本。
- C. 创建一个 Amazon S3 存储桶。配置副本集挂载 S3 存储桶。指导应用程序将文件存储在 S3 存储桶中。配置 S3 版本控制以保留数据副本。配置 S3 生命周期策略，在 1 年后删除对象。
- D. 配置副本集使用每个运行中的应用程序 pod 上可用的存储来存储文件。使用第三方工具备份 EKS 集群 1 年。

---

### 单选题 83/306

一家解决方案架构师需要评估一家新收购公司的应用程序和数据库组合。解决方案架构师必须为迁移到AWS创建一个商业案例。新收购的公司在本地数据中心运行应用程序。数据中心没有很好的文档记录。解决方案架构师无法立即确定存在多少应用程序和数据库。应用程序的流量是可变的。有些应用程序是在每个月底运行的批处理过程。解决方案架构师必须更好地了解组合，然后才能开始迁移到AWS。哪种解决方案将满足这些要求？

- A. 使用AWS服务器迁移服务（AWS SMS）和AWS数据库迁移服务（AWS DMS）进行评估迁移。使用AWS服务目录了解应用程序和数据库依赖关系。
- B. 使用AWS应用程序迁移服务。在本地基础设施上运行代理。使用AWS迁移中心管理代理。使用AWS存储网关评估本地存储需求和数据库依赖关系。
- C. 使用迁移评估生成服务器列表。构建业务案例报告。使用AWS迁移中心查看组合。使用AWS应用程序发现服务了解应用程序依赖关系。
- D. 在目标账户中使用AWS控制塔生成应用程序组合。使用AWS服务器迁移服务（AWS SMS）生成更深入的报告和业务案例。使用着陆区为核心账户和资源。

---

### 单选题 84/306

一家公司需要审计新收购的AWS账户的安全姿态。公司的数据安全团队仅在Amazon S3存储桶变为公开暴露时需要收到通知。公司已经建立了一个Amazon Simple Notification Service (Amazon SNS)主题，该主题已订阅了数据安全团队的电子邮件地址。哪种解决方案将满足这些要求？

- A. 在所有S3存储桶上创建S3事件通知，用于isPublic事件。选择SNS主题作为事件通知的目标。
- B. 在AWS Identity and Access Management Access Analyzer中创建一个分析器。为“Access Analyzer Finding”事件类型创建一个Amazon EventBridge规则，并使用“isPublic: true”过滤器。选择SNS主题作为EventBridge规则的目标。
- C. 为“Bucket-Level API Call via CloudTrail”事件类型创建一个Amazon EventBridge规则，并使用“PutBucketPolicy”过滤器。选择SNS主题作为EventBridge规则的目标。
- D. 激活AWS Config并添加cloudtrail-s3-dataevents-enabled规则。为“Config Rules Re-evaluation Status”事件类型创建一个Amazon EventBridge规则，并使用“NON_COMPLIANT”过滤器。选择SNS主题作为EventBridge规则的目标。

---

### 单选题 85/306

一家公司使用AWS CodeCommit存储库。公司必须在第二个AWS区域存储存储库中数据的备份副本。哪种解决方案将满足这些要求？

- A. 配置AWS Elastic Disaster Recovery以复制CodeCommit存储库数据到第二个区域。
- B. 使用AWS Backup每小时备份一次CodeCommit存储库。在第二个区域创建跨区域副本。
- C. 创建一个Amazon EventBridge规则，调用AWS CodeBuild，当公司向存储库推送代码时。使用CodeBuild克隆存储库。创建内容的.zip文件。将文件复制到第二个区域的S3存储桶中。
- D. 创建一个每小时调度的AWS Step Functions工作流，对CodeCommit存储库进行快照。配置工作流将快照复制到第二个区域的S3存储桶中。

---

### 多选题 86/306

一家公司有几个用于开发和生产应用的AWS账户。公司需要在当前的生产账户和未来的生产账户中强制执行Amazon Elastic Block Store (Amazon EBS)静态加密。公司需要一个包括内置蓝图和护栏的解决方案。哪种组合的步骤将满足这些要求？（选择三个）

- A. 使用AWS CloudFormation StackSets在生产账户上部署AWS Config规则。
- B. 在现有的开发人员账户中创建一个新的AWS Control Tower着陆区。为账户创建OU。分别将生产和开发账户添加到生产和开发OU。
- C. 在公司的管理账户中创建一个新的AWS Control Tower着陆区。分别将生产和开发账户添加到生产和开发OU。
- D. 邀请现有账户加入AWS Organizations组织。创建SCP以确保合规性。
- E. 从管理账户创建护栏以检测EBS加密。
- F. 为生产OU创建护栏以检测EBS加密。

---

### 单选题 87/306

一家公司在VPC中运行一个Web应用程序。Web应用程序在一组Amazon EC2实例上运行，这些实例位于一个应用负载均衡器(ALB)后面。ALB使用AWS WAF。一个外部客户需要连接到Web应用程序。公司必须向所有外部客户提供IP地址。哪种解决方案将以最小的运营开销满足这些要求？

- A. 用网络负载均衡器(NLB)替换ALB。为NLB分配一个弹性IP地址。
- B. 分配一个弹性IP地址。将弹性IP地址分配给ALB，并将弹性IP地址提供给客户。
- C. 创建一个AWS Global Accelerator标准加速器。指定ALB作为加速器的端点。向客户提供加速器的IP地址。
- D. 配置一个Amazon CloudFront分发。将ALB设置为起源。通过ping分发的DNS名称来确定分发的公共IP地址。将IP地址提供给客户。

---

### 单选题 88/306

一家快递公司在AWS云中运行一个无服务器解决方案。该解决方案管理用户数据、交付信息和过去的购买详情。该解决方案由几个微服务组成。中央用户服务在Amazon DynamoDB表中存储敏感数据。其他几个微服务在不同的存储服务中存储部分敏感数据的副本。公司需要在请求时能够删除用户信息。一旦中央用户服务删除了用户，其他每个微服务也必须立即删除其数据副本。哪种解决方案将满足这些要求？

- A. 在DynamoDB表上激活DynamoDB Streams。为DynamoDB流创建一个AWS Lambda触发器，该触发器将在Amazon Simple Queue Service (Amazon SQS)队列中发布有关用户删除的事件。配置每个微服务轮询队列并从DynamoDB表中删除用户。
- B. 在DynamoDB表上设置DynamoDB事件通知。创建一个Amazon Simple Notification Service (Amazon SNS)主题作为DynamoDB事件通知的目标。配置每个微服务订阅SNS主题，并从DynamoDB表中删除用户。
- C. 配置中央用户服务在删除用户时在自定义Amazon EventBridge事件总线上发布事件。为每个微服务创建一个EventBridge规则，以匹配用户删除事件模式，并在微服务中调用逻辑以从DynamoDB表中删除用户。
- D. 配置中央用户服务在删除用户时在Amazon Simple Queue Service (Amazon SQS)队列上发布消息。配置每个微服务在SQS队列上创建事件过滤器，并从DynamoDB表中删除用户。

---

### 单选题 89/306

一家公司正在使用Amazon EC2现货实例在一个自动缩放组中运行计算工作负载。启动模板使用两个放置组和单一实例类型。最近，一个监控系统报告了自动缩放实例启动失败，这与系统用户更长的等待时间相关。公司需要提高工作负载的整体可靠性。哪种解决方案将满足此要求？

- A. 将启动模板替换为使用基于属性的实例类型选择的自动缩放组的启动配置。
- B. 创建一个新的启动模板版本，使用基于属性的实例类型选择。配置自动缩放组使用新的启动模板版本。
- C. 更新启动模板自动缩放组以增加放置组的数量。
- D. 更新启动模板以使用更大的实例类型。

---

### 单选题 90/306

一家公司正在使用Amazon ElastiCache for Redis集群作为缓存层。最近的安全审计发现，公司已为ElastiCache配置了静态加密，但未配置ElastiCache使用传输中加密。此外，用户可以在没有身份验证的情况下访问缓存。解决方案架构师必须进行更改，以要求用户身份验证，并确保公司使用端到端加密。哪种解决方案将满足这些要求？

- A. 创建一个AUTH令牌。将令牌存储在AWS System Manager Parameter Store中，作为加密参数。创建一个新集群，使用AUTH，并配置传输中加密。更新应用程序在需要时从Parameter Store检索AUTH令牌，并使用AUTH令牌进行身份验证。
- B. 创建一个AUTH令牌。将令牌存储在AWS Secrets Manager中。配置现有集群使用AUTH令牌，并配置传输中加密。更新应用程序在需要时从Secrets Manager检索AUTH令牌，并使用AUTH令牌进行身份验证。
- C. 创建一个SSL证书。将证书存储在AWS Secrets Manager中。创建一个新集群，并配置传输中加密。更新应用程序在需要时从Secrets Manager检索SSL证书，并使用证书进行身份验证。
- D. 创建一个SSL证书。将证书存储在AWS Systems Manager Parameter Store中，作为加密的高级参数。更新现有集群以配置传输中加密。更新应用程序在需要时从Parameter Store检索SSL证书，并使用证书进行身份验证。

---

### 单选题 91/306

一家公司在私有子网中的Amazon EC2实例上运行应用程序，这些实例位于面向互联网的应用负载均衡器(ALB)后面。ALB是Amazon CloudFront分发的原始服务器。与CloudFront分发相关联的AWS WAF web ACL包含各种AWS管理规则。公司需要一个解决方案，以防止互联网流量直接访问ALB。哪种解决方案将以最小的运营开销满足这些要求？

- A. 创建一个新的web ACL，其中包含现有web ACL所包含的相同规则。将新的web ACL与ALB关联。
- B. 将现有的web ACL与ALB关联。
- C. 向ALB添加一个安全组规则，仅允许来自AWS管理的CloudFront前缀列表的流量。
- D. 向ALB添加一个安全组规则，仅允许各种CloudFront IP地址范围。

---

### 单选题 92/306

一家电信公司在AWS上运行应用程序。公司在公司的本地数据中心和AWS之间设置了AWS Direct Connect连接。公司在多个可用区的Amazon EC2实例上部署了应用程序，这些实例位于内部应用负载均衡器(ALB)后面。公司的客户端使用HTTPS从本地网络连接。TLS在ALB中终止。公司拥有多个目标组，并使用基于路径的路由根据URL路径转发请求。公司计划部署一个本地防火墙设备，该设备有一个基于IP地址的允许列表。解决方案架构师必须开发一个解决方案，以允许从本地网络到AWS的流量流动，以便客户端可以继续访问应用程序。哪种解决方案将满足这些要求？

- A. 配置现有的ALB以使用静态IP地址。将多个可用区的IP地址分配给ALB。将ALB IP地址添加到防火墙设备。
- B. 创建一个网络负载均衡器(NLB)。将NLB与多个可用区中的一个静态IP地址关联。为NLB创建一个ALB类型的目标组，并将现有的ALB添加到NLB。将NLB IP地址添加到防火墙设备。更新客户端以连接到NLB。
- C. 创建一个网络负载均衡器(NLB)。将LNB与多个可用区中的一个静态IP地址关联。将现有的目标组添加到NLB。更新客户端以连接到NLB。删除ALB。将NLB IP地址添加到防火墙设备。
- D. 创建一个网关负载均衡器(GWLB)。在多个可用区中为GWLB分配静态IP地址。为GWLB创建一个ALB类型的目标组，并添加现有的ALB。将GWLB IP地址添加到防火墙设备。更新客户端以连接到GWLB。

---

### 单选题 93/306

一家制造公司正在为其工厂构建检查解决方案。公司在每个装配线末端都有IP摄像机。公司已经使用Amazon SageMaker训练了一个机器学习（ML）模型，用于从静态图像中识别常见缺陷。公司希望在检测到缺陷时向工厂工人提供本地反馈。即使工厂的互联网连接中断，公司也必须能够提供此反馈。公司有一台本地Linux服务器，该服务器托管一个API，向工人提供本地反馈。公司应该如何部署ML模型以满足这些要求？

- A. 从每个IP摄像机设置Amazon Kinesis视频流到AWS。使用Amazon EC2实例获取流的静态图像。将图像上传到Amazon S3存储桶。部署一个带有ML模型的SageMaker端点。当新图像上传时，调用AWS Lambda函数调用推理端点。配置Lambda函数在检测到缺陷时调用本地API。
- B. 在本地服务器上部署AWS IoT Greengrass。将ML模型部署到Greengrass服务器。创建一个Greengrass组件从摄像机获取静态图像并运行推理。配置组件在检测到缺陷时调用本地API。
- C. 订购一个AWS Snowball设备。在Snowball设备上部署一个带有ML模型的SageMaker端点和一个Amazon EC2实例。从摄像机获取静态图像。从EC2实例运行推理。配置实例在检测到缺陷时调用本地API。
- D. 在每个IP摄像机上部署Amazon Monitron设备。在现场部署一个Amazon Monitron Gateway。将ML模型部署到Amazon Monitron设备。使用Amazon Monitron健康状态警报从AWS Lambda函数调用本地API，当检测到缺陷时。

---

### 单选题 94/306

一家公司正在使用Amazon API Gateway和AWS Lambda开发一个新的无服务器API。该公司将Lambda函数与API Gateway集成，使用多个共享库和自定义类。解决方案架构师需要简化解决方案的部署，并优化代码重用。哪种解决方案将满足这些要求？

- A. 将共享库和自定义类部署到Docker镜像中。将镜像存储在S3存储桶中。创建一个使用Docker镜像作为源的Lambda层。将API的Lambda函数作为Zip包部署。配置包使用Lambda层。
- B. 将共享库和自定义类部署到Docker镜像中。将镜像上传到Amazon Elastic Container Registry（Amazon ECR）。创建一个使用Docker镜像作为源的Lambda层。将API的Lambda函数作为Zip包部署。配置包使用Lambda层。
- C. 将共享库和自定义类部署到使用AWS Fargate启动类型的Amazon Elastic Container Service（Amazon ECS）的Docker容器中。将API的Lambda函数作为Zip包部署。配置包使用已部署的容器作为Lambda层。
- D. 将共享库、自定义类和API的Lambda函数代码部署到Docker镜像中。将镜像上传到Amazon Elastic Container Registry（Amazon ECR）。配置API的Lambda函数使用Docker镜像作为部署包。

---

### 单选题 95/306

一家全球性媒体公司正计划在两个大陆的用户集中地区部署多区域应用程序。Amazon DynamoDB全球表将支持部署，以保持跨两个大陆的用户体验一致性。每个部署都将有一个公共的应用负载均衡器（ALB）。公司内部管理公共DNS。公司希望通过顶级域名提供应用程序。哪种解决方案将以最小的努力满足这些要求？

- A. 将公共DNS迁移到Amazon Route 53。为顶级域名创建CNAME记录，指向ALB。使用地理位置路由策略根据用户位置路由流量。
- B. 在ALB前放置一个网络负载均衡器（NLB）。将公共DNS迁移到Amazon Route 53。为顶级域名创建一个CNAME记录，指向NLB的静态IP地址。使用地理位置路由策略根据用户位置路由流量。
- C. 创建一个AWS Global Accelerator加速器，配备多个目标端点组，目标端点在适当的AWS区域。使用加速器的静态IP地址在公共DNS中为顶级域名创建记录。
- D. 在其中一个AWS区域创建一个由AWS Lambda支持的Amazon API Gateway API。配置一个Lambda函数使用轮询方法路由流量到应用程序部署。为顶级域名创建指向API的URL的CNAME记录。

---

### 多选题 96/306

一家公司在AWS Elastic Beanstalk上部署了一个应用程序。该应用程序使用Amazon Aurora作为数据库层。一个Amazon CloudFront分发服务处理网络请求，并包括Elastic Beanstalk域名作为源服务器。分发配置了一个备用域名，访问者在访问应用程序时使用。每周，公司会将应用程序停机进行例行维护。在应用程序不可用时，公司希望访问者收到一条信息性消息，而不是CloudFront错误消息。一位解决方案架构师创建了一个Amazon S3存储桶作为流程的第一步。为了满足要求，解决方案架构师接下来应该采取哪些组合步骤？（选择三项）

- A. 将静态信息内容上传到S3存储桶。
- B. 创建一个新的CloudFront分发。将S3存储桶设置为来源。
- C. 将S3存储桶设置为原始CloudFront分发的第二个来源。配置分发和S3存储桶使用来源。
- D. 在每周维护期间，编辑默认缓存行为以使用S3来源。维护完成后恢复更改。
- E. 在每周维护期间，在新分发上为S3来源创建缓存行为。将路径模式设置为\。将优先级设置为0。维护完成后删除缓存行为。
- F. 在每周维护期间，配置Elastic Beanstalk从S3存储桶提供流量。

---

### 单选题 97/306

一家公司在AWS上运行着一个活动票务平台，希望优化该平台的成本效益。该平台部署在Amazon Elastic Kubernetes Service（Amazon EKS）上，使用Amazon EC2，并由Amazon RDS for MySQL数据库实例支持。该公司正在开发新的应用功能，以在AWS Fargate上运行于Amazon EKS。该平台经历需求的不频繁高峰。需求的激增取决于活动日期。哪种解决方案将为平台提供最具成本效益的设置？

- A. 为EKS集群使用的EC2实例购买标准预留实例。使用现货实例扩展集群以处理高峰。为数据库购买1年期全部预付费预留实例，以满足年度预测的高峰负载。
- B. 为EKS集群预测的中等负载购买计算节省计划。根据活动日期使用按需容量预留扩展集群以处理高峰。为数据库购买1年期无预付费预留实例，以满足预测的基础负载。在高峰期间临时扩展数据库只读副本。
- C. 为EKS集群预测的基础负载购买EC2实例节省计划。使用现货实例扩展集群以处理高峰。
- D. 为EKS集群预测的基础负载购买计算节省计划。使用现货实例扩展集群以处理高峰。

---

### 单选题 98/306

一家公司拥有一个对延迟敏感的交易平台，使用Amazon DynamoDB作为存储后端。公司将DynamoDB表配置为使用按需容量模式。解决方案架构师需要设计一个解决方案，以提高交易平台的性能。新解决方案必须确保交易平台的高可用性。哪种解决方案将以最少的延迟满足这些要求？

- A. 创建一个两节点的DynamoDB加速器（DAX）集群。配置应用程序使用DAX进行读写。
- B. 创建一个三节点的DynamoDB加速器（DAX）集群。配置应用程序使用DAX读取数据，直接写入DynamoDB表。
- C. 创建一个三节点的DynamoDB加速器（DAX）集群。配置应用程序直接从DynamoDB表读取数据，使用DAX写入数据。
- D. 创建一个单节点的DynamoDB加速器（DAX）集群。配置应用程序使用DAX读取数据，直接写入DynamoDB表。

---

### 单选题 99/306

一家公司希望使用AWS创建一个业务连续性解决方案，以防公司的主要本地应用程序发生故障。该应用程序运行在物理服务器上，这些服务器还运行其他应用程序。公司计划迁移的本地应用程序使用MySQL数据库作为数据存储。公司的所有本地应用程序都使用与Amazon EC2兼容的操作系统。哪种解决方案将以最少的操作开销实现公司的目标？

- A. 在源服务器上安装AWS复制代理，包括MySQL服务器。为所有服务器设置复制。启动测试实例进行定期演练。在发生故障事件时，切换到测试实例以转移工作负载。
- B. 在源服务器上安装AWS复制代理，包括MySQL服务器。在目标AWS区域初始化AWS弹性灾难恢复。定义启动设置。经常执行故障转移和回退，从最近的时间点开始。
- C. 创建AWS数据库迁移服务（AWS DMS）复制服务器和目标Amazon Aurora MySQL DB集群以托管数据库。创建DMS复制任务，将现有数据复制到目标DB集群。创建本地AWS Schema Conversion Tool（AWS SCT）变更数据捕获（CDC）任务，以保持数据同步。通过从兼容的基础AMI开始，在EC2实例上安装其余软件。
- D. 在本地部署AWS存储网关卷网关。在所有本地服务器上挂载卷。在新卷上安装应用程序和MySQL数据库。定期拍摄快照。通过从兼容的基础AMI开始，在EC2实例上安装所有软件。在EC2实例上启动卷网关。从最新快照恢复卷。在发生故障事件时，在EC2实例上挂载新卷。

---

### 单选题 100/306

一家国际快递公司在AWS上托管了一个快递管理系统。司机使用该系统上传交货确认。确认包括收件人的签名或收件人的包裹照片。司机的手持设备通过FTP将签名和照片上传到单个Amazon EC2实例。每个手持设备根据登录用户在目录中保存文件，文件名与交货号码匹配。然后EC2实例在查询中央数据库以获取交货信息后向文件添加元数据。然后将文件放置在Amazon S3中进行归档。随着公司的扩张，司机报告系统拒绝连接。FTP服务器因为断开的连接和内存问题而出现问题，作为对这些问题的响应，系统工程师安排了一个cron任务每30分钟重新启动EC2实例。计费团队报告说，文件并不总是在归档中，中央系统并不总是更新。解决方案架构师需要设计一个解决方案，以最大化可扩展性，确保归档始终接收到文件，并确保系统始终更新。手持设备无法修改，因此公司无法部署新应用程序。哪种解决方案将满足这些要求？

- A. 创建现有EC2实例的AMI。在应用程序负载均衡器后面创建一个EC2实例的自动扩展组。配置自动扩展组至少有三个实例。
- B. 使用AWS Transfer Family创建一个FTP服务器，将文件放置在Amazon Elastic File System（Amazon EFS）中。将EFS卷挂载到现有EC2实例上。将EC2实例指向文件处理的新路径。
- C. 使用AWS Transfer Family创建一个FTP服务器，将文件直接放置在Amazon S3中。使用Amazon S3事件通知通过Amazon Simple Notification Service（Amazon SNS）调用AWS Lambda函数。配置Lambda函数添加元数据并更新交货系统。
- D. 更新手持设备，直接将文件放置在Amazon S3中。使用Amazon S3事件通知通过Amazon Simple Queue Service（Amazon SQS）调用AWS Lambda函数。配置Lambda函数添加元数据并更新交货系统。

---

### 多选题 101/306

一家天气服务公司在AWS上托管了一个Web应用程序，提供高分辨率的天气地图，该应用程序在eu-west-1区域更新频繁，并与静态HTML内容一起存储在Amazon S3中。Web应用程序由Amazon CloudFront提供前端服务。公司最近扩展到服务us-east-1区域的用户，这些新用户报告说，有时查看他们的天气地图速度较慢。哪种组合的步骤将解决us-east-1的性能问题？（选择两个）

- A. 为eu-west-1中的S3存储桶配置AWS Global Accelerator端点。在us-east-1中为TCP端口80和443配置端点组。
- B. 在us-east-1中创建一个新的S3存储桶。配置S3跨区域复制，以从eu-west-1中的S3存储桶同步。
- C. 使用Lambda@Edge修改来自北美的请求，以使用us-east-1中的S3传输加速端点。
- D. 使用Lambda@Edge修改来自北美的请求，以使用us-east-1中的S3存储桶。
- E. 将AWS Global Accelerator（AWS全球加速器）位于us-east-1区域的终端节点配置为CloudFront分发的源站。使用Lambda@Edge修改来自北美的请求，使其使用这个新源站。




### 单选题 103/306

一家公司在单个Windows Amazon EC2实例上运行内容管理应用程序，该实例位于开发环境中。该应用程序读取和写入静态内容到附加到实例作为根设备的2 TB Amazon Elastic Block Store（Amazon EBS）卷。公司计划将此应用程序部署到生产环境中，作为一个高度可用和容错的解决方案，至少在多个可用区运行三个EC2实例。解决方案架构师必须设计一个解决方案，将运行应用程序的所有实例加入到Active Directory域中。该解决方案还必须实现Windows ACL，以控制对文件内容的访问。该应用程序必须始终在所有运行的实例中保持完全相同的内容。哪种解决方案以最少的管理开销满足这些要求？

- A. 创建Amazon Elastic File System（Amazon EFS）文件共享。创建一个跨越三个可用区并保持至少三个实例大小的自动扩展组。实现用户数据脚本以安装应用程序，将实例加入到AD域，并挂载EFS文件共享。
- B. 从当前运行的EC2实例创建一个新的AMI。创建一个Amazon FSx for Lustre文件系统。创建一个跨越三个可用区并保持至少三个实例大小的自动扩展组。实现用户数据脚本以将实例加入到AD域并挂载FSx for Lustre文件系统。
- C. 创建Amazon FSx for Windows File Server文件系统。创建一个跨越三个可用区并保持至少三个实例大小的自动扩展组。实现用户数据脚本以安装应用程序并挂载FSx for Windows File Server文件系统，配置AD域加入和Windows ACL权限。
- D. 从当前运行的EC2实例创建一个新的AMI。创建一个Amazon Elastic File System（Amazon EFS）文件系统。创建一个跨越三个可用区并保持至少三个实例大小的自动扩展组。执行无缝域加入以将实例加入到AD域。

---

### 单选题 104/306

一家公司有一个本地网站应用程序，为潜在的租户和买家提供房地产信息。该网站使用Java后端和NoSQL MongoDB数据库来存储订阅者数据。公司需要将整个应用程序迁移到AWS，并保持类似的结构。应用程序必须部署以实现高可用性，且公司不能对应用程序进行更改。哪种解决方案将满足这些要求？

- A. 使用Amazon Aurora DB集群作为订阅者数据的数据库。在多个可用区部署Amazon EC2实例的自动扩展组，用于Java后端应用程序。
- B. 使用Amazon EC2实例上的MongoDB作为订阅者数据的数据库。在单个可用区部署EC2实例的自动扩展组，用于Java后端应用程序。
- C. 配置Amazon DocumentDB（与MongoDB兼容）并使用适当大小的实例在多个可用区作为订阅者数据的数据库。在多个可用区部署Amazon EC2实例的自动扩展组，用于Java后端应用程序。
- D. 配置Amazon DocumentDB（与MongoDB兼容）以按需容量模式在多个可用区作为订阅者数据的数据库。在多个可用区部署Amazon EC2实例的自动扩展组，用于Java后端应用程序。

---

### 多选题 105/306

一家公司在单个AWS区域运行一个无服务器应用程序。该应用程序访问外部URL并从这些网站提取元数据。公司使用Amazon Simple Notification Service（Amazon SNS）主题发布URL到Amazon Simple Queue Service（Amazon SQS）队列。AWS Lambda函数使用队列作为事件源并处理队列中的URL。结果被保存到Amazon S3存储桶中。公司希望在其他区域处理每个URL以比较可能的站点本地化差异。URL必须从现有区域发布。结果必须写入当前区域中的现有S3存储桶。哪种组合的更改将产生一个满足这些要求的多区域部署？（选择两个）

- A. 将SQS队列与Lambda函数部署到其他区域。
- B. 在每个区域订阅SNS主题到SQS队列。
- C. 在每个区域订阅SQS队列到SNS主题。
- D. 配置SQS队列发布URL到每个区域的SNS主题。
- E. 将SNS主题和Lambda函数部署到其他区域。

---

### 多选题 106/306

一家公司使用AWS Organizations管理多个AWS账户。在根OU下，公司有两个OU：研究和DataOps。由于监管要求，公司在组织中部署的所有资源必须位于ap-northeast-1区域。此外，公司在DataOps OU中部署的EC2实例必须使用预定义的实例类型列表。解决方案架构师必须实施一个解决方案，以应用这些限制。该解决方案必须最大化运营效率，并且必须最小化持续维护。哪种组合的步骤将满足这些要求？（选择两个）

- A. 在DataOps OU下的某一个账户中创建一个IAM角色。在角色上使用ec2:InstanceType条件密钥的内联策略，限制对特定实例类型的访问。
- B. 在根OU下的所有账户中创建一个IAM用户。在每个用户的内联策略中使用aws:RequestedRegion条件密钥，限制对除ap-northeast-1之外的所有AWS区域的访问。
- C. 创建一个SCP。使用aws:RequestedRegion条件密钥限制对除ap-northeast-1之外的所有AWS区域的访问。将SCP应用于根OU。
- D. 创建一个SCP。使用ec2:Region条件密钥限制对除ap-northeast-1之外的所有AWS区域的访问。将SCP应用于根OU、DataOps OU和研究OU。
- E. 创建一个SCP。使用ec2:InstanceType条件密钥限制对特定实例类型的访问。将SCP应用于DataOps OU。

---

### 单选题 107/306

一家公司在AWS云中使用AWS Organizations进行多账户设置。公司使用AWS Control Tower进行治理，并使用AWS Transit Gateway实现跨账户的VPC连接。在AWS应用程序账户中，公司的应用团队部署了一个使用AWS Lambda和Amazon RDS的Web应用程序。公司的数据库管理员有一个单独的DBA账户，并使用该账户集中管理组织中的所有数据库。数据库管理员使用在DBA账户中部署的Amazon EC2实例来访问部署在应用程序账户中的RDS数据库。应用团队已将数据库凭据作为秘密存储在应用程序账户中的AWS Secrets Manager中。应用团队正在手动与数据库管理员共享这些秘密。这些秘密由Secrets Manager在应用程序账户中的默认AWS托管密钥加密。解决方案架构师需要实现一个解决方案，使数据库管理员能够访问数据库并消除手动共享秘密的需要。哪种解决方案将满足这些要求？

- A. 使用AWS Resource Access Manager（AWS RAM）从应用程序账户共享秘密到DBA账户。在DBA账户中创建一个名为DBA-Admin的IAM角色。授予该角色访问共享秘密所需的权限。将DBA-Admin角色附加到EC2实例以访问跨账户的秘密。
- B. 在应用程序账户中创建一个名为DBA-Secret的IAM角色。授予该角色访问秘密所需的权限。在DBA账户中创建一个名为DBA-Admin的IAM角色。授予DBA-Admin角色在应用程序账户中假设DBA-Secret角色所需的权限。将DBA-Admin角色附加到EC2实例以访问跨账户的秘密。
- C. 在DBA账户中创建一个名为DBA-Admin的IAM角色。授予该角色访问秘密和应用程序账户中默认AWS托管密钥所需的权限。在应用程序账户中，将基于资源的策略附加到密钥以允许来自DBA账户的访问。将DBA-Admin角色附加到EC2实例以访问跨账户的秘密。
- D. 在DBA账户中创建一个名为DBA-Admin的IAM角色。授予该角色访问应用程序账户中秘密所需的权限。在应用程序账户中附加一个SCP以允许从DBA账户访问秘密。将DBA-Admin角色附加到EC2实例以访问跨账户的秘密。

---

### 单选题 108/306

解决方案架构师必须分析公司的Amazon EC2实例和Amazon Elastic Block Store（Amazon EBS）卷，以确定公司是否有效地使用资源。公司运行了几个大型、高内存的EC2实例，以在活动/被动配置中托管数据库集群。这些EC2实例的利用率因使用数据库的应用程序而异，公司尚未确定模式。解决方案架构师必须分析环境并根据发现采取行动。哪种解决方案最符合成本效益？

- A. 使用AWS Systems Manager OpsCenter创建仪表板。为与EC2实例及其EBS卷相关的Amazon CloudWatch指标配置可视化。定期审查仪表板，并确定使用模式。根据指标的峰值调整EC2实例的大小。
- B. 为EC2实例及其EBS卷打开Amazon CloudWatch详细监控。创建并审查基于指标的仪表板。确定使用模式。根据指标的峰值调整EC2实例的大小。
- C. 在每个EC2实例上安装Amazon CloudWatch代理。打开AWS Compute Optimizer，并让它运行至少12小时。审查Compute Optimizer的建议，并按照指示调整EC2实例的大小。
- D. 注册AWS Enterprise Support计划。打开AWS Trusted Advisor。等待12小时。审查Trusted Advisor的建议，并按照指示调整EC2实例的大小。

---

### 单选题 109/306

一家公司的无服务器应用程序的外部审计揭示了IAM策略，这些策略授予了过多的权限。这些策略附加到公司的AWS Lambda执行角色。数百个公司的Lambda函数具有广泛的访问权限，例如对Amazon S3存储桶和Amazon DynamoDB表的完全访问权限。公司希望每个函数只有完成其任务所需的最小权限。解决方案架构师必须确定每个Lambda函数需要哪些权限。解决方案架构师应如何以最少的努力满足此要求？

- A. 设置Amazon CodeGuru以分析Lambda函数并搜索AWS API调用。为每个Lambda函数创建所需API调用和资源的清单。为每个Lambda函数创建新的IAM访问策略。审查新策略以确保它们满足公司的业务需求。
- B. 为AWS账户打开AWS CloudTrail日志记录。使用AWS Identity and Access Management Access Analyzer根据CloudTrail日志记录的活动生成IAM访问策略。审查生成的策略以确保它们满足公司的业务需求。
- C. 为AWS账户打开AWS CloudTrail日志记录。创建一个脚本，解析CloudTrail日志，搜索Lambda执行角色的AWS API调用，并创建摘要报告。审查报告。为每个Lambda函数创建提供更限制性权限的IAM访问策略。
- D. 为AWS账户打开AWS CloudTrail日志记录。将CloudTrail日志导出到Amazon S3。使用Amazon EMR处理Amazon S3中的CloudTrail日志，并生成每个执行角色使用的API调用和资源的报告。为每个角色创建新的IAM访问策略。将生成的角色导出到S3存储桶。审查生成的策略以确保它们满足公司业务需求。

---

### 多选题 110/306

一家软件公司在AWS上托管了一个应用程序，该应用程序在多个AWS账户和区域中拥有资源。该应用程序运行在us-east-1区域的一个应用程序VPC中的一组Amazon EC2实例上，该VPC的IPv4 CIDR块为10.10.0.0/16。在不同的AWS账户中，一个共享服务VPC位于us-east-2区域，其IPv4 CIDR块为10.10.10.0/24。当云工程师使用AWS CloudFormation尝试对等连接应用程序VPC与共享服务VPC时，一个错误消息指示对等连接失败。哪些因素可能导致此错误？（选择两个）

- A. 两个VPC的IPv4 CIDR范围重叠
- B. VPC不在相同的区域
- C. 一个或两个账户没有访问互联网网关的权限
- D. 其中一个VPC没有通过AWS Resource Access Manager共享
- E. 对等接受者账户中的IAM角色没有正确的权限

---

### 单选题 111/306

一家快递公司需要将其第三方路线规划应用程序迁移到AWS。第三方提供了一个来自公共注册表的受支持的Docker镜像。该镜像可以在尽可能多的容器中运行，以生成路线图。公司已将送货区域划分为拥有供应中心的区域，以便送货司机从中心到客户的行驶距离尽可能短。为了减少生成路线图所需的时间，每个区域都使用自己的一组Docker容器和自定义配置，该配置仅处理该区域的订单。公司需要能够根据运行容器的数量以成本效益的方式分配资源。哪种解决方案以最少的操作开销满足这些要求？

- A. 在Amazon EC2上创建Amazon Elastic Kubernetes Service（Amazon EKS）集群。使用Amazon EKS CLI启动计划应用程序的pod，并使用--tags选项为pod分配自定义标签。
- B. 在AWS Fargate上创建Amazon Elastic Kubernetes Service（Amazon EKS）集群。使用Amazon EKS CLI启动计划应用程序，并使用AWS CLI tag-resource API调用为pod分配自定义标签。
- C. 在Amazon EC2上创建Amazon Elastic Container Service（Amazon ECS）集群。使用AWS CLI run-tasks设置为true启动计划应用程序，并使用--tags选项为任务分配自定义标签。
- D. 在AWS Fargate上创建Amazon Elastic Container Service（Amazon ECS）集群。使用AWS CLI run-task命令，并设置enableECSManagedTags为true启动计划应用程序。使用--tags选项为任务分配自定义标签。

---

### 单选题 112/306

一家AWS合作伙伴公司正在使用其名为org1的组织构建AWS Organizations中的服务。该服务要求合作伙伴公司能够以最小的权限安全访问客户账户中的AWS资源，该客户账户位于名为org2的单独组织中。允许org1访问org2中的资源的最安全方式是什么？

- A. 客户应向合作伙伴公司提供他们的AWS账户访问密钥，以便登录并执行所需的任务。
- B. 客户应创建一个IAM用户，并为IAM用户分配所需的权限。然后，客户应向合作伙伴公司提供凭据，以便登录并执行所需的任务。
- C. 客户应创建一个IAM角色，并为IAM角色分配所需的权限。合作伙伴公司应在使用IAM角色的ARN请求访问以执行所需的任务时使用该角色。
- D. 客户应创建一个IAM角色，并为IAM角色分配所需的权限。合作伙伴公司应在使用IAM角色的ARN请求访问以执行所需的任务时使用该角色，包括IAM角色的信任策略中的外部ID。

---

### 多选题 113/306

一家公司正在运行一个关键应用程序，该程序使用Amazon RDS for MySQL数据库存储数据。RDS数据库实例部署在Multi-AZ模式下。最近的一次RDS数据库故障转移测试导致应用程序中断了40秒。解决方案架构师需要设计一个解决方案，将中断时间减少到20秒以下。解决方案架构师应采取哪些组合步骤来满足这些要求？（选择三个）

- A. 在数据库前使用Amazon ElastiCache for Memcached。
- B. 在数据库前使用Amazon ElastiCache for Redis。
- C. 在数据库前使用RDS Proxy。
- D. 将数据库迁移到Amazon Aurora MySQL。
- E. 创建一个Amazon Aurora副本。
- F. 创建一个RDS for MySQL只读副本。

---

### 多选题 114/306

一家公司正在将一些应用程序迁移到AWS。公司希望在确定网络和安全策略后，能够快速迁移和现代化应用程序。公司已在中央网络账户中设置了AWS Direct Connect连接。公司预计在不久的将来将拥有数百个AWS账户和VPC。企业网络必须能够无缝访问AWS上的资源，并且还必须能够与所有VPC通信。公司还希望通过其本地数据中心路由其云资源到互联网。哪些组合的步骤将满足这些要求？（选择三个）

- A. 在中央账户中创建Direct Connect网关。在每个账户中，使用Direct Connect网关和每个虚拟私有网关的账户ID创建关联提议。
- B. 在中央网络账户中创建Direct Connect网关和传输网关。使用传输VIF将传输网关连接到Direct Connect网关。
- C. 预配置一个互联网网关。将互联网网关连接到子网。允许通过网关的互联网流量。
- D. 与其他账户共享传输网关。将VPC连接到传输网关。
- E. 根据需要预配置VPC对等连接。
- F. 仅预配置私有子网。在传输网关和客户网关上打开必要的路由，以允许从AWS流向本地数据中心的NAT服务的出站互联网流量。

---

### 多选题 115/306

一家金融公司计划将其Web应用程序从本地迁移到AWS。公司使用第三方安全工具监控应用程序的入站流量。公司在过去15年中一直使用该安全工具，该工具的供应商没有提供云解决方案。公司的安全团队担心如何将安全工具与AWS技术集成。公司计划在Amazon EC2实例上部署应用程序迁移到AWS。EC2实例将在专用VPC中的自动扩展组中运行。公司需要使用安全工具检查进出VPC的所有数据包。这种检查必须实时进行，并且不能影响应用程序的性能。解决方案架构师必须设计一个在AWS区域内高度可用的目标架构。解决方案架构师应该采取哪些组合步骤来满足这些要求？（选择两个）

- A. 在现有VPC中部署安全工具的EC2实例到一个新的自动扩展组。
- B. 在安全工具实例前部署一个网络负载均衡器。
- C. 在安全工具实例前部署一个应用程序负载均衡器。
- D. 为每个可用区提供网关负载均衡器，以将流量重定向到安全工具。
- E. 为VPCs之间的通信提供传输网关。

---

### 单选题 116/306

一家公司正在AWS上构建软件即服务（SaaS）解决方案。公司已在多个AWS区域和同一生产账户中部署了Amazon API Gateway REST API与AWS Lambda集成。公司提供分层定价，允许客户支付每秒一定数量的API调用容量。高级层提供高达每秒3000个调用，客户通过唯一的API密钥进行识别。不同区域的几个高级层客户报告说，在高峰使用时段，他们收到多个API方法的错误响应429 Too Many Requests。日志显示Lambda函数从未被调用。这些客户的这些错误消息可能是什么原因？

- A. Lambda函数达到了并发限制。
- B. Lambda函数达到了其区域的并发限制。
- C. 公司达到了每秒调用次数的API Gateway账户限制。
- D. 公司达到了API Gateway每秒每个方法的默认限制。

---

### 多选题 117/306

一家公司希望迁移到AWS。公司希望使用多账户结构，集中管理所有账户和应用程序的访问。公司还希望保持流量在私有网络上。登录时需要多因素认证（MFA），并将特定角色分配给用户组。公司必须为开发、测试和生产创建单独的账户。生产账户和共享网络账户必须能够连接到所有账户。开发账户和测试账户只能相互访问。解决方案架构师应该采取哪些组合步骤来满足这些要求？（选择三个）

- A. 使用AWS Control Tower部署着陆区环境。将账户注册并邀请现有账户加入AWS Organizations中生成的组织。
- B. 在所有账户中启用AWS Security Hub以管理跨账户访问。通过AWS CloudTrail收集发现，以强制MFA登录。
- C. 在每个账户中创建传输网关和传输网关VPC连接。配置适当的路由表。
- D. 设置并启用AWS IAM Identity Center（AWS Single Sign-On）。为现有账户创建适当的权限集，并要求MFA。
- E. 在所有账户中启用AWS Control Tower以管理账户之间的路由。通过AWS CloudTrail收集发现，以强制MFA登录。
- F. 创建IAM用户和组。为所有用户配置MFA。设置Amazon Cognito用户池和身份池，以管理对账户和账户之间的访问。

---

### 多选题 118/306

一家公司在AWS云中运行应用程序。公司的安全团队必须批准所有新IAM用户的创建。当创建新的IAM用户时，必须自动移除该用户的所有访问权限。然后，安全团队必须收到批准该用户的提醒。哪种组合的步骤将满足这些要求？（选择三个）

- A. 创建一个Amazon EventBridge（Amazon CloudWatch Events）规则。定义一个模式，将detail-type值设置为AWS API Call via CloudTrail，并将eventName设置为CreateUser。
- B. 配置CloudTrail将CreateUser事件的通知发送到Amazon Simple Notification Service（Amazon SNS）主题。
- C. 调用在Amazon Elastic Container Service（Amazon ECS）中运行的容器，使用AWS Fargate技术来移除访问权限。
- D. 调用AWS Step Functions状态机来移除访问权限。
- E. 使用Amazon Simple Notification Service（Amazon SNS）通知安全团队。
- F. 使用Amazon Pinpoint通知安全团队。

---

### 单选题 119/306

一家零售公司在欧洲有一个本地数据中心。公司在AWS中也有一个多区域存在，包括eu-west-1和us-east-1区域。公司希望能够将其本地基础设施的网络流量路由到这些区域中的VPC。公司还需要支持在这些区域中的VPC之间直接路由流量。网络上不能存在单点故障。公司已经创建了两个1 Gbps AWS Direct Connect连接，从其本地数据中心连接出来。每个连接都进入欧洲的单独Direct Connect位置，以实现高可用性。这些两个位置分别命名为DX-A和DX-B。每个区域都有一个单独的AWS Transit Gateway，配置为在该区域内路由所有VPC间流量。哪种解决方案将满足这些要求？

- A. 从DX-A连接创建一个私有VIF到Direct Connect网关。从DX-B连接创建一个私有VIF到同一个Direct Connect网关，以实现高可用性。将eu-west-1和us-east-1的传输网关与Direct Connect网关关联。对等传输网关以支持跨区域路由。
- B. 从DX-A连接创建一个传输VIF到Direct Connect网关。将eu-west-1传输网关与此Direct Connect网关关联。从DX-B连接创建一个传输VIF到单独的Direct Connect网关。将us-east-1传输网关与此单独的Direct Connect网关关联。对等Direct Connect网关以支持高可用性和跨区域路由。
- C. 从DX-A连接创建一个传输VIF到Direct Connect网关。从DX-B连接创建一个传输VIF到同一个Direct Connect网关，以实现高可用性。将eu-west-1和us-east-1的传输网关与此Direct Connect网关关联。配置Direct Connect网关以在传输网关之间路由流量。
- D. 从DX-A连接创建一个传输VIF到Direct Connect网关。从DX-B连接创建一个传输VIF到同一个Direct Connect网关，以实现高可用性。将eu-west-1和us-east-1的传输网关与此Direct Connect网关关联。对等传输网关以支持跨区域路由。

---

### 单选题 120/306

一个团队收集并路由整个公司的行为数据。公司在多AZ VPC环境中运行，具有公共子网、私有子网和互联网网关。每个公共子网还包含一个NAT网关。公司的大多数应用程序都从Amazon Kinesis Data Streams读取和写入数据。大多数工作负载在私有子网中运行。解决方案架构师必须审查基础设施。解决方案架构师需要降低成本并保持应用程序的功能。解决方案架构师使用成本资源管理器，注意到EC2-Other类别的成本持续高企。进一步审查表明，NatGateway-Bytes收费增加了EC2-Other类别的成本。解决方案架构师应该做什么来满足这些要求？

- A. 启用VPC流日志。使用Amazon Athena分析日志，以消除可以移除的流量。确保安全组阻止负责高成本的流量。
- B. 为Kinesis Data Streams添加接口VPC端点到VPC。确保应用程序具有使用接口VPC端点的正确IAM权限。
- C. 启用VPC流日志和Amazon Detective。审查Detective发现的与Kinesis Data Streams无关的流量。配置安全组以阻止该流量。
- D. 为Kinesis Data Streams添加接口VPC端点到VPC。确保VPC端点策略允许来自应用程序的流量。

---

### 多选题 121/306

一家公司拥有本地监控解决方案，使用PostgreSQL数据库持久化事件。数据库由于大量摄取而无法扩展，并且经常耗尽存储空间。公司想要创建一个混合解决方案，并且已经在其网络和AWS之间设置了VPN连接。解决方案应包括以下属性：
• 管理AWS服务以最小化操作复杂性。
• 一个自动扩展以匹配数据吞吐量并且不需要持续管理的缓冲区。
• 一个可视化工具，用于创建仪表板，以近乎实时地观察事件。
• 支持半结构化JSON数据和动态模式。
哪种组件组合将使公司能够创建一个满足这些要求的监控解决方案？（选择两个）

- A. 使用Amazon Kinesis Data Firehose缓冲事件。创建一个AWS Lambda函数来处理和转换事件。
- B. 创建一个Amazon Kinesis数据流以缓冲事件。创建一个AWS Lambda函数来处理和转换事件。
- C. 配置Amazon Aurora PostgreSQL DB集群接收事件。使用Amazon QuickSight从数据库读取并创建近乎实时的可视化和仪表板。
- D. 配置Amazon Elasticsearch Service（Amazon ES）接收事件。使用与Amazon ES一起部署的Kibana端点创建近乎实时的可视化和仪表板。
- E. 配置Amazon Neptune DB实例接收事件。使用Amazon QuickSight从数据库读取并创建近乎实时的可视化和仪表板。

---

### 多选题 122/306

一家公司正在AWS云中开发和托管几个项目。这些项目在AWS Organizations中的同一个组织下跨多个AWS账户开发。公司要求将云基础设施的成本分配给拥有项目的项目。负责所有AWS账户的团队发现，几个Amazon EC2实例缺少用于成本分配的项目标签。解决方案架构师应该采取哪些行动来解决问题并防止将来再次发生？（选择三个）

- A. 在每个账户中创建一个AWS Config规则，查找缺少标签的资源。
- B. 在组织中创建一个服务控制策略（SCP），如果缺少 “Project” 标签，则对 ec2:RunInstances 操作执行拒绝动作。
- C. 使用组织中的Amazon Inspector查找缺少标签的资源。
- D. 在每个账户中创建一个IAM策略，拒绝缺少项目标签的ec2:RunInstances操作。
- E. 为组织创建一个AWS Config聚合器，收集缺少项目标签的EC2实例列表。
- F. 使用AWS Security Hub聚合缺少项目标签的EC2实例列表。

---

### 单选题 123/306

一家大型移动游戏公司已成功将其所有本地基础设施迁移到AWS云。解决方案架构师正在审查环境，以确保它是根据设计构建的，并与Well-Architected Framework保持一致运行。在审查成本资源管理器中的前期成本时，解决方案架构师注意到，创建和随后终止几个大型实例类型的成本占成本的很大一部分。解决方案架构师发现，公司的开发者在测试中启动了新的Amazon EC2实例，而开发者没有使用适当的实例类型。解决方案架构师必须实施一种控制机制，以限制开发者只能启动实例类型。哪种解决方案将满足这些要求？

- A. 在AWS Config中创建一个期望的实例类型管理规则。使用允许的实例类型配置规则。将规则附加到事件上，每次启动新的EC2实例时都运行。
- B. 在EC2控制台中创建一个启动模板，指定允许的实例类型。将启动模板分配给开发者的IAM账户。
- C. 创建一个新的IAM策略。指定允许的实例类型。将策略附加到包含开发者IAM账户的IAM组。
- D. 使用EC2 Image Builder为开发者创建一个映像管道，并协助他们创建一个黄金映像。

---

### 单选题 124/306

解决方案架构师正在为一家公司审计AWS Lambda函数的安全设置。Lambda函数从Amazon Aurora数据库检索最新更改。Lambda函数和数据库在同一个VPC中运行。Lambda环境变量为Lambda函数提供数据库凭据。Lambda函数聚合数据，并将数据在Amazon S3存储桶中提供，该存储桶配置为使用AWS KMS管理的加密密钥（SSE-KMS）进行服务器端加密。数据不得通过互联网传输。如果任何数据库凭据被泄露，公司需要一个解决方案，最小化泄露的影响。解决方案架构师应该推荐什么来满足这些要求？

- A. 在Aurora DB集群上启用IAM数据库身份验证。更改Lambda函数的IAM角色，以允许函数使用IAM数据库身份验证访问数据库。在VPC中部署Amazon S3的网关VPC端点。
- B. 在Aurora DB集群上启用IAM数据库身份验证。更改Lambda函数的IAM角色，以允许函数使用IAM数据库身份验证访问数据库。在数据传输期间对连接到Amazon S3的连接实施HTTPS。
- C. 将数据库凭据保存在AWS系统管理器参数存储中。在参数存储中的凭据上设置密码轮换。更改Lambda函数的IAM角色，以允许函数访问参数存储。修改Lambda函数以从参数存储中检索凭据。在VPC中部署Amazon S3的网关VPC端点。
- D. 将数据库凭据保存在AWS Secrets Manager中。在Secrets Manager中的凭据上设置密码轮换。更改Lambda函数的IAM角色，以允许函数访问Secrets Manager。修改Lambda函数以从Secrets Manager中检索凭据。在数据传输期间对连接到Amazon S3的连接实施HTTPS。

---

### 单选题 125/306

一家公司希望在多个AWS账户中部署AWS WAF解决方案以管理WAF规则。这些账户在AWS Organizations的不同OUs下进行管理。管理员必须能够根据需要添加或删除账户或OUs的受管理WAF规则集。管理员还必须能够自动更新和修复所有账户中的不符合WAF规则。哪种解决方案以最少的操作开销满足这些要求？

- A. 使用AWS防火墙管理器跨组织账户管理WAF规则。使用AWS系统管理器参数存储存储账户号码和OUs以进行管理。根据需要更新参数以添加或删除账户或OUs。使用Amazon EventBridge规则识别参数的任何更改，并调用AWS Lambda函数更新防火墙管理器管理账户中的安全策略。
- B. 部署一个组织范围的AWS Config规则，要求所选OUs中的所有资源关联WAF规则。使用AWS Lambda部署自动化补救操作以修复不符合资源。使用AWS CloudFormation堆栈集部署WAF规则，以针对应用AWS Config规则的相同OUs。
- C. 在组织的管理账户中创建WAF规则。使用AWS Lambda环境变量存储要管理的账户号码和OUs。根据需要更新环境变量以添加或删除账户或OUs。在成员账户中创建跨账户IAM角色。使用AWS安全令牌服务（AWS STS）在Lambda函数中假设角色，在成员账户中创建和更新WAF规则。
- D. 使用AWS控制塔跨组织账户管理WAF规则。使用AWS密钥管理服务（AWS KMS）存储要管理的账户号码和OUs。根据需要更新AWS KMS以添加或删除账户或OUs。在成员账户中创建IAM用户。允许AWS控制塔在管理账户中使用访问密钥和秘密访问密钥，在成员账户中创建和更新WAF规则。

---

### 单选题 126/306

一家大型公司正在运行一个流行的Web应用程序。该应用程序运行在多个Amazon EC2 Linux实例上，这些实例位于一个自动扩展组中的私有子网中。应用程序负载均衡器针对自动扩展组中的实例。AWS系统管理会话管理器已配置，所有EC2实例上都运行着AWS系统管理代理。公司最近发布了新版本的应用程序。一些EC2实例现在被标记为不健康并被终止。因此，应用程序以降低的容量运行。解决方案架构师试图通过分析从应用程序收集的Amazon CloudWatch日志来确定根本原因，但日志无法确定。解决方案架构师应该如何获得对EC2实例的访问权限以排除问题？哪种解决方案将满足这些要求？

- A. 暂停自动扩展组的HealthCheck扩展进程。使用会话管理器登录到被标记为不健康的实例。
- B. 启用EC2实例的终止保护。使用会话管理器登录到被标记为不健康的实例。
- C. 将自动扩展组的终止策略设置为OldestInstance。使用会话管理器登录到被标记为不健康的实例。
- D. 暂停自动扩展组的Terminate进程。使用会话管理器登录到被标记为不健康的实例。

---

### 单选题 127/306

一家零售公司拥有一个组织结构，该组织是AWS Organizations的一部分。公司已经设置了统一计费，并将其部门映射到以下OUs：财务、销售、人力资源（HR）、市场营销和运营。每个OU都有多个AWS账户，每个部门的每个环境都有一个账户。这些环境包括开发、测试、预生产和生产。人力资源部门将在3个月内发布一个新系统。为此，人力资源部门已经在其生产AWS账户中购买了几个预留实例（RIs）。人力资源部门希望确保其他部门不能共享RI折扣。哪种解决方案将满足这些要求？

- A. 在人力资源部门生产账户的AWS计费和成本管理控制台中关闭RI共享。
- B. 将人力资源部门的生产AWS账户从组织中移除。将账户添加到统一计费配置中。
- C. 在AWS计费和成本管理控制台中。使用组织的管理账户关闭人力资源部门生产AWS账户的RI共享。
- D. 在组织中创建一个SCP，以限制对RI的访问。将SCP应用于其他部门的OUs。

---

### 单选题 128/306

一家金融公司正在其当前一代Linux EC2实例上运行其业务关键应用程序。该应用程序包括一个执行重型I/O操作的自行管理MySQL数据库。该应用程序在一个月的大部分时间里都能很好地处理适量的流量。然而，在每个月的最后三天，由于月底报告，即使公司在其基础设施中使用了弹性负载均衡器和自动扩展来满足增加的需求，应用程序的速度也会变慢。以下哪种操作将允许数据库在月底负载下以最小的性能影响进行处理？

- A. 预热弹性负载均衡器，使用更大的实例类型，将所有Amazon EBS卷更改为GP2卷。
- B. 将数据库集群一次性迁移到Amazon RDS，并创建几个额外的只读副本，以在月底处理负载。
- C. 使用Amazon CloudWatch和AWS Lambda根据特定的CloudWatch指标更改Amazon EBS卷的类型、大小或IOPS。
- D. 用具有最大可用存储大小和每秒I/O的PIOPS卷替换所有现有的Amazon EBS卷，在月底之前拍摄快照，然后在月底之后恢复。

---

### 单选题 129/306

一家公司使用AWS Elastic Beanstalk和Java开发了一个试点应用程序。为了在开发过程中节省成本，公司的开发团队将应用程序部署到了一个单实例环境中。最近的测试表明，应用程序消耗的CPU比预期的要多。CPU利用率经常超过85%，导致一些性能瓶颈。解决方案架构师必须在公司将应用程序发布到生产环境之前缓解性能问题。哪种解决方案将以最少的操作开销满足这些要求？

- A. 创建一个新的Elastic Beanstalk应用程序。选择一个负载均衡的环境类型。选择所有可用区。添加一个扩展规则，如果最大CPU利用率在5分钟内超过85%，则运行该规则。
- B. 创建第二个Elastic Beanstalk环境。应用流量分割部署策略。如果平均CPU利用率在5分钟内超过85%，则指定一部分传入流量导向新环境。
- C. 修改现有环境的容量配置，使用负载均衡的环境类型。选择所有可用区。添加一个扩展规则，如果平均CPU利用率在5分钟内超过85%，则运行该规则。
- D. 选择负载均衡选项，执行重建环境操作。选择一个可用区。添加一个扩展规则，如果总CPU利用率在5分钟内超过85%，则运行该规则。

---

### 单选题 130/306

一家公司在AWS的多账户环境中运行应用程序。公司的Sales团队和Marketing团队在AWS Organizations中使用单独的AWS账户。Sales团队在Amazon S3存储桶中存储了数PB的数据。Marketing团队使用Amazon QuickSight进行数据可视化。Marketing团队需要访问Sales团队存储在S3存储桶中的数据。公司已经使用AWS Key Management Service（AWS KMS）密钥对S3存储桶进行了加密。Marketing团队已经在Marketing AWS账户中为QuickSight创建了IAM服务角色，以提供QuickSight访问权限。公司需要一个解决方案，以最小的运营开销安全地跨AWS账户访问S3存储桶中的数据。哪种解决方案将满足这些要求？

- A. 在Marketing账户中创建一个新的S3存储桶。在Sales账户中创建一个S3复制规则，将对象复制到Marketing账户中的新S3存储桶。更新Marketing账户中的QuickSight权限，以授予对新S3存储桶的访问权限。
- B. 创建一个SCP，授予Marketing账户对S3存储桶的访问权限。使用AWS Resource Access Manager（AWS RAM）从Sales账户共享KMS密钥到Marketing账户。更新Marketing账户中的QuickSight权限，以授予对S3存储桶的访问权限。
- C. 更新Marketing账户中的S3存储桶策略，以授予QuickSight角色访问权限。为S3存储桶中使用的加密密钥创建一个KMS授权。授予QuickSight角色解密访问权限。更新Marketing账户中的QuickSight权限，以授予对S3存储桶的访问权限。
- D. 在Sales账户中创建一个IAM角色，并授予对S3存储桶的访问权限。从Marketing账户中假设Sales账户中的IAM角色以访问S3存储桶。更新QuickSight角色，以创建与Sales账户中的新IAM角色的信任关系。



### 单选题 131/306

一家公司推出了一项新政策，允许员工在通过VPN连接时在家远程工作。公司在多个AWS账户中的VPC上托管内部应用程序。目前，这些应用程序可以通过AWS站点到站点VPN连接从公司的本地办公网络访问。公司的主要AWS账户中的VPC已经与其他AWS账户中的VPC建立了对等连接。解决方案架构师必须为在家工作的员工设计一个可扩展的AWS客户端VPN解决方案。哪种解决方案最符合成本效益？

- A. 在每个AWS账户中创建客户端VPN端点。配置所需的路由以允许访问内部应用程序。
- B. 在主要AWS账户中创建客户端VPN端点。配置所需的路由以允许访问内部应用程序。
- C. 在主要AWS账户中创建客户端VPN端点。配置一个传输网关，连接到每个AWS账户。配置所需的路由以允许访问内部应用程序。
- D. 在主要AWS账户中创建客户端VPN端点。建立客户端VPN端点与AWS站点到站点VPN的路由关联，通过传输网关访问其他账户VPC。

---

### 单选题 132/306

一家公司在AWS Organizations中拥有许多AWS账户的组织。解决方案架构师必须改进公司如何在组织中的AWS账户中管理常见的安全组规则。公司在每个AWS账户中都有一个允许列表中常见的IP CIDR范围集，以允许从公司的本地网络访问。每个账户中的开发人员负责向他们的安全组添加新的IP CIDR范围。安全团队有自己的AWS账户。目前，安全团队在允许列表更改时通知其他AWS账户的所有者。解决方案架构师必须设计一个解决方案，将常见的CIDR范围集分发到所有账户。哪种解决方案以最少的操作开销满足这些要求？

- A. 在安全团队的AWS账户中设置Amazon Simple Notification Service（Amazon SNS）主题。在每个AWS账户中部署AWS Lambda函数。配置Lambda函数，使其在每次SNS主题接收到消息时运行。配置Lambda函数以接受IP地址作为输入，并将其添加到账户中的安全组列表中。指示安全团队通过发布消息到其SNS主题来分发更改。
- B. 在组织中的每个AWS账户中创建新的客户管理的前缀列表。在每个账户中用所有内部CIDR范围填充前缀列表。通知每个AWS账户的所有者允许新的客户管理的前缀列表ID。指示安全团队与每个AWS账户的所有者分享更新。
- C. 在安全团队的AWS账户中创建一个新的客户管理的前缀列表。用所有内部CIDR范围填充客户管理的前缀列表。使用AWS Resource Access Manager与组织共享客户管理的前缀列表。通知每个AWS账户的所有者在其安全组中允许新的客户管理的前缀列表ID。
- D. 在组织的每个账户中创建IAM角色。授予更新安全组的权限。在安全团队的AWS账户中部署AWS Lambda函数。配置Lambda函数以接受内部IP地址列表作为输入，在每个组织账户中假设角色，并将IP地址列表添加到每个账户的安全组中。

---

### 单选题 133/306

一家公司开发了一个Web应用程序。公司在一组Amazon EC2实例上托管该应用程序，这些实例位于应用程序负载均衡器后面。公司希望提高应用程序的安全性，并计划使用AWS WAF Web ACL。解决方案架构师应如何配置Web ACL以满足这些要求？

- A. 将Web ACL规则的操作设置为Count。启用AWS WAF日志记录。分析请求是否存在误报。修改规则以避免任何误报。随着时间的推移，将Web ACL规则的操作从Count更改为Block。
- B. 仅在Web ACL中使用基于速率的规则，并将限速设置尽可能高。暂时阻止超出限制的所有请求。定义嵌套规则以缩小速率跟踪的范围。
- C. 将Web ACL规则的操作设置为Block。仅在Web ACL中使用AWS管理的规则组。使用Amazon CloudWatch指标和AWS WAF采样请求或AWS WAF日志评估规则组。
- D. 仅在Web ACL中使用自定义规则组，并将操作设置为Allow。启用AWS WAF日志记录。分析请求是否存在误报。修改规则以避免任何误报。随着时间的推移，将Web ACL规则的操作从Allow更改为Block。

---

### 单选题 134/306

解决方案架构师需要为将存储在新Amazon S3存储桶中的对象实现客户端加密机制。解决方案架构师为此目的创建了一个存储在AWS Key Management Service（AWS KMS）中的CMK。解决方案架构师创建了以下IAM策略，并将其附加到IAM角色：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DownloadUpload",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::BucketName/*"
    },
    {
      "Sid": "KMSAccess",
      "Action": [
        "kms:Decrypt",
        "kms:Encrypt"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:kms:Region:Account:key/Key ID"
    }
  ]
}
```

在测试期间，解决方案架构师能够成功获取S3存储桶中的现有测试对象。然而，尝试上传新对象时出现了错误消息。错误消息指出该操作被禁止。解决方案架构师必须向IAM策略添加哪种操作以满足所有要求？

- A. kms:GenerateDataKey
- B. kms:GetKeyPolicy
- C. kms:GetPublicKey
- D. kms:Sign

---

### 单选题 135/306

一家公司正在AWS云中重构其本地订单处理平台。该平台包括托管在VM群集上的Web前端、连接前端和后端的RabbitMQ，以及运行容器化后端系统的Kubernetes集群以处理订单。公司不想对应用程序进行任何重大更改。哪种解决方案将以最小的运营开销满足这些要求？

- A. 创建Web服务器VM的AMI。创建使用AMI和应用程序负载均衡器的Amazon EC2自动扩展组。设置Amazon MQ以替换本地消息队列。配置Amazon Elastic Kubernetes Service（Amazon EKS）托管订单处理后端。
- B. 为Web服务器环境创建自定义AWS Lambda运行时。创建Amazon API Gateway API以替换前端Web服务器。设置Amazon MQ以替换本地消息队列。配置Amazon Elastic Kubernetes Service（Amazon EKS）托管订单处理后端。
- C. 创建Web服务器VM的AMI。创建使用AMI和应用程序负载均衡器的Amazon EC2自动扩展组。设置Amazon MQ以替换本地消息队列。在不同的EC2实例上安装Kubernetes以托管订单处理后端。
- D. 创建Web服务器VM的AMI。创建使用AMI和应用程序负载均衡器的Amazon EC2自动扩展组。设置Amazon Simple Queue Service（Amazon SQS）队列以替换本地消息队列。配置Amazon Elastic Kubernetes Service（Amazon EKS）托管订单处理后端。

---

### 单选题 136/306

一家公司已将其表单处理应用程序迁移到AWS。当用户与应用程序交互时，他们通过Web应用程序上传扫描的表单文件。数据库存储用户元数据和存储在Amazon S3中的文件引用。Web应用程序在Amazon EC2实例上运行，使用Amazon RDS for PostgreSQL数据库。当表单上传时，应用程序通过Amazon Simple Notification Service（Amazon SNS）向团队发送通知。然后，团队成员登录并处理每个表单。团队成员对表单进行数据验证，提取相关数据，然后输入信息到使用API的另一个系统中。解决方案架构师需要自动化表单的手动处理。解决方案必须提供准确的表单提取，最小化上市时间，并最小化长期运营开销。哪种解决方案将满足这些要求？

- A. 开发自定义库以对表单执行光学字符识别（OCR）。将库部署到Amazon Elastic Kubernetes Service（Amazon EKS）集群作为应用程序层。使用此层在上传表单时处理表单。将输出存储在Amazon S3中。通过提取数据到Amazon DynamoDB表中来解析此输出。将数据提交到目标系统的API。
- B. 使用AWS Step Functions和AWS Lambda扩展系统作为应用程序层。配置此层在表单上传时使用训练并托管在EC2实例上的人工智能和机器学习（AI/ML）模型执行OCR。将输出存储在Amazon S3中。通过提取应用程序层中所需的数据来解析此输出。将数据提交到目标系统的API。
- C. 在EC2实例上托管新的应用程序层。使用此层调用托管在Amazon SageMaker中的人工智能和机器学习（AI/ML）模型的端点，以对表单执行OCR。将输出存储在Amazon ElastiCache中。通过提取应用程序层中所需的数据来解析此输出。将数据提交到目标系统的API。
- D. 使用AWS Step Functions和AWS Lambda扩展系统作为应用程序层。配置此层在表单上传时使用Amazon Textract和Amazon Comprehend执行OCR。将输出存储在Amazon S3中。通过提取应用程序层中所需的数据来解析此输出。将数据提交到目标系统的API。

---

### 单选题 137/306

一家公司在AWS云中运行应用程序。该应用程序收集并存储大量非结构化数据在Amazon S3存储桶中。S3存储桶包含数TB的数据，并使用S3标准存储类别。数据每天增加数GB。公司需要查询和分析数据。公司不会访问超过1年前的数据。然而，由于合规原因，公司必须无限期保留所有数据。哪种解决方案最具成本效益？

- A. 使用S3选择查询数据。创建一个S3生命周期策略，将超过1年的数据转换为S3冰川深归档。
- B. 使用Amazon Redshift Spectrum查询数据。创建一个S3生命周期策略，将超过1年的数据转换为S3冰川。
- C. 使用AWS Glue数据目录和Amazon Athena查询数据。创建一个S3生命周期策略，将超过1年的数据转换为S3冰川深归档。
- D. 使用Amazon Redshift Spectrum查询数据。创建一个S3生命周期策略，将超过1年的数据转换为S3智能分层。

---

### 单选题 138/306

一家公司由两个独立的业务单位组成。每个业务单位在AWS Organizations中的单一组织内都有自己的AWS账户。业务单位定期相互共享敏感文件。为了便于共享，公司在每个账户中创建了一个Amazon S3存储桶，并在S3存储桶之间配置了低延迟复制。S3存储桶中有数百万对象。最近，安全审计发现两个S3存储桶都没有启用静态加密。公司政策要求所有文件必须使用静态加密存储。公司希望实现使用Amazon S3管理的加密密钥（SSE-S3）的服务器端加密。哪种解决方案最符合操作效率要求？

- A. 在两个S3存储桶上启用SSE-S3。使用S3批量操作在同一位置复制和加密对象。
- B. 在每个账户中创建一个AWS Key Management Service（AWS KMS）密钥。使用相应的KMS密钥在每个S3存储桶上启用服务器端加密（SSE-KMS），并使用AWS CLI中的S3复制命令加密现有对象。
- C. 在两个S3存储桶上启用SSE-S3。使用AWS CLI中的S3复制命令加密现有对象。
- D. 在每个账户中创建一个AWS Key Management Service（AWS KMS）密钥。使用相应的KMS密钥在每个S3存储桶上启用服务器端加密（SSE-KMS），并使用S3批量操作将对象复制到同一位置。

---

### 单选题 139/306

一家公司为其NAT网关启用了VPC流日志。公司看到来自公共IP地址198.51.100.2的入站流量，目的地是私有Amazon EC2实例，动作是ACCEPT。公司想要确定流量是否代表来自互联网的未经请求的入站连接。VPC CIDR块的前两个八位字节是203.0。解决方案架构师应该采取哪套步骤来满足这些要求？

- A. 打开AWS CloudTrail控制台。选择包含NAT网关的弹性网络接口和私有实例的弹性网络接口的日志组。运行查询以过滤目标地址设置为"like 203.0"，源地址设置为"like 198.51.100.2"。运行stats命令以过滤源地址和目标地址传输的总字节数。
- B. 打开Amazon CloudWatch控制台。选择包含NAT网关的弹性网络接口和私有实例的弹性网络接口的日志组。运行查询以过滤目标地址设置为"like 203.0"，源地址设置为"like 198.51.100.2"。运行stats命令以过滤源地址和目标地址传输的总字节数。
- C. 打开AWS CloudTrail控制台。选择包含NAT网关的弹性网络接口和私有实例的弹性网络接口的日志组。运行查询以过滤目标地址设置为"like 198.51.100.2"，源地址设置为"like 203.0"。运行stats命令以过滤源地址和目标地址传输的总字节数。
- D. 打开Amazon CloudWatch控制台。选择包含NAT网关的弹性网络接口和私有实例的弹性网络接口的日志组。运行查询以过滤目标地址设置为"like 198.51.100.2"，源地址设置为"like 203.0"。运行stats命令以过滤源地址和目标地址传输的总字节数。

---

### 单选题 140/306

一家公司计划将单体应用程序重构为部署在AWS上的现代应用程序设计。CI/CD管道需要升级以支持应用程序的现代设计，具有以下要求：• 它应该允许每小时多次发布更改。• 它应该能够尽可能快地回滚更改。哪种设计将满足这些要求？

- A. 部署一个CI/CD管道，该管道结合了包含应用程序及其配置的AMI。通过替换Amazon EC2实例来部署应用程序。
- B. 指定AWS Elastic Beanstalk作为CI/CD管道的应用程序的部署目标的暂存环境。部署时，交换暂存和生产环境的URL。
- C. 使用AWS Systems Manager重新配置每个部署的基础架构。更新Amazon EC2用户数据，以从Amazon S3拉取最新的代码工件，并使用Amazon Route 53加权路由指向新环境。
- D. 将应用程序更新作为自动扩展事件的一部分推出，使用预构建的AMI。使用新版本的AMI添加实例，并在部署事件期间使用配置的终止策略逐步淘汰使用先前AMI版本的所有实例。

---

### 单选题 141/306

一家公司使用Amazon S3存储文件和图像，采用多种存储类别。在过去一年中，公司的S3成本大幅增加。解决方案架构师需要查看过去12个月的数据趋势，并确定对象的适当存储类别。哪种解决方案将满足这些要求？

- A. 下载过去12个月S3使用情况的AWS成本和使用情况报告。查看AWS Trusted Advisor的成本节省建议。
- B. 使用S3存储类别分析。将数据趋势导入Amazon QuickSight仪表板以分析存储趋势。
- C. 使用Amazon S3 Storage Lens。升级默认仪表板以包括存储趋势的高级指标。
- D. 使用S3的访问分析器。下载过去12个月的S3访问分析器报告。将.csv文件导入Amazon QuickSight仪表板。

---

### 多选题 142/306

一家公司正在构建一个电子文档管理系统，用户可以上传他们的文档。应用程序堆栈完全无服务器，并在AWS eu-central-1 Region上运行。该系统包括一个使用Amazon CloudFront分发进行传递的Web应用程序，其源站是Amazon S3。Web应用程序与Amazon API Gateway区域端点通信。API Gateway API调用AWS Lambda函数，这些函数在Amazon Aurora Serverless数据库中存储元数据，并将文档放入S3存储桶。公司稳步增长，并已与其最大客户完成了概念验证。公司必须改善欧洲以外地区的延迟。哪种组合的行动将满足这些要求？（选择两个）

- A. 在S3存储桶上启用S3传输加速。确保Web应用程序使用传输加速签名URL。
- B. 在AWS Global Accelerator中创建加速器。将加速器附加到CloudFront分发。
- C. 将API Gateway区域端点更改为边缘优化端点。
- D. 在世界其他两个位置部署整个堆栈。在Aurora Serverless集群上使用全球数据库。
- E. 在Lambda函数和Aurora Serverless数据库之间添加Amazon RDS代理。

---

### 单选题 143/306

一家公司最近收购了几家其他公司。每家公司都有一个单独的AWS账户，具有不同的计费和报告方法。收购公司已将所有账户合并到AWS Organizations的一个组织中。然而，收购公司发现很难生成包含所有团队有意义组的成本报告。收购公司的财务团队需要一个解决方案，通过自行管理的应用程序报告所有公司的成本。哪种解决方案将满足这些要求？

- A. 为组织创建AWS成本和使用情况报告。在报告中定义标签和成本类别。在Amazon Athena中创建一个表。基于Athena表创建Amazon QuickSight数据集。与财务团队共享数据集。
- B. 为组织创建AWS成本和使用情况报告。在报告中定义标签和成本类别。在AWS成本探索器中创建财务部门将用于构建报告的专业模板。
- C. 创建接收AWS价格列表查询API支出信息的Amazon QuickSight数据集。与财务团队共享数据集。
- D. 使用AWS价格列表查询API收集账户支出信息。在AWS成本探索器中创建财务部门将用于构建报告的专业模板。

---

### 单选题 144/306

一家公司最近完成了从本地数据中心到AWS云的迁移，使用了重新平台策略。迁移的服务器之一正在运行一个旧的简单邮件传输协议（SMTP）服务，关键应用程序依赖于此。该应用程序向公司客户发送出站电子邮件消息。旧SMTP服务器不支持TLS加密，并使用TCP端口25。应用程序只能使用SMTP。该公司决定使用Amazon Simple Email Service（Amazon SES）并停用旧的SMTP服务器。该公司已创建并验证了SES域。该公司已解除了SES限制。公司应该如何修改应用程序，以使用Amazon SES发送电子邮件消息？

- A. 配置应用程序使用TLS包装器连接到Amazon SES。创建一个具有ses:SendEmail和ses:SendRawEmail权限的IAM角色。将IAM角色附加到Amazon EC2实例。
- B. 配置应用程序使用STARTTLS连接到Amazon SES。获取Amazon SES SMTP凭据。使用凭据对Amazon SES进行身份验证。
- C. 配置应用程序使用SES API发送电子邮件消息。创建一个具有ses:SendEmail和ses:SendRawEmail权限的IAM角色。将IAM角色用作Amazon SES的服务角色。
- D. 配置应用程序使用AWS SDK发送电子邮件消息。为Amazon SES创建一个IAM用户。生成API访问密钥。使用访问密钥对Amazon SES进行身份验证。

---

### 单选题 145/306

Example Corp.拥有一个本地数据中心和一个名为VPC A的VPC，在Example Corp.的AWS账户中。本地网络通过AWS站点到站点VPN连接到VPC A。本地服务器可以正确访问VPC A。Example Corp.刚刚收购了AnyCompany，后者拥有一个名为VPC B的VPC。这些网络之间没有IP地址重叠。Example Corp.已经对VPC A和VPC B进行了对等连接。Example Corp.希望从其本地服务器连接到VPC B。Example Corp.已经正确设置了网络ACL和安全组。哪种解决方案将满足这一要求，并且需要最少的操作努力？

- A. 创建一个传输网关。将站点到站点VPN、VPC A和VPC B连接到传输网关。更新传输网关路由表，为所有网络添加IP范围路由。
- B. 创建一个传输网关。在本地网络和VPC B之间创建站点到站点VPN连接，并将VPN连接连接到传输网关。添加路由以将流量定向到对等VPC，并添加授权规则以允许客户端访问VPC A和B。
- C. 更新站点到站点VPN和两个VPC的路由表，涵盖所有三个网络。为所有三个网络配置BGP传播。等待最多5分钟BGP传播完成。
- D. 修改站点到站点VPN的虚拟专用网关定义，以包括VPC A和VPC B。在两个VPC之间分配虚拟专用网关的两个路由器。

---

### 单选题 146/306

一家零售公司在AWS的多个区域托管着一个电子商务网站。公司希望网站能够全天候运营，用于在线购买。该网站在Amazon RDS for MySQL数据库实例中存储数据。哪种解决方案将为数据库提供最高的可用性？

- A. 配置Amazon RDS的自动备份。在中断情况下，提升自动备份成为一个独立的数据库实例。将数据库流量指向提升的数据库实例。创建一个替代的只读副本，该副本以提升的数据库实例为源。
- B. 在Amazon RDS上配置全局表和只读副本。激活跨区域范围。在中断情况下，使用AWS Lambda将只读副本从一个区域复制到另一个区域。
- C. 在Amazon RDS上配置全局表和自动备份。在中断情况下，使用AWS Lambda将只读副本从一个区域复制到另一个区域。
- D. 在Amazon RDS上配置只读副本。在中断情况下，提升跨区域和只读副本成为一个独立的数据库实例。将数据库流量指向提升的数据库实例。创建一个以提升的数据库实例为源的替代只读副本。

---

### 单选题 147/306

一家公司正在AWS云中构建解决方案。数千个设备将连接到该解决方案并发送数据。每个设备需要能够实时通过MQTT协议发送和接收数据。每个设备必须使用唯一的X.509证书进行身份验证。哪种解决方案将满足这些要求，并且具有最小的运营开销？

- A. 设置AWS IoT Core。对于每个设备，创建相应的Amazon MQ队列并配置证书。将每个设备连接到Amazon MQ。
- B. 创建一个网络负载均衡器（NLB），并使用AWS Lambda授权器进行配置。在自动扩展组中的Amazon EC2实例上运行MQTT代理。将自动扩展组设置为NLB的目标。将每个设备连接到NLB。
- C. 设置AWS IoT Core。为每个设备创建一个相应的AWS IoT事物并提供证书。将每个设备连接到AWS IoT Core。
- D. 设置Amazon API Gateway HTTP API和网络负载平衡器(NLB)。在API Gateway和NLB之间创建集成。在HTTP API上配置互TLS证书授权器。在NLB目标的Amazon EC2实例上运行MQTT代理。将各设备接入NLB。

---

### 单选题 148/306

一家公司有一个单一AWS账户的环境。解决方案架构师正在审查环境，以推荐公司在访问AWS管理控制台方面可以改进的具体方面。公司的IT支持人员目前使用已映射到其工作角色的命名IAM用户对控制台进行身份验证，以执行管理任务。IT支持人员不再希望同时维护他们的Active Directory和IAM用户账户。他们希望能够使用现有的Active Directory凭据访问控制台。解决方案架构师正在使用AWS IAM Identity Center (AWS Single Sign-On)来实现这一功能。哪种解决方案最符合成本效益？

- A. 在AWS Organizations中创建一个组织。在组织中启用IAM Identity Center功能。在AWS Directory Service中为Microsoft Active Directory (AWS Managed Microsoft AD)创建并配置一个目录，并与公司本地Active Directory建立双向信任。配置IAM Identity Center，并将AWS Managed Microsoft AD目录设置为身份源。创建权限集，并将它们映射到AWS Managed Microsoft AD目录中的现有组。
- B. 在AWS Organizations中创建一个组织。在组织中启用IAM Identity Center功能。为公司本地Active Directory创建并配置一个AD连接器。配置IAM Identity Center，并选择AD连接器作为身份源。创建权限集，并将它们映射到公司Active Directory中的现有组。
- C. 在AWS Organizations中创建一个组织。为组织启用所有功能。在AWS Directory Service中为Microsoft Active Directory (AWS Managed Microsoft AD)创建并配置一个目录，并与公司本地Active Directory建立双向信任。配置IAM Identity Center，并将AWS Managed Microsoft AD目录设置为身份源。创建权限集，并将它们映射到AWS Managed Microsoft AD目录中的现有组。
- D. 在AWS Organizations中创建一个组织。为组织启用所有功能。为公司本地Active Directory创建并配置一个AD连接器。配置IAM Identity Center，并设置AD连接器作为身份源。创建权限集，并将它们映射到公司Active Directory中的现有组。

---

### 单选题 149/306

一家北美金融服务公司计划在AWS上向其客户发布一个新的在线Web应用程序。公司将在us-east-1 Region的Amazon EC2实例上启动应用程序。该应用程序必须是高可用的，并且必须能够动态扩展以满足用户流量。公司还希望在us-west-1 Region使用主动-被动故障转移实现应用程序的灾难恢复环境。哪种解决方案将满足这些要求？

- A. 在us-east-1和us-west-1创建VPC。配置VPC对等连接。在us-east-1 VPC中，创建一个跨多个可用区的应用程序负载均衡器（ALB）。创建一个自动扩展组，该组在两个VPC的多个可用区中部署EC2实例。将自动扩展组放在ALB后面。
- B. 在us-east-1和us-west-1创建VPC。在us-east-1 VPC中，创建一个跨该VPC多个可用区的应用程序负载均衡器（ALB）。创建一个自动扩展组，该组在us-east-1 VPC的多个可用区中部署EC2实例。将自动扩展组放在ALB后面。在us-west-1 VPC中设置相同的配置。创建一个Amazon Route 53托管区域。为每个ALB创建单独的记录。启用健康检查以确保跨Region的高可用性。
- C. 在us-east-1和us-west-1创建VPC。在us-east-1 VPC中，创建一个跨该VPC多个可用区的应用程序负载均衡器（ALB）。创建一个自动扩展组，该组在us-east-1 VPC的多个可用区中部署EC2实例。将自动扩展组放在ALB后面。在us-west-1 VPC中设置相同的配置。创建一个Amazon Route 53托管区域。为每个ALB创建单独的记录。启用健康检查并为每个记录配置故障转移路由策略。
- D. 在us-east-1和us-west-1创建VPC。配置VPC对等连接。在us-east-1 VPC中，创建一个跨两个VPC多个可用区的应用程序负载均衡器（ALB）。创建一个自动扩展组，该组在两个VPC的多个可用区中部署EC2实例。将自动扩展组放在ALB后面。创建一个Amazon Route 53托管区域。为ALB创建一个记录。

---

### 单选题 150/306

一家公司在名为Source的AWS账户中拥有应用程序。该账户位于AWS Organizations中的一个组织中。其中一个应用程序使用AWS Lambda函数，并将库存数据存储在Amazon Aurora数据库中。应用程序使用部署包部署Lambda函数。公司已为Aurora配置了自动备份。公司希望将Lambda函数和Aurora数据库迁移到名为Target的新AWS账户中。应用程序处理关键数据，因此公司必须最小化停机时间。哪种解决方案将满足这些要求？

- A. 从Source账户下载Lambda函数部署包。使用部署包在Target账户中创建新的Lambda函数。与Target账户共享自动Aurora数据库集群快照。
- B. 从Source账户下载Lambda函数部署包。使用部署包在Target账户中创建新的Lambda函数。通过使用AWS资源访问管理器（AWS RAM）共享Aurora数据库集群。授予Target账户克隆Aurora数据库集群的权限。
- C. 使用AWS资源访问管理器（AWS RAM）共享Lambda函数和Aurora数据库集群给Target账户。授予Target账户克隆Aurora数据库集群的权限。
- D. 使用AWS资源访问管理器（AWS RAM）共享Lambda函数给Target账户。与Target账户共享自动Aurora数据库集群快照。




### 单选题 151/306

一家初创公司在AWS账户中托管了一批Amazon EC2实例，这些实例使用最新的Amazon Linux 2 AMI在私有子网中运行。公司的工程师严重依赖SSH访问实例进行故障排除。公司的现有架构包括：- 具有私有和公共子网的VPC，以及NAT网关。- 与本地环境的站点对站点VPN连接。- 直接从本地环境允许SSH访问的EC2安全组。公司需要增强SSH访问的安全性控制，并提供工程师运行命令的审计。解决方案架构师应使用哪种策略？

- A. 在EC2实例群上安装并配置EC2实例连接。移除所有允许EC2实例通过端口22进入TCP的EC2安全组规则。建议工程师使用EC2实例连接CLI远程访问实例。
- B. 更新EC2安全组，仅允许工程师设备的IP地址通过端口22进入TCP。在所有EC2实例上安装Amazon CloudWatch代理，并将操作系统审计日志发送到CloudWatch日志。
- C. 更新EC2安全组，仅允许工程师设备的IP地址通过端口22进入TCP。为EC2安全组资源更改启用AWS Config。启用AWS防火墙管理器，并应用一个安全组策略，以自动修复规则的更改。
- D. 创建一个带有AmazonSSMManagedInstanceCore托管策略的IAM角色。将IAM角色附加到所有EC2实例。移除所有允许EC2实例通过端口22进入TCP的EC2安全组规则。让工程师为他们设备安装AWS系统管理器会话管理器插件，并使用系统管理器的start-session API调用远程访问实例。

---

### 单选题 152/306

一家公司希望将应用程序从运行在本地数据中心的VMware基础设施迁移到Amazon EC2。解决方案架构师必须在迁移过程中保留软件和配置设置。解决方案架构师应如何满足这些要求？

- A. 配置AWS DataSync代理以开始将数据存储复制到Amazon FSx for Windows File Server。使用SMB共享托管VMware数据存储。使用VM Import/Export将VM移动到Amazon EC2。
- B. 使用VMware vSphere客户端将应用程序导出为OVF（开放虚拟化格式）格式的映像。在目标AWS Region中创建一个Amazon S3存储桶以存储映像。创建并应用VM Import的IAM角色。使用AWS CLI运行EC2导入命令。
- C. 为文件服务配置AWS Storage Gateway。导出一个Common Internet File System（CIFS）共享。在共享文件夹中创建备份副本。登录AWS管理控制台，并从备份副本创建AMI。启动基于AMI的EC2实例。
- D. 在AWS Systems Manager中为混合环境创建托管实例激活。在本地VM上下载并安装Systems Manager代理。将VM注册到Systems Manager作为托管实例。使用AWS Backup创建VM的快照并创建AMI。启动基于AMI的EC2实例。

---

### 单选题 153/306

一家金融公司在Amazon S3中托管一个数据湖。公司每晚通过SFTP从几个第三方接收财务数据记录。公司在VPC公共子网中的Amazon EC2实例上运行自己的SFTP服务器。文件上传后，它们被同一实例上的cron作业移动到数据湖。SFTP服务器可以通过Amazon Route 53的DNS sftp.example.com访问。解决方案架构师应该如何改进SFTP解决方案的可靠性和可扩展性？

- A. 将EC2实例移动到自动扩展组中。更新Route 53中的DNS记录sftp.example.com以指向ALB。在EC2实例前放置一个应用程序负载均衡器（ALB）。更新Route 53中的DNS记录sftp.example.com以指向ALB。
- B. 将SFTP服务器迁移到AWS Transfer for SFTP。更新Route 53中的DNS记录sftp.example.com以指向服务器端点主机名。
- C. 将SFTP服务器迁移到AWS Storage Gateway中的文件网关。更新Route 53中的DNS记录sftp.example.com以指向文件网关端点。
- D. 在EC2实例前放置一个网络负载均衡器（NLB）。更新Route 53中的DNS记录sftp.example.com以指向NLB。

---

### 多选题 154/306

一位解决方案架构师需要将数据从一个AWS账户中的Amazon S3存储桶复制到新AWS账户中的新S3存储桶。解决方案架构师必须实现一个使用AWS CLI的解决方案。哪些步骤组合将成功复制数据？（选择三个）

- A. 创建一个存储桶策略，允许源存储桶列出其内容，并在目标存储桶中放置对象并设置对象ACL。将存储桶策略附加到目标存储桶。
- B. 创建目标账户中用户的存储桶策略。允许用户列出源存储桶的内容并读取源存储桶的对象。将存储桶策略附加到源存储桶。
- C. 在源账户中创建一个IAM策略。配置策略以允许源账户中的用户列出源存储桶的内容并获取对象，并在目标存储桶中列出内容、放置对象并设置对象ACL。将策略附加到用户。
- D. 在目标账户中创建一个IAM策略。配置策略以允许目标账户中的用户列出源存储桶的内容并获取对象，并在目标存储桶中列出内容、放置对象并设置对象ACL。将策略附加到用户。
- E. 作为源账户中的用户，运行aws s3 sync命令。指定源和目标存储桶以复制数据。
- F. 作为目标账户中的用户，运行aws s3 sync命令。指定源和目标存储桶以复制数据。

---

### 单选题 155/306

一家公司拥有一个对其业务至关重要的单体应用，该应用被托管在运行 Amazon Linux 2 的 Amazon EC2 实例上。应用程序层由一个运行有状态应用程序的单独服务器组成。该应用程序连接到在另一个单独服务器上运行的PostgreSQL数据库。预计应用程序的用户基础将显著增长，因此公司正在将应用程序和数据库迁移到AWS。该解决方案将使用Amazon Aurora PostgreSQL、Amazon EC2自动扩展和弹性负载均衡。哪种解决方案将提供一致的用户体验，允许应用程序和数据库层扩展？

- A. 为Aurora副本启用Aurora自动扩展。使用最少未完成请求的路由算法和启用粘性会话的网络负载均衡器。
- B. 为Aurora写入者启用Aurora自动扩展。使用带有轮询路由算法和启用粘性会话的应用负载均衡器。
- C. 为Aurora副本启用Aurora自动扩展。使用带有轮询路由算法和启用粘性会话的应用负载均衡器。
- D. 为Aurora写入者启用Aurora扩展。使用带有最少未完成请求的路由算法和启用粘性会话的网络负载均衡器。

---

### 单选题 156/306

一家公司使用AWS组织和服务控制策略（SCPs）。一位管理员创建了以下SCP，并将其附加到包含AWS账户1111-1111-1111的组织单元（OU）中：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowsAllActions",
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    },
    {
      "Sid": "DenyCloudtrail",
      "Effect": "Deny",
      "Action": "cloudtrail:*",
      "Resource": "*"
    }
  ]
}
```

在账户1111-1111-1111中工作的开发者抱怨他们无法创建Amazon S3存储桶。管理员应该如何解决这个问题？

- A. 向SCP添加s3:CreateBucket，并使用“允许”效果。
- B. 将账户从OU中移除，并将SCP直接附加到账户1111-1111-1111。
- C. 指导开发者为他们IAM实体添加Amazon S3权限。
- D. 从账户1111-1111-1111中移除SCP。

---

### 单选题 157/306

一位AWS客户拥有一个在本地运行的Web应用程序。该Web应用程序从位于防火墙后面的第三方API获取数据。该第三方只接受每个客户端允许列表中的一个公共CIDR块。客户希望将他们的Web应用程序迁移到AWS云。应用程序将托管在VPC中的一组Amazon EC2实例上，这些实例位于公共子网中的应用程序负载均衡器（ALB）后面。EC2实例位于私有子网中。NAT网关为私有子网提供互联网访问。解决方案架构师应如何确保迁移后Web应用程序可以继续调用第三方API？

- A. 将客户拥有的公共IP地址块关联到VPC。在VPC的公共子网中启用公共IP寻址。
- B. 在AWS账户中注册客户拥有的公共IP地址块。从地址块中创建弹性IP地址，并将它们分配给VPC中的NAT网关。
- C. 从客户拥有的IP地址块中创建弹性IP地址。将静态弹性IP地址分配给ALB。
- D. 在AWS账户中注册客户拥有的公共IP地址块。设置AWS Global Accelerator以使用来自地址块的弹性IP地址。将ALB设置为加速器端点。

---

### 多选题 158/306

一家公司的工厂和自动化应用程序在单个VPC中运行。超过20个应用程序在Amazon EC2、Amazon Elastic Container Service（Amazon ECS）和Amazon RDS的组合上运行。公司有分布在三个团队的软件工程师。每个团队拥有每个应用程序，并负责其应用程序的成本和性能。团队资源有代表其应用程序和团队的标签。团队使用IAM访问进行日常活动。公司需要确定每月AWS账单中哪些费用归因于每个应用程序或团队。公司还必须能够创建报告，比较过去12个月的成本，并帮助预测未来12个月的成本。解决方案架构师必须推荐一个AWS计费和成本管理解决方案，提供这些成本报告。组合哪些行动将满足这些要求？（选择三个）

- A. 激活代表应用程序和团队的用户定义成本分配标签。
- B. 激活代表应用程序和团队的AWS生成的成本分配标签。
- C. 在计费和成本管理中为每个应用程序创建成本类别。
- D. 激活计费和成本管理的IAM访问。
- E. 创建成本预算。
- F. 启用成本探索器。

---

### 单选题 159/306

一家公司在Amazon S3上运行一个新的静态网站应用程序。公司已将应用程序部署到生产AWS账户中，并使用Amazon CloudFront分发该网站。该网站调用Amazon API Gateway REST API。每个API方法都有一个AWS Lambda函数支持。公司希望每两周创建一个CSV报告，显示每个API Lambda函数的推荐配置内存、推荐成本以及当前配置与推荐之间的价格差异。公司将把报告存储在S3存储桶中。哪种解决方案以最少的开发时间满足这些要求？

- A. 创建一个Lambda函数，从Amazon CloudWatch Logs中提取每个API Lambda函数的指标数据，用于两周期间。将数据整理成表格格式。将数据作为.csv文件存储在S3存储桶中。创建一个Amazon EventBridge规则，每两周安排一次Lambda函数运行。
- B. 选择AWS Compute Optimizer。创建一个Lambda函数，调用ExportLambdaFunctionRecommendations操作。将.csv文件导出到S3存储桶。创建一个Amazon EventBridge规则，每两周安排一次Lambda函数运行。
- C. 选择AWS Compute Optimizer。设置增强基础设施指标。在ComputeOptimizer控制台中，安排一个作业，每两周将Lambda推荐导出到.csv文件。将文件存储在S3存储桶中。
- D. 购买生产账户的AWS商业支持计划。选择AWS Compute Optimizer进行AWS Trusted Advisor检查。在Trusted Advisor控制台中，安排一个作业，将成本优化检查导出到.csv文件。每两周将文件存储在S3存储桶中。

---

### 单选题 160/306

一家公司在AWS组织中拥有一个大型组织，拥有大量AWS账户。其中一个AWS账户被指定为传输账户，并拥有一个与其他所有AWS账户共享的传输网关。AWS站点到站点VPN连接已配置在公司的所有全球办事处与传输账户之间。公司在所有账户上都启用了AWS Config。公司的网络团队需要集中管理属于全球办事处的内部IP地址范围列表。开发人员将引用此列表以安全地访问其应用程序。哪种解决方案以最少的运营开销满足这些要求？

- A. 在Amazon S3中创建一个列出所有内部IP地址范围的JSON文件。在每个账户中配置一个Amazon Simple Notification Service（Amazon SNS）主题，以便在JSON文件更新时调用。订阅一个AWS Lambda函数到SNS主题，以使用更新后的IP地址范围更新所有相关的安全组规则。
- B. 创建一个新的AWS Config管理规则，其中包含所有内部IP地址范围。使用该规则检查每个账户中的安全组以确保符合IP地址范围列表。配置规则以自动修复检测到的任何不符合规定的安全组。
- C. 在传输账户中，使用所有内部IP地址范围创建一个VPC前缀列表。使用AWS资源访问管理器与所有其他账户共享前缀列表。使用共享的前缀列表在其他账户中配置安全组规则。
- D. 在传输账户中，使用所有内部IP地址范围创建一个安全组。将其他账户中的安全组配置为使用“/sg-1a2b3c4d”的嵌套安全组引用引用传输账户的安全组。

---

### 单选题 161/306

一家公司需要将其数据分析环境从本地迁移到AWS。该环境由两个简单的Node.js应用程序组成。一个应用程序收集传感器数据并将其加载到MySQL数据库中。另一个应用程序将数据聚合到报告中。在聚合作业运行时，一些加载作业未能正确运行。公司必须解决数据加载问题。公司还需要在不中断或改变公司客户的情况下进行迁移。解决方案架构师应该采取哪些措施以满足这些要求？

- A. 设置Amazon Aurora MySQL数据库作为本地数据库的复制目标。为Aurora MySQL数据库创建Aurora副本，并使聚合作业运行针对Aurora副本。在网络负载均衡器（NLB）后面设置收集端点作为AWS Lambda函数，并使用Amazon RDS Proxy写入Aurora MySQL数据库。当数据库同步时，禁用复制作业并重新启动Aurora副本作为主实例。将收集器DNS记录指向NLB。
- B. 设置Amazon Aurora MySQL数据库。使用AWS数据库迁移服务（AWS DMS）执行从本地数据库到Aurora的持续数据复制。将聚合作业移动到运行针对Aurora MySQL数据库。在应用程序负载均衡器（ALB）后面设置收集端点作为Amazon EC2实例的自动扩展组。当数据库同步时，将收集器DNS记录指向ALB。在从本地迁移到AWS后禁用AWS DMS同步任务。
- C. 设置Amazon Aurora MySQL数据库。使用AWS数据库迁移服务（AWS DMS）执行从本地数据库到Aurora的持续数据复制。为Aurora MySQL数据库创建Aurora副本，并使聚合作业运行针对Aurora副本。将收集端点设置为AWS Lambda函数，后面是应用程序负载均衡器（ALB），并使用Amazon RDS Proxy写入Aurora MySQL数据库。当数据库同步时，将收集器DNS记录指向ALB。在从本地迁移到AWS后禁用AWS DMS同步任务。
- D. 设置Amazon Aurora MySQL数据库。为Aurora MySQL数据库创建Aurora副本，并使聚合作业运行针对Aurora副本。将收集端点设置为Amazon Kinesis数据流。使用Amazon Kinesis Data Firehose将数据复制到Aurora MySQL数据库。当数据库同步时，禁用复制作业并重新启动Aurora副本作为主实例。将收集器DNS记录指向Kinesis数据流。

---

### 单选题 162/306

一家公司计划在AWS上托管一个Web应用程序，并希望在一组Amazon EC2实例之间实现流量负载平衡。其中一个安全需求是在客户端和Web服务器之间的传输中启用端到端加密。哪种解决方案能满足此要求？

- A. 将EC2实例放置在应用程序负载均衡器（ALB）后面。使用AWS证书管理器（ACM）配置SSL证书，并将SSL证书与ALB关联。导出SSL证书并在每个EC2实例上安装。配置ALB监听端口443，并将流量转发到实例上的端口443。
- B. 将EC2实例与目标组关联。使用AWS证书管理器（ACM）配置SSL证书。创建一个Amazon CloudFront分发，并配置它使用SSL证书。设置CloudFront使用目标组作为源服务器。
- C. 将EC2实例放置在应用程序负载均衡器（ALB）后面。使用AWS证书管理器（ACM）配置SSL证书，并将SSL证书与ALB关联。配置一个第三方SSL证书并在每个EC2实例上安装。配置ALB监听端口443，并将流量转发到实例上的端口443。
- D. 将EC2实例放置在网络负载均衡器（NLB）后面。配置一个第三方SSL证书并在NLB和每个EC2实例上安装。配置NLB监听端口443，并将流量转发到实例上的端口443。

---

### 多选题 163/306

解决方案架构师开发了一个使用Amazon API Gateway区域端点和AWS Lambda函数的Web应用程序。Web应用程序的用户都靠近应用程序部署的AWS区域。Lambda函数仅查询一个Amazon Aurora MySQL数据库。解决方案架构师已将数据库配置为具有三个只读副本。在测试期间，应用程序未满足性能要求。在高负载下，应用程序打开了大量数据库连接。解决方案架构师必须提高应用程序的性能。解决方案架构师应采取哪些行动以满足这些要求？（选择两个）

- A. 使用Aurora数据库的集群端点。
- B. 使用RDS代理设置Aurora数据库读取端点的连接池。
- C. 使用Lambda预置并发功能。
- D. 将打开数据库连接的代码从Lambda函数的事件处理程序中移出。
- E. 将API Gateway端点更改为边缘优化端点。

---

### 单选题 164/306

一家公司正在AWS上构建一个无服务器应用程序，该应用程序运行在一个附加到VPC的AWS Lambda函数上。公司需要将应用程序与外部提供商的新服务集成。外部提供商仅支持来自公共IPv4地址的请求，这些地址在允许列表中。公司必须在应用程序开始使用新服务之前向外部提供商提供单一公共IP地址。哪种解决方案能够使应用程序能够访问新服务？

- A. 部署NAT网关。将Elastic IP地址与NAT网关关联。配置VPC使用NAT网关。
- B. 部署仅用于出口的互联网网关。将Elastic IP地址与仅用于出口的互联网网关关联。在Lambda函数的弹性网络接口上配置使用仅用于出口的互联网网关。
- C. 部署互联网网关。将Elastic IP地址与互联网网关关联。配置Lambda函数使用互联网网关。
- D. 部署互联网网关。将Elastic IP地址与互联网网关关联。配置公共VPC路由表中的默认路由以使用互联网网关。

---

### 单选题 165/306

一家公司计划将1000台本地服务器迁移到AWS。这些服务器运行在公司数据中心的几个VMware集群上。作为迁移计划的一部分，公司希望收集服务器指标，例如CPU详细信息、RAM使用情况、操作系统信息和运行中的进程。然后，公司希望查询和分析数据。哪种解决方案满足这些要求？

- A. 在本地主机上部署并配置无代理发现连接器虚拟设备。在AWS迁移中心配置数据探索。使用AWS Glue对数据执行ETL作业。使用Amazon S3 Select查询数据。
- B. 仅从本地主机导出VM性能信息。直接将所需数据导入AWS迁移中心。在迁移中心更新任何缺失信息。使用Amazon QuickSight查询数据。
- C. 创建一个脚本，自动从本地主机收集服务器信息。使用AWS CLI运行put-resource-attributes命令，将详细的服务器数据存储在AWS迁移中心。直接在迁移中心控制台查询数据。
- D. 在每个本地服务器上部署AWS应用程序发现代理。在AWS迁移中心配置数据探索。使用Amazon Athena对Amazon S3中的数据运行预定义查询。

---

### 单选题 166/306

一家公司在本地数据中心托管了一个Git存储库。公司使用Webhook来调用在AWS云中运行的功能。公司将Webhook逻辑托管在一组Amazon EC2实例上，这些实例设置为目标应用程序负载均衡器（ALB）的Auto Scaling组。Git服务器调用ALB以配置Webhook。公司希望将解决方案迁移到无服务器架构。哪种解决方案以最小的运营开销满足这些要求？

- A. 为每个Webhook创建并配置AWS Lambda函数URL。更新Git服务器以调用各个Lambda函数URL。
- B. 创建Amazon API Gateway HTTP API。在单独的AWS Lambda函数中实现每个Webhook逻辑。更新Git服务器以调用API Gateway端点。
- C. 将Webhook逻辑部署到AWS App Runner。创建ALB，并将App Runner设置为目标。更新Git服务器以调用ALB端点。
- D. 将Webhook逻辑容器化。创建Amazon Elastic Container Service（Amazon ECS）集群，并在AWS Fargate中运行Webhook逻辑。创建Amazon API Gateway REST API，并将Fargate设置为目标。更新Git服务器以调用API Gateway端点。

---

### 单选题 167/306

一家公司有10个账户，是AWS组织的一部分。AWS Config在每个账户中都已配置。所有账户都属于Prod OU或NonProd OU。公司在每个AWS账户中都设置了Amazon EventBridge规则，以在创建具有0.0.0.0/0作为源的Amazon EC2安全组入站规则时通知Amazon Simple Notification Service（Amazon SNS）主题。公司的安全团队已订阅了SNS主题。对于NonProd OU中的所有账户，安全团队需要去除创建包含0.0.0.0/0作为源的安全组入站规则的能力。哪种解决方案以最小的运营开销满足此要求？

- A. 修改EventBridge规则以调用AWS Lambda函数以删除安全组入站规则，并发布到SNS主题。将更新后的规则部署到NonProd OU。
- B. 在NonProd OU中添加vpc-sg-open-only-to-authorized-ports AWS Config管理规则。
- C. 配置一个SCP，允许当aws:SourceIp条件键的值不是0.0.0.0/0时，执行ec2:AuthorizeSecurityGroupIngress操作。将SCP应用于NonProd OU。
- D. 配置一个SCP，当aws:SourceIp条件键的值为0.0.0.0/0时，拒绝ec2:AuthorizeSecurityGroupIngress操作。将SCP应用于NonProd OU。

---

### 单选题 168/306

一家公司正在使用Amazon OpenSearch Service来分析数据。公司从使用S3标准存储的Amazon S3存储桶中加载数据到OpenSearch Service集群的10个数据节点中。数据在集群中保留1个月，用于只读分析。1个月后，公司会从集群中删除包含数据的索引。为了遵守规定，公司必须保留所有输入数据的副本。公司对持续成本表示担忧，并向解决方案架构师询问了一种新的解决方案。哪种解决方案最具成本效益？

- A. 将所有数据节点替换为UltraWarm节点以处理预期的容量。将输入数据从S3标准迁移到S3 Glacier Deep Archive，当公司将数据加载到集群中时。
- B. 将集群中的数据节点数量减少到2。添加UltraWarm节点以处理预期的容量。配置索引在OpenSearch Service摄取数据时过渡到UltraWarm。使用S3生命周期策略，在1个月后将输入数据转换为S3 Glacier Deep Archive。
- C. 将集群中的数据节点数量减少到2。添加UltraWarm节点以处理预期的容量。配置索引在OpenSearch Service摄取数据时过渡到UltraWarm。向集群添加冷存储节点。将索引从UltraWarm转换为冷存储。使用S3生命周期策略，在1个月后从S3存储桶中删除输入数据。
- D. 将集群中的数据节点数量减少到2。添加实例支持的数据节点以处理预期的容量。将输入数据从S3标准迁移到S3 Glacier Deep Archive，当公司将数据加载到集群中时。

---

### 多选题 169/306

一家公司希望将其工作负载从本地迁移到AWS。工作负载在Linux和Windows上运行。公司拥有一个大型本地基础设施，包括托管着众多应用程序的物理机和虚拟机。公司必须捕获有关系统配置、系统性能、运行中的进程和网络连接的详细信息。公司还需要将本地应用程序分组成AWS迁移组。公司需要AWS EC2实例类型的建议，以便以最具成本效益的方式在AWS上运行其工作负载。解决方案架构师应采取哪种组合的步骤来满足这些要求？（选择三个）

- A. 通过在物理机和虚拟机上安装AWS应用程序发现代理来评估现有应用程序。
- B. 通过在物理机和虚拟机上安装AWS系统管理代理来评估现有应用程序。
- C. 使用AWS系统管理应用管理器将服务器分组为应用程序迁移。
- D. 使用AWS迁移中心将服务器分组为应用程序迁移。
- E. 使用AWS迁移中心生成推荐的实例类型及相关成本。
- F. 将服务器大小数据导入AWS信任顾问。按照成本优化的建议操作。

---

### 单选题 170/306

一家公司使用AWS组织来管理多个AWS账户。出于安全原因，公司需要在所有组织成员账户中创建一个Amazon Simple Notification Service（Amazon SNS）主题，以实现与第三方警报系统的集成。解决方案架构师使用AWS CloudFormation模板创建SNS主题，并使用堆栈集来自动化CloudFormation堆栈的部署。已在组织中启用了信任访问。解决方案架构师应如何部署CloudFormation StackSets以覆盖所有AWS账户？

- A. 在组织成员账户中创建堆栈集。使用服务管理权限。将部署选项设置为部署到组织。使用CloudFormation StackSets漂移检测。
- B. 在组织成员账户中创建堆栈。使用自助服务权限。将部署选项设置为部署到组织。
- C. 在组织管理账户中创建堆栈集。使用服务管理权限。将部署选项设置为部署到组织。启用CloudFormation StackSets自动部署。
- D. 在组织管理账户中创建堆栈。使用服务管理权限。将部署选项设置为部署到组织。启用CloudFormation StackSets漂移检测。

---

### 单选题 171/306

一家公司在AWS上运行电子商务Web应用程序。Web应用程序托管在Amazon S3上作为静态网站，使用Amazon CloudFront进行内容分发。Amazon API Gateway API 调用 AWS Lambda 函数来处理用户请求和 Web 应用程序的订单处理。Lambda 函数将数据存储在 Amazon RDS for MySQL DB 集群中，该集群使用按需实例。过去 12 个月，DB 集群的使用一直很稳定。最近，该网站经历了 SQL 注入和 Web 漏洞尝试。客户还报告说，在高峰使用期间，订单处理时间有所增加。在这些时期，Lambda 函数经常出现冷启动。随着公司的增长，公司需要确保可扩展性和在流量高峰期间的低延迟访问。公司还必须优化数据库成本，并增加对 SQL 注入和 Web 漏洞尝试的保护。哪种解决方案将满足这些要求？

- A. 在高峰期间为 Lambda 函数配置增加的超时值。为数据库使用 RDS 预留实例。使用 CloudFront 并订阅 AWS Shield Advanced 来防护 SQL 注入和 Web 漏洞尝试。
- B. 增加 Lambda 函数的内存，转换到 Amazon Redshift 数据库。将 Amazon Inspector 与 CloudFront 集成，以防护 SQL 注入和 Web 漏洞尝试。
- C. 使用具有预定并发性的 Lambda 函数，在高峰期间进行计算，转换到 Amazon Aurora Serverless 数据库。使用 CloudFront 并订阅 AWS Shield Advanced 来防护 SQL 注入和 Web 漏洞尝试。
- D. 使用具有预定并发性的 Lambda 函数，在高峰期间进行计算。为数据库使用 RDS 预留实例。将 AWS WAF 与 CloudFront 集成，以防护 SQL 注入和 Web 漏洞尝试。

---

### 多选题 172/306

一家公司的应用程序存储用户上传的视频，这些视频存储在 Amazon S3 存储桶中，使用 S3 标准存储。用户在上传视频后的前 180 天内频繁访问视频。180 天后的访问很少。命名用户和匿名用户都可以访问视频。大多数视频大小超过 100 MB。用户在上传视频时经常遇到较差的互联网连接，导致上传失败。公司使用多部分上传来上传视频。解决方案架构师需要优化应用程序的 S3 成本。哪种组合的操作将满足这些要求？（选择两个）

- A. 将 S3 存储桶配置为请求者支付存储桶。
- B. 使用 S3 传输加速将视频上传到 S3 存储桶。
- C. 创建 S3 生命周期配置，使未完成的多部分上传在启动后 7 天过期。
- D. 创建 S3 生命周期配置，将对象在 1 天后转换为 S3 Glacier 即时检索。
- E. 创建 S3 生命周期配置，在 180 天后将对象转换为 S3 标准不频繁访问（S3 Standard-IA）。

---

### 单选题 173/306

一家公司需要将部分本地 Oracle 数据库迁移到 AWS。由于业务合规原因，公司选择保留部分数据库在本地。本地数据库包含空间数据并运行定时作业进行维护。公司需要能够直接从 AWS 查询本地系统的数据作为一个外来表。哪种解决方案将满足这些要求？

- A. 创建 Amazon DynamoDB 全球表，并启用自动扩展。使用 AWS 架构转换工具 (AWS SCT) 和 AWS 数据库迁移服务 (AWS DMS) 将数据从本地迁移到 DynamoDB。创建一个 AWS Lambda 函数将空间数据移动到 Amazon S3。使用 Amazon Athena 查询数据。使用 Amazon EventBridge 在 DynamoDB 中安排维护工作。使用 Amazon API Gateway 支持外来表。
- B. 创建 Amazon RDS for Microsoft SQL Server 数据库实例。使用本地复制将数据从本地迁移到数据库实例。必要时使用 AWS 架构转换工具 (AWS SCT) 修改 SQL Server 架构。将空间数据迁移到 Amazon Redshift。使用存储过程进行系统维护。创建 AWS Glue 爬虫连接到本地 Oracle 数据库以支持外来表。
- C. 启动 Amazon EC2 实例以托管 Oracle 数据库。将 EC2 实例放置在自动扩展组中。使用 AWS 应用迁移服务将数据从本地迁移到 EC2 实例，并进行实时双向变更数据捕获 (CDC） 同步。使用 Oracle 原生空间数据支持。创建一个 AWS Lambda 函数作为 AWS Step Functions 工作流的一部分运行维护作业。创建一个互联网网关以支持外来表。
- D. 为 PostgreSQL 创建 Amazon RDS 数据库实例。使用 AWS 架构转换工具 (AWS SCT) 和 AWS 数据库迁移服务 (AWS DMS) 将数据从本地迁移到数据库实例。使用 PostgreSQL 原生空间数据支持。在数据库实例上运行定时作业进行维护。使用 AWS Direct Connect 将数据库实例连接到本地环境以支持外来表。

---

### 单选题 174/306

一家公司托管了一个应用程序，该应用程序使用多个 Amazon EC2 实例在自动扩展组中，这些实例位于应用程序负载均衡器 (ALB） 后面。在 EC2 实例的初始启动期间，EC2 实例运行用户数据脚本来从 Amazon S3 存储桶下载应用程序的关键内容。最近对部署的唯一更改是公司向 S3 存储桶添加了大量关键内容。公司不想在生产中更改用户数据脚本。解决方案架构师应该如何操作，以便生产环境可以成功部署？

- A. 增加 EC2 实例的大小。
- B. 增加 ALB 的健康检查超时时间。
- C. 更改 ALB 的健康检查路径。
- D. 增加自动扩展组的健康检查宽限期。

---

### 单选题 175/306

一家公司的应用程序使用 AWS Key Management Service (AWS KMS) 对数据进行加密和解密。该应用程序将数据存储在 AWS 区域中的 Amazon S3 存储桶中。公司的安全政策要求在数据放入 S3 存储桶之前进行加密。应用程序在从 S3 存储桶读取文件时必须解密数据。公司将 S3 存储桶复制到其他区域。解决方案架构师必须设计一个解决方案，以便应用程序可以跨区域加密和解密数据。应用程序必须使用相同的密钥在每个区域解密数据。哪种解决方案将满足这些要求？

- A. 创建一个 KMS 多区域主密钥。使用 KMS 多区域主密钥在每个额外的区域中创建 KMS 多区域副本密钥，其中应用程序正在运行。更新应用程序代码以在每个区域中使用特定的副本密钥。
- B. 在每个额外的区域中创建一个新的客户管理的 KMS 密钥，其中应用程序正在运行。更新应用程序代码以在每个区域中使用特定的 KMS 密钥。
- C. 使用 AWS 私有证书颁发机构在主区域中创建一个新的证书颁发机构 (CA）。为应用程序的网站 URL 发行一个新的私有证书。使用 AWS 资源访问管理器 (AWS RAM) 与额外的区域共享 CA。更新应用程序代码以在每个区域中使用共享的 CA 证书。
- D. 使用 AWS 系统管理器参数存储在每个额外的区域中创建一个参数，其中应用程序正在运行。从主区域的 KMS 密钥中导出密钥材料。将密钥材料存储在每个区域的参数中。更新应用程序代码以在每个区域中使用参数中的关键数据。

---

### 单选题 176/306

一家全球电子商务公司在世界各地有许多数据中心。随着存储数据的增长，公司需要设置一个解决方案，为传统的本地文件应用程序提供可扩展的存储。公司必须能够使用 AWS Backup 进行卷的点对点副本，并必须保留对频繁访问数据的低延迟访问。公司还需要能够将存储卷作为 Internet Small Computer System Interface (iSCSI) 设备从公司的本地应用程序服务器挂载。哪种解决方案将满足这些要求？

- A. 配置 AWS Storage Gateway 磁带网关。将磁带网关配置为在 Amazon S3 存储桶中存储数据。部署 AWS Backup 以对卷进行点对点副本。
- B. 配置 Amazon FSx 文件网关和 Amazon S3 文件网关。部署 AWS Backup 以对数据进行点对点副本。
- C. 配置 AWS Storage Gateway 卷网关为缓存模式。使用 AWS Backup 备份本地 Storage Gateway 卷。
- D. 配置 AWS Storage Gateway 文件网关为缓存模式。部署 AWS Backup 以对卷进行点对点副本。

---

### 单选题 177/306

一家公司使用 AWS CloudFormation 作为所有应用程序的部署工具。它在启用版本控制的 Amazon S3 存储桶中分阶段存储所有应用程序二进制文件和模板。开发人员可以访问托管集成开发环境（IDE）的 Amazon EC2 实例。开发人员从 Amazon S3 下载应用程序二进制文件到 EC2 实例，进行更改，并在本地运行单元测试后将二进制文件上传到 S3 存储桶。开发人员希望改进现有的部署机制，并使用 AWS CodePipeline 实现 CI/CD。开发人员有以下要求：

- 使用 AWS CodeCommit 进行源代码控制。
- 自动化单元测试和安全扫描。
- 当单元测试失败时向开发人员发送警报。
- 作为 CI/CD 的一部分动态打开和关闭应用程序功能，并自定义部署。
- 让主要开发人员在部署应用程序之前提供批准。

哪种解决方案将满足这些要求？

- A. 使用 AWS CodeBuild 运行单元测试和安全扫描。使用 Amazon EventBridge 规则在单元测试失败时向开发人员发送 Amazon SNS 警报。编写 AWS Cloud Development Kit (AWS CDK) 构造，并使用清单文件在 AWS CDK 应用程序中打开和关闭功能。在管道中使用手动批准阶段，允许主要开发人员批准应用程序。
- B. 使用 AWS Lambda 运行单元测试和安全扫描。使用 Lambda 在管道的后续阶段向开发人员发送 Amazon SNS 警报。编写 AWS Amplify 插件以实现不同的解决方案功能，并使用用户提示打开和关闭功能。在管道中使用 Amazon SES 允许主要开发人员批准应用程序。
- C. 使用 Jenkins 运行单元测试和安全扫描。在管道中使用 Amazon EventBridge 规则在单元测试失败时向开发人员发送 Amazon SES 警报。使用 AWS CloudFormation 嵌套堆栈以实现不同的解决方案功能，并使用参数打开和关闭功能。在管道中使用 AWS Lambda 允许主要开发人员批准应用程序。
- D. 使用 AWS CodeDeploy 运行单元测试和安全扫描。使用 Amazon CloudWatch 警报在单元测试失败时向开发人员发送 Amazon SNS 警报。使用 Docker 镜像实现不同的解决方案功能，并使用 AWS CLI 打开和关闭功能。在管道中使用手动批准阶段，允许主要开发人员批准应用程序。

---

### 多选题 178/306

一位解决方案架构师正在使用 AWS Import/Export 的 Amazon EC2 VM Import 功能从本地环境导入虚拟机。该架构师已经创建了一个 AMI，并已提供基于该 AMI 的 Amazon EC2 实例。EC2 实例在 VPC 中的公共子网中运行，并分配了公共 IP 地址。EC2 实例未出现在 AWS 系统管理器控制台中作为托管实例。解决方案架构师应采取哪两个步骤来解决此问题？

- A. 验证实例上是否安装并正在运行系统管理器代理。
- B. 验证实例是否分配了适当的 IAM 角色以供系统管理器使用。
- C. 验证 VPC 上是否存在 VPC 端点。
- D. 验证 AWS 应用程序发现代理是否配置正确。
- E. 验证系统管理器的服务链接角色是否配置正确。

---

### 单选题 179/306

一家公司正在开发一个对延迟敏感的应用程序。该应用程序包括几个 AWS Lambda 函数，这些函数需要尽可能快地初始化。Lambda 函数用 Java 编写，包含初始化代码以加载库、初始化类和生成唯一 ID。哪种解决方案将以最具成本效益的方式满足启动性能要求？

- A. 将所有初始化代码移动到每个 Lambda 函数的处理程序中。为每个 Lambda 函数激活 Lambda SnapStart。配置 SnapStart 引用每个 Lambda 函数的 $LATEST 版本。
- B. 发布每个 Lambda 函数的版本。为每个 Lambda 函数创建别名。配置每个别名指向其对应的版本。为每个 Lambda 函数设置预留并发配置，指向相应的别名。
- C. 发布每个 Lambda 函数的版本。为每个 Lambda 函数设置预留并发配置，指向其对应的版本。激活已发布版本的 Lambda SnapStart。
- D. 更新 Lambda 函数以添加预快照钩子。将生成唯一 ID 的代码移动到处理程序中。发布每个 Lambda 函数的版本。激活已发布版本的 Lambda SnapStart。

---

### 单选题 180/306

一家公司在 AWS 上托管其主要 API，使用 Amazon API Gateway API 和包含 API 方法逻辑的 AWS Lambda 函数。公司的内部应用程序使用该 API 进行核心功能和业务逻辑操作。公司的客户端也使用该 API 访问其账户中的数据。一些客户端还可以访问运行在单个独立 Amazon EC2 实例上的旧版 API。公司希望提高这些 API 的安全性，以更好地防止拒绝服务（DoS）攻击，检查漏洞并防御常见漏洞利用。解决方案架构师应该采取什么措施来满足这些要求？

- A. 使用 AWS WAF 保护两个 API。配置 Amazon Inspector 分析旧版 API。配置 Amazon GuardDuty 监控恶意访问 API 的企图。
- B. 使用 AWS WAF 保护 API Gateway API。配置 Amazon Inspector 分析两个 API。配置 Amazon GuardDuty 阻止恶意访问 API 的企图。
- C. 使用 AWS WAF 保护 API Gateway API。配置 Amazon Inspector 分析旧版 API。配置 Amazon GuardDuty 监控恶意访问 API 的企图。
- D. 使用 AWS WAF 保护 API Gateway API。配置 Amazon Inspector 保护旧版 API。配置 Amazon GuardDuty 阻止恶意访问 API 的企图。

---

### 单选题 181/306

一家公司计划将许多虚拟机从本地环境迁移到AWS。公司需要在迁移之前对本地环境进行初步评估，可视化运行在虚拟机上的应用程序之间的依赖关系，并提供对本地环境的评估报告。为了获取这些信息，公司启动了一个迁移评估请求。公司有能力在本地环境中安装收集器软件，没有任何限制。哪种解决方案将以最小的运营开销为公司提供所需信息？

- A. 在每个本地虚拟机上安装AWS应用程序发现代理。在数据收集期结束后，使用AWS迁移中心查看应用程序依赖关系。从迁移中心下载快速洞察评估报告。
- B. 在每个本地虚拟机上安装迁移评估收集器。在数据收集期结束后，使用迁移评估查看应用程序依赖关系。下载并导出迁移评估中发现的服务器列表。将列表上传到Amazon QuickSight。当QuickSight报告生成后，下载快速洞察评估报告。
- C. 在本地环境中设置AWS应用程序发现服务无代理收集器。在数据收集期结束后，使用AWS迁移中心查看应用程序依赖关系。从应用程序发现服务中导出发现的服务器列表。将列表上传到迁移评估。当迁移评估报告生成后，下载快速洞察评估。
- D. 在本地环境中设置迁移评估收集器。在每个虚拟机上安装AWS应用程序发现代理。在数据收集期结束后，使用AWS迁移中心查看应用程序依赖关系。从迁移评估下载快速洞察评估报告。

---

### 单选题 182/306

一家公司最近成功完成了Amazon WorkSpaces的概念验证。解决方案架构师需要使解决方案在两个AWS区域中高度可用。Amazon WorkSpaces部署在一个故障转移区域，并且在Amazon Route 53中部署了一个托管区域。解决方案架构师应该如何配置解决方案的高可用性？

- A. 在主区域和故障转移区域创建连接别名。将连接别名与每个区域的目录关联。创建Route 53故障转移路由策略。将评估目标健康设置为是。
- B. 在主区域和故障转移区域创建连接别名。将连接别名与主区域的目录关联。创建Route 53多值答案路由策略。
- C. 在主区域创建连接别名。将连接别名与主区域的目录关联。创建Route 53加权路由策略。
- D. 在主区域创建连接别名。将连接别名与故障转移区域的目录关联。创建Route 53故障转移路由策略。将评估目标健康设置为是。

---

### 单选题 183/306

一家公司在AWS云中运行多个应用程序。这些应用程序专门用于公司内的独立业务单位。公司在AWS组织中的多个AWS账户中运行应用程序的组件。公司组织中的每个云资源都有一个名为BusinessUnit的标签。每个标签已经有了适当的业务单位名称值。公司需要将云成本分配给不同的业务单位。公司还需要为每个业务单位可视化云成本。哪种解决方案将满足这些要求？

- A. 在组织的管理账户中，创建一个名为BusinessUnit的成本分配标签。在管理账户中，创建一个Amazon S3存储桶和一个AWS成本和使用情况报告（AWS CUR）。将S3存储桶配置为AWS CUR的目标。从管理账户中，使用Amazon Athena查询AWS CUR数据。使用Amazon QuickSight进行可视化。
- B. 在每个成员账户中，创建一个名为BusinessUnit的成本分配标签。在组织的管理账户中，创建一个Amazon S3存储桶和一个AWS成本和使用情况报告（AWS CUR）。将S3存储桶配置为AWS CUR的目标。创建一个Amazon CloudWatch仪表板进行可视化。
- C. 在组织的管理账户中，创建一个名为BusinessUnit的成本分配标签。在每个成员账户中，创建一个Amazon S3存储桶和一个AWS成本和使用情况报告（AWS CUR）。将每个S3存储桶配置为其各自的AWS CUR的目标。
- D. 在每个成员账户中，创建一个名为BusinessUnit的成本分配标签。在每个成员账户中，创建一个Amazon S3存储桶和一个AWS成本和使用情况报告（AWS CUR）。将每个S3存储桶配置为其各自的AWS CUR的目标。从管理账户中，使用Amazon Athena查询AWS CUR数据。使用Amazon QuickSight进行可视化。

---

### 单选题 184/306

一家公司需要使用带Amazon S3存储桶的AWS Transfer Family SFTP启用服务器从第三方数据供应商那里接收更新。数据使用Pretty Good Privacy（PGP）加密。公司需要一个解决方案，在公司接收数据后能自动解密数据。解决方案架构师将使用Transfer Family管理的工作流。公司已经使用允许访问AWS Secrets Manager和S3存储桶的IAM策略创建了一个IAM服务角色。角色的信任关系允许transfer.amazonaws.com服务承担该角色。解决方案架构师接下来应该做什么来完成自动解密的解决方案？

- A. 在Secrets Manager中存储PGP公钥。在Transfer Family管理的工作流中添加一个名义步骤来解密文件。在名义步骤中配置PGP加密参数。将工作流与Transfer Family服务器关联。
- B. 在Secrets Manager中存储PGP私钥。在Transfer Family管理的工作流中添加一个异常处理步骤来解密文件。在异常处理程序中配置PGP加密参数。将工作流与SFTP用户关联。
- C. 在Secrets Manager中存储PGP私钥。在Transfer Family管理的工作流中添加一个名义步骤来解密文件。在名义步骤中配置PGP解密参数。将工作流与Transfer Family服务器关联。
- D. 在Secrets Manager中存储PGP公钥。在Transfer Family管理的工作流中添加一个异常处理步骤来解密文件。在异常处理程序中配置PGP解密参数。将工作流与SFTP用户关联。

---

### 单选题 185/306

一位解决方案架构师正在从现有的手动创建的非生产AWS环境创建一个AWS CloudFormation模板。CloudFormation模板可以根据需要被销毁和重新创建。环境包含一个Amazon EC2实例。EC2实例有一个实例配置文件，该实例使用它在父账户中承担一个角色。解决方案架构师在CloudFormation模板中重新创建了该角色，并使用了相同的角色名称。当CloudFormation模板在子账户中启动时，EC2实例不能再在父账户中承担该角色，因为权限不足。解决方案架构师应该采取什么措施来解决这个问题？

- A. 在父账户中，编辑EC2实例需要承担的角色的信任策略。确保现有的允许sts:AssumeRole操作的声明中的 target role ARN是正确的。保存信任策略。
- B. 在父账户中，编辑EC2实例需要承担的角色的信任策略。为子账户的根主体添加一个允许sts:AssumeRole操作的声明。保存信任策略。
- C. 再次更新CloudFormation堆栈。指定只有CAPABILITY_NAMED_IAM能力。
- D. 再次更新CloudFormation堆栈。指定IAM能力CAPABILITY_IAM和命名IAM能力CAPABILITY_NAMED_IAM。

---

### 单选题 186/306

一家公司需要提高其票务应用程序的可靠性。该应用程序运行在一个Amazon Elastic Container Service（Amazon ECS）集群上。公司使用Amazon CloudFront为应用程序提供服务。ECS集群中的单个ECS服务是CloudFront分发的起源。应用程序只允许特定数量的活跃用户进入购票流程。这些用户通过其JSON Web Token（JWT）中的加密属性进行识别。所有其他用户都被重定向到一个等候室模块，直到有可用的购买容量。应用程序正在经历高负载。等候室模块按设计工作，但是对等候室的负载正在干扰应用程序的可用性。这种干扰对应用程序的票务销售交易产生了负面影响。哪种解决方案将在高负载期间为票务销售交易提供最大的可靠性？

- A. 在ECS集群中为等候室创建一个单独的服务。使用单独的扩展配置。确保票务服务使用JWT信息并适当地将请求转发到等候室服务。
- B. 将应用程序移动到Amazon Elastic Kubernetes Service（Amazon EKS）集群。将等候室模块拆分成一个与票务pod分开的pod。使票务pod成为StatefulSet的一部分。确保票务pod使用JWT信息并适当地将请求转发到等候室pod。
- C. 在ECS集群中为等候室创建一个单独的服务。使用单独的扩展配置。创建一个CloudFront函数，检查JWT信息并适当地将请求转发到票务服务或等候室服务。
- D. 将应用程序移动到Amazon Elastic Kubernetes Service（Amazon EKS）集群。将等候室模块拆分成一个与票务pod分开的pod。使用AWS App Mesh，通过为Kubernetes配置App Mesh控制器。启用mTLS认证和票务pod与等候室pod之间的服务到服务认证。确保票务pod使用JWT信息并适当地将请求转发到等候室pod。

---

### 多选题 187/306

一家公司在本地数据中心运行一个三层的Web应用程序。前端由Apache Web服务器提供服务，中间层是一个单体Java应用程序，存储层是一个PostgreSQL数据库。在最近的一次市场推广中，客户无法通过应用程序下订单，因为应用程序崩溃了。分析显示所有三层都过载了。应用程序变得无响应，数据库由于读取操作达到了容量限制。该公司已经在近期安排了几个类似的推广活动。解决方案架构师必须为迁移到AWS制定一个计划来解决这些问题。该解决方案必须最大限度地提高可扩展性，同时最小化操作工作量。哪种组合的步骤将满足这些要求？（选择三个。）

- A. 重构前端，以便静态资源可以托管在Amazon S3上。使用Amazon CloudFront为客户端提供前端服务。将前端连接到Java应用程序。
- B. 将前端的Apache Web服务器重新托管在Amazon EC2实例上，这些实例位于自动扩展组中。在自动扩展组前使用负载均衡器。使用Amazon Elastic File System（Amazon EFS）托管Apache Web服务器所需的静态资源。
- C. 在包含自动扩展的AWS Elastic Beanstalk环境中重新托管Java应用程序。
- D. 重构Java应用程序，开发一个Docker容器来运行Java应用程序。使用AWS Fargate托管容器。
- E. 使用AWS Database Migration Service（AWS DMS）将PostgreSQL数据库重新部署到Amazon Aurora PostgreSQL数据库。使用Aurora自动扩展来读取副本。
- F. 重新托管PostgreSQL数据库在Amazon EC2实例上，该实例的内存是本地服务器的两倍。

---

### 单选题 188/306

一家软件开发公司的多名工程师正在远程工作。公司在Amazon EC2实例上运行Active Directory Domain Services (AD DS)。公司的安全政策规定，部署在VPC中的所有内部非公开服务必须通过VPN访问。必须使用多因素认证(MFA)访问VPN。解决方案架构师应如何满足这些要求？

- A. 创建一个AWS站点到站点VPN连接。配置VPN与AD DS的集成。使用启用了MFA支持的Amazon WorkSpaces客户端建立VPN连接。
- B. 创建一个AWS客户端VPN端点。为与AD DS的集成创建一个AD连接器目录。为AD连接器启用MFA。使用AWS客户端VPN建立VPN连接。
- C. 使用AWS VPN CloudHub创建多个AWS站点到站点VPN连接。配置AWS VPN CloudHub与AD DS的集成。使用AWS Copilot建立VPN连接。
- D. 创建一个Amazon WorkLink端点。配置Amazon WorkLink与AD DS的集成。在Amazon WorkLink中启用MFA。使用AWS客户端VPN建立VPN连接。

---

### 单选题 189/306

一家公司正计划从本地数据中心迁移到AWS云。公司计划使用在AWS Organizations中管理的多个AWS账户。公司最初将创建少量账户，并根据需要添加账户。解决方案架构师必须设计一个解决方案，以在所有AWS账户中启用AWS CloudTrail。哪种解决方案在操作上最有效？

- A. 创建一个AWS Lambda函数，在组织中的所有AWS账户中创建一个新的CloudTrail轨迹。使用Amazon EventBridge中的计划动作每天调用Lambda函数。
- B. 在组织的管理账户中创建一个新的CloudTrail轨迹。配置轨迹记录组织中所有AWS账户的所有事件。
- C. 在组织中的所有AWS账户中创建一个新的CloudTrail轨迹。每当创建一个新账户时，就创建新的轨迹。定义一个SCP，防止删除或修改轨迹。将SCP应用于根OU。
- D. 创建一个AWS Systems Manager Automation runbook，在组织中的所有AWS账户中创建CloudTrail轨迹。使用Systems Manager State Manager调用自动化。

---

### 多选题 190/306

一家公司使用AWS Organizations。公司在集中网络账户中运行两个防火墙设备。每个防火墙设备都在手动配置的高可用Amazon EC2实例上运行。一个传输网关连接来自集中网络账户的VPC和成员账户的VPC。每个防火墙设备使用静态私有IP地址，然后用于将流量从成员账户路由到互联网。在最近的一个事件中，一个配置错误的脚本启动了两个防火墙设备的终止。在重建防火墙设备期间，公司编写了一个新的脚本以在启动时配置防火墙设备。公司希望现代化防火墙设备的部署。防火墙设备需要具备水平扩展的能力，以处理网络扩展时增加的流量。公司必须继续使用防火墙设备以符合公司政策。防火墙设备的提供商已确认最新版本的防火墙代码将与所有AWS服务兼容。解决方案架构师应该推荐哪些组合的步骤，以最具成本效益的方式满足这些要求？（选择三项）

- A. 在集中网络账户中部署一个网关负载均衡器。设置一个使用AWS PrivateLink的终端节点服务。
- B. 在集中网络账户中部署一个网络负载均衡器。设置一个使用AWS PrivateLink的终端节点服务。
- C. 创建一个自动扩展组和一个启动模板，使用新脚本作为用户数据来配置防火墙设备。创建一个使用实例目标类型的目标组。
- D. 创建一个自动扩展组。配置一个AWS Launch Wizard部署，使用新脚本作为用户数据来配置防火墙设备。创建一个使用IP目标类型的目标组。
- E. 在每个成员账户中创建VPC终端节点。更新路由表以指向VPC终端节点。
- F. 在集中网络账户中创建VPC终端节点。更新每个成员账户中的路由表，指向VPC终端节点。

---

### 单选题 191/306

一家公司希望使用Amazon WorkSpaces结合瘦客户端设备来替换陈旧的桌面设备。员工使用桌面设备访问与临床试验数据相关的应用程序。公司安全政策规定，对应用程序的访问必须限制在只有公司分支机构位置。公司正在考虑在未来6个月内增加一个额外的分支机构。哪种解决方案以最高的运营效率满足这些要求？

- A. 创建一个IP访问控制组规则，列出分支机构的公共地址。将IP访问控制组与WorkSpaces目录关联。
- B. 使用AWS防火墙管理器创建一个带有IPSet的Web ACL规则，列出分支机构位置的公共地址。将Web ACL与WorkSpaces目录关联。
- C. 使用AWS证书管理器(ACM)向部署在分支机构位置的机器发行受信任的设备证书。在WorkSpaces目录上启用受限访问。
- D. 创建一个自定义WorkSpace镜像，配置Windows防火墙以限制对分支机构公共地址的访问。使用该镜像部署WorkSpaces。

---

### 多选题 192/306

一家公司希望在其本地基础设施和AWS之间建立专用连接。公司正在为其账户VPC设置1 Gbps AWS Direct Connect连接。架构包括一个传输网关和一个Direct Connect网关，用于连接多个VPC和本地基础设施。公司必须使用Direct Connect连接通过传输VIF连接到VPC资源。哪些组合的步骤将满足这些要求？（选择两项）

- A. 将1 Gbps Direct Connect连接更新为10 Gbps。
- B. 在传输VIF上广播本地网络前缀。
- C. 从Direct Connect网关向传输VIF广播VPC前缀到本地网络。
- D. 更新Direct Connect连接的MACsec加密模式属性为必须加密。
- E. 将MACsec连接密钥名称/连接关联密钥(CKN/CAK)对与Direct Connect连接关联。

---

### 单选题 193/306

一家公司在多个AWS账户中部署工作负载。每个账户都有一个VPC，VPC流量日志以文本日志格式发布到一个集中的Amazon S3存储桶。每个日志文件都使用gzip压缩。公司必须无限期保留日志文件。安全工程师偶尔使用Amazon Athena分析日志，但随着摄取日志数量的增加，查询性能逐渐下降。解决方案架构师必须提高日志分析的性能并减少VPC流量日志使用的存储空间。哪种解决方案在提高性能方面提供了最大的改进？

- A. 创建一个AWS Lambda函数来解压缩gzip文件，并使用bzip2压缩重新压缩文件。为S3存储桶订阅Lambda函数的s3:ObjectCreated:Put S3事件通知。
- B. 为S3存储桶启用S3传输加速。创建一个S3生命周期配置，将文件在上传后立即移动到S3智能分层存储类别。
- C. 更新VPC流量日志配置，将文件存储为Apache Parquet格式。为日志文件指定每小时分区。
- D. 创建一个新的Athena工作组，不设置数据使用控制限制。使用Athena引擎版本2。

---

### 单选题 194/306

一家公司希望将虚拟的Microsoft工作负载从本地数据中心迁移到AWS。公司已成功在AWS上测试了一些示例工作负载。公司还创建了一个AWS站点到站点VPN连接到VPC。解决方案架构师需要为所有工作负载从数据中心迁移生成一份总拥有成本(TCO)报告。每个虚拟机在数据中心上都启用了简单网络管理协议(SNMP)。公司不能在数据中心中添加更多的虚拟机，也不能在虚拟机上安装额外的软件。发现数据必须自动导入到AWS迁移中心。哪种解决方案能满足这些要求？

- A. 使用AWS应用程序迁移服务无代理服务和AWS迁移中心策略建议来生成TCO报告。
- B. 启动一个Windows Amazon EC2实例。在EC2实例上安装迁移评估无代理收集器。配置迁移评估生成TCO报告。
- C. 启动一个Windows Amazon EC2实例。在EC2实例上安装迁移评估无代理收集器。配置迁移中心生成TCO报告。
- D. 在VPC内使用AWS迁移就绪评估工具。配置迁移评估生成TCO报告。

---

### 单选题 195/306

一家公司使用AWS Organizations管理多个AWS账户。公司在公司共享服务账户中的VPC托管了一些应用程序。公司已将传输网关附加到共享服务账户中的VPC。公司正在开发一种新功能，并创建了一个开发环境，该环境需要访问共享服务账户中的应用程序。公司打算在开发账户中频繁地删除和重新创建资源。公司还希望给开发团队提供根据需要重新创建团队与共享服务账户的连接的能力。哪种解决方案能满足这些要求？

- A. 在开发账户中创建一个传输网关。向共享服务账户创建一个传输网关对等请求。配置共享服务传输网关自动接受对等连接。
- B. 在共享服务账户中打开传输网关的自动接受功能。使用AWS资源访问管理器(AWS RAM)在共享服务账户中共享传输网关资源与开发账户。在开发账户中接受资源。在开发账户中创建一个传输网关附加。
- C. 在共享服务账户中打开传输网关的自动接受功能。创建一个VPC终端节点。使用终端节点策略为开发账户授予VPC终端节点的权限。配置终端节点服务自动接受连接请求。
- D. 创建一个Amazon EventBridge规则来调用AWS Lambda函数，当开发账户进行附加请求时接受传输网关附加。使用AWS网络管理器在共享服务账户中共享传输网关与开发账户。在开发账户中接受传输网关。

---

### 单选题 196/306

一家公司使用AWS Organizations管理其AWS账户。解决方案架构师必须设计一个解决方案，其中只有管理员角色被允许使用IAM操作。然而，解决方案架构师无法访问公司内所有的AWS账户。哪种解决方案以最小的运营开销满足这些要求？

- A. 创建一个SCP，适用于所有AWS账户，仅允许管理员角色使用IAM操作。将SCP应用于根OU。
- B. 配置AWS CloudTrail以调用AWS Lambda函数，用于每个与IAM操作相关的事件。配置函数以在触发操作的用户不是管理员时拒绝该操作。
- C. 创建一个SCP，适用于所有AWS账户，否认所有用户使用IAM操作，除了那些具有管理员角色的用户。将SCP应用于根OU。
- D. 设置一个IAM权限边界，允许IAM操作。将权限边界附加到所有AWS账户的每个管理员角色。

---

### 单选题 197/306

一家公司在其本地数据中心运行许多服务。该数据中心使用AWS Direct Connect (DX)和IPSec VPN连接到AWS。服务数据是敏感的，并且连接不能通过互联网。公司希望扩展到新的市场细分，并开始向使用AWS的其他公司提供其服务。哪种解决方案能满足这些要求？

- A. 创建一个接受TCP流量的VPC终端节点服务，将其托管在网络负载均衡器后面，并通过DX使其服务可用。
- B. 创建一个接受HTTP或HTTPS流量的VPC终端节点服务，将其托管在应用程序负载均衡器后面，并通过DX使其服务可用。
- C. 附加一个互联网网关到VPC，并确保网络访问控制和安全组规则允许相关的入站和出站流量。
- D. 附加一个NAT网关到VPC，并确保网络访问控制和安全组规则允许相关的入站和出站流量。

---

### 单选题 198/306

一家公司需要为在单一AWS区域运行的关键应用程序实施灾难恢复。应用程序的用户与托管在应用程序负载均衡器(ALB)背后的Amazon EC2实例上的Web前端交互。应用程序写入Amazon RDS for MySQL数据库实例。应用程序还输出处理过的文档，这些文档存储在Amazon S3存储桶中。公司的财务团队直接查询数据库运行报告。在高峰时段，这些查询消耗资源并对应用程序性能产生负面影响。解决方案架构师必须设计一个解决方案，以在灾难期间提供弹性。该解决方案必须最小化数据丢失，并必须解决财务团队查询所导致的性能问题。哪种解决方案能满足这些要求？

- A. 将数据库迁移到Amazon DynamoDB并使用DynamoDB全球表。指示财务团队查询单独区域中的全球表。创建AWS Lambda函数定期同步原始S3存储桶的内容到单独区域中的新S3存储桶。在单独区域中启动EC2实例并创建ALB。配置应用程序指向新的S3存储桶。
- B. 在单独区域中启动附加的EC2实例以托管应用程序。将附加实例添加到单独区域中的现有ALB，创建RDS数据库实例的读取副本。指示财务团队对读取副本运行查询。使用S3跨区域复制(CRR)从原始S3存储桶复制到单独区域中的新S3存储桶。在灾难期间，将读取副本提升为独立的数据库实例。配置应用程序指向新的S3存储桶和新提升的读取副本。
- C. 在单独区域中创建RDS数据库实例的读取副本。指示财务团队对读取副本运行查询。创建托管应用程序前端的EC2实例的AMI。将AMI复制到单独区域。使用S3跨区域复制(CRR)从原始S3存储桶复制到单独区域中的新S3存储桶。在灾难期间，将读取副本提升为独立的数据库实例。从AMI启动EC2实例并创建ALB以向最终用户呈现应用程序。配置应用程序指向新的S3存储桶。
- D. 创建RDS数据库实例的每小时快照。将快照复制到单独区域。在现有RDS数据库前添加Amazon ElastiCache集群。创建托管应用程序前端的EC2实例的AMI。将AMI复制到单独区域。使用S3跨区域复制(CRR)从原始S3存储桶复制到单独区域中的新S3存储桶。在灾难期间，从最新的RDS快照恢复数据库。从AMI启动EC2实例并创建ALB以向最终用户呈现应用程序。配置应用程序指向新的S3存储桶。

---

### 单选题 199/306

一家公司需要将其网站从本地数据中心迁移到AWS。该网站由负载均衡器、在Linux操作系统上运行的内容管理系统(CMS)和MySQL数据库组成。CMS需要持久的NFS兼容存储用于文件系统。新的AWS解决方案必须能够在不可预测的流量增加时，从2个Amazon EC2实例扩展到30个EC2实例。新解决方案还必须不需要对网站进行更改，并且必须防止数据丢失。哪种解决方案能满足这些要求？

- A. 创建一个Amazon Elastic File System (Amazon EFS)文件系统。使用应用程序负载均衡器和自动扩展组将CMS部署到AWS Elastic Beanstalk。使用.ebextensions将EFS文件系统挂载到EC2实例。创建一个与Elastic Beanstalk环境分开的Amazon Aurora MySQL数据库。
- B. 创建一个Amazon Elastic Block Store (Amazon EBS) Multi-Attach卷。使用网络负载均衡器和自动扩展组将CMS部署到AWS Elastic Beanstalk。使用.ebextensions将EBS卷挂载到EC2实例。在Elastic Beanstalk环境中创建一个用于MySQL的Amazon RDS数据库。
- C. 创建一个Amazon Elastic File System (Amazon EFS)文件系统。创建启动模板和自动扩展组以启动EC2实例来支持CMS。创建一个网络负载均衡器来分配流量。创建一个Amazon Aurora MySQL数据库。使用EC2自动扩展缩减生命周期钩子将EFS文件系统挂载到EC2实例。
- D. 创建一个Amazon Elastic Block Store (Amazon EBS) Multi-Attach卷。创建启动模板和自动扩展组以启动EC2实例来支持CMS。创建应用程序负载均衡器来分配流量。创建一个支持MySQL数据库的Amazon ElastiCache for Redis集群。使用EC2用户数据将EBS卷附加到EC2实例。

---

### 单选题 200/306

一家公司正在使用GitHub Actions运行一个CI/CD流水线，该流水线访问AWS上的资源。该公司有一个IAM用户，该用户在流水线中使用密钥对来认证到AWS。一个现有的IAM角色附加了一个策略，授予部署资源所需的权限。公司的安全团队实施了一个新的要求，流水线不能再使用长期密钥。解决方案架构师必须用一个短期解决方案替换长期密钥。哪种解决方案能满足这些要求且运营开销最小？

- A. 在AWS身份和访问管理(IAM)中创建一个IAM SAML 2.0身份提供者(IdP)。创建一个新的IAM角色，该角色的信任策略允许sts:AssumeRole API调用。将现有的IAM策略附加到这个新IAM角色。更新GitHub以使用SAML认证流水线。
- B. 在AWS身份和访问管理(IAM)中创建一个IAM OpenID Connect(OIDC)身份提供者(IdP)。创建一个新的IAM角色，该角色的信任策略允许来自GitHub OIDC IdP的sts:AssumeRoleWithWebIdentity API调用。更新GitHub以假设角色用于流水线。
- C. 创建一个Amazon Cognito身份池。将认证提供者配置为使用GitHub。创建一个新的IAM角色，该角色的信任策略允许来自GitHub认证提供者的sts:AssumeRoleWithWebIdentity API调用。将流水线配置为使用Cognito作为其认证提供者。
- D. 为AWS私有证书颁发机构创建一个信任锚。生成一个客户端证书，与AWS IAM Roles Anywhere一起使用。创建一个新的IAM角色，该角色的信任策略允许sts:AssumeRole API调用。将现有的IAM策略附加到这个新IAM角色。将流水线配置为使用凭证帮助工具，并引用客户端证书公钥以假设新IAM角色。

---

要不要我继续为你生成后续题目，或者整理已生成题目的**完整答案解析手册**？如果需要，我可以优先整理高频考点和易错选项分析，帮你快速掌握AWS架构考试核心知识点。

---
