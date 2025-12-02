ALB（应用程序负载均衡器）7层负载均衡器（区域级服务，不能跨Region），支持跨AZ部署，分发HTTP/HTTPS流量

  ASG（自动扩展组）  动态调整EC2实例数量（基于负载），仅支持单个VPC的子网

VPC对等连接   连接两个VPC（同/跨Region），实现私网通信

S3传输加速（S3 Transfer Acceleration）    S3的一项加速跨区域/跨洋文件上传的功能，利用CloudFront的全球边缘节点网络，让用户先将文件上传到就近的边缘节点

S3多部分上传（Multipart Upload）S3针对大文件（建议≥100MB）的上传优化机制，允许将文件分割为多个“块”（每个块5MB~5GB，最后一块可小于5MB），并行上传多个块，失败后仅重传失败块，无需重新上传整个文件。

S3跨区域复制（CRR） 将一个Region的S3桶中的对象异步复制到另一个Region的S3桶，适用于灾备、就近访问分发等场景。

Route53基于延迟的路由  根据用户到AWS Region的网络延迟，将DNS查询路由到最近的Region端点，适用于多区域部署的服务

RDS for MySQL Multi-AZ  高可用架构：主节点故障时，备用节点（跨AZ）自动升级为主节点，DNS端点会切换到新主节点

RDS代理（RDS Proxy） 数据库连接中间层：1. 池化连接，减少应用连接开销；2. 自动检测RDS故障转移，更新连接指向新主节点；3. 应用只需连代理端点，无需关注后端RDS节点变化

全局表（Global Tables）  仅DynamoDB支持的跨区域多主复制特性，RDS无此功能

自动备份（Automated Backups） 自动创建快照+事务日志备份，支持时间点恢复  恢复需“新建实例+应用日志”，RTO长（几十分钟），适合数据恢复而非高可用灾备
 
站点到站点VPN（Site-to-Site VPN）  通过IPsec协议建立本地数据中心与AWS VPC之间的加密通信通道

VPC对等连接（VPC Peering） 两个VPC之间的私有网络直接连接，支持私有IP通信，无需经过公网

传输网关（Transit Gateway, TGW）AWS的“云骨干网”，集中式路由枢纽，可连接多个VPC、VPN、Direct Connect等网络。

AWS成本探索器（Cost Explorer） 预定义的成本分析工具，提供基础趋势和报告模板  自定义查询能力弱，难以支持财务“自行管理”的灵活报告需求

Amazon CloudFront   全球CDN，通过边缘节点缓存静态/动态内容，就近分发给用户，降低Web应用访问延迟（题目中用于分发Web应用）。

S3传输加速 利用CloudFront边缘节点加速跨区域S3上传/下载，

AWS Global Accelerator（AGA） 基于AWS全球网络骨干的流量加速服务，优化区域资源（如ALB、EC2）的全球访问，但不适合CDN已覆盖的场景。

S3 Storage Lens  AWS原生的S3存储全局分析工具，提供跨账户/跨区域的存储可视化、趋势分析和成本优化建议

S3智能分层（Intelligent-Tiering） 自动在「频繁访问层（Standard）」和「不频繁访问层（Standard-IA）」之间切换：
	• 对象30天无访问→自动迁移到Standard-IA（存储成本比Standard低~40%）；
	• 对象再次被访问→自动迁回Standard；
	• 两者均提供毫秒级检索，无数据取回费用，完美适配「部分频繁访问、部分少访问」的场景。

S3冰川深归档（Glacier Deep Archive）：最低成本的归档存储，适合「几年一次访问」的冷数据，检索时间为小时级

CloudFormation StackSets  基于CloudFormation的扩展功能，专门解决「跨账户+跨区域」批量部署问题

StackSet相关IAM角色  
- 管理角色（AWSCloudFormationStackSetAdministrationRole）：在管理账户，允许创建StackSet
- 执行角色（AWSCloudFormationStackSetExecutionRole）：在目标账户，允许StackSet创建堆栈

蓝绿部署   维护两套完全相同的环境（蓝=当前生产，绿=新版本），优势 ，测试通过后切换流量  零停机、回滚极快（仅切流量）、支持高频发布 劣势，  需两倍资源（两套环境）

滚动部署  逐步替换旧实例，每次替换部分实例直到全量更新  优势 资源占用少， 劣势  回滚慢、新旧版本并存可能引发兼容问题

AMI部署   将应用+配置打包为AMI，通过启动新实例替换旧实例  优势 实例启动快（无需重装依赖） 劣势 AMI打包繁琐、回滚需重启旧实例（慢）

1. AWS Elastic Beanstalk（EB）
	○ 托管部署服务：抽象底层EC2、ASG、ELB等资源，开发者仅需上传代码，EB自动完成部署/扩展/监控。
	○ 核心特性：支持多环境（开发/暂存/生产）、内置蓝绿部署（环境URL交换），一键切换流量，部署/回滚速度极快。
2. CI/CD管道组件
	○ AWS CodePipeline：自动化“代码提交→构建→测试→部署”全流程；
	○ AWS CodeBuild：编译代码、打包依赖，生成部署包；
	○ AWS CodeDeploy：将部署包部署到目标环境（如EB、EC2）。



1. 安全组（Security Group）   “白名单”机制（默认拒绝所有流量，仅允许明确配置的规则）。


CloudFormation DeletionPolicy（删除策略）  
• 可选值：
	○ Delete（默认）：删除堆栈时同步删除资源（数据丢失）；
	○ Retain：删除堆栈时保留资源本身（RDS实例/EBS卷继续存在，数据完整）；
	○ Snapshot：仅支持RDS/EBS等存储类资源，删除前先创建数据快照，再删除资源（数据通过快照留存）。


CloudFormation Stack Policy（堆栈策略）
  控制用户对堆栈中「现有资源的更新操作」（如修改、替换资源），仅作用于「更新堆栈」动作。


. VPC流日志（VPC Flow Logs）
	• 作用：捕获VPC内网络接口（ENI）的IP流量详情，包括源IP、目标IP、端口、流量方向、动作（ACCEPT/REJECT）等。
	• 存储位置：仅存储在Amazon CloudWatch Logs，不支持CloudTrail存储



数据查询分析服务（成本/易用性优先级：Athena > Redshift Spectrum > S3选择）
服务	核心特点	成本模式	适用场景
S3选择（S3 Select）	仅支持单个对象内简单查询（筛选/投影）	按数据扫描量付费	简单数据筛选（非分析场景）
Amazon Athena	无服务器，基于Presto，支持复杂查询	按查询扫描量付费	S3数据湖分析（无集群成本）
AWS Glue数据目录	元数据管理库（数据表结构、位置）	免费（基础功能）	为Athena/Redshift Spectrum提供元数据
Redshift Spectrum	需依赖Redshift集群，扩展查询S3	集群固定成本+查询费	已使用Redshift数据仓库的场景

客户端VPN（Client VPN）
	• 定义：AWS托管的远程访问VPN服务，允许员工通过OpenVPN客户端（在家/外出）安全连接到AWS VPC内资源或本地资源。


VPC对等连接（VPC Peering）
	• 定义：两个VPC（可跨账户、跨区域）之间的私网直连，流量不经过公网，低延迟、安全。


 站点到站点VPN（Site-to-Site VPN）
	• 定义：连接本地数据中心与AWS VPC的IPsec VPN，用于“站点间”（如公司办公室与AWS）的批量资源访问。


异构数据库迁移
源数据库（SQL Server）和目标数据库（MySQL）引擎不同，需解决架构兼容性（表结构、数据类型、存储过程语法）和数据同步一致性问题

AWS Schema Conversion Tool (SCT) 

专为异构迁移设计的架构转换工具：
1. 解析源数据库（SQL Server）的表结构、存储过程、视图；
2. 转换为目标数据库（MySQL）兼容的语法和数据类型；
3. 部署转换后的架构到RDS MySQL

AWS Database Migration Service (DMS) 
数据库迁移专用服务，支持：
1. 同构/异构数据库迁移（如SQL Server → MySQL）；
2. 全量迁移（初始数据复制）+ 增量同步（CDC，变更数据捕获）；
3. 数据一致性校验


Elastic Beanstalk (EB) 核心概念
	• EB本质：AWS托管应用部署服务，封装了EC2、ELB（负载均衡器）、Auto Scaling Group（ASG）、RDS等底层资源，用户无需手动管理这些基础设施，只需上传应用代码。



• 单实例环境（SingleInstance）：仅部署1台EC2实例，无ELB和ASG，适合开发/测试（成本低），但无高可用和扩容能力（题目当前环境）。
• 负载均衡环境（LoadBalanced）：部署多台EC2实例，前端挂载ELB，实例由ASG管理，支持自动扩容/缩容，具备高可用性（生产环境推荐）。


统一计费（Consolidated Billing）
	• Organizations的默认功能，允许将组织内所有成员账户的费用合并计费，核心优势包括：

预留实例（RI）
	• 预付费购买EC2、RDS等资源的使用容量，折扣率远高于按需实例，是成本优化的核心手段

SSM会话管理器（AWS Systems Manager Session Manager）
	• 核心功能：无需公网IP、无需SSH密钥，通过AWS控制台/CLI/API直接访问EC2实例的工具。

3. AWS WAF 即Web应用程序防火墙，用于过滤、监控和阻断针对Web应用的常见攻击（如SQL注入、XSS等），核心是通过规则集防护Web资源。
4. AWS防火墙管理器（Firewall Manager） 专为Organizations设计的集中安全管理服务，可跨多个账户和区域统一部署、管理WAF规则、安全组等防火墙策略，且能自动检测并修复不合规资源，是跨账户防火墙管理的核心工具。

Config聚合器	跨账户/跨区域收集AWS Config合规数据，支持组织层面统一查看所有账户的违规资源清单	解决多账户分散检测的问题，集中汇总所有账户的无标签EC2列表，方便管理员排查
		
		
Amazon Inspector	专注于资源安全漏洞检测（如CVE漏洞、配置漏洞）、合规评估（如PCI DSS）	不支持标签合规检测，


AWS防火墙管理器（FMS）	跨账户/OU集中管理安全策略（WAF、Shield、安全组等），内置自动部署和合规修复
Systems Manager 参数存储	安全存储配置数据（列表、字符串），支持动态更新和版本控制
	
VPC网关端点（Gateway Endpoint）：专门用于S3和DynamoDB的VPC端点，让VPC内资源通过AWS骨干网访问S3，无需公网IP、NAT网关或互联网网关，彻底避免数据经互联网传输

EC2 Image Builder	自动化构建标准化AMI（黄金映像）的服务
	
SCP（服务控制策略）	Organizations层面的策略，用于限制账户内用户/角色可执行的AWS操作（仅“拒绝”逻辑，不授予权限）
	
AWS Config	持续记录资源配置、评估合规性（基于规则），可检测资源是否符合标签、安全等要求

AWS Config聚合器	部署在管理账户，跨多个成员账户收集Config合规数据，实现集中化合规审计

• 接口VPC端点（Interface VPC Endpoint）：基于AWS PrivateLink，在VPC内创建私有IP地址，让私有子网资源通过私有网络路径直接访问AWS公共服务（无需NAT/IGW），消除数据传输费用，同时提升安全性。


Direct Connect（DX）
	• 本地数据中心与AWS之间的专用网络连接（替代公网VPN）

虚拟接口（VIF）类型
	• 私有VIF：直接连接单个VPC，无法关联Transit Gateway（TGW），仅适用于本地→单个VPC的路由。
• 传输VIF：专门用于连接Direct Connect Gateway（DX Gateway），进而关联TGW，支持本地→多个区域VPC、跨区域VPC路由


Direct Connect Gateway（DX Gateway）
	• 跨区域网络网关，用于整合多个DX连接的流量，同时关联多个区域的TGW。
	• 高可用设计：同一DX Gateway可关联多个来自不同DX位置的传输VIF

Transit Gateway（TGW）
	• 区域内的“网络中枢”，用于同一区域内所有VPC的集中路由
	• 跨区域路由：不同区域的TGW无法直接通过DX Gateway通信，必须通过TGW对等连接（Transit Gateway Peering） 实现。

Amazon Pinpoint	客户参与平台，专注营销自动化、用户互动（如推送通知、营销邮件）

AWS Control Tower	基于Organizations的着陆区（Landing Zone）自动化部署工具，内置多账户最佳实践（如OU划分、安全护栏），支持注册现有账户

AWS IAM Identity Center（SSO）	集中身份认证与访问管理服务，支持跨账户权限分配（权限集→IAM角色）、强制MFA、用户组授权
	
传输网关（Transit Gateway, TGW）	云网络枢纽，可连接多个VPC、账户、本地网络，通过路由表精细化控制流量互通

AWS Security Hub	安全态势管理工具，集中收集安全发现（如漏洞、合规违规），不负责访问管理
	
Amazon Cognito	面向外部客户（而非内部员工）的身份管理服务（用户池+身份池）

网关负载均衡器（GWLB）	专门用于集成第三方安全设备（防火墙、IDS/IPS）的四层负载均衡器：
	1. 支持三层/四层流量（所有数据包类型）；
	2. 可通过路由表强制拦截VPC所有流量；
	3. 低延迟、不影响性能；
	4. 跨AZ部署，天生高可用。

网络负载均衡器（NLB）	四层负载均衡器（TCP/UDP），低延迟但无流量拦截能力，仅被动分发流量。
应用负载均衡器（ALB）	七层负载均衡器（HTTP/HTTPS），仅支持应用层流量，不支持原始数据包检查。
传输网关（TGW）	连接多个VPC或本地数据中心的中枢网关，用于跨网络通信。


Amazon API Gateway REST API 核心特性
	• 托管API服务：负责请求路由、认证授权、限流、监控、日志等，是客户端与后端服务（如Lambda）的中间层。
	• 与Lambda集成流程：客户端请求 → API Gateway（先执行限流、认证等前置逻辑）→ 转发请求到Lambda → 返回响应。
	• 关键：限流发生在请求转发给Lambda之前，若触发API Gateway限流，请求不会到达Lambda，Lambda日志无记录。

使用计划级（Usage Plan）	单个API密钥（绑定客户）
方法级（Per Method）	单个API方法（如GET /user）
账户级（Per Account）	同一区域的整个AWS账户

AWS IoT Core	托管IoT设备接入服务
AWS Glue	托管ETL与数据目录服务
Amazon Athena	交互式查询服务
	
Amazon QuickSight	托管商业智能（BI）服务
AWS Fargate	容器无服务器编排服务（配合ECS/EKS）
Amazon Redshift	数据仓库服务
AWS Transfer for SFTP	托管SFTP文件传输服务
AWS Snowball Edge	硬件数据迁移与边缘计算设备

AWS Direct Connect (DX)	本地数据中心与AWS之间的专用网络连接（替代公网VPN
Direct Connect Gateway (DX网关)	集中管理多个AWS资源（VGW/TGW）与DX的连接
Transit Gateway (TGW，传输网关)	AWS的“网络枢纽”，实现多VPC/账户/本地网络互联
Transit VIF	DX中的虚拟接口类型，专门用于连接DX网关与TGW
VPC对等连接	两个VPC之间的直接点对点连接
	
. Amazon RDS for MySQL（Multi-AZ模式）
	• 定义：托管式MySQL数据库，Multi-AZ是高可用部署方案

 Aurora副本 vs RDS MySQL只读副本
	• Aurora副本：Aurora集群的一部分，共享分布式存储（数据实时一致），可直接提升为Writer实例，是高可用的核心组件。
	• RDS MySQL只读副本：异步复制主实例数据（存在数据延迟），仅用于读写分离，无法作为故障转移备用实例（需手动提升，数据不一致风险高）。



外部ID（External ID）	第三方（如合作伙伴）扮演客户IAM角色时的身份验证参数，用于防止「混淆代理攻击」（即第三方用其他客户的权限非法访问），是跨组织第三方访问的安全最佳实践。


 跨账户VPC对等授权
	• 两种模式：① 经典模式（发起方创建请求，接受方手动接受，无需RAM）；② RAM共享模式（通过RAM共享VPC，自动授权）。
	• 权限要求：发起方需ec2:CreateVpcPeeringConnection权限，接受方需ec2:AcceptVpcPeeringConnection权限。


6. RAM（Resource Access Manager）
	• 用于跨账户共享AWS资源（如VPC、子网），但跨账户对等连接不强制依赖RAM（经典模式可手动接受）。


Lambda执行角色	Lambda函数运行时访问其他AWS服务的“身份凭证”，函数通过该角色获取临时权限。

AWS CloudTrail	审计服务，记录所有AWS API调用（谁调用、调用哪个API、访问哪个资源、时间等），日志存储在S3。
IAM Access Analyzer	AWS原生工具，可读取CloudTrail日志，自动识别“实际被使用的API和资源”，生成最小权限IAM策略。
Amazon CodeGuru	代码审查+性能优化服务，可静态分析代码中的API调用，但无法捕捉运行时动态权限。
Amazon EMR	大数据处理服务（基于Hadoop/Spark），用于处理海量数据。

• CloudWatch：AWS核心监控服务，收集EC2/EBS的指标（CPU、内存、磁盘I/O等）、日志和事件。关键特性：
	○ 基础监控：免费，5分钟采集一次数据；
	○ 详细监控：收费，1分钟采集一次数据；
	○ CloudWatch代理：安装在EC2上，可收集更细粒度的系统指标（如内存使用率，基础监控不提供），是精准分析的前提。
• AWS Compute Optimizer：免费的资源优化服务，通过分析EC2/EBS的历史利用率数据（至少12小时，推荐30天），自动生成「调整大小（Rightsizing）」建议，避免过度配置或配置不足，核心优势是自动化、精准、无额外成本。

AWS Organizations	多账户集中管理服务，支持创建组织单元（OU）、统一治理（如SCP）
AWS Control Tower	基于Organizations的治理自动化工具，提供账户预置、合规规则（Guardrails）等
AWS Transit Gateway	跨账户/VPC的网络中枢，实现应用账户VPC（RDS所在）与DBA账户VPC（EC2所在）的网络连通，


跨账户访问核心逻辑	主体（如DBA账户EC2）→ 假设目标账户（应用账户）的IAM角色 → 以该角色权限访问目标资源（秘密）。需满足：① 目标角色信任策略允许主体；② 主体有假设角色的权限；③ 目标角色有访问资源的权限

AWS Batch	托管批处理服务，自动化管理计算资源（EC2/Fargate），调度并行/串行作业

Amazon CloudFront	全球CDN服务，核心价值：
	- 边缘节点缓存：将S3资产缓存到全球边缘节点，降低用户访问延迟；
	- 源站故障转移：配置主/备源站，主源站故障时自动切换，提升可靠性。

Amazon DynamoDB	无服务器NoSQL数据库，适合高并发读写（如玩家得分），核心特性：
	- 全局表：跨区域同步数据的原生方案，自动实现多区域数据一致性，无需手动配置复制；
	- DynamoDB Streams：捕获表数据变更（增删改），是全局表跨区域同步的底层依赖。
	
AWS DMS+CDC	DMS用于数据库迁移/复制，CDC捕获数据变更；但DynamoDB全局表更原生、配置简单，DMS+CDC适合异构数据库，不符合“最小实施工作量”要求。
AWS DataSync	优化本地存储（SAN/NAS）与AWS存储（S3/EFS）的高速数据传输，支持断点续传、校验。
AWS Data Pipeline	简单数据工作流编排，传输效率低于DataSync，不适合高速批量传输。
Storage Gateway（文件网关）	让本地应用像访问本地文件一样访问S3，适用于“本地实时访问S3”场景。
S3事件通知	S3桶发生特定事件（如对象创建）时，触发Lambda、SNS等服务。
Amazon ECR	容器镜像仓库，存储Docker镜像，与ECS、Batch等容器服务无缝集成。
AWS Batch	托管批量处理服务，自动管理计算资源（EC2）、作业队列、调度，支持Docker容器。

共享存储方案		核心需求：多实例共享、支持Windows ACL、AD集成
- EFS（弹性文件系统）	跨AZ、NFS协议、POSIX ACL，适合Linux环境	Windows需安装NFS客户端（管理开销高），不支持Windows ACL，排除
- FSx for Lustre	并行文件系统，高性能，用于HPC场景	不支持SMB协议、Windows ACL和AD集成，排除
- FSx for Windows File Server	专为Windows设计，支持SMB协议、Windows ACL、AD原生集成	题目Windows环境的唯一合规共享存储
		
Amazon SES（简单邮件服务）	托管式电子邮件发送服务，无需维护SMTP服务器；支持模板存储+参数替换，提供SendTemplatedEmail API；按发送量计费，运营开销极低。


1. Amazon SQS（简单队列服务）
	• 核心定位：托管消息队列，用于解耦生产者（视频上传）和消费者（EC2处理实例），确保消息可靠传递。
	• 可见性超时（Visibility Timeout）：消息被消费者接收后，会进入「不可见状态」的时间窗口（题目中为1小时）。若消费者在超时前未删除消息（处理完成），消息会重新回到队列，供其他消费者再次接收。
	• 死信队列（DLQ - Dead-Letter Queue）：无法正常处理的消息的“垃圾桶”，用于隔离异常消息，避免阻塞主队列。
	• 红移策略（Redrive Policy）：定义消息进入DLQ的规则，包含两个关键参数：
		○ deadLetterTargetArn：DLQ的ARN（目标队列）；
		○ maxReceiveCount：消息最多被接收的次数（题目中为1，即接收1次未处理完成则转入DLQ）。
2. EC2自动扩展组（ASG - Auto Scaling Group）
	• 核心定位：根据负载（如SQS队列深度）自动增减EC2实例，实现弹性伸缩。
	• 缩容逻辑：ASG会根据预设策略（如CPU利用率、队列长度）终止多余实例，以节省成本。
	• 实例保护（Instance Protection）：分为两种模式：
		○ 「启动时保护」：实例启动后默认处于保护状态，不参与缩容；
		○ 「动态保护」：实例运行时，通过API（如ModifyInstanceProtection）临时启用保护，防止缩容终止（核心考点）。
	• 终止保护（Termination Protection）：EC2实例级别的保护，仅防止手动终止，不影响ASG的自动缩容终止（与实例保护的核心区别）。

API Gateway 支持3种端点类型，直接决定API的访问范围：
	• 区域端点（Regional）：默认类型，面向公网开放，客户端通过公网DNS访问，流量经AWS边缘节点路由到区域API Gateway。
	• 私有端点（Private）：仅允许通过VPC内部访问，不暴露公网入口。必须配合 接口VPC端点 使用，流量完全在AWS骨干网内流转，不经过公网。
	• 边缘优化端点（Edge-Optimized）：基于CloudFront，适合全球分布式客户端访问，同样面向公网。
	

 VPC端点（VPC Endpoint）
	• 作用：让VPC内资源无需公网IP，即可私有访问AWS公共服务（如API Gateway、S3等），流量不经过公网，提升安全性和性能。
	• 类型：
		○ 接口型（Interface）：创建弹性网络接口（ENI），分配VPC内私有IP，支持TCP/UDP协议（API Gateway需用这种）。
		○ 网关型（Gateway）：仅支持S3、DynamoDB等少数服务，无私有IP，通过路由表转发流量。

API Gateway 支持3种端点类型，直接决定API的访问范围：
	• 区域端点（Regional Endpoint）：默认类型，面向公网，客户端通过公网DNS访问，题目中初始架构使用此类型。
	• 私有端点（Private Endpoint）：仅允许VPC内资源访问，拒绝公网请求，需配合VPC端点使用（本题核心需求对应的类型）。
	• 边缘优化端点（Edge-Optimized）：通过CloudFront分发，适合全球客户端访问，公网可访问。

VPC端点（VPC Endpoint）
	• 作用：让VPC内资源无需公网（NAT网关/Internet网关），通过私有IP直接访问AWS服务（如API Gateway、S3等）。
	• 类型：
		○ 接口端点（Interface Endpoint）：创建弹性网络接口（ENI）分配私有IP，支持TCP/UDP协议（API Gateway私有端点必须用此类型）。
		○ 网关端点（Gateway Endpoint）：仅支持S3、DynamoDB，通过路由表配置，无ENI。


S3跨区域复制（CRR）	跨AWS区域同步S3桶数据，支持自动、异步复制（毫秒级延迟），需启用版本控制。

AWS Global Accelerator（AGA）	优化TCP/UDP流量的全球网络加速服务，依赖AWS骨干网，适用于动态内容/固定IP场景。

S3传输加速（TA）	优化S3上传/下载速度，通过xxx.s3-accelerate.amazonaws.com端点路由AWS骨干网。

Amazon WorkSpaces	托管虚拟桌面服务（Windows/Linux），供用户远程访问桌面环境

AWS Transfer Family	托管文件传输服务，支持FTP/SFTP等协议，无需管理底层服务器，高可用、可弹性扩展（解决原生FTP的痛点）。


自动扩展组（ASG）+ ALB	ASG用于扩展EC2实例数量，ALB用于HTTP/HTTPS流量负载均衡，但不支持FTP等有状态协议。

Amazon Aurora MySQL	托管式关系型数据库（兼容MySQL）：基于分布式存储，默认多可用区（AZ）部署
Aurora跨区域副本	Aurora原生的跨区域数据复制功能：基于存储层同步，而非应用层转发
AWS DMS	数据库迁移与持续复制服务：支持同构/异构数据库（如MySQL→PostgreSQL）
Amazon DLM	快照生命周期管理：自动化EBS/Aurora快照的创建、复制、删除
AWS Glue	完全托管的ETL（提取/转换/加载）服务，专为数据准备设计，核心组件：
	- 爬虫（Crawler）：爬取数据源，自动生成表元数据；
	- 分类器（Classifier）：识别数据格式（如CSV/JSON）；
	- ETL作业（Job）：执行转换逻辑（屏蔽、字段处理、格式转换）；
	- 数据目录（Data Catalog）：存储表元数据，支持多数据源管理。
Amazon Athena	交互式查询服务，用于“即席查询”S3数据，不能触发ETL作业，非ETL工具。
	
AWS Elastic Disaster Recovery (DRS)	原AWS Application Migration Service（MGN），专为物理/虚拟服务器的灾难恢复设计。核心能力：安装代理后自动持续复制服务器（含OS、应用、数据库），AWS端自动准备目标环境，故障时一键启动恢复实例，操作开销极低。
AWS DMS（数据库迁移服务）	仅用于数据库迁移/同步（如MySQL→Aurora），需手动配置复制任务，不包含应用迁移。
	
AWS SCT（模式转换工具）	用于异构数据库结构转换，同构场景（MySQL→Aurora MySQL）作用有限，需手动配置CDC同步。
AWS Storage Gateway（卷网关）	本地存储与AWS S3的桥梁，需手动迁移应用到网关卷、重新安装软件，操作繁琐。


2. DynamoDB加速器（DAX）
	• 核心定位：DynamoDB的内存级读缓存（兼容Redis协议），专门优化读取延迟，将读取延迟从“毫秒级”降至“微秒级”。
	• 高可用要求：DAX集群的高可用性依赖「节点数（Replication Factor）」和「跨AZ部署」：
		○ 单节点集群：单AZ部署，无冗余，节点故障则缓存不可用（不满足高可用）；
		○ 两节点集群：最多跨2个AZ，无法覆盖AWS默认的3个AZ冗余，故障容错能力不足；
		○ 三节点集群：跨3个AZ部署，任意1个节点/AZ故障，集群仍可提供服务（满足高可用）。

Elastic Beanstalk（EB）	PaaS服务，简化应用部署（自动管理EC2、ALB、扩容等），但本质仍依赖EC2实例，若实例类型未优化，无法降低成本。
预留实例（RI）	预付费/部分预付费的长期容量承诺（1年/3年），折扣比按需实例高30%-70%
CloudFront	CDN服务，加速内容分发，核心组件包括「源（Origin）」和「缓存行为（Cache Behavior）」
CloudFront 源（Origin）	分发的内容来源，支持S3、EC2、ELB、EB域名等
CloudFront 缓存行为	控制请求的转发规则（路径匹配、源关联、缓存策略等）
DynamoDB全球表	跨多AWS区域同步数据
AWS Global Accelerator（AGA）	全球流量加速与路由优化
 Lambda 将 Docker 镜像作为 “部署包格式”，提取镜像中的代码、依赖和运行时环境，在 Lambda 的底层容器化执行环境中运行函数。

Amazon SageMaker	全托管机器学习平台，支持数据预处理、模型训练、模型导出（如TensorFlow/ONNX格式）。

AWS IoT Greengrass	边缘计算平台，允许在本地设备（如Linux服务器）运行AWS服务、ML模型、自定义代码，支持断网自主运行，云端统一管理。
Amazon Kinesis Video Streams	实时视频流传输/存储服务，依赖互联网将摄像机流上传到AWS云端。
Amazon Monitron	工业设备健康监控专用服务（含传感器、网关），聚焦振动/温度等指标，不支持通用ML模型部署。
AWS Well-Architected Tool（WAT）	AWS免费架构评估工具，基于Well-Architected框架（5大支柱：卓越运营、安全、可靠、性能效率、成本优化）评估现有云架构的优化空间。

AWS迁移评估工具（Migration Evaluation Tool）	即AWS Migration Evaluator（前身为TCO计算器高级版），AWS专为迁移场景设计的评估工具。


服务类型	服务名称	跨区域功能特性	RPO/RTO	适用场景
关系型数据库	Aurora Global Database	存储层复制，主从架构，自动故障转移	RPO≈1 秒，RTO≈1 分钟	全球高并发读写，低延迟灾难恢复
	RDS 跨区域只读副本	异步复制，手动故障转移	RPO = 复制延迟，RTO = 分钟级到小时级	非关键业务的灾难恢复
NoSQL 数据库	DynamoDB 全局表	多区域多活，支持强一致性（MRSC），自动冲突解决	RPO≈0，RTO 无停机	全球实时交互应用，高敏感交易
	DocumentDB 全局集群	主从复制，快速故障转移	RPO≈数秒，RTO≈分钟级	全球文档型数据应用
内存数据库	ElastiCache Global Datastore	跨区域复制，性能优化（MF TCP + 压缩），手动故障转移	RPO = 复制延迟，RTO≈分钟级	全球高并发缓存，低延迟灾难恢复
数据仓库	Redshift 跨区域复制	异步快照备份恢复，手动恢复	RPO = 快照间隔，RTO = 小时级	非实时数据分析和归档
图数据库	Neptune 全局数据库（预览）	跨区域复制，自动故障转移	RPO≈数秒，RTO≈1 分钟	全球图数据应用
宽列数据库	Keyspaces（Cassandra）	手动配置多数据中心复制，AWS 托管支持


敏感凭证存储服务
	• AWS Secrets Manager：专为存储敏感凭证（密码、令牌、证书）设计，支持自动轮换、KMS加密、细粒度IAM权限控制，是敏感信息存储的最佳实践。
	• AWS Systems Manager Parameter Store：主要用于存储应用配置参数（如环境变量、连接地址），虽支持高级参数加密，但缺乏Secrets Manager的自动轮换、敏感凭证生命周期管理等核心功能，不适合存储AUTH令牌这类高敏感凭证。


2. S3 File Gateway（存储网关的文件类型）
	• 定义：连接AWS云存储与本地/EC2应用的“桥梁”，提供NFS/SMB标准文件协议，让应用无需修改即可像访问本地文件一样操作S3。
	• 核心特点：
		○ 兼容传统文件协议（NFS/SMB）：完美匹配题目“Linux服务器无法更新S3 API”的需求。
		○ 本地缓存：网关会缓存常用文件，提供低延迟访问（满足“快速访问生成/修改的文件”）。
		○ 自动同步：应用写入的文件会异步同步到S3，同步延迟通常为秒级到分钟级（满足“30分钟内可供下载”）。
	• 适用场景：现有应用使用文件协议，需低成本迁移到S3，无需改代码。

AWS WAF	Web 应用防火墙，防护 SQL 注入、XSS 等攻击，仅支持与 ALB、CloudFront、API Gateway 集成（核心限制）。

Global Accelerator（GA）	全球加速器，提供静态、全球唯一的公网IP（或IP组），通过AWS全球骨干网路由流量，端点可关联ALB/NLB/EC2，托管服务（运营开销低）。

AWS Control Tower	基于Organizations构建的托管服务，提供两大核心能力：
	1. 着陆区（Landing Zone）：预置多账户云环境的内置蓝图（符合AWS最佳实践）；
	2. 护栏（Guardrails）：内置的合规控制措施（分预防性和检测性）

Control Tower护栏	分为两类：
	1. 预防性护栏（基于SCP）：阻止不合规操作；
	2. 检测性护栏（基于AWS Config）：监控资源合规状态

RPO（恢复点目标）	故障后允许丢失的最大数据量对应的时间窗口（越小数据丢失越少）
RTO（恢复时间目标）	故障后系统恢复正常服务的最大时间窗口（越小恢复越快）
AWS DRS（弹性灾难恢复）	持续复制EC2实例的EBS卷数据到目标区域，RPO低至秒级，支持自动化恢复
DLM（数据生命周期管理器）	自动化管理EBS卷快照的服务，最小快照间隔为1小时
AWS Backup	集中管理EC2、RDS等资源的备份，最小备份间隔为1小时
RDS自动备份	每日自动创建RDS快照（默认保留7天），RPO=24小时
	
CloudWatch代理	轻量级客户端代理	安装在EC2实例上，用于收集系统级指标（内存、磁盘使用率、进程数）和自定义指标，推送至CloudWatch
AWS Compute Optimizer	基于ML的计算资源优化服务	整合CloudWatch指标（CPU、内存、网络等），分析工作负载模式，输出：① 尺寸调整建议（如缩小/扩大实例）；② 成本优化建议（如迁移到更经济的实例家族），是题目核心需求的直接解决方案


AWS Elastic Disaster Recovery (DRS)	服务器级灾难恢复服务
VPC CIDR重叠	不同VPC的IP地址段重复（如两个VPC都用192.168.0.0/16）	限制条件：传统VPC对等、VPN等方案无法支持CIDR重叠的VPC通信

AWS迁移中心（AWS Migration Hub）	统一控制台，整合多迁移工具的数据（如发现、评估、迁移执行），跟踪迁移进度，查看应用/服务器组合全景
AWS应用程序发现服务（AWS Application Discovery Service）	发现本地数据中心的应用程序、服务器、数据库及其依赖关系，收集配置（CPU/内存）、性能数据
迁移评估（Migration Assessments）	基于发现服务收集的数据，生成服务器清单、迁移复杂度分析、AWS成本估算、合规性报告
AWS服务器迁移服务（AWS SMS）	本地虚拟机→AWS EC2的迁移执行工具（已逐步被MGN替代）
AWS应用程序迁移服务（AWS MGN）	物理机/虚拟机/云实例→AWS的迁移执行工具（SMS的替代方案）
AWS服务目录（AWS Service Catalog）	管理AWS内部批准的IT服务，支持用户自助获取资源
AWS存储网关（AWS Storage Gateway）	连接本地存储与AWS云存储（S3/EBS），提供缓存/备份
AWS控制塔（AWS Control Tower）	自动化多账户AWS环境的治理（如账户创建、权限管控）
Amazon Connect	
全托管呼叫中心服务
无需管理底层硬件/软件，自带高可用（多可用区部署），支持电话接入、呼叫路由、集成其他AWS服务
Amazon Pinpoint
全托管客户参与平台
支持短信、邮件等多渠道互动，核心能力是 双向交互式通信（接收客户回复、处理互动流程），自带调查数据收集/分析功能
AWS Data Exchange
安全共享数据产品的托管服务，支持订阅模式、身份验证（订阅验证），简化客户管理，无需手动FTP传输
Redshift 数据共享（Data Sharing）
跨AWS账户/集群共享Redshift数据，无需复制数据，订阅者实时访问源数据，无延迟、无额外存储开销
AWS Data Exchange for APIs
通过API共享数据，需搭配API Gateway、Redshift Data API，需维护API生命周期（授权、限流、监控）
AWS Data Exchange for S3
共享S3中的数据文件，需先将Redshift数据导出到S3，依赖定期同步机制
开放数据（Open Data）
AWS Data Exchange的公开数据发布模式，适合公开共享，身份验证能力弱
订阅验证（Subscription Verification）
AWS Data Exchange的内置功能，可要求客户提供企业信息、邮箱等进行身份核验，通过后才能订阅
Redshift Data API
无需JDBC/ODBC即可通过API访问Redshift，需搭配API Gateway使用
AWS Outposts
AWS基础设施延伸到客户本地数据中心的物理设备/服务集群

AWS Snowball Edge
物理设备（分存储优化/计算优化），用于数据迁移、本地计算/存储

AWS Local Zone
AWS公有云区域的边缘扩展区域（AWS管理的物理设施，非客户本地）
AWS Wavelength
部署在5G运营商网络边缘的AWS服务
• ECS任务角色（Task Role）：授权ECS任务（容器）访问AWS服务（如EFS）的IAM角色，需附加EFS访问权限策略。




ECS任务执行角色（Task Execution Role）：授权ECS代理拉取容器镜像、日志推送等操作的IAM角色，是Fargate任务的必需配置

目标组（Target Group）
ALB的核心组件，用于分组后端资源（EC2/ASG/Lambda），包含健康检查规则；ALB可同时关联多个目标组并按权重分配流量。

加权路由（Weighted Routing）
按预设权重分配流量到不同后端（如10%到新目标组，90%到旧目标组）；ALB的「加权目标组」比Route 53 DNS加权更精确（无DNS缓存问题）。

会话粘性（Session Stickiness）
确保同一客户的请求在会话期间始终路由到同一目标组/实例，避免客户在测试窗口内切换版本（新→旧或旧→新）。

滚动更新（Rolling Update）	ASG的更新策略，逐步替换旧实例为新实例（控制批次大小），最终全量切换到新版本，无法长期保持「新旧版本共存+固定流量比例」。



Amazon Workspaces
	• 托管虚拟桌面服务，支持 Windows/Linux 环境，用户可通过多种设备访问内部应用。


AWS Backup
	• AWS 统一托管备份服务，支持 FSx、EC2、RDS 等资源的备份与还原。


AWS DataSync
	• 用于跨存储服务（本地/FSx/S3 等）的高效数据迁移，需部署 EC2 代理，配置复杂，行政努力较高


自管理 Active Directory
	• 企业自行部署的 AD 服务，FSx 通过 VPN/Direct Connect 与其集成，实现用户权限控制，迁移后需确保新 FSx 仍集成同一 AD。


6. DNS 别名（FSx DNS Alias）
	• 自定义 DNS 名称（如 fsx-users.company.com），指向 FSx 默认 DNS 地址，迁移时仅需修改别名指向，用户无感知切换。

S3跨区域复制（CRR）	跨AWS区域同步S3桶数据

S3多区域访问点（MRA）	提供单一全球Endpoint，简化跨区访问
	
S3网关端点	VPC内私有访问S3（区域级资源）

AWS Global Accelerator	加速全球终端节点访问	仅优化访问延迟，不解决数据同步和双向读写一致性问题


数据存储与分析	- S3：对象存储，适合存储非结构化/半结构化数据（如JSON格式时间表），高可用、低成本。
	- Athena：无服务器查询服务，直接查询S3数据，无需数据仓库，按需付费。
	- Redshift：数据仓库，适合大规模结构化数据的复杂分析，但需管理集群，运营开销高。
	- QuickSight：AWS BI工具，用于生成可视化报告，支持S3/Athena/Redshift等数据源。

混合环境（Hybrid Environment）	本地数据中心与AWS云资源共存的架构，需实现本地与云端、云端跨区域的网络互通。

Direct Connect网关（DX Gateway）	跨区域网关服务，可关联多个区域的VPC（通过虚拟专用网关VGW），允许本地通过单个DX连接访问多区域VPC，降低跨区域连通成本。
	
虚拟接口（VIF）	DX连接的逻辑接口，是本地与AWS通信的端点，分两种核心类型：
	- 私有VIF：连接VPC的VGW/DX网关，访问VPC私网资源（如私子网EC2）；
	- 公共VIF：访问AWS公共服务（如S3、DynamoDB、EC2公共IP），路由指向AWS公共IP范围。

站点到站点VPN（Site-to-Site VPN）	基于公网的IPsec加密连接，适合中小带宽需求，成本低于DX但稳定性、延迟不如DX，不适合跨区域大规模访问。
	

AWS WAF：Web应用防火墙，专门防御OWASP Top10（如SQL注入、XSS）等Web应用漏洞，可关联CloudFront、ALB等资源

• Amazon GuardDuty：威胁检测服务，通过分析日志识别恶意活动（如暴力破解、恶意IP访问），属于“检测”而非“基线防护部署”。

AWS Shield Advanced：DDoS防护服务（高级版），防御网络层/应用层DDoS攻击，但不具备部署WAF规则的功能，仅可与WAF联动

SAML 2.0联合身份	跨组织身份认证协议，允许用户使用本地IdP（如ADFS、Okta）的凭证访问AWS，无需创建IAM用户，实现“一次登录，多系统访问”。

SAML提供者（SAML Provider）	AWS IAM中创建的实体，存储本地IdP的元数据（如公钥、实体ID），用于AWS验证IdP生成的SAML断言。

SAML断言（SAML Assertion）	本地IdP认证用户后生成的XML文档，包含用户身份、认证结果、授权角色等信息，是AWS信任用户的核心依据。
本地IdP	公司内部身份认证系统（如ADFS），负责验证用户凭证（用户名/密码），并向Web门户返回SAML断言。

 RDS跨区域读取副本
	• 针对RDS for MySQL的跨区域数据复制方案，数据复制延迟通常为秒级（满足RPO 30秒）。
	• 灾难时可快速提升为读写实例，无需从备份恢复，大幅缩短数据库恢复时间。
	• 成本仅为额外运行一个只读实例，远低于全量热备


• Amazon DLM：数据生命周期管理器，核心用于自动化EBS快照的创建、过期删除（生命周期管理），不支持直接备份EC2实例配置，跨区域复制需额外配置。

• AWS IoT Core：AWS托管的物联网核心服务，原生支持MQTT/HTTP/WebSocket协议，可承载数百万设备并发连接，自动弹性扩展，无需管理底层MQTT代理，内置设备认证、消息路由功能，是替代自建MQTT代理的最优方案。
• AWS IoT Greengrass：边缘计算服务，允许设备在本地处理数据（如离线计算、低延迟响应），再同步到云端，核心场景是“边缘处理”，而非云端接收海量数据。

• Amazon Route 53：AWS DNS服务，支持：
	○ 别名记录（Alias Record）：可直接指向AWS服务（如IoT Core、ALB/NLB），自带健康检查和故障转移，比普通A记录更可靠；
	○ 多值回答记录（Multi-Value Answer）：返回多个IP地址，但无自动故障转移和健康检查，仅适用于简单负载分发。

• AWS Global Accelerator：全球流量加速服务，通过AWS边缘站点优化跨区域路由，降低延迟，核心场景是“全球分布式用户访问”，而非解决单区域内的服务高可用。
• EC2 SSH密钥对	非对称密钥对（公钥+私钥），用于Linux EC2实例的SSH认证（公钥存EC2，私钥用户持有）

AWS KMS	密钥管理服务，用于加密数据（如Secrets Manager的存储加密），不存储SSH密钥对
SSM Agent	EC2实例上的代理程序，使EC2能与SSM服务通信（支持Run Command远程操作）
	
AWS Network Firewall	AWS托管的网络安全服务，支持状态检测、基于规则的过滤（IP、端口、域名、应用层）

AWS Network Firewall	AWS托管的网络安全服务，支持状态检测、基于规则的过滤（IP、端口、域名、应用层）	核心优势：集中管理（配合Firewall Manager）、高吞吐量（单AZ端点≤100Gbps，满足题目25Gbps需求）、原生集成AWS网络栈

Kinesis Data Streams	多应用实时读取+持久化
Kinesis Data Firehose	实时加载到存储（无需代码）
Kinesis Data Analytics	实时数据分析（聚合/计算）
Kinesis Video Streams	视频/音频流采集+分析
AWS Systems Manager（SSM）代理	用于EC2实例的管理（如运行命令、补丁更新、 Inventory收集），不负责自定义指标上报。
CloudWatch代理	部署在EC2实例上，用于收集自定义指标（如应用进程状态、业务指标）并上报CloudWatch，补充默认EC2指标的不足。
VPC路由表	控制VPC内流量的转发路径，题目中需将流量定向到ASG的EC2实例，实例替换后需更新路由目标（旧实例IP→新实例IP）。
GWLB（网关负载均衡器）	3层	用于防火墙、IDS等网络设备负载均衡
服务自动扩缩（Service Auto Scaling）	直接调整单个ECS服务的任务数量（如从5个任务扩到10个）
集群自动扩缩器（Cluster Auto Scaling）	调整ECS集群的EC2实例数量（节点数）
• ECR镜像扫描：检测镜像中的常见漏洞（CVE），输出漏洞严重性（严重/Critical、高/High、中/Medium、低/Low）。

预留实例（Reserved Instances, RI）
	• 定义：预购EC2实例的1年/3年使用权，相比按需实例有折扣，但绑定条件严格（实例类型、区域、操作系统、Tenancy）。

计算节省计划（Compute Savings Plans）	EC2 + Fargate + Lambda（所有计算资源）
	
EC2实例节省计划（EC2 Instance Savings Plans）	仅EC2（含按需/Spot/RI）
AWS Budgets	专门用于跟踪成本/使用量的服务，支持设置组织级预算（覆盖所有成员账户）、自定义周期（每日/每月等）、阈值警报，可集成SNS发送通知。
AWS Trusted Advisor	提供AWS资源的最佳实践建议（含成本优化），支持组织视图查看跨账户建议，但无预算跟踪和阈值警报功能。
AWS Control Tower	简化多账户管理的服务，“防护栏（Guardrails）”用于合规/安全控制（如强制标签、禁止违规操作），不支持预算阈值警报。
CUR + S3 + Athena + EventBridge + CloudWatch	组合方案：CUR记录详细成本数据→S3存储→Athena查询→EventBridge调度→CloudWatch警报。
-  Terraform代码通过最少的配置实现了核心需求，同时兼顾安全性（IAM授权）和可维护性（输出终端节点、标签），可直接适配生产环境。

• AWS DMS（数据库迁移服务）：数据库迁移专用工具，支持同构（SQL Server→SQL Server）/异构迁移，核心优势是内置CDC（变更数据捕获） 功能，可同步增量数据，实现近零停机。
• AWS MGN（应用迁移服务）：用于迁移物理服务器/虚拟机到EC2，专注应用服务器迁移，不支持数据库事务一致性和CDC，不适合数据库场景。
• CDC（变更数据捕获）：DMS核心功能，实时捕获源数据库的插入/更新/删除操作，同步到目标，确保源目数据一致，是“近零停机”的关键。
• AWS SCT（架构转换工具）：用于转换数据库schema、存储过程，适配目标数据库（如SQL Server→Aurora），题目中未涉及但属于迁移配套工具。

AWS PrivateLink（私有链路）
	• 核心价值：让VPC内资源通过私有网络访问第三方服务（无需公网），提升安全性并降低公网传输费。
	• 核心组件：
		○ 端点服务（Provider侧）：由服务提供商创建，必须关联网络负载均衡器（NLB），是消费者访问的“入口”。
		○ VPC端点（Consumer侧）：由消费者创建，部署在自身VPC内，指向提供商的端点服务。

• 数据传输计费规则（题目核心痛点）：
	○ 同可用区（AZ）：消费者↔端点服务的传输免费（AWS骨干网，无额外费用）。
	○ 跨可用区（AZ）：同一区域不同AZ间传输，收取跨AZ数据传输费（是题目中“费用超预期”的主要原因）。
	○ 跨区域：PrivateLink不支持跨区域访问（题目已限定“单个AWS地区”，可忽略）。

1. AWS Direct Connect：本地数据中心与AWS VPC的专用网络连接，带宽稳定（10Gbps）、低延迟，适合200GB级数据传输，避免公网波动。
2. SMB文件共享：Windows原生支持的网络文件协议，本地SQL Server可直接写入，无需额外开发

信任策略	属于IAM角色，定义“谁能扮演该角色”（Principal）和“如何扮演”（Action=sts:AssumeRole）

权限策略	属于IAM用户/角色，定义“能执行哪些操作”（如停止EC2、终止RDS）
IAM组	用于管理本账户内的IAM用户（批量赋权）
AWS弹性灾难恢复（Elastic DRS）	前身是CloudEndure，专为服务器（含Windows）提供实时复制、快速故障转移和回退，支持RTO<15分钟
AWS DataSync	本地与AWS间高吞吐量、增量数据同步，支持分钟级调度，满足低RPO
AWS存储网关（文件网关）	映射本地文件共享到S3，但S3是对象存储，无法作为Windows挂载共享
紧密耦合HPC工作负载	实例间需频繁、低延迟的数据交换（如通过MPI协议），对网络带宽/延迟、共享存储性能要求极高（区别于松耦合工作负载）。
	
EC2弹性织物适配器（EFA）	专为HPC/ML设计的网络接口，绕过传统EC2网络栈，提供低延迟（微秒级）、高带宽的点对点通信，支持MPI等紧密耦合协议。

Amazon FSx for Lustre	托管并行文件系统（基于Lustre），专为HPC设计，支持百万级IOPS、GB/s级吞吐量，优化了千级实例并发共享访问场景。

AWS IoT Core	物联网核心接入服务，原生支持MQTT/HTTP，负责设备认证、消息接收、路由
Amazon Kinesis Data Firehose	托管数据流传输服务，无需管理基础设施，支持实时将数据加载到S3/Redshift等，自带缓冲重试
Amazon MSK	AWS托管Kafka服务，自动多AZ部署、高可用，但仅支持Kafka协议（不支持MQTT）
高可用性（HA）	多AZ部署、无单点故障，服务持续可用（避免Kafka崩溃丢数据）
	
AWS Backup	AWS托管的集中式备份服务，支持EC2、EFS、RDS、S3等10+种AWS资源，提供统一备份计划、跨区域复制、集中监控，满足“单一备份状态来源”和“低操作开销”需求。
AWS DLM（Data Lifecycle Manager）	仅用于管理EC2快照和EBS卷的生命周期，不支持EFS、RDS的集中备份，也无跨区域复制原生能力，无法满足“单一状态源”和“多资源备份”需求。
RDS快照	RDS自带的快照功能，仅针对RDS实例，无法与EC2、EFS备份统一管理，分散且无跨区域复制的原生集成，操作开销大。
	

流数据收集/处理	Amazon Kinesis Data Streams (KDS)	「实时数据流管道」：高吞吐量、低延迟（单分片支持1MB/s写入），数据持久化（默认24h可延长至365天），支持多消费者并行消费（按分片拆分），适合近实时流数据收集与并行处理。
	Amazon Kinesis Data Firehose (KDF)	「数据流交付工具」：完全托管的“数据搬运工”，仅负责将数据流加载到S3/Redshift等目标，不支持复杂实时分析，仅能配合Lambda做简单转换，无并行处理能力。
	Kinesis Client Library (KCL)	用于构建KDS消费者的库，支持按分片并行消费数据，实现水平扩展，是KDS的核心分析客户端。


大数据处理	Amazon EMR	「弹性MapReduce」：基于Hadoop/Spark的分布式计算框架，支持批处理/流处理（Spark Streaming），适合复杂大规模数据并行分析，可直接读取KDS数据并写入数据仓库。

数据仓库	Amazon Redshift	「PB级数据仓库」：专为结构化大数据分析设计，支持复杂查询和聚合，是题目要求的“数据仓库解决方案”唯一匹配服务（RDS是关系型数据库，非数据仓库）。
		
Amazon Macie	敏感数据发现服务，主要用于扫描S3等存储中的凭据、PII数据，但扫描是定期的，不支持实时触发，且仅侧重“发现”而非“纠正”。

1. S3存储桶（S3 Bucket）
	• 数据湖的核心存储载体，用于持久化存储海量数据，是所有访问的最终目标。
	• 权限控制依赖桶策略（Bucket Policy），可限制访问来源、访问方式等。
2. S3访问点（S3 Access Points）
	• 为S3桶提供专用访问终端，是桶的附属资源（必须在桶所在账户创建，跨账户无法创建）。
	• 支持两大核心隔离：
		○ 网络隔离：通过VpcConfiguration限制仅允许特定VPC访问；
		○ 权限隔离：每个访问点可配置独立策略，仅授予对应应用最小权限（符合“最小权限原则”）。
	• 访问点域名格式：{access-point-name}-{account-id}.s3-accesspoint.{region}.amazonaws.com。
3. S3 VPC端点（S3 VPC Endpoint）
	• 用于让VPC内资源不经过公网访问S3，流量走AWS骨干网（满足“禁止公网访问”要求）。
	• 分两种类型，关键区别如下：
	类型	支持的S3服务	部署方式	成本
	网关端点	仅s3.amazonaws.com（桶直接访问）	关联路由表	免费
	接口端点	s3-accesspoint.amazonaws.com（访问点访问）	创建ENI（弹性网络接口）	收费
	• 核心结论：访问S3访问点必须使用接口端点，网关端点不支持访问点域名。
4. 桶策略与端点策略
	• 桶策略：控制桶的访问规则（如“强制通过访问点访问”）；
	• 端点策略：控制通过VPC端点能访问哪些S3资源（如“仅允许访问特定访问点”），是端点层面的最小权限控制。
5. 跨账户访问逻辑
	• 应用账户（多账户）的资源需访问数据湖账户（单账户）的S3桶，流程为： 应用VPC内资源 → 应用VPC的S3-accesspoint接口端点 → AWS骨干网 → 数据湖账户的S3访问点 → 数据湖S3桶。


AWS WAF	Web应用防火墙，保护Web应用免受高频攻击、SQL注入等威胁，核心是「Web ACL」（规则集合）
WAF 速率规则（Rate-based Rules）	基于「单位时间内单个IP的请求数」限流（如每分钟10次），不依赖固定IP列表，自动拦截高频请求

WAF IP集匹配规则（IP Set Match Rules）	基于预定义的IP黑名单/白名单匹配，需手动维护IP集
AWS Firewall Manager	集中管理多账户/多区域的安全策略（如安全组、WAF规则），不直接提供速率限制功能
AWS Transfer Family（Transfer for SFTP）	托管的文件传输服务，支持SFTP/FTP等协议，无需手动管理服务器（如EC2），自动弹性伸缩，极大降低操作开销
BYOIP（Bring Your Own IP）	允许客户将自己拥有的公网IP地址块注册到AWS账户，后续可从该地址块分配弹性IP（EIP），保留原有IP不变
VPC端点（VPC Endpoint）	用于VPC内资源私有访问AWS服务（如S3），不暴露公网IP，不提供SFTP服务能力
	


1. 核心概念：EC2放置组（Placement Groups）
放置组是EC2实例的逻辑分组，用于优化实例间的网络性能或可用性，AWS提供3种类型，核心差异如下：
放置组类型	核心特点	适用场景	网络性能	容错性
集群放置组（Cluster）	实例紧密部署在同一底层硬件集群（同一机架/交换机）	需高吞吐量、低延迟通信的应用（如分布式计算、实时数据处理）	最高（10Gbps+带宽，支持集群联网）	最低（硬件故障可能导致所有实例下线）
分区放置组（Partition）	实例分散在多个逻辑分区（不同底层硬件），分区内实例紧密部署	需高可用性+分区内高速通信（如分布式数据库HBase、Kafka）	分区内高性能，跨分区一般	中（单个分区故障不影响其他分区）
分散放置组（Spread）	实例分散在尽可能多的底层硬件（每个实例一个机架）	关键业务，需最高容错性（如核心数据库主从节点）	最低（实例分布分散，网络延迟高）	最高（单个硬件故障仅影响1个实例）
2. 核心概念：增强网络（Enhanced Networking）
	• 基于单根I/O虚拟化（SR-IOV） 技术，优化EC2网络性能：
		○ 提升带宽（最高100Gbps）、降低延迟（微秒级）、减少CPU占用；
		○ 是实现“高吞吐量、低延迟”的必要条件，现代EC2实例类型（如C5、M5、T3、R5等）均默认支持。
3. 其他辅助概念
	• 自动扩展组（ASG）：用于自动调整实例数量，核心价值是“弹性伸缩”和“高可用”，不优化实例间网络性能；
	• 弹性网络接口（ENI）：虚拟网络接口，用于多网络连接、故障转移等场景，无法提升实例间吞吐量/低延迟，仅解决“多网卡”需求


• 区域端点（Regional Endpoint）：API Gateway的端点类型之一，部署在单一AWS区域，适合区域内或近区域客户端访问，相比边缘端点（Edge-Optimized）成本更低，题目中合作伙伴位于美国，区域端点契合需求。

• 使用计划（Usage Plan）：用于管理API访问的配额（如每日请求数）和限流（如每秒请求数），需与API密钥绑定，精准控制合法客户端的访问频率。

• 资源策略（Resource Policy）：类似IAM策略，用于控制API的访问来源（如IP、AWS账户），但不支持请求配额/限流配置，仅用于访问权限控制。



• Web ACL：Web应用防火墙的核心配置，包含多条规则（允许/阻止/计数），可关联API Gateway、CloudFront等资源，用于过滤恶意流量（如僵尸网络）。
• IP匹配规则：WAF规则的一种，可精准允许特定IP（如6个合作伙伴的固定IP），直接阻断其他非法IP访问，防护效率高。


• 分发（Distribution）：AWS的CDN服务，用于加速静态/动态内容分发，但若仅为保护API且合作伙伴集中在美国，添加CloudFront会增加额外成本，不符合“最小化成本”需求。
• 源访问身份（OAI）：仅用于CloudFront访问S3时的身份验证，不支持API Gateway作为源，无法用于API访问控制。


数据库活动流（DAS）	Aurora原生功能，实时捕获数据库所有活动（DDL、DML、查询、登录/注销等）

AWS DMS + CDC	DMS用于数据库迁移，CDC（更改数据捕获）仅捕获数据变更（插入/更新/删除）
2. 自动扩展组（ASG：核心配置与目标）
自动扩展组是动态调整EC2实例数量的核心组件，关键配置：
	• 最小容量（Min Size）：始终保持的最少实例数（满足基础负载）；
	• 期望容量（Desired Capacity）：当前目标实例数（初始与最小容量一致）；
	• 最大容量（Max Size）：可扩展的最多实例数（覆盖峰值负载）；
	• 扩展策略：基于CloudWatch指标（如CPU/内存利用率）触发“扩展”（加实例）或“收缩”（减实例），核心目标是 高可用+成本优化。

1. AWS PrivateLink
	• 核心作用：实现不同AWS账户/VPC间的私有通信，流量不经过公网，仅在AWS骨干网传输。
	• 通信逻辑：客户端通过自身VPC内的“接口端点”访问服务端，无需公网网关、NAT网关等组件。
2. 接口端点（Interface Endpoint）
	• 属于PrivateLink的客户端组件，部署在客户端VPC的子网内（称为“接口端点子网”）。
	• 本质：带有私有IP的弹性网络接口（ENI），客户端通过该IP向服务端发送请求，无需暴露服务端公网地址。

4. NACL（网络访问控制列表）
	• 子网级别的安全控制，无状态（需同时配置入站/出站规则），默认拒绝所有流量。
	• 适用场景：控制子网间的流量（如NLB子网与日志服务子网、接口端点子网与NLB子网）。



加密类型	密钥管理方	核心特点	成本构成
SSE-KMS	AWS KMS（用户可选择AWS托管/客户托管CMK）	密钥可审计、可轮换，安全性高	S3存储费 + KMS密钥调用费（每1万次API调用收费）
SSE-S3	AWS S3（AES-256加密）	密钥完全由S3自动管理，无需用户干预	仅S3存储费（无额外密钥相关成本）
SSE-C	客户（用户自行管理密钥）	密钥需客户自行存储、传递，S3不保存密钥	S3存储费 + 客户密钥管理成本（服务器/安全存储）

AWS Amplify	全栈开发平台，简化Web/移动应用的构建、托管、认证、存储集成，低代码友好，加速开发。
Amazon CloudFront	CDN服务，边缘节点缓存静态资源，降低北美（美加）用户访问延迟。

AWS Application Migration Service (MGN)	迁移本地应用到EC2，适合传统应用上云，但需管理EC2实例。

CloudWatch Logs	集中式日志存储与管理服务，支持日志检索、分析、告警	实例终止后，日志仍保存在云端，满足“缩容后查看”的需求

统一CloudWatch代理	跨平台日志/指标收集工具，可收集EC2实例上的应用日志、系统日志并上传到CloudWatch Logs	解决“日志从EC2实例同步到云端”的关键组件
阶梯扩展策略（ASG）	控制ASG扩缩容的速度（如一次扩3台、冷却时间5分钟）	仅调整扩缩容行为，与日志存储无关
		

• AWS WAF（Web应用防火墙）：过滤恶意请求（如SQL注入、XSS），保护后端资源，不负责处理CORS响应头（仅做请求过滤，不修改响应配置）。

AWS IAM Identity Center (SSO)	1. 身份联合：支持与外部身份提供商（如Azure AD）集成；2. 单点登录：用户用外部凭证（如Azure AD账号）登录AWS；3. 自动同步用户/组：无需手动管理IAM用户；4. 临时凭证：通过“权限集”授权，用户登录后扮演IAM角色，获取临时凭证（无长期访问密钥）。
权限集（Permission Sets）	IAM Identity Center中的预定义权限集合（类似IAM角色的权限策略），可关联到用户/组和AWS账户，控制用户在成员账户的访问权限。
身份联合（Identity Federation）	允许用户使用外部身份提供商（如Azure AD、Okta）的凭证访问AWS，无需在IAM中手动创建用户。

AWS RAM（Resource Access Manager）	跨账户共享AWS资源（如EC2实例、S3存储桶），不用于身份管理。
AWS托管Microsoft AD	AWS提供的托管Active Directory服务，适用于无外部AD的场景。

AWS Elastic Beanstalk	PaaS服务，简化应用部署（自动管理EC2、负载均衡、Auto Scaling）
ECS Service Auto Scaling	基于指标（如内存利用率）自动调整ECS任务数量
CloudWatch	监控资源利用率、任务状态，配置告警

• 公共子网：关联互联网网关，资源（如ALB、NAT网关）可直接访问公网或被公网访问。
• 私有子网：不直接关联互联网网关，资源（如EC2）需通过NAT网关等方式访问外部网络。

AWS CodePipeline	CI/CD流水线服务，串联「源码拉取→构建→部署」全流程，集成CodeBuild/CodeDeploy。
AWS CodeDeploy	自动化应用部署到EC2/ECS等目标，核心依赖「部署组」和「CodeDeploy代理」。
CodeDeploy部署组	定义部署目标（EC2/ASG）、部署策略（如滚动部署）、触发条件的核心组件。
CodeDeploy代理	必须安装在EC2实例上，用于接收部署指令、执行部署脚本、上报状态；无代理则无法部署。


VPC与NAT网关	VPC是AWS私有网络环境，私有子网内的EC2默认无法访问公网；NAT网关可实现私有子网EC2访问公网，但按「小时费+数据处理费」收费。	。
	
S3端点（网关型vs接口型）	- 「网关端点（Gateway Endpoint）」：免费，仅支持S3和DynamoDB，只能在VPC内使用，私有子网EC2通过它访问S3时不走公网，无数据传输费、无NAT费用（核心成本优化点）。	
	- 「接口端点（Interface Endpoint）」：收费（小时费+数据处理费），支持更多服务（如S3、ECS等），可跨VPC访问，适合需要公网访问S3的场景。

AWS Service Catalog	集中管理「批准的IT服务/架构」（称为“产品”），用户（开发人员）只能从目录中选择部署，无法创建目录外的资源。核心能力：
	1. 事前强制合规（只能部署批准架构）；
	2. 简化部署（开发人员直接选用，不影响速度）；
	3. 支持“组合”（多个产品打包，如VPC+EC2+S3端点）和“启动约束”（限定部署用IAM角色）。



静态Web托管	Amazon S3	静态资源（HTML/CSS/JS）存储与托管，无需管理服务器，低成本、高可用。
AWS Elastic Beanstalk	PaaS服务，托管Web应用（支持动态/静态），但需配置应用环境，运营成本高于S3。
Amazon Lightsail	简化版VM/应用托管，适合小型应用，需手动配置资源，运营成本中等，扩展性有限。

API服务	Amazon API Gateway	REST/HTTP API网关，托管API生命周期，支持限流、认证，解耦前端与后端。

AWS AppSync	托管GraphQL API，支持实时数据同步、直接连接数据库（如DynamoDB），无需中间层。

订单排队（消息队列）	Amazon SQS	托管消息队列，解耦生产者（订单提交）与消费者（订单处理），支持死信队列（DLQ）。
Amazon MQ	兼容ActiveMQ/RabbitMQ的消息代理，适合复杂消息场景（如事务、广播），运营成本高。
Amazon SES	邮件发送服务，不具备队列能力，无法用于订单排队。

SQS死信队列（DLQ）	专门存储处理失败的消息（如Lambda重试多次失败），可后续重试或分析。
Amazon OpenSearch Service	搜索与分析服务，无消息存储和重试能力，不适合失败订单保留。
AWS Organizations 是AWS用于集中管理多个账户的服务，核心价值是“统一策略管控、批量运维、最小化配置”，对应题目需求的核心工具：
	• 管理账户（Master Account）：创建和管理组织的账户，拥有最高权限，负责创建OU、制定SCP/标记策略，不能作为成员账户使用。
	• 成员账户（Member Account）：组织中受管控的账户，继承其所属OU的所有策略，无法修改组织级策略。
	• 组织单元（OU，Organizational Unit）：账户的“分组容器”，用于将功能/合规要求相同的账户归类（如“生产环境账户OU”“受限区域账户OU”）。最佳实践是避免直接将账户关联到根目录，通过OU分组管理可最小化配置（新增账户直接加入OU即可继承策略）。
	• 服务控制策略（SCP，Service Control Policy）： Organizations 的核心“限制型”策略，用于强制约束成员账户的权限边界（仅限制权限，不授予权限）。例如：禁止在未授权区域创建资源、禁止使用特定AWS服务。SCP通过“显式拒绝”实现强制管控，符合监管要求。
	• 标记策略（Tag Policy）： Organizations 提供的集中式标记管控工具，用于强制资源标记标准（如要求所有EC2、S3资源必须包含Environment“环境”、Project“项目”标签，且标签值符合规范）。支持在组织/OU级别应用，确保所有成员账户资源标记统一合规。


1. SQS队列类型（标准队列 vs FIFO队列）
	• 标准队列：高吞吐量（每秒数万消息）、至少一次交付（可能重复）、无序交付（消息顺序不保证）。适合不需要严格顺序的场景（如题目中的订单队列）。
	• FIFO队列：严格有序交付（按发送顺序）、恰好一次交付（无重复）、吞吐量较低（每秒数千消息）。仅适用于需顺序的场景（如金融交易）。
	• 关键约束：死信队列（DLQ）的类型必须与原队列一致（标准队列→标准DLQ，FIFO队列→FIFO DLQ），否则无法接收失败消息。
2. 可见性超时（Visibility Timeout）
	• 消息被消费者接收后，会被标记为“不可见”，这段时间内其他消费者无法读取该消息。
	• 若消费者在超时前处理完消息并删除，消息永久移除；若处理失败（未删除），超时后消息恢复“可见”，会被重新消费。
	• 题目中：可见性超时30秒，后端处理10秒→缺陷消息处理失败后，20秒后会重新可见，循环被消费，导致后续消息阻塞。
3. 死信队列（Dead-Letter Queue, DLQ）
	• 专门接收“处理失败且达到重试上限”的消息的队列，核心作用是 隔离坏消息、保证原队列正常工作、便于后续分析坏消息。
	• 配置逻辑：原队列需设置 RedrivePolicy（重定向策略），指定 DLQ 的 ARN 和 最大接收次数（MaxReceiveCount）（消息被消费N次仍失败则移入DLQ）。


1. AWS Step Functions（状态机服务）
	• 作用：协调分布式工作流程（如ML模型重新训练），通过「状态机」定义步骤顺序、依赖关系和错误处理。
	• 关键状态类型：
		○ Task：执行具体工作（本题中调用Lambda）；
		○ Map：并行处理多个数据集/任务；
		○ Parallel：并行执行多个独立子流程；
	• 错误处理机制：
		○ Catch字段：捕获指定类型的错误，触发后续处理（如通知）；
		○ 错误类型：
			§ States.ALL：捕获所有错误（包括Step Functions运行时错误、Lambda自定义业务错误等）；
			§ States.Runtime：仅捕获Step Functions运行时错误（如任务超时、权限不足），不包含业务错误。
2. AWS Lambda（无服务器计算）
	• 本题中作为Step Functions的「任务执行单元」，负责ML训练的具体步骤（如数据预处理、模型训练、评估）；
	• 可能抛出两种错误：
		○ 运行时错误（如内存不足、超时）；
		○ 业务错误（如数据格式错误、模型训练收敛失败）。
3. Amazon SNS（简单通知服务）
	• 「发布-订阅」模式的通知枢纽，支持邮件、SMS、Lambda等多种订阅类型；
	• 优势：无需直接操作邮件服务（如SES），可快速实现多渠道通知，且自动对接SES发送邮件，简化配置。
4. Amazon SES（简单邮件服务）
	• 专门用于发送/接收电子邮件的服务，需手动验证发件人/收件人地址；
	• 局限性：仅支持邮件渠道，且需手动构造邮件内容、配置发件人，灵活性低于SNS。




1. VPC与DNS基础
	• VPC DNS主机名：开启后，VPC内的EC2实例会被分配私有DNS主机名（如ip-10-0-0-10.ec2.internal），实例可通过VPC内置DNS服务器（由Route 53 Resolver提供，地址为VPC CIDR的+2，如10.0.0.2）进行DNS解析。
	• VPC DNS支持：默认开启，允许实例使用VPC DNS服务器转发解析请求。
2. Route 53 Resolver（核心组件）
	• 是AWS托管的DNS解析服务，负责处理VPC内的DNS查询，可与本地DNS服务器跨网络协作。
	• 出站端点：用于VPC内资源（如EC2）解析外部私有DNS域（本题中本地的company.example）时，将DNS请求转发到本地DNS服务器。
	• 入站端点：用于本地网络资源解析VPC内的私有DNS域时，接收本地DNS转发的请求。
	• Resolver规则：定义“特定域名→转发目标”的映射（如company.example的请求转发到本地DNS IP），绑定到VPC后生效。
3. 站点到站点VPN
	• 建立VPC与本地网络的加密隧道，使两个网络内的资源可私网通信（本题中为DNS请求和业务数据传输提供网络通路）。
4. 其他相关概念
	• 私有DNS区域（Route 53）：用于托管VPC内的私有域名解析记录，仅VPC内资源可访问，但无法直接同步本地DNS记录。
	• AWS SSM与EventBridge：SSM用于远程管理EC2实例（如修改hosts文件），EventBridge用于触发自动化任务，但仅适用于静态主机名场景。


Amazon Workspaces	托管虚拟桌面服务（VDI）
Active Directory（AD）	微软目录服务（用户/权限管理）
Amazon AppStream 2.0	桌面应用流式传输服务

成本分配标签（Cost Allocation Tags）	激活后可同步到AWS计费数据，用于按标签维度拆分账单（如按成本中心统计开销）
标签编辑器（Tag Editor）	AWS Resource Groups工具，支持跨账户、跨区域批量编辑资源标签
服务控制策略（SCP）	AWS Organizations的组织级策略，限制账户的资源操作（仅阻止，不允许）
AWS Direct Connect (DC)	本地数据中心与AWS云之间的专用物理网络连接，绕过公网，提供低延迟、高带宽、高稳定性的传输通道（满足题目“不通过互联网传输”的核心需求）。
私有VIF vs 公共VIF	两者是DC的虚拟接口类型，用于区分访问目标：
	- 私有VIF：关联VPC的虚拟专用网关（VGW），仅用于访问VPC内资源或通过VPC端点访问AWS服务，流量完全私有（符合“私下发送数据”要求）；
	- 公共VIF：用于访问AWS公共服务（如S3公网端点），流量通过DC链路但访问的是公共IP，不完全私有。
S3接口端点（Interface Endpoint）	基于AWS PrivateLink，以弹性网络接口（ENI） 形式部署在VPC子网中，分配私有IP。支持：
	1. 本地网络、跨VPC、跨账户资源通过私有IP访问S3；
	2. 无需公网，流量完全在AWS骨干网内传输；
	3. 跨账户访问灵活（只需桶策略授权）。
S3网关端点（Gateway Endpoint）	VPC的网关类型，无私有IP，仅支持VPC内资源通过路由表访问S3，不支持本地网络直接访问（需额外中转组件，不符合“直接私下发送”需求）。
Amazon CloudFront	CDN服务，缓存静态内容/API响应，降低重复请求延迟，但缓存会导致实时数据（新评论）无法及时更新，不适合实时场景。

. S3访问点（S3 Access Points）
	• 简化S3存储桶访问管理的工具，每个访问点可独立配置权限和网络来源：
		○ VPC访问点：仅允许在指定VPC内访问（题目要求的合规场景）；
		○ 互联网访问点：允许公网访问（题目需拒绝的场景）。
	• 创建访问点时，通过NetworkOrigin参数指定网络来源，AWS提供s3:AccessPointNetworkOrigin条件键用于校验该参数。



S3存储桶策略	单个S3存储桶	控制对存储桶的访问（如Get/Put）
S3访问点资源策略	单个S3访问点	控制通过该访问点访问桶的权限

1. 蓝绿部署（Blue/Green Deployment）
	• 定义：零停机部署策略，维护两个完全相同的生产环境（蓝环境=当前运行的旧版本，绿环境=待上线的新版本）。
	• 核心流程：部署新版本到绿环境 → 验证绿环境可用性 → 切换流量从蓝到绿 → 问题回滚（快速切回蓝环境）。
	• 优势：无停机时间、回滚成本低、验证环境与生产环境一致。
2. AWS Elastic Beanstalk（EB）
	• 定位：托管应用部署服务，简化EC2、Auto Scaling、ELB、RDS等底层资源的管理。
	• 核心概念：
		○ 「应用（Application）」：逻辑容器，包含所有环境和版本。
		○ 「环境（Environment）」：应用的运行实例（如蓝/绿环境），每个环境有唯一的默认URL（格式：环境名.区域.elasticbeanstalk.com），且自动继承应用配置（如Auto Scaling、ELB规则）。
		○ 「交换环境URL」：EB内置的蓝绿部署核心功能，通过交换两个环境的CNAME记录，实现流量无缝切换（无需手动修改DNS或重定向）。
3. Amazon Route 53
	• 定位：AWS DNS服务，用于域名解析（将自定义域名映射到资源）。
	• 与EB的关系：EB默认环境URL（elasticbeanstalk.com）由EB自动管理，无需Route53干预；仅当使用自定义域名（如www.example.com）时，才需Route53配置解析，但这不是EB蓝绿部署的标准步骤。

Amazon CloudWatch	监控与日志服务，收集SQS队列深度、EC2负载等指标，触发自动扩展策略，保障系统稳定性。
Amazon SNS	发布/订阅（Pub/Sub）服务，适合向多个订阅者广播消息，不适合作为单处理层的缓冲队列（无消息排序和缓冲控制）。
AWS Transfer Family	托管的SFTP/FTPS/FTP服务，AWS负责服务器运维、补丁、高可用（多AZ部署）。
VPC托管端点（VPC Hosted Endpoint）	位于用户VPC内的AWS服务访问入口，分“互联网面向”和“私有”类型。
• EC2预留实例（Reserved Instances, RI）：预付费的EC2实例，针对长期稳定负载（如全天候运行），价格比按需实例低30%-70%，但需1年/3年承诺，到期后需重新购买。
• EC2按需实例（On-Demand Instances）：按实际使用时长付费，无承诺期，适合短期、不可预测的负载，成本最高。
• EC2 Spot实例：利用AWS闲置计算资源，价格仅为按需实例的20%-70%，但AWS可在资源紧张时中断实例（需提前2分钟通知），仅适合非关键、可重试的任务。

3. AWS Transfer Family：托管的SFTP/SCP/FTP服务，无需自管理服务器，内置高可用性，可直接集成EFS/S3等存储，大幅降低运营开销。
4. VPC接口端点（Interface VPC Endpoint）：用于在VPC内访问AWS服务，支持关联弹性IP，提供静态公网入口，让外部供应商可通过固定IP访问。

5. AWS Application Migration Service（MGN）：仅用于将本地服务器迁移到EC2实例，无法迁移到托管服务（如Transfer Family）。

6. VPC接口端点（Interface VPC Endpoint）：用于在VPC内访问AWS服务，支持关联弹性IP，提供静态公网入口，让外部供应商可通过固定IP访问。
7. AWS Application Migration Service（MGN）：仅用于将本地服务器迁移到EC2实例，无法迁移到托管服务（如Transfer Family）。

EC2预留实例（RI）	预付费长期资源（1/3年），比按需实例便宜30%-70%
EC2按需实例	按使用时长付费，无承诺，即开即停
EC2 Spot实例	利用AWS闲置EC2容量，价格为按需的30%-90%，但可能被AWS回收（容量不足时）
Kinesis Data Firehose	托管流数据摄取服务，可实时将流数据加载到S3/Redshift等目标
AWS Batch	托管批量处理服务，自动管理计算资源（EC2/Spot）和作业调度
Amazon Redshift	数据仓库服务，适合复杂OLAP分析查询
AWS Application Migration Service（MGN）	用于将本地虚拟机“ lift-and-shift ”迁移到EC2实例（适合迁移自建服务器，但运营开销高）。
Amazon FSx for Lustre	高性能文件系统，面向HPC/机器学习场景，不兼容NFS协议（无法替代本地NFS共享）。


标签策略（Tag Policy）	Organizations的功能，用于强制标签合规性：定义允许的标签键、标签值列表，约束资源标签的使用（如“Project标签只能取PROJ-001/002/003”）。需在管理账户创建，可批量附加到OU/账户，避免重复工作。
AWS Service Catalog	集中管理“经批准的IT服务（产品）”，通过TagOptions控制标签，但需将所有CloudFormation堆栈封装为产品，配置复杂，不如SCP直接高效。

要解决这道题，需先掌握以下核心概念，这是分析选项和设计解决方案的基础：
1. Amazon CloudFront（CDN）
	• 定义：AWS全球分布式边缘缓存服务，核心功能是将源站（S3、EC2、自定义源等）的内容缓存到全球边缘节点，用户请求优先从边缘节点获取，降低延迟、提高性能。
	• 缓存命中率：命中缓存的请求数 / 总请求数，命中率越高，边缘节点直接响应比例越高，性能越好、源站压力越小、成本越低。
	• 缓存键（Cache Key）：CloudFront判断是否命中缓存的核心依据，默认包含「协议+主机名+路径+查询字符串」。不同的缓存键会被视为不同的请求，即使实际指向相同内容。
2. 查询字符串对CloudFront缓存的影响
	• 默认情况下，CloudFront会将查询字符串的「顺序」和「大小写」视为缓存键的一部分：
		○ 例：?a=1&b=2 和 ?b=2&a=1（顺序不同）→ 不同缓存键 → 两次缓存（命中率下降）；
		○ 例：?Name=Alice 和 ?name=alice（大小写不同）→ 不同缓存键 → 两次缓存（命中率下降）。
	• 题目中“查询字符串顺序不一致、大小写混合”是缓存命中率低的直接原因



Lambda@Edge
	• 定义：在CloudFront边缘节点执行的无服务器Lambda函数，无需部署到全球节点，AWS自动同步函数到边缘，延迟极低。
	• 核心作用：在请求/响应的关键阶段修改内容（如URL、查询字符串、响应头），适配缓存优化、安全控制等场景。
	• 关键触发器类型：
		○ 查看器请求（Viewer Request）：边缘节点「接收用户请求后、查询缓存前」执行（核心！适合修改查询字符串，确保相同逻辑请求命中同一缓存）；
		○ 源请求（Origin Request）：边缘节点「未命中缓存、请求源站前」执行；
		○ 源响应（Origin Response）：边缘节点「接收源站响应后、缓存前」执行；
		○ 查看器响应（Viewer Response）：边缘节点「返回响应给用户前」执行。


SSM Agent（Systems Manager Agent）	安装在EC2实例上，通过AWS Systems Manager实现自动化运维（补丁、命令执行）
DocumentDB/DynamoDB/Neptune	非MySQL兼容数据库（DocDB兼容MongoDB，DynamoDB是NoSQL，Neptune是图数据库）
Amazon API Gateway（REST API vs HTTP API）
	• 核心定位：API网关是客户端与后端服务（如Lambda）之间的“中间层”，负责请求路由、身份验证、限流/配额控制、监控等。
	• REST API：功能完整，支持使用计划（Usage Plans）、API密钥、配额（Quota）、节流（Throttling）等精细化控制，适合需要复杂访问控制的场景。
	• HTTP API：轻量、低成本，仅支持基础节流和API密钥，但不支持完整的“配额（Quota）”管理（无法限制“每天/每周总请求数”，仅能限制“每秒请求速率”）。

2. 使用计划（Usage Plans）
	• 仅适用于API Gateway REST API，用于定义API的访问规则，核心功能：
		○ 配额（Quota）：限制“特定时间段内的总请求数”（如每天1万次、每周5万次），满足题目“特定时间段内的请求配额”需求。
		○ 节流（Throttling）：限制“单位时间内的请求速率”（如每秒50次），满足题目“部分客户短时间内更高配额”（即更高的速率限制）需求。
	• 需与API密钥绑定，通过密钥识别客户身份，对应到其专属的使用计划。
3. API密钥（API Keys）
	• 用于客户身份验证，与使用计划一一对应（或多密钥对应一个计划）。
	• 客户调用API时需在请求头中携带API密钥，API Gateway验证后应用对应的配额和节流规则。


AWS应用程序发现代理（Application Discovery Agent）	部署在本地物理机/VM上，收集服务器配置、性能、网络连接（端口/协议）数据，同步到AWS云端，是“资产清点+依赖分析”的数据源。
AWS迁移中心（Migration Hub）	迁移“中央控制台”，整合发现代理数据，提供资产可视化、依赖关系分析、迁移跟踪功能，支持创建“移动组”。

网络访问分析器（Network Access Analyzer）	Migration Hub内置功能，分析发现代理收集的网络流量数据，精准识别服务器间的通信关系（含端口、协议），可视化依赖链路。
AWS应用程序迁移服务（MGN）	专注于“迁移执行”，提供自动化迁移、测试实例部署、数据同步功能，不负责“依赖关系分析”。

AWS应用程序迁移服务（MGN）	专为本地VM（VMware/Hyper-V等）迁移到EC2设计，支持实时增量复制，保留OS、软件、配置完整性，迁移 downtime 极短。

字段级加密（FLE）	CloudFront原生功能，加密HTTP请求中的特定敏感字段（如表单/JSON字段），传输过程中保持加密
RSA密钥对	非对称加密（公钥加密、私钥解密），需用户自行管理密钥

要解决这道题，必须先掌握VPC DNS解析、私有托管区域、DHCP选项集等核心概念，以下是详细说明：
1. VPC的两个关键DNS属性
	• enableDnsSupport（DNS支持）
		○ 作用：控制VPC内实例是否能使用AWS提供的DNS服务器（AmazonProvidedDNS）进行域名解析。
		○ 默认值：true（启用）。若禁用（false），VPC内实例无法通过AWS DNS解析任何域名（包括私有托管区域和公网域名）。
		○ 题目要求：必须启用（否则DNS查询失效）。
	• enableDnsHostnames（DNS主机名）
		○ 作用：控制“具有公共IP的实例”是否会被分配公共主机名（格式：ec2-xx-xx-xx-xx.<region>.compute.amazonaws.com），同时“仅私有IP的实例”会分配私有主机名。
		○ 依赖关系：仅当enableDnsSupport = true时，该属性才生效。
		○ 题目要求：必须启用（否则有公共IP的实例无公共主机名）。
2. DHCP选项集（DHCP Options Set）
	• 作用：VPC的DHCP选项集用于向实例分配网络配置（DNS服务器、域名后缀等），实例启动时自动获取这些配置。
	• 核心参数：domain-name-servers（指定DNS服务器地址）。
		○ AmazonProvidedDNS：AWS官方推荐的DNS服务器标识（对应VPC CIDR的“+2”地址，如10.24.34.0/24对应10.24.34.2），无需硬编码IP（避免多CIDR块或AWS调整导致失效）。
		○ 硬编码IP（如10.24.34.2）：不推荐，灵活性差。
3. Route 53私有托管区域（Private Hosted Zone）
	• 作用：用于解析VPC内部的私有域名（如app.internal），仅关联的VPC内实例可访问。
	• 关键要求：必须与目标VPC关联，否则VPC内实例无法查询该托管区域的记录。
	• 解析优先级：实例查询域名时，会先查询私有托管区域的记录，未匹配则查询公网DNS（由AmazonProvidedDNS转发）。
4. AmazonProvidedDNS
	• AWS为VPC内置的DNS服务，是VPC DNS解析的核心。
	• 功能：转发私有托管区域查询、公网DNS查询，同时为实例分配主机名（依赖enableDnsHostnames）。


Amazon ECR	容器镜像注册表，分私有存储库（仅授权账户访问）和公共存储库（公开访问）。题目要求“仅组织内账户访问”，必须用私有存储库。
ECR权限策略	控制存储库访问权限的JSON策略，可通过条件键限制访问主体。题目需用aws:PrincipalOrgID条件键，仅允许指定组织内账户操作。
ECR生命周期规则	ECR内置的镜像自动管理功能，可按“标记状态（标记/未标记）、镜像年龄、保留数量”配置清理规则。题目“保留所有标记镜像+最近5个未标记镜像”可直接通过该规则实现，无需额外组件。
IAM条件键aws:PrincipalOrgID	用于限制“仅AWS组织内账户”执行操作的核心条件键。相比列举数百个账户ID，该条件键无需维护，适配账户增长，运营开销最低。

Amazon RDS 快照	RDS的备份机制（自动快照/手动快照），默认自动快照保留1-35天，频率仅支持每日。
AWS Backup	AWS统一备份服务，支持跨服务（RDS/EBS/S3等）、跨账户、跨区
AWS Backup 跨账户管理	基于Organizations，管理账户可创建备份计划，成员账户自动继承/应用，管理账户可查看所有账户备份状态。
AWS Data Lifecycle Manager (DLM)	主要用于EBS快照、AMI的生命周期管理，对RDS快照支持有限。
	
CloudFormation StackSets	跨账户/跨区域批量部署CloudFormation堆栈。
AWS Storage Gateway	本地数据中心与AWS云存储之间的“桥梁”，提供本地可访问的接口（NFS/SMB/iSCSI等），数据自动同步到S3/EBS等云存储。
- 文件网关（File Gateway）	提供NFS/SMB文件共享接口，本地客户端通过NFS/SMB访问网关，数据实时同步到S3存储桶（以对象形式存储）。
- 卷网关（Volume Gateway）	提供iSCSI块存储接口（模拟本地硬盘），数据同步到EBS快照或S3，不支持NFS。
- 磁带网关（Tape Gateway）	模拟物理磁带库，数据备份到虚拟磁带（存储在S3），用于合规性归档，不支持NFS。

S3生命周期规则（Lifecycle Rules）	自动管理S3对象的存储类别转换或过期删除，可按“创建后天数”配置规则。
Amazon EC2	持续且稳定
	
	
	
	
	
	
EC2现货车队（Fleet）	批量启动多个EC2实例（支持按需/竞价实例），适合一次性部署，无动态扩展能力
Route 53 基于延迟路由	AWS托管DNS，检测用户到各区域终端节点的实际网络延迟，将DNS查询路由到延迟最低的区域
Route 53 地理接近性路由	基于用户与资源的物理地理位置路由（如欧洲用户路由到eu-west-1），不考虑实际网络延迟
DynamoDB全局表	跨多区域的托管NoSQL表，每个区域的表都是独立读写端点，数据自动异步复制到所有关联区域，无需手动管理复制/故障转移
Aurora全局数据库	跨区域关系型数据库，1个主区域（可读写）+ 多个辅助区域（只读），数据异步复制，故障转移需手动/自动切换
Global Accelerator	通过AWS边缘站点路由流量，优化全球网络延迟，但需配合终端节点，且无法解决数据跨区域共享问题
	
共享服务VPC	集中式VPC，部署多VPC共享的服务（如防火墙、NAT网关），避免重复部署，简化管理
多AZ部署	可用区（AZ）是物理隔离的基础设施，跨AZ部署可避免单AZ故障，是“可靠性优先”的核心实现方式
	
	
网关负载均衡器（GWLB）	专为第三方安全设备（防火墙、IDS/IPS）设计的三层（网络层）负载均衡器，使用GENEVE协议，支持透明流量转发、健康检查、自动故障转移（毫秒级切换）
网关负载均衡器端点（GWLBE）	VPC端点的一种，是GWLB的流量入口，用于跨VPC/同一VPC将流量路由到GWLB背后的安全设备，无需公网或额外路由转发
VPC接口端点	用于访问AWS公有服务（如S3、DynamoDB），无法路由到第三方防火墙设备
VPC路由表	控制子网流量路由，下一跳可指定GWLBE、IGW、对等连接等，题目中需将其他VPC的出站流量路由到GWLBE
	
弹性网络接口（ENI）	EC2的虚拟网络接口，具备固定MAC地址、私有IP、公有IP（可选）；可独立创建、附加/分离到EC2实例，MAC地址永久不变
	
高可用架构（HA）	跨可用区（AZ）部署资源，避免单点故障；通过Auto Scaling Group（ASG）实现实例故障自动恢复，负载均衡器分发流量
	
Auto Scaling Group（ASG）	跨AZ管理EC2实例，自动扩缩容、故障替换

Auto Scaling Group (ASG)	自动化管理EC2实例的创建、扩展、缩减、删除，确保资源按需分配
	
传输网关 (Transit Gateway, TGW)	AWS骨干网络服务，统一连接多个VPC、本地数据中心（通过VPN/Direct Connect）


1. API Gateway 端点类型
	• 区域性API端点：部署在单一区域，终端节点为 {restapi-id}.execute-api.{region}.amazonaws.com，流量直接路由到该区域，适合低延迟场景。
	• 多区域部署逻辑：活动-活动架构需在多个区域独立部署区域性API，通过统一入口（如Route53）分发流量，而非依赖“边缘优化API”（CDN加速，非活动-活动）。


 DynamoDB全球表
	• 跨区域分布式表，自动同步数据（基于多区域复制流），无需手动管理同步，天然支持多区域读写，是活动-活动架构的核心数据层组件。

3. Secrets Manager
	• 区域性服务：密钥仅存储在指定区域，无法跨区域直接访问（跨区域访问延迟高、可用性差），多区域部署需在每个区域创建独立密钥。
	• 加密依赖：密钥需通过KMS CMK加密，CMK需与Secrets Manager同区域（单区域CMK）或支持跨区域（多区域CMK）。
4. KMS 密钥类型
	• 单区域CMK：仅能在创建区域使用，密钥材料存储在该区域。
	• 多区域CMK：创建时指定“多区域”属性，密钥材料通过“复制密钥”同步到多个区域，支持跨区域加密/解密，仅需管理1个主密钥，运营开销低。
	• AWS管理KMS密钥：AWS自动创建管理（如aws/secretsmanager），客户无法自定义创建，权限受限。
5. Route 53 路由策略
	• 多值应答路由：对同一域名查询返回多个健康端点，客户端随机选择，无需额外负载均衡器，实现低成本活动-活动流量分发，支持健康检查（自动剔除故障区域）。
6. Lambda 部署特性
	• Lambda是区域性服务，多区域活动-活动需在每个区域重复部署相同函数代码（可通过CI/CD自动化），本地访问资源（Secrets Manager、DynamoDB本地表）以降低延迟。

Amazon RDS（MySQL/MariaDB）	托管关系型数据库，简化备份、补丁、故障恢复
Amazon Aurora MySQL	兼容MySQL的云原生数据库（性能是RDS MySQL的5倍），存储跨3个AZ冗余
Amazon DocumentDB	兼容MongoDB的文档数据库（非关系型）

ElastiCache for Redis	内存数据库，支持持久化、跨AZ复制组、自动故障切换，性能优异

ElastiCache for Memcached	内存数据库，不支持持久化，集群可靠性弱
Amazon Neptune	图形数据库（适用于社交网络、知识图谱）
Amazon Kinesis Data Firehose	实时流数据传输服务（如日志写入S3）
数据库：RDS MySQL多区域 → 多区域是灾备方案（跨区域冗余），而非高可用首选（高可用应优先同区域跨AZ）	
Amazon Neptune → 图形数据库，完全不适合存储会话
• AWS Audit Manager：合规审计工具，用于收集合规证据、评估配置合规性，不具备主动加密资源的能力，仅用于“审计”而非“执行”。
• AWS Config：配置合规监控服务，可检测资源配置（如EBS是否加密），但需配合其他工具（如SSM）执行修复，配置复杂。

本地Active Directory (AD)
微软目录服务，存储用户身份、权限信息




AWS Directory Service	托管目录服务，分两类关键子服务：
	- AD Connector：轻量级代理，不存储数据，仅转发AWS服务的身份请求到本地AD（无托管AD成本）；
	- Managed Microsoft AD：完整托管AD，需与本地AD建立信任（有目录服务费用，配置复杂）





IAM Identity Center (SSO)	集中管理AWS资源访问，支持集成本地AD/AD Connector，通过「权限集」控制用户权限


AWS Systems Manager (SSM) Fleet Manager	SSM的子功能，允许通过浏览器基于HTTPS（443端口）远程RDP/SSH访问实例，无需开放3389端口到公网，依赖SSM Agent（Windows实例默认预装）



堡垒主机	部署在公有子网的跳板机，需开放3389端口，用户先连堡垒机再访问私有实例

SSH密钥对	EC2身份验证方式（公钥存实例，私钥用户持有），题目要求每个实例唯一。
EC2 Instance Connect（EC2实例连接）	安全连接EC2的方式，无需管理永久SSH密钥：通过SendSSHPublicKey API注入临时公钥（有效期几分钟），连接记录自动写入CloudTrail，支持浏览器/SSH客户端。
AWS Secrets Manager	敏感信息存储（如密钥），支持轮换，但不直接解决SSH连接记录问题。
AWS Systems Manager（SSM）	实例管理服务（如Session Manager、Run Command），但普通SSH连接不依赖它记录。

原生SSH连接（TCP 22端口）是实例层面的网络操作，CloudTrail不记录普通SSH连接


Route 53 Resolver	AWS托管的DNS解析服务（原名为Amazon DNS Resolver），默认VPC内的EC2实例会使用VPC DNS（VPC CIDR+2地址），而VPC DNS本质是Route 53 Resolver的本地端点。核心功能：
	- 解析公网DNS、VPC私有托管区域域名；
	- 通过端点（入站/出站） 实现跨VPC/本地数据中心的DNS解析；
	- 支持条件转发规则：按域名匹配，将特定DNS查询转发到指定DNS服务器。

Route 53 Resolver端点	分两种：
	- 出站端点：允许VPC内的DNS查询转发到外部（如本地数据中心）的DNS服务器；
	- 入站端点：允许外部（如本地数据中心）的DNS查询解析VPC内的域名。
	需跨多个AZ部署，保证高可用。
条件转发规则	Route 53 Resolver的规则，指定“目标域名（如本地AD域corp.example.com）”和“转发目标（本地DNS服务器IP）”，当VPC内应用查询该域名时，自动转发到目标DNS服务器解析。
私有托管区域（Route 53）	仅允许关联的VPC内资源解析的DNS托管区域，用于托管AWS内部的域名（如VPC内EC2的私有域名），不支持转发到外部DNS服务器，仅用于“权威解析”（自己托管域名的解析记录）。
Active Directory（AD）	微软的目录服务，自带DNS域名（如ad.corp.com），需通过DNS服务器解析该域名才能访问AD服务。
	
Amazon Kinesis Data Firehose	托管数据流加载服务，自动将实时数据流批量加载到目标存储
Amazon Kinesis Data Streams	托管实时流处理服务，摄取毫秒级高吞吐量数据流
Amazon MSK	托管Apache Kafka服务，构建高吞吐量流数据管道
Amazon Redshift	托管PB级数据仓库，优化OLAP分析
Amazon Keyspaces	托管Apache Cassandra兼容数据库（宽列存储NoSQL）
	
1. 数据库兼容性相关
	• Amazon DocumentDB：AWS托管的MongoDB兼容数据库，支持MongoDB 3.6/4.0/5.0协议，无需修改旧应用代码即可迁移（核心匹配题目中“MongoDB应用迁移”需求）。
	• Amazon DynamoDB：AWS原生键值NoSQL数据库，不兼容MongoDB协议（应用需重写代码才能适配，直接排除依赖DynamoDB的选项）。
2. 网络访问相关（私有子网无公网）
	• 私有子网（Private Subnet）：无互联网网关（IGW）路由，EC2无法直接访问公网，需通过VPC端点访问AWS托管服务（如DocumentDB、DynamoDB）。
	• VPC端点（VPC Endpoints）：
		○ 接口端点（Interface Endpoint）：弹性网络接口（ENI）形式，支持大部分AWS服务（含DocumentDB），通过私有IP访问，默认加密（TLS），需付费。
		○ 网关端点（Gateway Endpoint）：仅支持S3、DynamoDB，免费，通过路由表配置，但DocumentDB不支持该类型。
3. 数据库扩展性与连接相关
	• DocumentDB端点类型：
		○ 集群端点（Cluster Endpoint）：自动将写请求路由到主节点，读请求负载均衡到所有只读副本，支持横向扩展（增加只读副本）和高可用（节点故障自动切换）。
		○ 实例端点（Instance Endpoint）：仅指向单个节点（主节点或某个只读副本），无法利用多副本扩展，高可用差。
	• 预配置IOPS（PIOPS）：EBS卷的高性能存储配置，DocumentDB支持该选项（题目中A、D均包含，非排除点）。
	• 加密要求：DocumentDB默认启用静态数据加密（KMS） 和传输中加密（TLS 1.2+），满足题目“连接加密”需求。


AWS DMS（数据库迁移服务）	托管的数据库迁移服务，支持全量迁移+CDC（变更数据捕获），兼容同构/异构数据库，核心价值是近乎零停机迁移，是数据库迁移的首选工具。
CDC（变更数据捕获）	DMS的核心功能，捕获源数据库的增量变更（插入/更新/删除）并同步到目标，避免迁移期间业务停机。

AWS Data Pipeline	批量数据处理/迁移服务，适用于周期性批量数据导出（如本地数据库→S3），不支持CDC，无法实现持续同
AWS Glue	ETL（抽取-转换-加载）服务，核心用于数据湖/数据仓库的元数据管理（Glue爬虫）和批量ETL作业，不擅长数据库间的实时/增量同步。


2. Amazon WorkSpaces
AWS托管的虚拟桌面服务（DaaS），提供Windows/Linux虚拟桌面，核心特点：
	• 托管服务：无需管理桌面底层 infrastructure（实例、补丁、更新）；
	• 天然集成AWS Directory Service：可直接加入Microsoft AD域，作为安全的域管理终端（适合开发团队进行域配置、权限管理）；
	• 支持MFA：可通过AD或IAM Identity Center启用多因素认证，符合题干安全要求。

. AWS Control Tower
	• 定位：多账户治理与编排的“顶层服务”，基于AWS Organizations构建，简化多账户环境的创建、合规管控和标准化管理。
	• 核心功能：
		○ 登陆区（Landing Zone）：自动创建管理账户、日志账户等核心账户，以及预配置的OU结构。
		○ 护栏（Guardrails）：治理核心，分两类：
			§ 预防型护栏（Preventive）：事前阻止不合规操作（如创建非授权资源），基于AWS Organizations的SCP实现，是本题核心需求的关键。
			§ 侦探型护栏（Detective）：事后检测不合规配置（如未加密资源），基于AWS Config/Trusted Advisor，仅告警不阻断。
	• 适配场景：多账户统一治理、合规管控（题目中公司已明确使用其编排多账户）。


4. 突发性实例（Burstable Instances）
	• 定义：适用于短期高CPU负载、大部分时间低负载的场景，通过“CPU积分”实现性能突发，成本最优。
	• 对应产品：
		○ EC2：T系列（t2、t3、t4g等）。
		○ RDS：突发性能类（db.t2、db.t3、db.t4g等）。

5. 预防型vs侦探型控制
	• 预防型：事前阻止不合规操作（如禁止创建非T系列EC2），匹配题目“禁止使用”的需求。
	• 侦探型：事后检测告警（如发现非T系列EC2后通知），无法满足“禁止”需求。

REST API 管理	题干要求保留REST API模型，需支持「API密钥节流」「区分实时/测试流量」，需专用API管理服务而非单纯负载均衡。
Amazon API Gateway	专为REST/HTTP API设计的托管服务，核心能力：①原生支持REST API（不改变现有模型）；②API密钥验证；③流量节流；④多环境（实时/测试）隔离；⑤与Lambda无缝集成。
Amazon Aurora Serverless	无服务器关系型数据库，自动扩缩容，但关系型数据库读写延迟高于NoSQL，且会话数据无需复杂关联查询，不适合低延迟需求。
AWS AppSync	主打GraphQL API的托管服务，虽支持REST转换，但非原生REST支持，需调整API模型，不符合题干「API模型不应更改」要求。
AWS Direct Connect (DX)	本地数据中心与AWS之间的专线连接，绕过公网，提供稳定带宽、低延迟和高安全性
DX VIF（虚拟接口）	DX连接的逻辑分区，分两种：
	- 私有VIF：访问VPC内资源（如EFS、EC2）
	- 公共VIF：访问AWS公共服务（如S3、Lambda）
	
	
AWS DataSync	专门用于本地存储与AWS存储（EFS、S3、FSx）之间的高效数据传输服务：
	- 部署本地代理访问源存储（如NFS）
	- 支持增量复制（仅传新创建/修改文件）
	- 优化传输协议（压缩、并行传输、断点续传）
AWS PrivateLink	VPC端点的一种（接口端点），让VPC内资源通过私网访问AWS服务（无需公网IP），提升安全性和性能
AWS Storage Gateway（文件网关）	本地与S3之间的文件接口（提供NFS/SMB挂载点），适合“本地需要访问S3文件”的场景

AWS管理的前缀列表（Managed Prefix List）	AWS维护的IP地址范围集合（如CloudFront、S3等服务的IP），自动更新，无需手动维护
ip-ranges.json	AWS公开的所有服务IP范围文档，需手动/脚本定期提取更新
VPC接口端点（VPC Endpoint）	允许VPC内资源无需公网访问AWS服务，本题中ELB接口端点与需求无关
Origin Access Control（OAC）	CloudFront与Origin（ALB/S3）的安全认证机制，确保Origin仅接收CloudFront的合法请求
	
1. 灾难恢复（DR）核心指标
	• RTO（恢复时间目标）：故障后恢复服务的最长可接受时间（题目要求≤24小时）。
	• RPO（恢复点目标）：故障后可接受的数据丢失量对应的时间（题目要求≤8小时）。

自动扩展组（ASG）	管理EC2实例集群的服务，基于「启动配置/启动模板」创建实例，支持扩缩容、不健康实例替换、实例刷新等。核心依赖：启动配置/模板中的AMI。
启动配置（Launch Configuration）	ASG的固定配置模板，包含AMI ID、实例类型、安全组等，不可修改，需创建新配置替换旧配置。
实例刷新（Instance Refresh）	ASG的核心特性，支持用新的启动配置/模板滚动替换旧实例，可配置最小健康实例数、替换批次，确保业务连续性。
终止保护（Termination Protection）	EC2实例或ASG层面的保护机制，启用后阻止ASG自动终止实例。
VPC端点（VPC Endpoint）	让VPC内资源无需互联网网关（IGW）、NAT设备，通过AWS骨干网直接访问AWS服务。分为：
	- 接口端点（Interface Endpoint）：支持大部分AWS服务（如SageMaker API、CodeArtifact），本质是VPC内的弹性网络接口；
	- 网关端点（Gateway Endpoint）：仅支持S3、DynamoDB，性能更优，无需额外付费。
Amazon SageMaker	AWS全托管机器学习平台，包含训练实例、笔记本实例等，需访问数据集（S3）和依赖包（PyPI）。
PyPI	Python官方包索引（公共仓库），默认需互联网访问才能通过pip下载包。
AWS CodeArtifact	AWS全托管包管理服务，支持PyPI、Maven、npm等格式，可作为公共包仓库（如PyPI）的代理，且支持VPC端点访问。
• Amazon DLM（Data Lifecycle Manager）：
AWS原生的快照/AMI生命周期自动化工具，专为EBS快照、EC2 AMI设计。支持自动创建、复制、保留和删除快照，可直接配置跨区域复制规则，无需编写代码，操作开销极低。	

• AWS Backup：
集中式备份服务，支持EBS、RDS、S3等多种资源的备份，但备份后的跨区域复制是其内置功能，无法通过S3跨区域复制（CRR）实现（因EBS快照存储在AWS管理的S3桶，用户无权限配置CRR）。



• AWS Lambda + Amazon EventBridge：
Lambda是无服务器代码运行环境，EventBridge是事件/定时触发器。需手动编写Lambda函数（实现快照复制逻辑），并配置EventBridge定时触发，需维护代码、权限和触发器，操作开销较高。

• EC2 Image Builder：
用于自动化构建、测试和更新EC2 AMI（亚马逊机器镜像）的服务，核心目标是标准化AMI镜像，而非备份EBS快照。AMI包含EBS快照，但复制AMI≠复制快照，且偏离题目“快照备份”需求。

• S3跨区域复制（CRR）：
仅适用于用户自有S3桶中的对象复制，无法用于AWS管理的EBS快照存储桶（用户无访问权限），因此无法实现EBS快照跨区域复制。


1. AWS Organizations 与 SCP（服务控制策略）
	• AWS Organizations：用于集中管理多个AWS账户的服务，支持统一计费、权限管控等。
	• SCP（Service Control Policy）：Organizations的核心权限控制工具，作用于账户层面，限制账户内所有用户/角色能使用的AWS服务/资源。关键限制：SCP仅对加入Organizations的账户生效，独立账户无法使用。
2. IAM（身份与访问管理）
	• 用于管理AWS账户内的身份（用户、组、角色）和权限（策略），是基于身份的权限控制。
	• IAM策略：JSON格式的权限规则，可精确控制“谁能执行什么操作、访问什么资源、在哪个区域操作”，无需依赖Organizations，独立账户完全可用。
3. EC2实例类型与区域
	• EC2实例类型：如t3.small（通用型实例），不同类型对应不同计算/内存配置。
	• AWS区域：地理上的独立部署位置（如us-east-2俄亥俄州），资源默认仅在指定区域内可见/可操作，权限策略可限制操作区域。


S3跨账户复制（CRR）	跨AWS账户、跨区域（或同区域）复制S3对象，依赖版本控制（必须启用），支持按前缀/标签过滤对象，适合合规性数据同步
S3复制时间控制（S3 RTC）	CRR的增强功能，AWS承诺99.9%的对象在15分钟内完成复制（远满足题目30分钟要求），提供可监控的复制时间指标，是保障“时间紧迫性”的核心。
S3复制规则	配置在源S3桶，可指定过滤条件（前缀/标签）、目标桶、是否启用RTC，是实现“特定雷达站数据复制”的关键。
Amazon EventBridge	事件驱动架构核心，可监控AWS服务事件（如CloudWatch警报），触发后续动作（如通知），用于实现“超时警报”。
CloudWatch监控	收集S3 RTC的关键指标（如MaxReplicationTime），设置阈值后生成警报，是“监控复制完成情况”的基础。
跨账户S3权限配置	源账户需创建IAM角色（授予复制权限），目标账户需配置桶策略（允许源账户IAM角色写入对象），是跨账户复制的前提。
AWS DataSync	用于跨存储服务（如S3、EFS、本地存储）的数据迁移/复制，适合大规模离线迁移，不适合S3间实时合规复制（缺乏RTC时间保障和原生复制规则）。
S3 Transfer Acceleration（TA）	加速终端用户向S3桶的上传速度（通过CloudFront边缘节点），不影响S3桶间的复制时间
	
AWS应用发现服务（ADS）	用于自动收集本地数据中心的IT资源和应用依赖关系，支持两种发现模式：
	- 代理式：安装Agent在本地服务器，收集CPU/内存/应用/进程/依赖等详细数据；
	- 无代理式：通过VMware vCenter API收集虚拟机信息；
	数据可同步到AWS迁移中心，解决“文档不全时了解当前环境”的核心问题。
	
	
AWS SMS（服务器迁移服务）	用于将本地虚拟机（VMware/Hyper-V）自动化迁移到EC2，核心功能是增量复制磁盘、转换虚拟机格式、批量迁移，仅负责“实际迁移执行”。
AWS云采用就绪工具（CART）	免费评估工具，用于评估组织的云迁移就绪度，涵盖技术（环境兼容性）、流程（迁移流程）、人员（技能培训）、治理（安全合规）四个维度；
	核心价值：识别迁移风险、提供改进建议、辅助成本估算和迁移路线图规划。
	AWS迁移中心（Migration Hub）	迁移“指挥中心”，集中管理迁移全生命周期：
		- 整合ADS、DMS等工具的迁移数据；
		- 展示资源清单、依赖图谱、迁移进度；
		- 集成AWS成本计算器，生成迁移后成本估算；
		- 支持创建迁移项目和任务跟踪。

虚拟专用网关（VPG）：用于Site-to-Site VPN，无NAT功能

AWS迁移中心（AWS Migration Hub）	迁移的“统一控制台”，整合发现、评估、规划、跟踪全流程
AWS应用发现服务（Application Discovery Service）	收集本地环境的服务器、应用程序、依赖关系数据
迁移中心策略建议（Migration Hub Strategy Recommendations）	基于发现的环境数据，生成迁移策略和资源调整建议
迁移评估员（Migration Evaluator）	原AWS TCO计算器高级版，核心聚焦成本评估
AWS应用迁移服务（MGN）	实现本地服务器到AWS的“ lift-and-shift ”迁移
迁移中心导入工具	手动导入已有的本地环境清单

集群放置组（Cluster）	所有实例集中在同一机架/物理服务器，共享高速网络链路
分区放置组（Partition）	实例分布在多个独立机架（最多7个分区），跨分区不共享硬件
扩展放置组（Spread）	每个实例独占独立机架（最多7个实例），最大化可用性



内存优化（Memory-Optimized）	高内存/CPU配比（内存占比极高），支持海量数据驻留内存
计算优化（Compute-Optimized）	高CPU/内存配比，CPU性能强劲
	

1. 私有REST API（API Gateway）
	• 定义：API Gateway的一种部署类型，端点类型为PRIVATE，不暴露公网访问入口，仅允许通过VPC内的授权路径访问（核心场景：保护敏感数据，仅VPC内资源可访问）。
	• 默认行为：私有API默认拒绝所有访问，必须通过「资源策略」明确授权访问来源。

2. VPC终端节点（VPC Endpoint）
	• 作用：允许VPC内的资源（EC2、Lambda等）通过私有IP访问AWS服务，无需经过公网，提升安全性和访问速度。
	• 类型：
		○ 接口终端节点（Interface Endpoint）：用于HTTP/HTTPS协议的AWS服务（如API Gateway的execute-api服务），会在VPC子网中创建弹性网络接口（ENI）并分配私有IP。
		○ 网关终端节点（Gateway Endpoint）：仅用于S3、DynamoDB等少数服务，本题不涉及。
	• 关键关联：API Gateway私有API必须通过「execute-api服务的接口终端节点」实现VPC内访问。
3. 终端节点策略（Endpoint Policy）
	• 作用：附加在VPC终端节点上的IAM策略，控制「通过该终端节点可访问的AWS服务动作和资源」。
	• 核心动作：调用API Gateway的私有API需授权 execute-api:Invoke（调用动作），而非 apigateway:*（API Gateway的管理动作，如创建/删除API）。

4. API资源策略（API Resource Policy）
	• 作用：类似S3桶策略，控制「谁能访问API Gateway的API」，是私有API的访问控制核心（默认拒绝所有，必须显式授权）。
	• 授权对象：需授权来自VPC终端节点的访问（如终端节点ID、VPC CIDR）。
5. VPC链接（VPC Link）
	• 作用：用于API Gateway（作为客户端）访问VPC内的后端服务（如ALB/NLB/EC2），属于「API集成后端」的场景（API转发请求到VPC内服务）。
	• 场景区分：本题是「EC2（客户端）访问API Gateway（服务端）」，而非「API Gateway访问后端」，因此VPC链接无用。

2. 跨账户访问（Cross-Account Access）
	• 不同AWS账户间的资源/权限访问，禁止直接共享IAM用户凭证，最佳实践是通过「IAM角色」实现。
	• 原理：成员账户创建IAM角色，通过「信任策略」允许管理账户的主体（用户/角色）「承担该角色」，管理账户主体通过AssumeRole获取临时凭证，从而访问成员账户资源。

3. IAM角色（IAM Role）
	• 无长期访问凭证（Access Key/Secret Key）的身份实体，需通过「信任策略」指定谁能承担它，通过「权限策略」定义承担后拥有的权限。
	• 与IAM用户/组的区别：用户/组用于同一账户内的身份管理，无法跨账户直接使用；角色是跨账户访问的标准方案。
4. IAM策略（IAM Policy）
	• 定义权限的JSON文档，分为「托管策略」（AWS预定义或自定义可复用）和「内联策略」（绑定到单个主体）。
	• 关键：策略必须附加到「主体」（用户/组/角色）才生效，单独创建策略无任何作用。
5. IAM组（IAM Group）
	• 同一账户内多个IAM用户的集合，用于批量分配权限（给组附加策略，组内用户继承）。
	• 限制：无法跨账户使用，管理账户的用户不能通过成员账户的组访问资源。

容器化与编排	题干中应用已容器化，需高效管理容器：
	- 自建K8s：需手动维护EC2节点、K8s集群（运营开销高）
	- Amazon EKS：托管K8s控制平面（AWS维护高可用、升级），降低运营成本
	- AWS Fargate：无服务器容器运行时，无需管理EC2节点，按Pod资源计费（极致减少运营开销）
负载均衡与弹性伸缩	应对订单量激增：
	- Application Load Balancer (ALB)：HTTP/HTTPS层负载均衡，适配容器化应用
	- EC2 Auto Scaling：自动扩缩EC2实例（但需手动管理容器，开销高）
	- EKS HPA（Pod水平自动扩展）：根据CPU/内存使用率自动扩缩Pod，适配Fargate
数据库服务（RDS）	订单数据存储核心：
	- Multi-AZ模式：主实例跨AZ部署，故障自动切换（高可用）
	- 读取副本：分担读负载（订单查询、统计等），提升读吞吐量
	- 存储自动扩展：RDS存储不足时自动扩容（避免存储瓶颈）
消息队列/流处理	订单消息异步处理：
	- 自建Kafka：需维护EC2节点、集群（运营开销高）
	- Amazon MSK：托管Kafka，兼容原有Kafka应用，AWS维护集群高可用（减少运营开销）
	- Kinesis：流处理服务，但与原有Kafka架构兼容性不如MSK
静态内容分发	前端静态资源（HTML/CSS/JS/图片）：
	- Amazon S3：对象存储，适合存静态资源
	- Amazon CloudFront：CDN服务，全球边缘节点加速分发，降低源站压力，提升用户体验（优于直接用S3提供内容）

Amazon FSx for Windows File Server	托管式Windows文件系统	兼容SMB协议、NTFS权限、Active Directory集成，完全适配Windows主目录（用户文件存储、权限管理）
Amazon FSx for Lustre	高性能并行文件系统	面向HPC、AI/ML等海量并行读写场景，不支持Windows SMB协议
AWS客户端VPN	托管式远程访问VPN	允许远程用户通过互联网安全连接AWS VPC资源，支持Active Directory认证，无需自建VPN服务器
AWS存储网关（卷网关）	本地数据中心与AWS存储的桥接	将AWS EBS卷虚拟为本地iSCSI卷，数据仍需通过本地服务器访问
		

2. AWS Control Tower
	• 定义：基于Organizations的托管式合规治理服务，提供预设的安全/合规控制（称为「护栏Guardrails」），简化多账户合规管控。
	• 护栏分类：
		○ 强制性护栏（Mandatory）：必须启用，不可禁用，确保核心合规要求（如EBS加密检测）；
		○ 强烈推荐护栏（Strongly Recommended）：建议启用，但可手动禁用；
		○ 可选护栏（Elective）：按需启用。
	• 与题目关联：通过强制性护栏实现「自动检测未加密EBS卷」，同时满足「合规性和安全性」的集中管理需求。

4. OU（Organizational Unit）
	• 定义：Organizations中的逻辑账户分组，可按环境（生产/测试）、部门等维度划分。
	• 核心作用：批量应用护栏、策略，实现精细化账户管理（如给生产OU应用更严格的合规规则）。
5. AWS CloudTrail & Amazon EventBridge
	• CloudTrail：捕获所有AWS API调用日志（如EBS卷创建），为合规审计和安全监控提供数据支持。
	• EventBridge：事件总线，可基于CloudTrail事件触发规则（如检测未加密卷创建），但无法直接实现EBS卷「自动加密」（因EBS不支持就地加密）。

AWS Directory Service for Microsoft AD（托管微软AD）	托管的企业级身份目录服务，兼容Active Directory协议，支持用户/组管理、SAML 2.0身份认证（作为IdP），无需自建AD服务器
应用程序负载均衡器（ALB）	7层负载均衡器，支持HTTP/HTTPS路由、身份认证前置（无需修改应用代码）
ALB认证操作	ALB支持两种身份认证动作：
	- authenticate-cognito：集成Amazon Cognito用户池
	- authenticate-oidc：集成OIDC协议兼容的身份提供者（IdP）
Amazon Cognito（用户池）	用户身份管理服务，支持：
	1. 自建用户库
	2. 联合外部IdP（SAML 2.0/OIDC/社交账号）
SAML 2.0	企业级身份联合协议，用于不同系统间的身份认证互通（如AD → Cognito）
OIDC	基于OAuth 2.0的轻量身份协议（如Google登录）
IAM身份提供者（IdP）	用于授权外部用户访问AWS资源（如S3、EC2 API），而非Web应用本身
AWS IAM Identity Center（SSO）	集中管理AWS账户和SSO集成应用的访问
	
1. CloudFront（CDN）
	• 核心作用：全球边缘节点分发内容，降低用户访问延迟，减轻源服务器压力。
	• 起源（Origin）：CloudFront获取内容的源服务器（可是ALB、EC2、S3等），需配置域名、协议、端口。
	• 起源组（Origin Group）：AWS为高可用设计的功能，支持绑定「主起源+备用起源」。当主起源健康检查失败时，CloudFront自动切换到备用起源，切换在CDN层面完成，无DNS依赖。
	• 起源健康检查：CloudFront边缘节点主动向起源发送检查请求（如访问/health路径），间隔可配置（最小1秒），比Route53健康检查更实时。
2. Route53（DNS服务）
	• 故障转移路由策略：区分主/备用记录，基于健康检查结果切换流量，但依赖DNS缓存（TTL），切换速度受缓存影响。
	• TTL（Time to Live）：DNS记录的缓存时间，递归DNS服务器在TTL内不会重新查询Route53，导致故障转移延迟（现有架构TTL=60秒，是核心瓶颈）。
	• 延迟路由策略：选择延迟最低的Region端点，核心是优化性能，不具备故障转移能力（无法强制切换到指定DR Region）。

依赖组件	递归DNS缓存、Route53健康检查
切换延迟	TTL+健康检查间隔（通常30秒+）
架构复杂度	高（需DNS记录+健康检查）
关键瓶颈	DNS缓存无法实时刷新

Auto Scaling组（ASG）	管理EC2实例集群，根据策略自动扩缩容，保证应用高可用和性能稳定
扩展策略类型	- 计划扩展（Scheduled Scaling）：基于预设时间窗口触发扩缩容，适合已知时间的一次性事件；
	- 预测性扩展（Predictive Scaling）：基于历史数据预测负载，适合周期性重复负载（如每日晚高峰）
PostgreSQL兼容数据库服务	- RDS for PostgreSQL：托管PostgreSQL，支持Multi-AZ和读取副本，但性能、故障转移速度一般；
	- Aurora PostgreSQL：云原生兼容PostgreSQL，性能是RDS的3-5倍，Multi-AZ集群架构（共享存储），故障转移<30秒，Aurora副本比RDS读取副本更高效；
	- Aurora Serverless v2：无服务器版本，自动扩缩计算，适合不可预测负载，不适合需要提前预热的一次性高峰
Multi-AZ部署	多可用区架构，主备实例跨AZ部署，自动故障转移，避免单AZ故障导致服务中断
Aurora副本/RDS读取副本	复制主库数据，分担读负载，提升读取性能；Aurora副本支持垂直扩展（修改实例规格），切换更平滑
Amazon EventBridge	事件总线服务，支持基于时间的计划规则，触发Lambda、Step Functions等服务
AWS Lambda	无服务器函数，无需管理服务器，可快速执行代码（如修改数据库副本规格、切换端点）
AWS Step Functions	协调多步骤工作流，适合复杂并行任务

2. VPC及子网类型
	• VPC（虚拟私有云）：AWS中隔离的网络环境，所有云资源（如EC2、复制服务器）必须部署在VPC内。
	• 私有子网：无直接访问互联网的路由（无互联网网关IGW关联），资源仅能通过内部网络或私有连接访问，符合“应用不能从互联网访问”的要求。
	• 公共子网：关联互联网网关（IGW），资源可通过公网IP访问互联网，或被互联网访问（不符合题目要求）。
	• 高可用设计：跨多个可用区（AZ）部署子网，避免单点故障（题目选项中“两个子网”均指向跨AZ高可用）。
3. 私有连接相关组件
	• 虚拟专用网关（VGW）：附着在VPC上的AWS侧私有连接端点，用于建立本地网络与AWS的私有连接（必须组件）。
	• Site-to-Site VPN：基于IPsec的加密隧道，连接本地VPN设备与AWS的VGW，流量通过公网传输但加密且走私有路由（本质“私有连接”，不暴露在公网）。
	• Direct Connect（DX）：本地数据中心与AWS的专用物理线路，完全不经过公网，带宽稳定（但DX网关仅用于跨VPC/跨区域连接，单VPC场景非必需）。
	• 私有IP vs 公共IP：私有IP仅能在内部网络路由（如本地→VPN→AWS VPC），公共IP可公网路由；DRS复制时选择私有IP，意味着复制流量仅通过私有网络传输。
4. 带宽与访问控制
	• NAT网关：部署在公共子网，允许私有子网的资源出站访问互联网（如DRS代理更新、复制所需的AWS API调用），但禁止互联网入站访问（不影响题目要求）。
	• 带宽控制：Site-to-Site VPN/DX可配置固定带宽（如1Gbps），避免复制流量占用所有可用带宽（公网复制无法精准控制）。

Amazon S3	对象存储服务，高可用、无限容量，支持事件通知和生命周期策略。
AWS Lambda	无服务器计算，自动扩缩，按执行时间/内存收费，支持临时存储（最大10GB）。
S3事件通知	S3对象上传/删除时，触发SQS、Lambda等服务。
S3生命周期策略	自动转移存储类或过期删除对象，降低存储成本。
IAM角色/策略	控制服务间访问权限（如Lambda访问S3/SQS）。
	
合并计费（Consolidated Billing）	多个账户账单汇总为1份，保留各账户明细，共享折扣（节省计划/预留实例）
标签策略（Tag Policies）	强制/建议所有账户资源添加统一标签（如Department），确保标签合规
标签编辑器（Tag Editor）	批量编辑/应用标签到跨账户、跨服务资源
服务控制策略（SCPs）	限制账户内操作（如禁止未打标签资源创建），不能主动给资源打标签
AWS预算（AWS Budgets）	设置费用阈值、监控超支并告警
2. 服务控制策略（SCPs）	
        • 定义：AWS组织的核心策略类型，是基于IAM语法的JSON文档，用于限制成员账户的「最大权限边界」。
        • 核心特点：
                ○ 仅约束成员账户的权限（不授予权限），即使IAM策略允许，SCP拒绝的操作也无法执行。
                ○ 可附加在组织根、OU或单个账户上，下级继承上级策略（如根→OU→账户）。
        • 适用场景：安全团队集中控制所有账户的IAM使用，强制最小权限模型。
        

最小权限模型（Least Privilege）
        • 核心原则：仅授予主体（用户/角色）完成工作必需的最小权限，SCPs是强制所有账户遵守该模型的集中化手段（而非每个账户单独配置IAM策略）。
        
Amazon API Gateway
托管REST API端点，接收客户端（气象站）请求，路由到后端集成目标
Amazon SQS（简单队列服务）
托管消息队列，解耦生产者（API Gateway）和消费者（Lambda），缓冲消息
死信队列（DLQ）
辅助队列，存储主队列中多次处理失败的消息

按需实例（On-Demand）	按实际使用时间付费，无长期承诺，随时启停，AWS不会主动回收
Spot实例	利用AWS未使用的EC2容量，价格为按需的30%-90%，但AWS可随时回收（2分钟通知）
Savings Plan（储蓄计划）	以1年/3年“小时级使用量承诺”换取大幅折扣（比按需低72%），分两种类型：
	- EC2实例Savings Plan：绑定特定EC2实例家族+区域
	- Compute Savings Plan：支持EC2/Lambda/Fargate等
	

AWS Backup	跨服务集中备份工具，支持：
	1. 跨账户/跨区域备份（将生产账户备份存储到非生产账户，实现物理隔离）；
	2. 备份库（Backup Vault）：存储备份数据的容器，权限和锁定策略均作用于备份库；
	3. 备份生命周期：自动将备份转移到热层/冷层/极冷层（仅优化存储成本，无防篡改能力）。


跨账户备份	生产账户的备份数据不存储在自身账户，而是发送到专门的“集中备份账户”（非生产账户），核心价值是物理隔离——生产账户的特权用户无法访问非生产账户的备份库，从根源上阻止篡改。
	
SCP（Service Control Policy）	Organizations的强制策略，用于限制成员账户的操作范围：
	1. 仅“拒绝”逻辑（默认允许所有操作，需明确拒绝危险行为）；
	2. 即使成员账户有AdministratorAccess权限，SCP也能阻止指定操作（如删除备份库）。

AWS Backup Vault Lock	备份库的防篡改锁定功能，分两种模式：
	1. 合规模式（Compliance Mode）：一旦启用，无法修改备份保留期、无法删除备份（根用户也不行），完全抵御篡改，是勒索软件防护核心；
	2. 治理模式（Governance Mode）：可通过特定权限修改，防护力度不足。

IAM服务角色（最小权限）	给AWS Backup服务分配的执行角色，用于访问资源和执行备份。最小权限是通用安全实践，但无法抵御“生产账户特权用户泄露”（特权用户可修改IAM角色权限，除非有SCP限制）。

备份存储层（冷层）	低成本、高延迟的存储层，仅用于成本优化，不提供防篡改或隔离能力——即使备份在冷层，有权限的用户仍可删除。
Amazon CloudWatch Logs	日志收集/存储服务，核心单元是「日志组（Log Group）」+「日志流（Log Stream）」，区域级存储，日志默认保留在创建区域
AWS Control Tower	多账户管理基石，基于AWS Organizations实现账户创建、OU划分、权限合规，提供多账户架构的统一管控
Amazon Kinesis Data Streams	实时数据流服务，支持高吞吐量（PB级/天）、水平扩展（分片扩容），适合持续流式数据摄入
Amazon SQS	异步消息队列，适合点对点异步通信，吞吐量有限（默认1000 TPS/队列），不支持流式处理
CloudWatch Logs订阅过滤器	绑定到日志组的规则，可实时将日志转发到Kinesis、Lambda等目标，每个日志组需单独配置（无法跨日志组复用）
VM导入/导出	一次性将本地VM镜像导入EC2（或导出EC2镜像），无增量同步能力，导入时需停机保证数据一致性，适合小规模、非关键业务迁移。
AWS SMS（服务器迁移服务）	专为本地VM（VMware/Hyper-V）迁移到EC2设计，支持增量复制（先全量迁移基础镜像，再持续同步变化），仅最终切换时需短暂停机，最小化应用停机时间。
AWS DMS（数据库迁移服务）	专用数据库迁移服务，支持在线迁移和CDC（变更数据捕获） ：源数据库正常运行时先全量迁移，再实时同步增量变化，最终切换仅需短暂停机，保证数据一致性，适用于有状态数据库迁移。
• Aurora Serverless v1：无服务器版Aurora，核心特性：
	○ 自动扩缩计算容量（ACU：Aurora Capacity Units），闲置时可缩至0（几乎无成本），峰值时自动扩容。
	○ 支持写入密集型工作负载（无需手动添加主库），按ACU使用时间计费，完美匹配“长时间闲置+突然流量波动”。
Aurora Serverless v2	Aurora的无服务器版本，支持秒级自动扩缩（计算资源随负载变化）
• 

execute-api:Invoke 权限	API Gateway的核心权限，允许主体（用户/角色）调用API端点
AWS SigV4（签名版本4）	AWS的请求签名机制，当API Gateway使用AWS_IAM授权时，客户端需用IAM凭证（Access Key/Secret Key）对请求签名，API Gateway通过IAM验证签名合法性
API Gateway自定义授权器（Lambda）	通过Lambda函数自定义验证逻辑（如密钥/密码）
API Gateway客户端证书	客户端身份验证方式，适合外部系统（非AWS生态）
AWS CodePipeline	CI/CD管道服务，串联「源→构建→测试→部署」全流程，自动化流程流转
CloudFormation更改集（Change Sets）	预览模板变更的影响（资源创建/修改/删除），无实际执行
蓝/绿部署（Blue/Green）	维护两套相同环境（蓝：当前运行环境；绿：新版本环境），测试通过后切换流量

Active-Passive灾备	主区域（Active）处理全量流量，备区域（Passive）待命，故障时切换
自动扩展组（ASG）	区域级资源，仅能管理本区域的EC2实例，支持动态扩缩容
Route 53（DNS服务）	支持故障转移路由策略和健康检查，跨区域流量调度核心
VPC对等连接	跨区域/VPC的私有网络连接，但无法让ALB跨VPC服务
Active-Passive（主备模式）	主区承载全部流量，备区待命，仅主区故障时切换
	
Amazon ECS	容器编排服务	用于管理Docker容器的集群和编排（支持服务发现、负载均衡、自动扩缩容等复杂编排能力），支持两种启动类型：
		- Fargate：无服务器启动类型，无需管理底层EC2实例，控制权低；
		- EC2启动类型：需手动管理EC2实例（容器实例），可完全控制网络、主机配置（实例类型、安全组、存储等），控制权高
AWS App Runner	托管容器服务	无需管理基础设施（集群、EC2），一键部署容器，抽象度高，编排能力弱
AWS Elastic Beanstalk	PaaS服务	简化应用部署，支持容器但不提供复杂编排能力，底层基础设施抽象化，控制权低
Amazon RDS/Aurora	托管关系型数据库	- RDS for SQL Server：兼容原有SQL Server；
		- Aurora：兼容MySQL/PostgreSQL，性能优于传统RDS，Serverless v2支持自动扩缩容
Amazon DynamoDB	托管NoSQL数据库	非关系型，适用于键值对/文档数据，不支持复杂关系查询
Amazon EventBridge	事件总线	事件驱动架构，支持将事件路由到SQS等目标，但本身不是队列
Amazon MSK	托管Kafka	高吞吐量、复杂消息流处理，适用于大规模消息场景

三层Web架构	题干架构：接入层（CloudFront）→ 应用层（EC2+Apache+ASG）→ 数据层（Aurora MySQL），电商场景的经典弹性架构，需端到端可见性覆盖各层。
Amazon Aurora MySQL	托管MySQL兼容数据库，高可用/高性能，题干中因“指标不足”无法分析SQL性能，需补充慢查询/错误日志
Amazon CloudWatch Logs	集中式日志存储服务，支持日志检索、过滤、可视化，解决“日志丢失”和“集中分析”需求
CloudWatch Logs代理	安装在EC2上的轻量级工具，实时收集本地日志（如Apache日志）并上传到CloudWatch Logs。
AWS X-Ray	分布式追踪服务，跨服务跟踪请求流转，捕获各环节耗时/错误，解决“全链路瓶颈定位”需求
X-Ray SDK（Java）	集成到Java应用中，捕获HTTP请求、SQL查询等链路信息，实现“请求→SQL”端到端追踪
Amazon Kinesis	实时数据流服务，需后续对接其他服务处理日志，不直接满足“快速可见性”需求（错误选项涉及）。
AWS CloudTrail	API调用审计服务，仅记录AWS资源操作（如创建EC2），不记录应用程序活动（错误选项涉及）
Amazon DynamoDB	托管NoSQL数据库，低延迟读写，按「容量单位」（RCU：读容量单位；WCU：写容量单位）控制吞吐量
Auto Scaling组（ASG）	自动管理EC2实例的扩缩容，基于预设条件（CPU利用率、请求数等）增减实例，无需手动干预
DynamoDB自动扩展	自动调整RCU/WCU，基于实际流量的使用率（如RCU使用率70%）动态扩容/缩容，避免手动配置

AWS Application Discovery Service (ADS)
	• 核心定位：专为企业「迁移到AWS」设计的资源发现服务，核心目标是帮助企业摸清本地数据中心的资源底数（配置、利用率、依赖关系），为EC2实例选型、迁移规划提供数据支撑。
	• 两种发现模式：
		○ 有代理发现（Agent-based）：需在每台本地VM/物理机上部署ADS代理，收集数据最详细（进程级信息、细粒度利用率、完整网络连接），但部署维护成本高。
		○ 无代理发现（Agentless）：仅支持VMware vSphere、Microsoft Hyper-V等虚拟化环境，通过与虚拟化管理平台（如vCenter）集成，无需在每台VM部署代理，部署成本低、更经济，可收集虚拟机级配置、利用率、进程清单（部分平台支持）、网络依赖关系。
	• 核心功能：满足题目所有需求（CPU/内存/磁盘利用率、进程清单、服务器间通信映射）。

2. Amazon CloudWatch Agent
	• 核心定位：用于收集本地或AWS资源的「监控指标/日志」，并发送到CloudWatch Logs/Metrics，核心场景是「持续监控」，而非「迁移前的资源发现与依赖映射」。
	• 局限性：无法高效收集「服务器间通信拓扑」（网络依赖映射），且不聚焦迁移场景，无法替代ADS的发现能力。
3. VPN与网络可达性
	• 核心作用：建立本地数据中心与AWS的安全网络连接，但仅提供网络通路，不直接实现资源发现（需配合ADS的发现模式）。
	• 误区：ADS的无代理/有代理发现不需要「扫描」，而是通过API集成（无代理）或代理上报（有代理），选项D的「扫描」逻辑不符合ADS工作原理。

AWS Organizations	集中管理多个AWS账户，通过OU（组织单元）分组账户，通过SCP（服务控制策略）限制账户级操作
SAML联合身份验证	允许用户通过企业身份提供商（IdP，如AD、Okta）登录AWS，无需创建独立AWS账号

AWS STS（安全令牌服务）	生成临时安全凭证（用于联合身份登录），支持会话标签（PrincipalTag） ——将用户属性（如开发单元）附加到临时会话中，作为主体标识

资源标签（Resource Tag）	给AWS资源（如EC2）添加键值对标识（如DevelopmentUnit: TeamA）

aws:PrincipalTag 条件键	IAM策略中的条件键，用于引用主体（用户/角色会话）的标签（如STS会话标签）


AWS Service Catalog	中央IT团队管理经批准的云资源模板（产品），分发给组织内账户，用户仅能启动合规产品。


Service Catalog核心组件		
- 产品（Product）	基于CloudFormation模板的合规基础设施定义（如EC2、S3栈），需中央审批。	确保用户只能使用经批准的基础设施服务。
- 组合（Portfolio）	产品的集合（如“开发环境产品组合”“生产环境产品组合”），便于批量分享和权限管理。	简化跨账户分发，集中控制产品访问范围。
- TagOption	中央维护的标签库（如CostCenter:Finance），强制应用于产品/组合。	满足“强制标签”需求，比模板内标签更可靠（中央控制，无法篡改）。
- 启动约束（Launch Constraint）	指定启动产品时使用的IAM角色，确保最小权限启动资源（用户无需直接拥有资源权限）。	满足“最少权限访问”。

Auto Scaling组（ASG）	自动扩缩容EC2实例，保障应用高可用，实例自动注册到ALB目标组
AWS WAF	Web应用防火墙（Layer 7），通过Web ACL配置访问规则（允许/阻止/日志）
IPSet（IP集合）	WAF的附属资源，批量管理固定IP段，用于IP匹配规则
AWS Shield	DDoS攻击防护服务（基础版免费，高级版付费）
Amazon FSx for Windows File Server	托管式Windows文件服务器，兼容SMB协议，提供高可用、备份功能，完美替代传统Windows文件服务器
AWS DataSync	高效、安全的托管式数据复制服务，支持本地存储/AWS服务间跨Region增量复制，优化带宽利用，自带数据校验
	
Site-to-Site VPN	建立加密隧道连接本地数据中心与AWS VPC，或跨Region VPC，但适合复杂拓扑，延迟高于VPC对等
VPC对等连接（VPC Peering）	连接两个不同Region的VPC，让私有子网间直接通信，数据不经过公网，低延迟、高安全
AWS PrivateLink（接口VPC端点）	让VPC内资源通过私有网络访问AWS服务（如DataSync），无需公网IP，控制平面/数据平面均私有
AWS Transit Gateway	多VPC/本地网络的集中式网关，适合大规模网络连接
AWS Transfer Family	提供SFTP/FTPS文件传输服务，偏向手动/应用触发的文件传输
FSx File Gateway	属于Storage Gateway，让本地文件服务器像访问本地存储一样访问S3
AWS Managed Microsoft AD	托管式Active Directory，FSx for Windows必须依赖AD进行用户认证和权限管理
	
• 恢复点目标（RPO）：灾难后可容忍的数据丢失时间（本题要求≤5分钟）。例如RPO=5分钟，意味着故障后最多丢失最近5分钟的数据。
• 恢复时间目标（RTO）：灾难后系统恢复正常的时间（本题要求≤10分钟）。例如RTO=10分钟，意味着故障后10分钟内必须恢复服务。
• 跨Region故障转移：主Region数据库故障时，需将次要Region的备用数据库切换为新主库，抵御Region级灾难（如地震、断电）。

数据库服务核心特性
	• Amazon RDS：AWS托管关系型数据库（支持MySQL、PostgreSQL等），提供跨Region读取副本（异步复制主库数据）、自动备份、多可用区部署等功能，运维成本低。
		○ 跨Region读取副本：基于binlog/WAL异步复制，跨Region同步延迟通常1-5分钟，提升为新主库仅需3-5分钟（无需重新加载数据）。
	• Amazon Aurora：AWS自研数据库（兼容MySQL/PostgreSQL），性能优于RDS，但跨Region同步需依赖原生复制或额外工具（如DMS）。
	• AWS DMS：数据库迁移/同步服务，适用于异构数据库或复杂同步场景，但需额外付费，跨Region同步延迟高于原生读取副本。
	• 快照（Snapshot）：RDS/Aurora的手动/自动备份，跨Region复制快照受限于网络带宽（10TB数据复制需数小时），恢复时间长（超过1小时）。

管理账户（Master Account）	Organizations的创建者账户，拥有最高权限，可创建/管理成员账户、分配角色权限。题目中Support1是管理账户的IAM用户。
成员账户（Member Account）	由管理账户创建或邀请加入Organizations的独立AWS账户，资源与管理账户隔离，但可通过Organizations授权跨账户访问。
OrganizationAccountAccessRole	创建成员账户时，AWS自动在成员账户中创建的预定义IAM角色。其信任策略默认允许管理账户的用户/角色假定它，是管理账户操作成员账户的标准权限入口。

IAM用户	账户级别的身份实体，隶属于某个特定AWS账户（不可跨账户直接使用），需通过权限策略获取操作权限。
根用户（Root User）	每个AWS账户创建时的初始身份，用注册邮箱登录，拥有账户完全权限。AWS强烈不推荐日常操作使用根用户（仅用于重置根密码、关闭账户等特殊场景）。
跨账户角色切换（AssumeRole）	IAM的核心跨账户访问机制：用户/角色通过sts:AssumeRole权限，临时获取目标账户中某个角色的权限，实现跨账户操作（无需共享凭证）。
	

API Gateway（REST API）	托管式API网关，负责接收客户端请求、路由到后端服务（如Lambda）、限流、缓存、认证授权。支持区域端点（Regional，适合同区域用户）和边缘优化端点（Edge-Optimized，通过CloudFront分发，降低全球用户延迟），支持阶段缓存（缓存API响应，减少下游调用）。

Lambda（无服务器函数）	事件驱动的无服务器计算服务，由API Gateway触发执行，负责业务逻辑处理（如数据库查询），无需管理服务器，按执行时间和资源收费。
Aurora MySQL Serverless	无服务器关系型数据库，自动扩缩容计算资源（CPU/内存），按实际使用量收费，适合波动流量。但频繁重复查询会导致不必要的数据库连接和内存占用，引发内存错误。

API Gateway 节流（Throttling）	限制单位时间内的API请求数量（速率限制+突发值），防止下游服务被压垮，但会拒绝超额请求，影响可用性。

AWS Direct Connect (DX)	本地数据中心与AWS的专线连接，绕过互联网，提供安全、稳定的大带宽传输。
AWS DMS（数据库迁移服务）	专门用于数据库迁移，支持全量加载+CDC（变更数据捕获） ，最小化停机时间。
CDC（变更数据捕获）	捕获源数据库的插入/更新/删除操作，实时同步到目标库，保证数据一致性。
私有子网	VPC中无公网访问能力的子网，资源仅通过私有网络通信，提升安全性。
VPC端点（VPC Endpoint）	允许VPC内资源私有访问AWS服务（如DMS、RDS），不经过互联网，依赖DX私有VIF。
AWS KMS（密钥管理服务）	托管加密密钥，用于静态数据加密，比SSE-S3更适合敏感数据（密钥可控）。
TLS加密	传输层加密协议，保证数据在传输过程中不被窃取/篡改。
Snowball Edge/DataSync/S3 Gateway	数据传输工具（离线/在线），适合文件级迁移，但不支持CDC。
	
Amazon EC2	虚拟化计算实例，可跨可用区（AZ）部署，支持Linux系统
Amazon EFS（弹性文件系统）	托管式分布式文件系统，基于NFS协议，跨AZ高可用
Amazon EBS（弹性块存储）	虚拟化块设备（类似物理硬盘），需格式化后使用
Amazon S3	对象存储服务，高可用、弹性扩展，但非文件系统
AWS Storage Gateway（文件网关）	连接S3与EC2的桥梁，提供NFS/SMB文件接口
	
Amazon API Gateway	托管式API服务，提供HTTPS端点，支持认证、限流、请求转发，是SaaS解决方案的入口，常与Lambda集成。
AWS Lambda	无服务器计算服务，按需执行代码（无需管理服务器），与API Gateway联动处理业务逻辑，部署快速、弹性伸缩。
Aurora Serverless v1	无服务器化的Aurora数据库，自动扩缩容，适合可变负载，但不支持跨Region同步、全局数据库、多主写入。
标准Aurora MySQL	基于MySQL兼容版的Aurora数据库（有固定实例），支持全局数据库、跨Region读取副本、故障快速转移等高级特性。
Aurora全局数据库	跨多个Region的Aurora部署方案：
	- 主Region（源Region）：支持写入，跨AZ部署；
	- 备用Region（目标Region）：只读，实时同步主Region数据（同步延迟通常<1秒）；
	- 灾难时可快速将备用Region提升为新主，数据丢失极少。
AWS SAM（无服务器应用模型）	简化无服务器应用（API Gateway、Lambda等）部署的工具，通过YAML/JSON模板定义资源，支持跨Region一键部署，大幅缩短部署时间。
DR核心指标	- RTO（恢复时间目标）：灾难后恢复服务的最长可接受时间（题目要求5分钟）；
	- RPO（恢复点目标）：灾难后可接受的数据丢失对应的时间（题目要求1分钟）
主动-被动（Active-Passive）DR	- 主Region（主动）：正常运行服务，处理所有用户流量；
	- 目标Region（被动）：部署完全相同的服务，但仅待命（不处理流量）；
	- 灾难时通过DNS/路由切换，快速将流量导向目标Region，RTO取决于切换速度（通常分钟级）。


Auto Scaling Group（ASG）	自动管理EC2实例数量，跨可用区（AZ）部署，支持扩缩容策略（手动/自动/预定）
Route 53	托管DNS服务，支持多种路由策略（简单/多值/加权等）和别名记录

Auto Scaling Group（ASG）	自动管理EC2实例数量，跨可用区（AZ）部署，支持扩缩容策略（手动/自动/预定）
Amazon DynamoDB	全托管NoSQL数据库，高可用但读取压力大时需缓存优化
DynamoDB Accelerator（DAX）	DynamoDB专属内存缓存（兼容Redis API），优化读取性能、降低DB负载
Amazon ElastiCache	托管缓存服务（支持Redis/Memcached），替代自托管缓存
Application Load Balancer（ALB）	应用层负载均衡器，支持健康检查、流量分发、跨AZ部署
Amazon CloudFront	CDN服务，缓存静态内容、加速全球分发
预定扩展（Scheduled Scaling）	ASG的扩展策略，按固定时间提前扩容
Amazon S3	高可用、高扩展的对象存储服务，支持无限容量和高并发上传（峰值数十万QPS）。
Amazon SQS（标准队列）	托管式轻量级消息队列，支持高吞吐量（无限消息数）、至少一次交付、异步解耦。
Amazon MQ	托管式消息代理（基于ActiveMQ/RabbitMQ），支持复杂消息模式（如发布/订阅、事务）。
S3批量操作	对S3中大量现有对象执行批量操作（复制、标签、删除），非事件驱动。
Amazon SNS	托管式通知服务，支持移动推送（APNs/FCM）、短信、邮件等多终端通知。
Amazon SES	专注于发送电子邮件的服务，不支持移动推送通知。
	
客户端VPN（Client VPN）	客户端到站点（C2S）VPN服务，允许分散的远程用户（如居家/异地开发人员）通过VPN客户端连接到VPC，获取私有IP后直接访问VPC内资源，适合分散用户的远程访问场景。

传输网关（Transit Gateway）	AWS骨干网络枢纽，用于连接多个VPC、本地数据中心（通过Site-to-Site VPN/Direct Connect），核心场景是“站点间互联”（如企业多办公点网络与AWS互联），不适合单个用户远程访问。

Site-to-Site VPN（S2S VPN）	连接本地数据中心（如企业办公点网络）与AWS VPC的VPN服务，需本地部署兼容VPN设备（如Cisco），仅支持整个站点的网络访问，不适合单个居家用户。
Direct Connect（DX）	物理专线连接本地数据中心与AWS，提供高带宽、低延迟传输，适合企业级大量数据传输，成本高且不支持分散用户个人机器访问。
堡垒主机（Bastion Host）	部署在VPC公共子网的中转服务器，用于SSH中转访问私有子网EC2实例，仅支持命令行中转，无法满足可视化工具（如Kibana）的直接访问需求。


安全组（Security Groups）	AWS网络防火墙，基于白名单规则控制入站/出站流量（端口、协议、源IP），用于保护OpenSearch、VPN端点等资源。
Client VPN端点	客户端VPN的核心组件，与VPC子网关联（分配客户端IP池），支持OpenVPN协议，用户通过客户端连接后接入VPC。
ACM（证书管理器）	管理SSL/TLS证书，Client VPN需服务器证书（验证VPN端点身份）和客户端证书（验证用户身份）。


Amazon OpenSearch Service	托管的搜索与分析服务，支持日志存储、分析和可视化（通过Kibana），可部署在VPC私有子网，仅允许VPC内或合规通道（如Client VPN）访问。
bridge（桥接模式）	所有任务共享所在EC2实例的网络栈，共用一个ENI（弹性网络接口）	安全组只能绑定EC2实例，多个任务共享相同网络权限，隔离性差	单EC2多任务、低隔离需求场景（非最佳实践）

awsvpc模式	每个任务（或任务集）分配独立ENI，拥有独立IP和网络身份	安全组可直接绑定到任务，实现“任务级”网络权限控制，隔离性强	微服务架构、高隔离需求、最少权限原则（ECS最佳实践）

3. IAM角色（权限控制核心）
AWS的权限管理核心，遵循“最少权限原则”，ECS场景下有两种关键角色：
	• ECS实例角色（EC2 Instance Role）：仅用于EC2模式，给EC2实例授予权限（如拉取ECR镜像、上报任务状态），容器会继承EC2的权限（权限过大，不符合微服务精细权限需求）；
	• ECS任务角色（ECS Task Role）：直接关联到ECS任务，给容器内应用授予最小化权限（如访问S3、DynamoDB），任务启动时AWS自动注入临时凭证，无需静态密钥，是微服务权限管理的最佳实践。
4. 安全组（网络权限控制）
虚拟防火墙，控制资源的入站/出站流量，遵循“默认拒绝、按需开放”原则：
	• 绑定到EC2实例：所有运行在该EC2上的任务共享相同网络权限（粗粒度，不符合最少权限）；
	• 绑定到ECS任务（仅awsvpc模式支持）：每个任务独立控制网络流量（细粒度，符合微服务需求）。


1. 存储网关（Storage Gateway）
	• 作用：连接本地数据中心与AWS云存储的“桥梁”，支持本地应用通过标准协议（SMB/NFS/iSCSI）访问AWS存储，无需修改应用代码。
	• 核心类型：文件网关（File Gateway） → 重点！支持SMB/NFS协议，本地客户端通过SMB访问网关，数据自动同步到Amazon S3，完美匹配题目“SMB访问”需求。



存储类别	适用场景	检索速度	成本
S3 Standard-IA（标准-不频繁访问）	不常访问但需快速可用	毫秒级	中低
S3 Glacier Deep Archive	长期归档（极少访问）	小时级（12-48h）	最低
S3 Standard	频繁访问	毫秒级	中高


3. Amazon FSx for Windows File Server
	• 托管的Windows文件服务器，原生支持SMB协议，适合AWS端需要高性能、频繁访问的文件共享场景。
	• 缺点：SSD存储成本高，且需额外工具同步本地数据，不适合“很少访问的副本”场景。
4. AWS Outposts
	• 将AWS基础设施（硬件+服务）部署在客户本地数据中心，本质是“本地AWS”，数据存储在本地Outposts而非AWS公有云，不符合题目“副本存储在AWS”的核心要求。


Amazon WorkSpaces	托管桌面即服务（DaaS），提供完整的Windows/Linux云桌面，支持个性化配置，复制本地桌面体验。
Amazon AppStream 2.0	应用程序流服务，仅流式传输单个应用到用户设备，无完整桌面环境，用户仅能使用指定应用。
AD Connector	AWS托管的轻量级代理服务，连接AWS服务与本地Active Directory（AD），无需同步用户数据，直接复用本地AD凭证。
AD FS（AD Federation Services）	微软的联合身份服务，用于跨域单点登录（SSO），不适合云桌面与本地AD的直接集成。
Site-to-Site VPN	连接AWS VPC与本地数据中心的私有网络通道，确保AWS服务（如AD Connector）能安全访问本地AD。
RADIUS服务器	远程认证拨号用户服务，支持多因素认证（MFA）协议，可与AD Connector集成，为WorkSpaces提供MFA登录。
	
Amazon Connect	AWS托管式云联系中心，核心能力包括：
	- 联系流程（Contact Flows）：可视化设计呼叫路由/处理逻辑；
	- CCP（Contact Control Panel）：代理直接操作的通话控制面板（可自定义）；
	- 快速连接（Quick Connects）：用于快速转移呼叫（如转给队列/代理）。

UpdateContactAttributes API	Amazon Connect的API，用于更新当前呼叫的属性（如标记“垃圾电话”状态、记录来电号码），便于后续流程或分析使用。
Contact Lens for Amazon Connect	AI驱动的通话分析服务，可自动转录通话、识别关键词/情绪/沉默期，用于自动识别垃圾电话（与题干“代理手动标记”需求不符）。
联系流程（Contact Flows）	Amazon Connect的核心，通过可视化编辑器定义呼入/呼出的全流程（如呼入校验、路由、终止呼叫等），支持调用Lambda、读写属性等操作。
实时数据流存储	Amazon Kinesis Data Streams (KDS)	高吞吐量、低延迟（毫秒级）的实时数据流“管道”，用于接收传感器、日志等实时数据，支持多消费者并发读取，是实时流处理的核心存储组件。
数据流传输	Amazon Kinesis Data Firehose (KDF)	托管ETL传输服务，核心用于“批量加载数据到数据湖/仓库”（如S3、Redshift），延迟分钟级，不适合实时分析（无实时消费能力）。
托管Kafka	Amazon MSK	托管Apache Kafka服务，适合需要Kafka生态（分区策略、高可用）的复杂流场景，但配置复杂、成本高，非简单实时需求的最优解。
实时计算分析	AWS Lambda	无服务器函数，事件驱动触发（支持KDS、S3等触发器），冷启动快（毫秒级），无需管理服务器，适合轻量、实时的数据分析任务（如阈值判断）。
工作流/容器	Step Functions / ECS / Fargate	Step Functions用于编排多服务工作流，不适合直接消费数据流；ECS/Fargate是容器服务，适合长期运行的复杂应用，实时性、灵活性不如Lambda。

通知服务	Amazon SNS	简单通知服务，支持多渠道订阅（邮件、短信、Slack等），即时触发通知，适合“异常情况立即告警”场景。
邮件服务	Amazon SES	专门用于发送营销/事务性邮件，仅支持邮件渠道，通知灵活性差，不适合运营团队“多渠道即时告警”。

Amazon EKS	托管Kubernetes服务（AWS管理控制平面，用户管理节点组），核心价值是简化K8s部署/运维，控制平面默认跨3个AZ高可用，节点组是Pod运行的载体（EC2实例或Fargate）。
节点组（Node Groups）	EKS中逻辑分组的EC2实例集合，是Pod的运行环境，支持通过启动模板定义实例配置（AMI、实例类型、安全组等），可配置自动扩缩容。
Kubernetes Cluster Autoscaler（CA）	K8s原生的节点自动扩缩容组件，与EKS深度集成。核心作用：当Pod因资源不足处于Pending状态时，自动扩容节点组（增加EC2实例）；当节点闲置（资源利用率低）时，自动缩容节点组（删除EC2实例），实现“按需扩缩”。
Horizontal Pod Autoscaler（HPA）	工作负载自动扩缩组件，根据CPU/内存使用率等指标自动调整Pod副本数（题目中“工作负载自动扩展使用的副本数量”即指HPA）。HPA负责扩Pod，CA负责扩节点，二者配合实现端到端弹性。
无状态Pod（Stateless Pod）	不存储本地状态（数据存在S3/EBS等外部存储），可随时创建/销毁，是弹性扩缩的理想场景（无需考虑状态迁移）。
拓扑扩散约束（Topology Spread Constraints）	K8s调度策略，用于将Pod均匀分布在不同拓扑域（如AZ、节点），目的是提升高可用和负载均衡，与“节点弹性（扩缩容）”无关。
启动模板（Launch Template）	EC2实例配置模板，EKS节点组通过它定义实例属性（如AMI、实例类型、IAM角色），无法用于部署EKS控制平面（控制平面由AWS托管）。

Amazon ECS + Fargate	ECS是容器编排服务，Fargate是无服务器容器运行环境（无需管理EC2），用于部署微服务。	DR中需保证备用Region有可用的应用实例，预部署可减少故障后启动应用的时间（RTO关键）。
Amazon RDS for MySQL	托管关系型数据库服务，提供高可用、备份、复制等能力。	数据层是DR核心，数据恢复速度直接决定RTO。关键特性：
		- 快照：手动/自动备份，跨Region复制需时间；
		- 跨区域读取副本：实时同步主库数据，故障时可快速提升为primary（RTO最短）。
Amazon Route 53	托管DNS服务，支持路由策略（故障转移、加权等）和健康检查。	DR中用于快速切换流量从故障Region到备用Region，是流量切换的核心组件。
CloudWatch Alarms	监控AWS资源（ECS、RDS）的健康状态，触发告警。	DR的“触发器”，检测到故障后启动恢复流程。
Amazon EventBridge	事件总线服务，接收CloudWatch告警事件，触发目标动作（如调用Lambda）。	串联“故障检测”和“恢复执行”，实现DR自动化。
DR关键指标（RTO）	恢复时间目标（Recovery Time Objective）：故障后恢复服务的最长可接受时间。	题目核心要求“最小化RTO”，需优先选择“预部署应用+实时数据同步”的方案。


1. AWS Organizations
	• 定义：用于集中管理多个AWS账户的服务，包含一个「管理账户」和多个「成员账户」。管理账户可统一配置预算、监控、策略等，汇总所有成员账户的资源使用数据，是实现「跨账户EC2使用量统一跟踪」的前提。
	• 与题目关联：题目要求跟踪整个组织的EC2使用量，因此解决方案必须在「管理账户」中配置（只有管理账户能汇总所有成员账户数据）。


2. AWS Budgets
	• 定义：用于监控AWS「成本」或「使用量」的服务，支持自定义阈值（如金额、使用小时数），当达到阈值时触发警报（通过SNS、邮件等）。
	• 核心能力：
		○ 支持「使用量预算」（如EC2运行小时）和「成本预算」（如EC2消费金额）；
		○ 可基于「历史数据」（如过去30天平均）设定阈值；
		○ 支持按日/周/月周期监控，适配题目「每日警报」需求。

3. AWS Cost Anomaly Detection
	• 定义：基于机器学习自动检测「成本异常波动」的服务，无需手动设置固定阈值。
	• 局限：仅关注「成本」，不支持「使用量」监控；异常判定由ML自动完成，无法自定义「比过去30天平均高10%」这种固定比例阈值。

4. AWS Trusted Advisor
	• 定义：提供AWS资源最佳实践建议的服务，涵盖成本优化、性能、安全等类别。
	• 局限：核心是「提供优化建议」（如“存在闲置EC2实例”），而非「监控使用量是否超出阈值」，无法配置自定义比例的警报。

5. Amazon Detective
	• 定义：用于安全调查的服务，分析AWS资源的安全活动（如异常访问、潜在威胁）。
	• 局限：聚焦「安全领域」，与EC2使用量监控无关。

Amazon SQS	托管消息队列，多AZ部署天生高可用，分离生产者（订单发送方）和消费者（订单处理方），实现松散耦合，支持消息持久化，应对流量峰值（消息暂存）。
AWS Lambda	无服务器计算，无需管理服务器，自动弹性扩展（毫秒级启动，按请求量动态调整资源），事件驱动（如SQS消息触发），低延迟，按使用量付费。
AWS Step Functions	托管工作流服务，用于协调多步骤、有状态的复杂流程（如多服务联动、分支审批），不具备消息接收/暂存能力。
Amazon ECS	容器编排服务，需管理集群、任务定义、Auto Scaling，适合容器化应用，但管理成本高，扩展配置复杂。
Kinesis Data Streams	用于高吞吐量连续数据流（如日志、传感器数据），按分片存储，配置复杂，闲置时资源浪费。

Lambda	无服务器计算服务，无需管理服务器即可执行代码	需通过IAM角色获取其他服务权限，不能在代码中硬编码凭据
Secrets Manager	专门存储敏感凭据（密码、API密钥等），支持自动旋转、加密、权限隔离	唯一支持RDS凭据自动旋转的托管服务，可按环境创建独立密钥条目
Parameter Store	存储配置参数/非敏感凭据，支持KMS加密	不支持自动旋转数据库凭据，仅适合静态配置存储
KMS	密钥管理服务（生成/存储/使用加密密钥）	不存储凭据本身，仅用于加密Secrets Manager/Parameter Store中的数据
IAM角色	为AWS服务（如Lambda）授予访问其他服务的权限（遵循最小权限原则）	Lambda需通过IAM角色获取Secrets Manager的访问权限，无需硬编码凭据
凭据自动旋转	定期生成新凭据，更新目标服务（如RDS）和存储介质（如Secrets Manager）	题目核心要求，仅Secrets Manager原生支持RDS凭据自动旋转
		
AWS Control Tower	基于Organizations的多账户治理工具，提供“护栏（Guardrails）”（主动/被动控制），但本质是封装SCP/IAM策略实现管控，并非独立的权限控制层。
EC2 公共IP地址	分为“启动时自动关联的临时公网IP”（由AssociatePublicIpAddress属性控制）和“弹性IP（EIP）”（手动关联），公共IP使实例可被公网访问。
AWS Systems Manager (SSM)	实例运维管理工具，Automation运行簿用于自动化执行操作，但属于事后/事中管控（无法从源头阻止操作）。
AWS Config	资源配置合规检测工具，通过自定义规则检测不合规资源，配合Lambda实现“检测-修复”，属于事后补救（无法预防违规操作）。
Control Tower 主动控制	护栏的一种，操作执行前阻止不合规行为（如拒绝创建公有S3桶），但仅覆盖有限的预置规则，无法自定义修改EC2实例属性。
ECS Fargate	无服务器容器编排服务，无需管理EC2实例，直接运行Docker镜像
Application Load Balancer (ALB)	7层负载均衡器，基于HTTP/HTTPS路由流量，支持前置身份认证（Authenticate OIDC）
Amazon Cognito 用户池	面向应用终端用户的身份认证服务，支持用户注册/登录、MFA、托管登录UI
IAM	管理AWS资源访问权限的服务（如控制谁能创建ECS集群）
IAM Identity Center (SSO)	面向AWS账户/团队的单点登录服务，集成SaaS应用SSO
AWS Amplify	全栈应用开发框架，集成Cognito实现认证，但无独立“用户池”
MFA（多因素认证）	除密码外需额外验证因素（短信/验证码器），Cognito用户池原生支持强制MFA

1. CloudFormation 堆栈集（StackSets）
StackSets 是CloudFormation的扩展功能，支持跨多个AWS账户和多个Region批量部署、更新、删除CloudFormation堆栈（Stack Instance），解决了单堆栈只能在单个账户/Region部署的局限，是多账户多区域资源标准化部署的核心工具。 核心组件：
	• 堆栈集（StackSet）：定义要部署的资源模板和部署规则；
	• 堆栈实例（StackInstance）：堆栈集在具体账户+Region的实际部署实例；
	• 管理账户（Admin Account）：创建/管理StackSet的账户；
	• 目标账户（Target Account）：接收StackSet部署的账户。

2. CloudFormation CAPABILITY 参数
创建包含IAM资源的堆栈/堆栈集时，CloudFormation要求显式声明权限（防止未授权创建敏感IAM资源），核心参数：
	• CAPABILITY_IAM：允许创建/修改无自定义名称的IAM资源（名称由AWS自动生成）；
	• CAPABILITY_NAMED_IAM：允许创建/修改自定义名称的IAM资源（题目中核心考点）；
	• CAPABILITY_AUTO_EXPAND：允许展开模板中的宏（本题无关）。

3. AWS Region启用
新AWS账户默认仅启用部分Region（如us-east-1），未使用过的Region可能处于“未启用”状态——若未启用，无法在该Region创建任何AWS资源（包括Stack Instance）。

4. StackSets 权限模型
	• SELF_MANAGED：用户手动管理跨账户权限（需在管理账户创建AWSCloudFormationStackSetAdministrationRole，目标账户创建AWSCloudFormationStackSetExecutionRole并配置信任关系）；
	• SERVICE_MANAGED：基于AWS Organizations，由CloudFormation自动管理权限（无需手动创建角色）。

Aurora是AWS托管的兼容PostgreSQL/MySQL的云原生数据库，采用集群架构：
	• 主实例（Primary Instance）：处理读写操作，是集群的写入端点；
	• 副本实例（Aurora Replicas）：只读副本，同步主实例数据，分担只读负载；
	• 读取器端点（Reader Endpoint）：自动将只读流量路由到副本实例，无需手动指定副本地址；
	• 集群端点（Cluster Endpoint）：固定路由到主实例（读写）；
	• max_connections：PostgreSQL核心参数，控制单个数据库实例允许的最大并发TCP连接数，超过则触发“连接太多”报错。

2. AWS Lambda
无服务器计算服务，特点是事件驱动、短暂执行、高并发：
	• 每次Lambda调用会创建独立的执行环境，每个环境可能发起独立的数据库连接；
	• 高流量下，大量短暂连接会快速耗尽数据库的max_connections，这是本题的核心矛盾。
3. Amazon RDS Proxy
AWS托管的数据库代理，核心价值是连接池（Connection Pooling）：
	• 复用数据库连接：将多个Lambda的连接请求复用为少量实际到数据库的连接，从根本上解决短连接耗尽max_connections的问题；
	• 支持只读/读写端点：可路由流量到Aurora副本/主实例，适配只读场景；
	• 高可用：自动故障转移，无需修改应用配置。
4. Aurora Data API
通过HTTP API访问Aurora的方式，无需建立TCP连接，适合无服务器场景，但不是解决连接数问题的核心（连接池才是），且会增加应用适配成本。
5. Aurora实例扩展
分为横向（增加副本数）和纵向（升级实例规格），仅解决CPU/内存负载问题，无法解决连接数耗尽（每个副本仍有独立的max_connections，且扩展有延迟，无法应对不可预测的高流量）。

AWS IoT Core	物联网核心服务，提供设备认证、连接、授权、消息路由能力，是设备接入AWS的核心入口
X.509证书+私有CA	X.509是数字证书标准，私有CA由企业自主管理，为设备颁发唯一证书；AWS IoT支持验证私有CA颁发的证书合法性
预置模板（Provisioning Template）	定义设备预置的自动化配置（如创建Thing、关联证书、附加Policy），是批量/自动预置设备的核心模板
预置钩子（Provisioning Hooks）	仅支持Lambda函数，在设备预置流程中触发，用于验证设备合法性（如序列号），验证通过才完成预置
自动注册（allow-auto-registration）	注册私有CA到IoT Core时开启该参数，设备首次连接时，IoT Core会自动触发预置流程（无需手动调用API）
IoT Thing	AWS IoT中物理设备的抽象实体，每个设备对应一个Thing，存储设备属性、关联证书/策略
IoT Policy	定义设备权限（如MQTT发布/订阅权限），是设备接入AWS IoT的权限控制核心
多租户（Multi-tenancy）	SaaS架构中多个租户共享同一套AWS基础设施（如DynamoDB表、Lambda），但需按租户隔离成本/资源消耗
Amazon DynamoDB	无服务器NoSQL数据库，计费核心维度：RCU（读容量单位）、WCU（写容量单位）、存储、数据传输，支持表级标签
AWS CUR（Cost and Usage Report）	AWS最细粒度的成本/使用量报告，默认存储到S3，支持按标签、服务、账户等维度拆分成本
成本分配标签（Cost Allocation Tags）	AWS标签的子集，激活后会自动同步到CUR/成本探索器，是AWS原生的成本拆分机制（无需自定义计算）
CloudWatch Logs	存储Lambda/服务日志，支持自定义日志记录，可与Insights/Athena集成分析
RCU/WCU	DynamoDB核心计费单位：1 RCU=每秒强一致读1个4KB项目；1 WCU=每秒写1个1KB项目
	
S3版本控制	防止对象被意外/恶意删除/覆盖	1. 每次修改生成新版本，删除仅添加“删除标记”；
		2. 启用后无法禁用，仅可暂停；
		3. 是S3对象锁定、复制的前提

S3对象锁定（Object Lock）	基于WORM（一次写入、多次读取）模型强制保留数据	1. 分合规模式（任何人包括根用户无法绕过保留期）和治理模式（授权用户可绕过但留痕）；
		2. 必须在创建桶时启用，依赖版本控制；
		3. 满足“数据保留N年不可删改”的合规需求

S3复制（Replication）	跨账户/跨区域同步S3对象	1. 实时复制未来数据，批量复制作业复制历史数据；
		2. 跨账户复制需配置双向权限（源桶角色+目标桶策略）

S3 MFA Delete	增强版本控制安全性	1. 仅根用户可启用/禁用，无法自动化；
		2. 删除对象版本需MFA，但无法强制保留数据

S3生命周期规则	自动化管理对象存储周期	核心是“转移/删除”，而非“保留”，与“防止删除”的需求冲突
AWS Config	监控资源配置合规性	可检测配置违规，但无法解决“数据保留”和“跨账户隔离”的核心问题
GuardDuty	威胁检测	仅“检测”恶意行为（如异常访问），无法“防护”数据被删改
Service Catalog	标准化资源创建	仅覆盖“未来”桶的创建，无法保护现有数据，且MFA Delete无法自动化

Amazon CloudFront	AWS的CDN服务，用于全球加速内容分发，支持自定义来源（可将请求路由到API Gateway、ALB、S3等），是用户请求的入口层。
API Gateway HTTP API	轻量级、低延迟的API网关，专为HTTP/HTTPS API设计，支持JWT授权器（验证JSON Web Token合法性），可集成OIDC IdP实现身份认证。
OpenID Connect (OIDC)	基于OAuth 2.0的身份认证协议，IdP（如Cognito、Okta、Azure AD）会颁发JWT令牌，用于验证用户身份合法性。
JWT授权器	API Gateway的授权组件，验证请求中的JWT令牌（签名、有效期、受众等），仅允许合法令牌的请求访问API。
AWS WAF	Web应用防火墙，用于过滤恶意请求（如SQLi、XSS），可与ALB/CloudFront集成，但不原生支持OIDC身份认证（需自定义Lambda规则验证JWT）。

CloudFront签名URL	用于限制对CloudFront分发内容的访问，通过预签名URL验证访问权限，但仅验证URL合法性，不验证用户身份。
AWS CloudTrail	AWS审计日志服务，记录AWS资源的API调用操作，不记录ALB的实时请求（ALB请求日志存储在CloudWatch Logs），且为事后审计，无法实时阻止请求。
AWS Control Tower	基于AWS Organizations的托管式多账户治理服务，快速搭建合规的“登陆区”（Landing Zone），自动化账户创建、策略管控。
AWS Organizations	管理多账户的核心服务，支持组织单元（OU）、服务控制策略（SCP）、委派管理员（Delegated Administrator）。
AWS Config	监控资源配置变更、评估合规性的服务，“合规包（Compliance Packs）”是预定义的合规规则集，可通过StackSets跨账户部署。
Amazon Detective	安全事件调查工具，分析日志、识别异常行为、追溯安全事件根源。
AWS Security Hub	安全状态集中管理服务，聚合Config（合规）、GuardDuty（威胁检测）、Inspector（漏洞扫描）等多安全服务的告警/合规数据，支持跨账户聚合。
CloudFormation StackSets	跨账户/跨区域部署CloudFormation堆栈的服务，支持新账户自动部署。
委派管理员（Delegated Admin）	Organizations中指定某成员账户代替管理账户（主账户）管理特定服务（如Security Hub），避免主账户权限过度集中。

. AWS DataSync
AWS 托管的在线数据同步服务，专为本地存储/其他云存储与AWS存储（S3/EFS/FSx等）的高效、安全、自动化数据迁移/同步设计。核心特性：
	• 组件：DataSync代理（部署在本地，作为数据传输桥梁）、同步任务（定义源/目标/同步规则）；
	• 能力：支持全量迁移（现有数据）+ 增量同步（新增数据），无需定制开发；
	• 加密：传输中默认TLS 1.2+加密，目标存储可配置静态加密（如S3 SSE-KMS）

. Amazon S3
对象存储服务，题目中目标存储。关键特性：
	• 加密：服务器端加密（SSE-S3/SSE-KMS/SSE-C）、传输加密（HTTPS）；
	• 传输加速：利用CloudFront边缘节点优化上传速度（仅加速手段，非同步工具）。

3. Kinesis Data Firehose
实时流式数据摄入服务，适用于日志、传感器数据等小批量持续流式数据，不支持大容量文件（如60TB）的同步。

4. AWS Snowball
离线物理数据迁移设备，适用于PB级海量数据的一次性迁移（需邮寄设备），无法自动同步增量数据。


5. S3 多部分上传 + 站点到站点VPN
	• 多部分上传：S3针对大文件的分片上传方式；
	• 站点到站点VPN：本地DC与AWS VPC的加密网络通道；


1. Amazon API Gateway
	• 定义：全托管的API网关服务，作为前端与后端服务（如Lambda）的统一入口，负责请求路由、认证、节流、监控等。
	• 核心指标：
		○ Throttles：因超出节流限制被拒绝的请求（返回429）；
		○ Errors：后端服务（如Lambda）返回的5xx错误或网关自身错误。
	• 节流限制：默认账户级10000 RPS，可自定义，用于防止后端过载。


. AWS Lambda
	• 定义：无服务器计算服务，按需运行代码，自动扩展但有并发限制（默认账户级1000）。
	• 核心指标（CloudWatch）：
		○ Throttles：并发请求超限制被拒绝的请求数（本题占1%，影响小）；
		○ Errors：函数执行时的运行时错误（本题占10%，核心问题）；
		○ Duration：函数执行耗时（响应慢的直接体现）。

3. Amazon DynamoDB
	• 定义：无服务器高性能NoSQL数据库，吞吐量由读/写容量单位（RCU/WCU） 计量：
		○ 1 RCU = 每秒1次强一致性读（≤4KB）/2次最终一致性读；
		○ 1 WCU = 每秒1次写（≤1KB）。
	• 核心概念：
		○ 预置容量：手动设置RCU/WCU，流量超限时触发节流（Read/Write Throttle Events），导致请求延迟/失败；
		○ 自动扩展（Auto Scaling）：基于CloudWatch指标动态调整RCU/WCU，适配流量波动；
		○ 分区主键：按哈希值分布数据到物理分区，单个分区吞吐量上限约3000 RCU/1000 WCU，设计不当会导致“热点分区”（但本题无此线索）。

Amazon CloudWatch
	• 定义：AWS监控/日志服务，收集各服务指标（如Lambda Errors、DynamoDB节流事件）、日志，用于定位性能瓶颈。

高可用（HA）	AWS高可用的核心是跨可用区（AZ）部署（一个Region内的隔离数据中心），而非跨Region（地理区域，属于灾备级别）。
EC2 vs 容器（ECS/EKS）	EC2是AWS虚拟服务器，和原架构的Linux虚拟机完全匹配，迁移时架构更改最少；容器（ECS/EKS）需容器化改造，更改大。
文件存储选项	- EFS：NFS兼容，跨AZ挂载，多EC2实例共享，适配“多虚拟机共享文件存储”场景；
	- S3：对象存储，非文件系统，需修改应用访问方式；
	- EBS：块存储，仅挂载单个EC2；
	- FSx for Lustre：高性能并行存储，适配HPC，非通用文件存储。
	
负载均衡器（LB）	- ALB（7层）：支持HTTP/HTTPS请求路由，匹配原架构“基于HTTP请求路由的LB”；
	- NLB（4层）：仅TCP/UDP，不支持HTTP路由。
	
AZ vs Region	AZ是Region内的隔离数据中心，跨AZ部署是高可用基础；跨Region部署架构复杂，不符合“最少更改”。
AWS Application Discovery Service (ADS)	迁移前的资产/依赖发现工具	1. 收集本地服务器（VM/物理机）的IP、主机名、配置信息；
		2. 发现服务器之间的网络依赖/应用依赖关系；
		3. 支持「代理式」（安装在服务器）和「无代理式」（对接VMware vCenter）两种收集方式；
		4. 数据可同步到AWS Migration Hub。

AWS Migration Hub (迁移中心)	迁移项目的统一管理控制台	1. 整合ADS、MGN等迁移工具的数据；
		2. 可视化展示服务器依赖关系（网络图表）；
		3. 跟踪迁移进度，需指定「主区域」统一管理数据。


AWS Application Migration Service (MGN)	迁移执行工具（核心是服务器迁移）	1. 轻量级代理实现本地服务器数据复制到AWS；
		2. 支持测试/切流，完成服务器迁移；
		⚠️ 不收集网络依赖关系，仅聚焦「迁移执行」。

Amazon CloudWatch	AWS资源/应用的监控工具	1. 收集指标、日志，生成监控仪表板；
		⚠️ 不支持生成「本地服务器网络依赖拓扑图」，导入CSV也无法实现该场景。


AWS Lambda	无服务器计算服务，高并发下每个调用若创建新数据库连接，易耗尽RDS连接数（Lambda执行环境短暂，自行维护连接池不可行）。
Amazon RDS for MySQL	托管MySQL，但Multi-AZ仅为故障转移（主备），无托管连接池，只读副本扩展能力弱。
Amazon Aurora MySQL	兼容MySQL的托管数据库，性能是RDS MySQL的5倍，支持最多15个Aurora副本（只读），多可用区部署更高效，扩展性/可用性更强
RDS Proxy	AWS托管的数据库连接池服务，核心解决Lambda等高并发场景的连接耗尽问题：
	1. 维护与数据库的持久连接池，Lambda复用连接；
	2. 控制数据库连接数，避免耗尽；
	3. 自动路由故障转移，提升可用性。
只读副本（Aurora Replica）	分担Aurora主库的读负载，提升读取扩展性，复制延迟远低于RDS只读副本。
Lambda连接池（自行实现）	不可行：Lambda执行环境随函数结束销毁，无法维护持久连接池。
Route 53加权记录	DNS层面分发流量，无法解决连接池核心问题，仅能分发读流量，无连接管理能力。
	

Amazon S3	亚马逊对象存储服务，原生通过RESTful API访问（如S3 SDK/CLI），不支持SMB/NFS等文件协议；无限扩展、低成本，是AWS核心存储服务。
AWS Storage Gateway - File Gateway（文件网关）	部署在本地/EC2的虚拟设备（VM/硬件），对外提供SMB/NFS文件协议接口，底层自动将数据同步到S3存储桶；核心价值：让传统文件协议应用无缝访问S3，无需修改代码。
Amazon FSx for Windows File Server	托管的Windows文件服务器，原生支持SMB协议，但底层存储是EBS卷（块存储），而非S3；适用于纯Windows文件共享场景，不满足“底层用S3”的需求。
AWS DataSync	高效的数据迁移服务，用于本地存储与AWS存储（FSx/S3/EFS等）之间的批量数据复制，仅解决“数据搬运”，不解决协议兼容问题。
AWS Server Migration Service (SMS)	专注于将本地虚拟机（VMware/KVM等）迁移到EC2实例，核心是“服务器迁移”，而非文件存储协议/底层存储适配。
SMB协议	微软开发的文件共享协议，本地应用通过该协议访问共享文件系统，是本题的核心协议约束。


服务	核心特性	适用场景
Aurora全局数据库	一主多只读副本（跨Region），主Region可写、副本只读，复制延迟<1秒	跨Region只读、单主写入场景
DynamoDB全局表	多Region全可读写，毫秒级数据同步，无主从限制	全球低延迟读写、多主写入场景
ECS/EKS	容器编排服务（ECS轻量、EKS兼容K8s），部署在指定Region，需搭配负载均衡器	容器化应用的稳定运行
		


2. 计算/路由相关
服务	核心特性	适用场景
ECS/EKS	容器编排服务（ECS轻量、EKS兼容K8s），部署在指定Region，需搭配负载均衡器	容器化应用的稳定运行
AWS Global Accelerator (GA)	Anycast全球静态IP，路由到最近健康终端节点，基于AWS骨干网优化延迟	全球API/应用的低延迟路由
CloudFront	CDN服务，边缘节点缓存内容；Lambda@Edge/CloudFront Functions处理边缘逻辑	静态/动态内容分发



3. 边缘计算相关
服务	核心限制
CloudFront Functions	轻量级（<2ms），无网络访问能力，仅处理请求头/重定向等表层操作
Lambda@Edge	可调用AWS服务，但冷启动、并发限制，适合轻量级边缘逻辑


4. DNS相关
	• Route 53：AWS DNS服务，支持将域名映射到GA/CloudFront/ELB，实现域名解析


EC2 Auto Scaling Group (ASG)	自动扩缩容组，根据预设策略（如CPU利用率）自动增减EC2实例数量，保证API服务的高可用和弹性。
Application Load Balancer (ALB)	7层负载均衡器，基于HTTP/HTTPS路由流量到私有子网的EC2实例，必须部署在公有子网（需公网IP接收CloudFront的请求）。
CloudFront	AWS CDN服务，边缘节点分发内容，起源（Origin）可指向ALB；支持配置“自定义HTTP头”，在转发请求到起源时注入自定义头信息。
	
AWS WAF	Web应用防火墙，可关联ALB/CloudFront，通过规则（如字符串匹配、IP匹配）过滤恶意请求，是保护ALB的核心组件
	
AWS Secrets Manager	安全存储密钥（如随机字符串），原生支持自动轮换密钥（无需手动开发Lambda），集成Lambda可实现无缝轮换。
SSM Parameter Store	存储配置参数，无原生自动轮换功能（需手动编写Lambda实现），适合存储非敏感配置，而非需要高频轮换的验证密钥。
	
AWS Shield Advanced	进阶版DDoS防护服务，针对网络层/传输层DDoS攻击，不负责验证请求来源（如仅允许CloudFront访问ALB）。

AWS Direct Connect (DX)	专用私有网络连接，将本地网络直接接入AWS，替代公网连接	1. 低延迟、高带宽、高稳定性；2. 流量不经过公网；3. 高可用需部署两个物理连接（链路冗余）；4. 按端口/数据量计费，单Region部署成本远低于多Region
Direct Connect Gateway (DX Gateway)	AWS托管的跨Region网络网关，用于将单个/多个DX连接与多Region的VPC/Transit Gateway关联	1. 托管服务（无需自建运维），天然高可用；2. 跨Region流量走AWS私有骨干（非公网）；3. 仅需在一个Region部署DX连接，即可访问多Region资源，成本极低
VPC对等连接 (VPC Peering)	两个VPC间的点对点私有连接	1. 不支持中转（A↔B、B↔C，A无法通过B访问C）；2. 多Region需维护大量对等连接，运维复杂；3. 无自动故障转移，高可用差
Transit VPC	基于EC2路由器实例（如Cisco CSR）自建的跨Region中转网络	1. 需自建/维护高可用（多AZ、故障转移），运维复杂度高；2. 成本高于DX Gateway（EC2实例+带宽费）；3. 非AWS原生托管，稳定性依赖自建配置
Transit Gateway (TGW)	AWS托管的跨VPC/跨Region网络中转枢纽	1. 可关联同一Region的多个VPC；2. 可与DX Gateway跨Region关联，实现全局网络统一管理

RPO（Recovery Point Objective）	灾难发生后，系统恢复时可接受的最大数据丢失量	所有灾难恢复方案设计	本题要求RPO=5分钟，即数据丢失不能超过5分钟，需近实时数据复制


AWS Elastic Disaster Recovery (DRS)	原CloudEndure DR，专为本地→AWS/跨AWS区域的灾难恢复设计，支持块级持续数据复制	物理/虚拟服务器（VMware/KVM）的灾难恢复	RPO低至秒级、自动化恢复、支持回切本地、最小运营开销
AWS DataSync	本地与AWS存储间的批量/增量数据迁移工具	数据迁移、定期数据同步（非灾备）	支持NFS/SMB/VMware，但无“持续复制”能力，需手动触发同步
AWS Storage Gateway（文件网关）	本地存储与S3的桥接工具，提供SMB/NFS接口	本地文件共享同步到S3	文件级同步，无块级复制能力，恢复需多步转换
Amazon FSx for Windows File Server	托管的Windows文件服务器，兼容SMB	Windows文件共享、企业级文件存储	文件级存储，不适合专有格式的块级数据复制
Amazon EBS	EC2的块存储服务，模拟本地服务器硬盘	EC2实例的持久化存储	块级访问，与本地VMware块存储兼容
AWS CloudFormation	基础设施即代码（IaC）工具，自动化部署AWS资源	批量资源编排	需手动编写模板，恢复时需触发部署，运营开销高
AWS Backup	集中化备份管理工具	AWS资源/本地资源的备份恢复	定时备份（增量/全量），无法满足5分钟RPO（定时备份有数据间隙）


共享VPC（Shared VPC）	允许一个账户将VPC子网共享给其他账户，但本题是跨VPC访问应用，非子网共享	仅作为“集中式应用所在VPC”的载体
网络负载均衡器（NLB）	四层（TCP/UDP）负载均衡器，高吞吐、低延迟，可被VPC终端节点服务（VPCE Service）关联	集中式应用的前端入口，是PrivateLink的核心关联对象
VPC对等连接（VPC Peering）	两个VPC间的私有点对点连接，依赖CIDR路由	不支持CIDR重叠，直接排除
AWS传输网关（TGW）	中心辐射式网络枢纽，连接多VPC/VPN，但路由基于CIDR	CIDR重叠时路由冲突，无法使用
站点到站点VPN（Site-to-Site VPN）	加密连接本地/跨VPC，依赖CIDR路由	不支持CIDR重叠，且管理10个VPC的VPN成本高
VPC终端节点服务（VPCE Service，PrivateLink）	允许将VPC内的服务（如NLB后的应用）暴露给其他VPC，基于ENI和服务名称访问，不依赖CIDR	唯一支持CIDR重叠的跨VPC访问方案，且支持授权控制
接口型VPC终端节点（Interface VPCE）	部署在业务单元VPC内的ENI，通过私有IP访问VPCE Service，无需公网	业务单元VPC访问共享VPC应用的入口
		

Amazon EKS（Elastic Kubernetes Service）	托管式Kubernetes服务，AWS负责控制平面（apiserver/etcd等）的运维、升级、高可用，用户仅需管理节点/容器；完全兼容原生K8s API和清单文件	题目中原环境是自建K8s，EKS可直接复用原有K8s部署清单，迁移工作量最小
EKS托管节点组	EKS的托管节点管理方案，AWS自动处理节点的创建、升级、修复、扩缩容，无需手动维护EC2实例	减少用户运维负担，符合“最小迁移”的核心需求
Amazon ECR（Elastic Container Registry）	AWS托管的容器镜像仓库，兼容Docker，支持镜像扫描、版本控制，替代自建开源镜像仓库（如Harbor）	存储迁移后的微服务容器镜像，适配EKS拉取镜像的需求
Amazon Aurora PostgreSQL	兼容PostgreSQL协议的托管数据库，性能/高可用优于自建PostgreSQL，AWS负责备份、补丁、故障恢复	替代本地PostgreSQL，应用代码仅需修改连接字符串，无兼容性改造
AWS App Runner	无服务器容器服务，面向简单Web/API应用，无需管理集群/节点，但不支持K8s清单	无法复用原有K8s配置，迁移工作量大
Amazon ECS（Elastic Container Service）	AWS托管的容器编排服务，使用“任务定义+服务”管理容器，与K8s清单结构完全不兼容	需要将K8s清单重构为ECS任务定义，迁移成本高
自建K8s（EC2部署）	完全由用户管理K8s控制平面、节点、镜像仓库、数据库，无AWS托管能力	运维/迁移工作量极大，不符合“最小迁移”
ALB（Application Load Balancer）	应用层负载均衡器，EKS中通过Ingress资源自动关联ALB，暴露微服务供外部访问	作为客户端访问EKS微服务的入口，替代自建负载均衡器
IRSA（IAM Roles for Service Accounts）	将IAM角色绑定到K8s ServiceAccount，实现Pod级别的细粒度权限控制	控制EKS Pod访问ECR/Aurora等资源的权限

概念	核心说明	成本/场景适配性
Amazon EC2	虚拟服务器，需管理实例生命周期，闲置时仍计费	高成本，不符合“降成本”诉求
Amazon RDS	托管关系型数据库，按实例规格/存储计费，闲置成本高	高成本，且手动清理数据，不灵活
Amazon DynamoDB	无服务器NoSQL数据库，按需计费（按读写次数），无需管理服务器	低成本，适配非结构化竞赛条目存储
DynamoDB TTL	免费功能，按字段自动过期删除条目，无需手动操作	完美适配“竞赛结束后不保留数据”
AWS Lambda	无服务器计算，按调用次数+执行时间计费，无闲置成本	轻量化，适配“处理竞赛数据/选获胜者”的短任务
ECS Fargate	无服务器容器服务，按vCPU/内存小时计费	比Lambda重，成本更高
DynamoDB DAX	DynamoDB缓存集群，按节点计费	增加额外成本，竞赛无高读需求，无需配置
Amazon Redshift	数据仓库，按集群计费，适配大规模分析	大材小用，成本极高，完全不适配竞赛条目存储
ElastiCache for Redis	托管缓存，按节点计费，仅临时存储	需依赖RDS持久化，双计费，成本更高



VPC（虚拟私有云）	AWS中隔离的网络环境，可自定义IP段、子网、路由表、网关等，是所有资源的网络边界。
子网（Subnet）	VPC内的IP段划分，分为公有子网（路由指向Internet Gateway，可直接访问公网）和私有子网（无直接公网路由，需通过NAT/代理转发）。
路由表（Route Table）	控制VPC内流量转发路径，每个子网关联一个路由表，包含“目标CIDR + 下一跳”规则（如下一跳为IGW、EC2实例、NAT网关等）。
EC2源/目的检查（Source/Destination Check）	AWS默认启用的安全机制：检查EC2发送的数据包源IP是否为实例自身私有IP，接收的数据包目的IP是否为实例自身私有IP。
	关键：若实例作为代理、NAT、路由器等转发流量的角色，此检查会阻止流量转发（因为数据包的源/目的不是实例本身），必须禁用。
透明代理（Transparent Proxy）	客户端无需配置代理地址，流量通过路由表自动转发到代理服务器，代理对客户端完全透明，核心依赖流量转发能力。
安全组（Security Group）	状态化虚拟防火墙，控制实例的入站/出站流量，默认拒绝所有入站、允许所有出站，仅影响“是否允许流量通行”，不影响“流量转发能力”。
DHCP选项集（DHCP Options Set）	配置VPC内实例的DNS服务器、域名等DHCP参数，仅影响DNS解析，与流量转发无关。
弹性网络接口（ENI）	可附加到EC2的虚拟网络接口，支持多IP，但数量不影响流量转发核心逻辑，单ENI也可完成转发（只要禁用源/目的检查）。

1. 虚拟私有云（VPC）
AWS VPC是用户在AWS云中独占的逻辑隔离网络环境，可自定义CIDR块、子网（公有/私有）、路由表、Internet网关（IGW）、NAT网关等资源。题目中VPC为“手动创建”，需纳入自动化管理而非重建。


2. AWS CloudFormation
AWS原生的基础设施即代码（IaC）服务，通过JSON/YAML模板定义资源，以“堆栈（Stack）”为单位管理资源的创建、更新、删除。核心能力包括：
	• 模板化定义资源配置；
	• 支持导入现有资源到堆栈（关键能力），实现对手动创建资源的自动化接管；
	• 堆栈集（StackSets）：扩展能力，用于跨多账户/多区域批量部署堆栈，不用于导入现有资源。

3. AWS CDK
基于CloudFormation的高阶IaC框架，用Python/TypeScript等编程语言定义基础设施，最终编译为CloudFormation模板。相比原生CloudFormation，需额外搭建开发环境、编写代码，复杂度更高。
4. AWS SAM
CloudFormation的扩展框架，专注于简化无服务器应用（Lambda、API Gateway、DynamoDB）的定义，与VPC管理无关。

5. 导入现有资源到CloudFormation
CloudFormation的核心特性：编写与现有手动资源“精确匹配”的模板，通过控制台/CLI将资源导入堆栈，导入后资源由CloudFormation统一管理，无需重建，是“最小努力”接管现有资源的关键。


服务/概念	核心说明
Amazon S3	对象存储服务，支持单对象最大5TB（适配5GB文件），可配置静态网站托管，高可用/低成本，适合存储下载文件
Amazon CloudFront	AWS CDN（内容分发网络），将S3内容缓存到全球数百个边缘节点，用户从最近节点下载，降低延迟、减少源站流量
Amazon Route 53	AWS托管DNS服务，可将自定义域名解析到CloudFront/S3，管理全球DNS路由
Amazon EC2	虚拟服务器，需手动配置FTP服务，部署在特定区域，全球访问延迟高、运维成本高
Amazon EBS	块存储，绑定单个EC2实例（同AZ），无法跨ASG实例共享存储
Amazon EFS	弹性文件系统，可跨EC2实例共享，但仍依赖EC2集群，无全球分发能力
Application Load Balancer (ALB)	七层负载均衡器，仅支持HTTP/HTTPS，不兼容FTP（TCP四层协议）
Auto Scaling Group (ASG)	自动扩缩EC2实例，但无法解决“全球分发”核心问题
S3 Request Payment	请求方付费（下载用户承担S3流量费），不提升性能，仅转嫁成本
CloudFront OAI	Origin Access Identity，CloudFront专属身份，限制S3仅被CloudFront访问（防止直连S3）


1. 应用程序负载均衡器（ALB）
	• 工作在OSI 7层（应用层），专为HTTP/HTTPS流量设计，可基于路径、主机头路由请求到EC2等目标。
	• 502（Bad Gateway）错误：表示ALB从后端目标（如EC2）收到了无效的HTTP响应（本题根因是错误的HTTP头），而非目标不可达。
	• 标准错误页面：ALB默认返回的5xx/4xx错误页面是AWS通用样式，无自定义内容。
2. Amazon CloudFront
	• AWS CDN服务，用于缓存静态内容、加速全球访问，可配置“起源（Origin）”指向ALB（动态内容）或S3（静态内容）。
	• 核心特性：支持自定义错误响应——当源站（如ALB）返回指定HTTP错误码（如502）时，CloudFront可替换为自定义错误页面（存储在S3），无需修改源站配置，开销极低。
3. Amazon S3静态网站托管
	• S3桶可配置为静态网页服务器，无需EC2，低成本、高可用，适合存放静态的自定义错误页面（HTML/CSS/JS）。
4. Route 53
	• AWS托管的DNS服务，支持域名解析、健康检查和故障转移路由。
	• 健康检查：检测端点（如ALB）是否可达，仅当端点完全不可用时触发故障转移，无法处理“端点可达但偶尔返回502”的场景。
5. CloudWatch警报 + Lambda
	• CloudWatch：监控AWS资源指标（如ALB的Target.FailedHealthChecks、Elb.InternalError）。
	• Lambda：无服务器函数，可自动化修改资源配置（如ALB转发规则），但属于“高操作开销”方案，且需精准匹配错误指标。

VPC对等连接	两个VPC之间的私有网络连接，允许跨VPC通信（无需公网），同一区域/跨区域均可配置，无带宽限制（受实例网络性能约束）。
应用负载均衡器（ALB）	7层负载均衡器，分发HTTP/HTTPS流量到多个EC2实例，支持跨AZ部署，提升可用性。
NAT网关	让私有子网实例访问外网（外网无法反向访问），跨AZ部署两个NAT网关可提升NAT层高可用，但仅适用于需外网访问的场景。
	
Amazon Aurora MySQL	AWS托管的MySQL兼容关系型数据库，采用集群架构（主实例+只读副本），高性能、高可用，支持快照备份、在线扩容等特性，属于RDS家族的增强版。
Aurora DB快照	手动/自动创建的Aurora集群只读全量备份，基于存储层快照，可跨账户共享，用于恢复/创建新集群，创建过程不中断源数据库服务。
AWS DMS（数据库迁移服务）	专为数据库迁移设计的托管服务，支持同构/异构数据库（如Aurora→Aurora）的全量+增量（CDC，变更数据捕获）迁移，可实现“近乎零中断”的在线迁移。
AWS Backup	集中化备份管理服务，可统一管理Aurora、EC2、EBS等资源的备份，但跨账户共享的恢复点无法直接用于创建Aurora集群（需先导出为RDS快照）。
AWS Application Migration Service（AMS）	核心用于服务器迁移（本地物理机/虚拟机、其他云服务器→AWS EC2），不支持数据库数据同步/迁移。
DNS切换	迁移完成后修改DNS解析记录，将业务流量从源数据库集群指向新集群，是最小化中断的关键收尾步骤。
	

概念	核心定义	关键特性
VPC（虚拟私有云）	AWS中逻辑隔离的网络环境，包含子网、路由表、安全组等组件	不同VPC默认完全隔离，跨Region/账户VPC需显式配置连接
传输网关（Transit Gateway, TGW）	中心化网络枢纽，用于统一连接多个VPC、VPN、Direct Connect	支持跨Region/跨账户、中转通信（A→TGW→B），只需为每个VPC创建1个TGW附件，替代大量点对点连接
VPC对等连接	两个VPC间的私有点对点连接，允许IP层通信	无中转能力（A对等B、B对等C，A无法访问C），数量随VPC数指数级增长（n(n-1)/2）
AWS PrivateLink	私有服务访问方案，允许VPC间私有访问服务，无需公网/NAT/对等连接	单向访问（消费方→服务方）、高安全、低运维，需关联NLB/ALB作为后端
网络负载均衡器（NLB）	四层（TCP/UDP）高性能负载均衡器	高可用、低延迟，支持PrivateLink终端节点服务的后端关联
站点到站点VPN	基于IPsec的加密连接，用于VPC与本地/其他VPC通信	需管理VPN设备，连接数与VPC数线性增长，运维成本高


概念	核心说明
延迟路由（Latency-based Routing）	Route 53根据用户到各AWS Region的网络延迟，将请求路由到延迟最低的Region，适用于多Region部署提升用户体验。需通过别名记录指向目标资源（如ELB/加权记录集）。
加权路由（Weighted Routing）	给不同记录集分配权重（0-255），权重越高，请求分配比例越高。可结合健康检查：若健康检查失败，该记录集权重视为0，流量自动切走。
别名记录（Alias Record）	免费指向AWS资源（ELB、CloudFront、其他Route 53记录），支持评估目标健康（Evaluate Target Health, ETH）；区别于CNAME（仅指向域名、收费、不支持ETH）。
评估目标健康（ETH）	针对别名记录的关键配置：启用后，Route 53会检查别名指向的目标资源（如ELB/加权记录集）的健康状态；若目标不健康，该别名记录会被标记为不可用，流量不再路由到这里。
Route 53健康检查	支持HTTP/HTTPS、TCP、DNS等类型，用于检测后端资源（如EC2/ELB）的可用性。加权记录集必须关联健康检查，才能让Route 53感知后端故障。



服务/概念	核心作用	核心特性（与题目相关）
AWS IoT Core	连接物联网设备（传感器）到AWS云，收集设备数据	托管服务、高可用、无需管理服务器、安全通信
Amazon Kinesis Data Firehose	全托管的流数据ETL服务，实时捕获/转换/加载数据到S3/Redshift等目标	自动扩展、无服务器、低维护、适配流数据
Amazon MSF（Apache Flink）	托管的实时流处理服务（前身Kinesis Data Analytics）	适合复杂流计算（窗口/聚合）、需维护作业配置
AWS Lambda	无服务器计算服务，按需执行代码	无服务器、按使用付费、零维护、轻量灵活
Apache Parquet	列式存储格式	压缩率高、查询效率高、存储/查询成本低
CSV	行式存储格式	人类可读、存储/查询效率低、成本高
Amazon S3	对象存储服务	高可用、高持久、低成本、无服务器
Amazon Aurora MySQL	托管关系型数据库	需维护（补丁/扩容）、存储成本高、有停机风险
Amazon Athena	无服务器交互式查询服务	直接查询S3数据、标准SQL、按需付费、零维护

3. 资源共享/网络访问类
	• AWS RAM（Resource Access Manager）：跨账户共享AWS资源的服务，但仅支持特定资源（如Transit Gateway、子网、许可证等），不支持直接共享Aurora集群。
	• Transit Gateway（传输网关）：跨VPC/VPN/直连的网络枢纽，可跨账户共享，但需配置VPC附件、路由表等，运营开销较高。
	• ALB（Application Load Balancer）：应用层负载均衡器，支持HTTP/HTTPS路由，可配置为“内网型（Internal）”仅允许私有网络访问，目标组可指向数据库IP和端口。
	• AWS PrivateLink：实现VPC间私有访问的核心服务，无需公网、VPN或TGW：
		○ 终端节点服务（Endpoint Service）：服务提供方（共享服务账户）创建，关联ALB/Auto Scaling组等资源；
		○ 私有终端节点（Endpoint）：服务消费方（开发账户）创建，通过私有IP访问终端节点服务，通信全程在AWS私有网络内。
	• 站点到站点VPN：基于IPsec的跨网络连接，主要用于本地数据中心与AWS的连接，跨账户VPC使用需大量配置，运营开销极高
	

2. 成本监控类
	• AWS Cost Explorer（成本资源管理器）：可视化、分析AWS成本/使用量的工具，可查看历史成本趋势、按维度（账户/服务/资源）拆分成本，但需手动分析，无自动化异常检测能力。
	• AWS Billing Alerts（账单警报）：基于CloudWatch的账单指标警报，仅监控「总费用/维度费用是否超固定阈值」，无法定位具体异常资源，也无智能异常识别能力。
	• AWS Cost Anomaly Detection（成本异常检测）：AWS Cost Management核心功能，基于机器学习+历史成本数据，智能识别非预期的成本飙升/异常，支持按「链接账户/服务/资源」等维度监控，可自动定位异常根源，并通过SNS推送通知，是本题核心解决方案。
3. 通知类
	• Amazon SNS（简单通知服务）：消息发布/订阅服务，可接收Cost Anomaly Detection的异常通知，并推送给操作团队（邮件/短信/Slack等）。
二、题目核心需求拆解
	1. 自动化检测：识别因测试资源未删除导致的成本增加（账单原本稳定，仅偶发异常）；
	2. 定位异常资源：不仅要知道“成本涨了”，还要知道“哪个资源导致的”；
	3. 自动通知：异常发生时推送告警给操作团队。



1. 存储服务核心概念
服务	类型	适用场景	关键特性
Amazon EFS	网络文件存储	Linux多实例共享存储（Web应用）	原生Multi-AZ、NFS协议、预配置/突发吞吐量
Amazon FSx for Lustre	并行文件存储	HPC/机器学习（高吞吐低延迟）	高性能但不适合通用Web应用
Amazon EBS	块存储	单实例存储（如系统盘）	块级访问，Multi-Attach需手动配置，非共享文件存储
Amazon FSx for OpenZFS	企业级文件存储	ZFS特性需求（如快照/压缩）	功能丰富但非Web应用最优解
2. 高可用/灾备核心概念
	• Multi-AZ：跨可用区部署，避免单AZ故障，EFS原生支持，EBS/FSx需手动配置；
	• RPO（恢复点目标）：灾难后可接受的数据丢失时间，本题要求<1小时；
	• 吞吐量（MiBps）：本题需满足高峰3小时225MiBps读取吞吐量，EFS预配置吞吐量可精准匹配；
	• EFS Replication：跨Region异步复制，RPO<15分钟，原生支持无需额外工具。


1. AWS Snow Family（雪族设备）
AWS Snow Family是离线数据迁移+边缘计算的硬件设备系列，专为无/低带宽的远程位置设计，核心成员：
	• Snowball Edge：面向TB/PB级数据迁移，分Compute Optimized（计算优化）、Storage Optimized（存储优化）等型号，支持DataSync、NFS/SMB协议，可离线回传数据到S3。
	• Snowcone：轻量级便携设备（单设备最大存储~8TB），适配中小规模数据（本题6TB），支持在设备上启动Amazon Linux 2 AMI的EC2实例，可部署自定义应用（如FTP服务器），离线退回AWS后数据可导入S3。

AWS Direct Connect (DX)	专用物理网络连接，将本地数据中心直接连到AWS，带宽高（如1Gbps）、延迟低、稳定性强，替代公网传输关键业务流量；支持BGP动态路由和MACsec链路加密。	题目中已有1Gbps DX + BGP，核心是基于此优化高可用/安全。
MACsec	链路层加密协议（Media Access Control Security），为DX物理链路提供硬件级加密，保障数据在DX链路上的传输安全，无上层加密的性能损耗。	题目要求“安全性”，MACsec是DX链路的核心安全方案。
Site-to-Site (S2S) VPN	基于公网的IPsec加密隧道，连接本地与AWS：	作为DX的备份路径，需匹配DX的BGP特性实现高可用。
	- 动态VPN：支持BGP，自动学习路由，故障可自动切换；
	- 静态VPN：手动配置路由，无自动切换能力。
BGP (边界网关协议)	自治系统（AS）间的动态路由协议，支持路由自动学习、故障自动切换；DX配置BGP后，可与动态VPN联动实现主备切换。	题目中DX已配置BGP，备份路径需兼容BGP才能满足容错性。
Private VIF (私有虚拟接口)	DX的逻辑接口，用于将DX连接到AWS VPC的私有网段；多个VIF仅隔离流量，不解决物理链路故障。	选项C的核心，但单DX链路下多VIF无高可用价值。


概念/服务	核心说明
Amazon EFS	托管的可扩展NFS文件系统，支持跨EC2实例挂载，支持静态加密（由KMS CMK保护），适用于文件级存储场景。
AWS KMS	密钥管理服务，用于创建/管理加密密钥（CMK），EFS加密需关联KMS CMK，备份/恢复EFS时需KMS权限授权。
AWS Backup	集中化备份管理服务，支持EFS等资源的备份计划、恢复点管理；对EFS支持定期备份和持续备份（PITR） 两种模式。
恢复点目标（RPO）	灾难/数据删除后，允许丢失的最大数据时间窗口（本题要求≤100分钟）。
EFS持续备份（PITR）	点对点恢复（Point-in-Time Recovery），支持将EFS恢复到任意分钟级时间点，RPO接近0，是文件级删除恢复的最佳方式。
IAM服务角色	授权AWS服务（如AWS Backup）访问其他资源的IAM角色；AWSServiceRoleForBackup是AWS托管的Backup服务角色，也可自定义角色。
KMS密钥策略	控制谁能使用KMS CMK（加密/解密/生成数据密钥等），EFS加密备份需Backup角色有KMS访问权限。

2. EFS备份关键特性
	• 定期备份：按计划（如每小时/30分钟）生成快照，恢复点数量多、管理成本高，RPO等于备份间隔；
	• 持续备份（PITR）：增量式实时备份，支持恢复到任意分钟级时间点，RPO接近0，完美适配文件级删除恢复场景。
	

概念	核心说明
IAM用户/组	IAM用户是AWS账户下的身份（对应云工程师），IAM组是用户集合（S3-access组），策略附加到组后，组内用户继承权限，简化权限管理。
IAM访问密钥	由Access Key ID和Secret Access Key组成，用于CLI/程序访问AWS（区别于控制台密码），但静态密钥无MFA交互能力。
虚拟MFA	基于软件的多因素认证（如Google Authenticator），需输入“静态凭证+动态验证码”完成认证，是强制安全的核心。
IAM策略（身份型）	附加到用户/组/角色的策略，控制“谁能做什么”，核心条件aws:MultiFactorAuthPresent可判断请求是否经过MFA验证。
AWS STS（安全令牌服务）	生成短期临时安全凭证（含AccessKey、SecretKey、SessionToken），支持结合MFA验证生成凭证，比静态密钥更安全。
S3桶策略	附加到S3桶的资源型策略，控制“谁能访问该桶”，但无法强制MFA（MFA是身份验证逻辑，需在IAM策略中实现）。
信任策略	仅适用于IAM角色，定义“谁能承担该角色”，IAM组无信任策略（关键易错点）。


概念/服务	核心说明
.NET Framework + Windows on AWS	.NET Framework是微软传统闭源框架，仅能运行在Windows系统（区别于跨平台的.NET Core/.NET 6+）；AWS提供Windows Server版EC2实例，原生支持.NET Framework运行。
Windows Web Application Migration Assistant（WAMA）	AWS官方迁移工具，专为Windows上的.NET Framework Web应用设计，无需修改应用代码，可一键将应用迁移到AWS Elastic Beanstalk或EC2，极大简化迁移流程。
AWS Toolkit for .NET Refactoring	用于.NET应用的“现代化重构”工具（如迁移到.NET Core、容器化），需要修改代码/适配配置，核心目标是应用现代化，而非“无改码快速迁移”。
Amazon Elastic Beanstalk（EB）	全托管PaaS（平台即服务），用户只需上传应用代码，AWS自动管理底层基础设施：包括EC2实例、负载均衡（ELB）、自动扩展组（ASG）、操作系统补丁、网络配置等，符合“无需管理基础设施”的要求。
Amazon EC2	IaaS（基础设施即服务），用户需手动管理实例（操作系统维护、扩容、补丁、安全配置等），不符合“不想管理基础设施”的核心要求。
Amazon ECS/EKS + Fargate	ECS（容器编排服务）、EKS（K8s编排服务）是容器管理服务；Fargate是无服务器启动类型（无需管理EC2），但前提是应用需容器化，而.NET Framework容器化需重构/适配，违反“无改码”要求。
Fargate	ECS/EKS的无服务器引擎，仅负责容器调度，不管理应用代码，但依赖容器化前置步骤。



• AWS Batch：批处理专用管理服务，简化大规模批处理作业的调度、计算环境管理（无需手动维护EC2集群），支持按需/Spot实例，是批处理场景的最优选择。


1. 核心存储/计算服务
	• Amazon S3：对象存储服务，用于存储批处理的输入（15-20GB/作业）和输出数据，无存储容量限制，适配大文件场景。
	• AWS Batch：批处理专用管理服务，简化大规模批处理作业的调度、计算环境管理（无需手动维护EC2集群），支持按需/Spot实例，是批处理场景的最优选择。
	• EC2 Spot实例：竞价型实例，价格仅为按需实例的10%-50%，适合可中断、非紧急的工作负载（题目中作业可承受中断，完美匹配）。
	• EC2按需实例：按秒/小时计费，无竞价回收风险，但成本高，适合关键、不可中断的作业。


策略/编排服务
	• SPOT_CAPACITY_OPTIMIZED分配策略：Spot实例的核心策略，优先选择中断概率最低的Spot容量池，平衡可用性与成本。
	• AWS Step Functions：无服务器工作流编排服务，用于协调Lambda/ECS等，但无法突破Lambda的资源限制。
	• AWS Lambda：无服务器函数，存在硬限制（单次执行≤15分钟、内存≤3GB、临时存储≤512MB），无法处理15-20GB大文件。
	• Amazon EKS：Kubernetes托管服务，适合持续运行的容器化应用，批处理场景下需手动配置Job调度，复杂度高、成本高。



1. AWS DataSync
	• 核心用途：专为本地存储与AWS存储间的安全、高效、自动化数据传输设计，支持NFS/SMB等本地协议，内置带宽限制、调度复制时间（非工作时间）、数据校验等功能。
	• 部署方式：可部署为本地VM（Hyper-V/VMware）或EC2实例，优先利用本地计算资源可降低成本。
2. S3存储类别（归档场景核心）
存储类别	检索延迟	成本	适用场景
S3 Standard	毫秒级	最高	频繁访问
S3 Glacier Instant Retrieval	毫秒级	中	归档但需即时检索（<1分钟）
S3 Glacier Deep Archive	12h（标准）/48h（批量）	最低	长期归档、1周内检索即可
3. AWS Storage Gateway（磁带网关）
	• 模拟传统物理磁带库，数据最终存储在S3 Glacier/Deep Archive，但操作复杂度高（需管理磁带生命周期、弹出等），适配传统磁带迁移场景，而非文件级归档。
4. AWS Direct Connect
	• 本地数据中心与AWS的专用10Gbps网络连接，DataSync可通过该链路传输数据，支持带宽限制，避免抢占业务带宽。


Amazon CloudWatch	AWS核心监控与可观测性服务，包含Logs（日志存储）、Metrics（时序指标）、Alarms（告警）三大核心模块，支持日志→指标转换、多维度聚合统计。
CloudWatch Logs	存储/管理应用/系统日志的服务，包含「日志组」（Log Group）和「日志流」（Log Stream），支持通过「指标过滤器」提取日志中的业务数据转换为指标。
CloudWatch Logs 指标过滤器	CloudWatch Logs的内置功能，无需编写代码，可通过正则/模式匹配日志事件（如成功登录），并将匹配结果转换为CloudWatch Metrics指标，支持自定义维度。
CloudWatch Metrics	时序数据存储，由「命名空间」（Namespace）、「指标名」、「维度」（Dimensions，键值对，用于细分指标，如用户名/客户端名）组成，支持按天/周/月聚合统计唯一值。
CloudWatch Agent	部署在EC2/本地服务器的代理，核心功能是收集系统级指标（CPU/内存）和日志文件，并将日志转发到CloudWatch Logs（仅做“传输”，不处理日志内容）。
	


概念	核心说明	关联场景
IAM长期密钥 vs 短期凭证	① 长期密钥：IAM用户的Access Key ID/Secret Access Key，永久有效（除非手动轮换），安全风险高；② 短期凭证：由AWS STS（安全令牌服务）生成，含临时AccessKey、SecretKey、SessionToken，默认有效期1小时（最长12小时），风险低	题目要求替换长期密钥，核心是用STS生成短期凭证
STS核心API	① AssumeRole：基于IAM角色切换获取临时凭证（适用于AWS内部/跨账户）；② AssumeRoleWithWebIdentity：基于外部Web身份（OIDC/SAML）获取临时凭证（适用于GitHub、Google等外部服务）	外部服务（GitHub Actions）需用AssumeRoleWithWebIdentity
IAM OIDC身份提供者（IdP）	OIDC（OpenID Connect）是基于OAuth 2.0的轻量级身份认证协议，AWS IAM可配置外部OIDC IdP（如GitHub）作为信任源，允许外部实体通过OIDC令牌获取IAM角色临时凭证	GitHub Actions原生支持OIDC，是适配性最高的方案
IAM SAML 2.0 IdP	SAML是企业级身份联邦协议（如AD FS），配置复杂，适用于企业内部SSO，非GitHub Actions最优解	运营开销大，不符合“最小运营开销”要求
Amazon Cognito身份池	为未认证/已认证用户（如社交登录）提供临时AWS凭证，需额外维护身份池和认证配置	引入多余中间层，增加运营开销
IAM Roles Anywhere	允许非AWS环境（本地服务器/多云）通过X.509证书获取IAM角色凭证，需配置私有CA、证书等	复杂度极高，运营开销远大于OIDC


1. 计算服务
	• Amazon EC2：弹性虚拟服务器，是CMS的底层运行载体，支持Linux系统，可按需扩缩容。
	• AWS Elastic Beanstalk (EB)：PaaS级部署服务，自动管理EC2、Auto Scaling Group (ASG)、负载均衡器等底层资源，无需修改应用代码即可快速部署Web应用，契合“不需更改网站”的核心要求。
	• Auto Scaling Group (ASG)：自动扩展组，根据流量策略（如CPU利用率）自动增减EC2实例数量，满足“2→30个实例扩展”的需求。
2. 存储服务
	• Amazon EFS (Elastic File System)：托管式NFS兼容文件系统，可跨AZ同时挂载到多个EC2实例，提供持久化共享存储，完美匹配CMS“NFS兼容持久存储”的核心需求。
	• Amazon EBS (Elastic Block Store)：块存储，默认仅挂载到单个EC2实例；Multi-Attach仅支持少数实例类型，且非NFS兼容，无法满足CMS的共享存储需求。

5. 配置/扩展工具
	• .ebextensions：EB的自定义配置文件，可在EC2实例启动时执行脚本（如挂载EFS），无需修改应用代码。
	• EC2生命周期钩子：用于扩缩容时的自定义操作（如缩减前备份），非挂载EFS的标准方式。




概念	核心作用	与题目关联
ALB（应用程序负载均衡器）	七层负载均衡，路由HTTP/HTTPS流量到EC2，区域级服务（无法跨区域关联EC2实例）	前端流量入口，DR时需在备用区域单独部署
EC2 & AMI	EC2运行Web前端；AMI是EC2镜像，可跨区域复制，DR时快速启动备用EC2	备用区域提前复制AMI，灾难时一键启动前端
RDS MySQL 读取副本	只读副本，近实时同步主库数据，可跨区域创建；	核心解决“性能+最小化数据丢失”双需求
	✅ 分担读流量（解决财务查询性能）；
	✅ 灾难时可提升为独立实例（RPO极低，最小化数据丢失）
RDS快照	静态备份，按周期生成（如每小时），恢复时丢失快照后的数据（RPO高）	不符合“最小化数据丢失”
S3 跨区域复制（CRR）	自动、异步跨区域复制S3对象，需源/目标桶启用版本控制	比Lambda定期同步更实时，最小化S3数据丢失
DynamoDB全球表	跨区域DynamoDB表，多区域读写	题目是RDS MySQL，迁移成本高、风险大，非最优解
DR核心指标	RPO（恢复点目标）：数据丢失量；RTO（恢复时间目标）：恢复耗时	读取副本RPO≈秒级，快照RPO≈1小时，CRR RPO≈秒级

1. AWS Direct Connect (DX)
	• 定义：AWS DX是专用网络连接，直接将企业本地数据中心/办公网络与AWS云基础设施打通，绕过公共互联网。
	• 核心价值：更高带宽、更低延迟、更强安全性（避免公网传输），是满足“连接不能通过互联网”的核心组件。
	• 关键组件：DX物理连接（线下申请）、DX网关（跨区域/跨VPC整合DX）、私有虚拟接口（用于访问VPC私有IP）。
2. VPC终端节点服务（VPC Endpoint Service，AWS PrivateLink）
	• 定义：也叫AWS PrivateLink，允许服务提供方将VPC内（或通过DX连接的本地）服务暴露给其他AWS账户/本地网络，流量全程不经过公共互联网。
	• 核心特性：
		○ 私有性：消费方通过“接口终端节点”（私有IP）访问，不走公网；
		○ 负载均衡关联：必须关联NLB（网络负载均衡器）或ALB（应用层负载均衡器）（NLB适配通用TCP服务，ALB仅支持HTTP/HTTPS）；
		○ 访问控制：可通过白名单限定允许访问的AWS账户。


1. 基础架构核心
	• AWS Organizations：用于集中管理多个AWS账户的服务，支持统一策略管控、账单合并、资源共享等，是多账户架构的基础，本题中共享服务账户和开发账户均隶属于同一Organizations。
	• Transit Gateway (TGW，传输网关)：AWS的“云中心路由器”，替代传统VPC对等连接的网状架构，可将多个VPC、VPN、Direct Connect网关等互联，实现集中化的网络路由管理，是跨VPC/跨账户网络互通的核心组件。
	• TGW Attachment (传输网关附加)：将VPC、VPN等资源“挂载”到TGW的操作，是TGW与目标网络建立通信的必要步骤（类似路由器接网线）。
	• TGW Auto Accept (TGW自动接受)：TGW的配置项，可自动接受跨账户的TGW Attachment请求，无需人工审批，适合自助化操作场景。
2. 资源共享与自动化
	• AWS Resource Access Manager (RAM)：专为跨账户/跨Organizations共享AWS资源设计的服务（如TGW、子网、许可证等），是跨账户共享TGW的最佳实践，无需重复创建资源，简化权限管理。
	• TGW Peering (传输网关对等)：仅用于跨Region的TGW互联，同Region内无需创建多个TGW再对等（冗余且低效）。
	• VPC Endpoint (VPC终端节点)：用于VPC内资源“私有访问”AWS公有服务（如S3、EC2）或私有终端节点服务（PrivateLink），无法实现跨VPC的通用网络互通（仅针对特定服务/端口）。
	• AWS Network Manager：聚焦于全球广域网架构管理（如跨Region TGW、站点到站点VPN），并非跨账户共享TGW的常规方式。
	• Amazon EventBridge + Lambda：事件驱动自动化组合，但本题中TGW自带自动接受功能，无需额外开发。


AWS Organizations	集中管理多AWS账户的服务，支持账户分组、策略管控、跨账户资源共享	题目中公司用其管理共享服务账户和开发账户
Transit Gateway (TGW，传输网关)	云网络枢纽，实现多VPC/账户/区域的星型网络互通，替代点对点VPC对等连接	共享服务账户已部署TGW，需实现开发账户与该TGW的连接
TGW关键特性	1. 跨账户共享：可通过RAM共享给其他账户；2. 附加（Attachment）：TGW需附加到VPC才能互通；3. 自动接受附加：跨账户附加请求可自动通过，无需人工审批	开发账户需频繁删重建连接，自动接受可减少干预
AWS RAM (资源访问管理器)	安全跨账户/组织共享AWS资源（如TGW、子网）的标准方式，无需复杂IAM配置	跨账户共享TGW的最佳实践，适配开发团队自主操作需求
VPC终端节点	私有访问AWS服务/PrivateLink服务的方式，不经过公网	仅适用于“服务访问”，无法实现通用VPC间网络互通
TGW对等	用于跨区域TGW连接，同一区域内跨账户共享TGW无需对等	选项A的核心误区（误用对等解决同区域跨账户问题）
AWS Network Manager	网络监控/管理工具，非跨账户共享TGW的核心方式	选项D的核心误区（误用Network Manager替代RAM）



1. AWS Migration Hub（AWS迁移中心）
AWS迁移中心是统一的控制台，用于跟踪、管理和评估从本地/其他云到AWS的所有迁移工作负载。核心能力包括：整合迁移工具数据、生成TCO（总拥有成本）报告、跟踪迁移进度，是生成TCO报告的核心载体。
2. AWS Migration Evaluator（迁移评估器，原TCO Calculator进阶版）
专注于无代理收集本地环境数据（支持SNMP、VMware API等），无需在本地虚拟机安装任何软件，收集的数据包括VM配置（CPU/内存/存储）、性能指标（CPU利用率、网络流量）等，是生成TCO报告的数据源基础。其核心组件是无代理收集器（Agentless Collector），通常部署在AWS EC2实例上。
3. AWS Application Migration Service (AMS，原MGN)
核心是无代理迁移执行（将本地工作负载迁移到AWS），而非“数据收集+TCO评估”，仅负责迁移落地，不生成TCO报告。
4. Site-to-Site VPN（站点到站点VPN）
在AWS VPC和本地数据中心之间建立安全的IPsec加密连接，使AWS侧的EC2实例（部署无代理收集器）能访问本地虚拟机的SNMP服务。
5. 无代理收集器（Agentless Collector）
Migration Evaluator的核心组件，部署在AWS EC2实例（匹配Microsoft工作负载需Windows系统），通过SNMP/VMware API等协议采集本地VM数据，无需在本地部署任何软件/新增VM，符合题目约束。
6. AWS Migration Readiness Assessment (MRA，迁移就绪评估)
仅评估组织的迁移“就绪程度”（如流程、技能、治理），不采集VM性能/配置数据，也不生成TCO报告。


2. DNS与流量路由（核心）
	• Amazon Route 53：AWS托管的DNS服务，核心能力包括：
		○ 健康检查：定期检测端点（如ALB）的可用性，失败则标记为“不健康”；
		○ 路由策略：
			§ 故障转移路由（Failover）：仅区分“主/备”，主端点不健康时切备端点，无“就近”逻辑；
			§ 延迟路由（Latency）：根据用户IP计算到各AWS区域的网络延迟，返回延迟最低的端点，实现“最近区域”访问；
		○ 别名记录（Alias Record）：专为AWS资源（如ALB、CloudFront）设计的DNS记录，无需设置TTL，免费且支持健康检查联动；
		○ 评估目标健康（ETH）：开启后，Route 53会根据健康检查结果过滤不健康的目标，仅路由到健康端点。
3. CDN（干扰项相关）
	• Amazon CloudFront：CDN服务，通过边缘站点缓存内容加速分发，核心是“边缘到源”的加速，而非“用户到区域”的就近路由，本题中属于冗余复杂度。


1. 核心术语（精准无歧义）
中文术语	英文标准表达	缩写/常用变体
行式存储	Row-oriented storage	也可简写为 Row-based storage（AWS文档高频使用）
列式存储	Column-oriented storage	也可简写为 Column-based storage（与Parquet/ORC格式强关联）



1. AWS Direct Connect (DX)
AWS Direct Connect是一种专用网络连接，用于将本地基础设施直接连接到AWS，替代公网IPSec VPN，提供更高带宽、更低延迟、更稳定的网络传输。核心特性：
	• 物理连接（Connection）：本地数据中心与AWS DX节点之间的物理链路，支持1Gbps、10Gbps等带宽；
	• 虚拟接口（VIF）：在物理DX连接上划分的逻辑连接，是本地与AWS通信的“逻辑通道”，分为3类：
		○ Public VIF：访问AWS公网资源（如S3、EC2公网IP）；
		○ Private VIF：直接连接单个VPC（需关联VPC网关VGW）；
		○ Transit VIF：连接AWS Transit Gateway（TGW），支持同时访问多个VPC/本地网络（题目核心要求）。
2. Direct Connect Gateway (DX Gateway)
DX网关是一个区域级资源，用于将多个VPC（通过TGW/VGW）与DX连接关联，实现“多VPC+本地”的统一连接，是Transit VIF与TGW之间的桥梁。
3. Transit Gateway (TGW)
AWS中转网关，相当于云上的“核心路由器”，可集中连接多个VPC、DX、VPN等资源，实现跨VPC/跨账户/本地的网络互通，简化网络架构。
4. Transit VIF 路由交换
Transit VIF的核心价值是路由前缀广播/交换：本地和AWS侧需互相广播路由前缀（本地CIDR、VPC CIDR），才能让双方的网络知道“如何到达对方”。
5. MACsec
Media Access Control Security，是DX物理链路层的加密协议，通过CKN（连接密钥名称）/CAK（连接关联密钥）实现链路加密，属于可选安全增强，非访问VPC资源的必要条件。



1. Amazon WorkSpaces
AWS托管的桌面即服务（DaaS），支持通过瘦客户端/PC/平板等设备访问云桌面，无需管理底层硬件/软件。核心依赖AWS Directory Service（目录服务），所有WorkSpaces必须关联目录，用于身份认证、授权和资源管理。
2. WorkSpaces IP访问控制组（IPACG）
WorkSpaces原生的访问控制机制，专门用于限制哪些IP地址/网段可以访问WorkSpaces。可配置允许/拒绝规则，关联到WorkSpaces目录后，该目录下所有WorkSpaces均继承规则，实现集中式IP管控。
3. AWS Firewall Manager + Web ACL（WAF）
	• Firewall Manager：集中管理跨账户/跨区域的防火墙规则（如安全组、NACL、WAF）；
	• Web ACL（WAF）：仅针对HTTP/HTTPS流量生效（如ALB、CloudFront），无法管控非HTTP/HTTPS协议（如WorkSpaces的PCoIP/WSP协议）。
4. AWS Certificate Manager (ACM)
核心功能是管理SSL/TLS证书（颁发、续期、部署），用于加密HTTP/HTTPS流量，而非设备身份认证或IP位置限制。
5. 自定义WorkSpace镜像 + Windows防火墙
实例级别的主机防火墙控制，需逐个维护WorkSpaces镜像/规则，集中管理难度大，扩展性差。


概念	核心作用	适用场景
AWS Organizations	多账户集中管理，支持账户分层、策略统一管控	企业级多账户架构（如集中网络账户+业务成员账户）
EC2自动扩展组（ASG）	自动调整EC2实例数量，满足流量波动的扩缩容需求	需水平扩展的服务（如防火墙、应用服务器）
启动模板（Launch Template）	替代传统启动配置，定义EC2启动参数（AMI、实例类型、用户数据等）	标准化EC2部署，支持ASG动态调用
网关负载均衡器（GWLB）	专为第3/4层网络设备（防火墙、IDS/IPS、路由设备）设计的负载均衡器	集中式防火墙、网络网关的流量转发/负载均衡
网络负载均衡器（NLB）	高性能TCP/UDP层负载均衡，聚焦应用层流量	普通应用服务（如Web、API）的流量分发，不适配网络设备
AWS PrivateLink	跨VPC/账户的私有通信通道，无需公网/NAT/VPN	私有访问跨账户服务（如集中防火墙、数据库）
VPC终端节点（Endpoint）	PrivateLink的“消费方”资源，成员账户通过它访问服务提供方	成员账户访问集中账户的服务（如防火墙）
VPC终端节点服务（Endpoint Service）	PrivateLink的“服务提供方”资源，绑定负载均衡器（如GWLB）	集中账户对外暴露私有服务（如防火墙）
目标组（Target Group）	负载均衡器的流量转发目标集合	实例目标类型：适配ASG动态EC2实例；IP目标类型：适配静态IP设备
Launch Wizard	复杂应用（SAP、SQL Server）的一键部署向导	高复杂度应用部署，不适合简单EC2+脚本配置

在 AWS RDS 中，“提升（Promote）” 跨区域读取副本 是指将原本只读、依赖主实例同步数据 的 RDS 读取副本，转换为独立的、可读写的主数据库实例 的操作（英文：Promote Read Replica）。


AWS Fargate	ECS/EKS的无服务器容器编排引擎，无需管理EC2节点，仅为运行的容器付费	微服务部署的无服务器载体
Aurora Serverless MySQL	无服务器版Aurora（MySQL兼容），自动扩缩容，适配零售交易（OLTP）场景	替代EC2上的MySQL，满足无服务器OLTP
Redshift Serverless	无服务器云数据仓库，适配OLAP分析场景，近实时数据处理	替代Oracle OLAP，满足近实时分析
Amazon EventBridge	事件总线服务，捕获/路由事件到多目标，是事件驱动架构的核心	实现近实时事件流转，适配事件驱动需求
Amazon SQS/SNS	SQS是消息队列（异步解耦），SNS是发布订阅（消息推送），均非专业事件总线	替代方案，但EventBridge更适配事件驱动
Amazon Neptune	图数据库（适配知识图谱/社交网络）	不适合OLAP分析，直接排除
AppStream 2.0	应用流化服务（交付桌面应用）	与微服务部署无关，排除
AWS IoT Core	物联网设备数据采集服务	零售订单非IoT场景，排除
自动扩展组（ASG）	管理EC2实例扩缩容，仍基于EC2，非无服务器	违背无服务器核心需求，排除



概念	核心说明
AWS Organizations	集中管理多个AWS账户的服务，核心组件：
	• 管理账户（主账户）：拥有组织的完全控制权，可创建/管理成员账户、配置策略；
	• 成员账户：组织内的子账户；
	• OU（组织单元）：用于分组管理成员账户；
	• SCP（服务控制策略）：限制账户操作的权限边界（仅限制，不授予权限）。
AWS CloudTrail	审计日志服务，记录所有AWS账户的API调用（控制台/CLI/SDK/第三方工具），核心概念：
	• 轨迹（Trail）：日志收集规则，分为单账户轨迹（仅收集单个账户日志）和组织级轨迹（由管理账户创建，自动覆盖整个组织的所有账户，包括未来新增账户）；
	• 日志存储：默认存储到S3桶，支持加密、跨区域复制等。
组织级CloudTrail轨迹	AWS原生的多账户日志收集方案，由管理账户创建，无需逐个账户配置，自动适配新增账户，是多账户CloudTrail部署的最优解。
Lambda/EventBridge/SSM Automation	均为自动化工具，但属于“自定义方案”，而非CloudTrail多账户部署的原生最优解，会增加运维复杂度。


概念	核心用途	与题目关联
AD DS（Active Directory Domain Services）	微软目录服务，用于身份认证/授权，本题部署在EC2（自托管AD）	需作为VPN认证的身份源
AWS Client VPN	面向远程用户的VPN服务，客户端（工程师电脑）可通过VPN连接到VPC	匹配“远程工程师访问VPC”的核心场景（区别于站点到站点VPN）
AD Connector	AWS Directory Service的组件，作为自托管AD（EC2上的AD DS）与AWS服务的代理，实现身份集成	解决“AWS VPN对接自托管AD”的核心需求
MFA（多因素认证）	除密码外需额外认证因素（验证码/硬件令牌）	安全政策强制要求，需集成到VPN认证流程
站点到站点VPN（Site-to-Site VPN）	用于两个网络间（如企业机房↔AWS VPC）的互通，非单个用户访问	不适合远程工程师的客户端访问场景
VPN CloudHub	基于站点到站点VPN的多站点互通架构	场景错配，非远程用户访问方案
Amazon WorkSpaces/WorkLink	WorkSpaces是托管虚拟桌面，WorkLink是移动设备访问内部网页	与VPN核心需求无关，属于干扰项
AWS Copilot	容器化应用部署管理工具	与VPN无关联，干扰项


服务/概念	核心特性	与需求的关联
Amazon S3	无服务器对象存储，无限扩展静态资源（HTML/CSS/JS/图片），零服务器运维	静态资源托管的最优解，低运维
Amazon CloudFront	CDN边缘分发网络，就近缓存静态/动态内容，降低源站压力，高扩展	前端流量分发，提升扩展性+用户体验
EC2自动扩展组（ASG）	按负载自动增减EC2实例，提升扩展性，但需手动管理EC2（补丁/监控/升级）	扩展性达标，但运维工作量高
Elastic Beanstalk（EB）	托管式应用部署服务，自动处理EC2/ASG/ELB/部署，支持Java等语言，零底层运维	单体Java应用的“低运维+高扩展”最优解
AWS Fargate	无服务器容器编排（ECS/EKS），无需管理EC2，运行Docker容器，高扩展	适合容器化应用，但需重构单体Java
Amazon Aurora PostgreSQL	托管式兼容PostgreSQL的数据库，支持自动扩展读副本（分担读负载），零数据库运维	解决PostgreSQL读容量瓶颈，低运维
AWS DMS	数据库迁移服务，低停机迁移本地数据库到AWS，支持同构（PostgreSQL→Aurora）	便捷迁移本地数据库，低运维
EC2托管数据库	手动管理服务器/存储/扩展，仅升级硬件（如内存）无法解决读并发瓶颈	扩展性差，运维工作量大
Amazon EFS	弹性文件系统，NFS兼容，可扩展，但需挂载到EC2，运维成本高于S3	静态资源托管的次优解


服务/概念	核心定义与能力
Amazon EKS	托管式Kubernetes服务，AWS负责控制平面（API Server、etcd等）的运维，用户可管理节点组（含托管节点组）；EKS节点本质是EC2实例，运行容器化应用。
Amazon ECR	托管式容器镜像仓库，兼容Docker标准；支持镜像扫描（基础扫描为推送时静态扫描，进阶扫描需Inspector），存储私有/公有镜像。
AWS托管节点组	EKS的节点组由AWS托管，自动处理节点的配置、更新、修复、扩缩容，节点底层仍是EC2实例。
Amazon Inspector	AWS原生托管式漏洞扫描服务，无需用户管理基础设施；支持持续扫描EC2实例（含EKS节点）、ECR镜像、Lambda函数，自动识别CVE漏洞、配置缺陷，运营开销极低。
AWS Security Hub	安全“聚合面板”，不直接执行扫描，而是整合Inspector、GuardDuty、Config等工具的安全告警，统一展示和优先级排序。
Amazon CloudWatch	监控与可观测性服务，CloudWatch代理用于收集EC2/EKS的指标、日志，无漏洞扫描能力。
第三方漏洞扫描工具（EC2部署）	需手动管理EC2实例、工具版本、扫描调度，运营开销大，不符合“最小运营开销”要求。

1. IAM角色（IAM Role）
AWS中用于授予临时权限的身份实体，无固定凭证（密码/访问密钥），需通过sts:AssumeRole获取临时凭证，是跨账户/服务授权的核心。
2. 实例配置文件（Instance Profile）
EC2实例关联IAM角色的“容器”（EC2服务无法直接绑定角色），与IAM角色是1:1映射关系，EC2通过实例配置文件获取角色权限。
3. 信任策略（Trust Policy）
IAM角色的核心配置，定义谁（Principal） 可以执行sts:AssumeRole来承担该角色（“入站授权”）。无正确的信任策略，即使权限策略允许，也无法承担角色。
4. STS:AssumeRole
AWS安全令牌服务（STS）的核心API，用于获取角色的临时安全凭证，是跨账户角色访问的基础。
5. CloudFormation能力（CAPABILITY）
	• CAPABILITY_IAM：允许CFN创建/修改自动命名的IAM资源；
	• CAPABILITY_NAMED_IAM：允许CFN创建/修改显式命名的IAM资源（有覆盖风险，需显式授权）； 两者仅用于CFN创建IAM资源的权限控制，与“角色能否被Assume”无关。
6. 跨账户角色访问
子账户资源（如EC2）要访问父账户资源，需满足两步授权：
	• 父账户角色的信任策略允许子账户主体（如子账户根、子账户IAM角色）执行sts:AssumeRole；
	• 子账户角色的权限策略允许针对父账户角色执行sts:AssumeRole。

1. AWS Transfer Family
AWS Transfer Family是托管式SFTP/FTP/FTPS服务，用于安全地在AWS与外部系统间传输文件，核心集成S3/EFS存储。其托管工作流（Managed Workflows） 是关键特性：
	• 支持自动化处理传输后的文件（解密、转换、移动等）；
	• 包含两种步骤类型：
		○ 名义步骤（Nominal Steps）：处理正常流程（如解密、格式转换）；
		○ 异常处理步骤（Exception Steps）：仅处理错误场景（如文件损坏、权限不足）。
	• 工作流可关联到Transfer Family服务器（全局生效）或单个SFTP用户（粒度更细）。
2. PGP加密/解密逻辑
PGP采用非对称加密：
	• 第三方（数据供应商）用公钥加密数据；
	• 接收方（公司）必须用私钥解密数据（公钥仅用于加密，无法解密）。
3. AWS Secrets Manager
安全存储敏感信息（密钥、凭证、私钥等），支持IAM权限控制和自动轮换，避免明文存储风险。此处用于存储PGP私钥（核心解密凭证）。
4. IAM服务角色（Service Role）
允许AWS服务（此处为Transfer Family）以角色身份执行操作，需配置：
	• 信任策略：允许transfer.amazonaws.com承担该角色；
	• 权限策略：授予角色访问S3（读写文件）和Secrets Manager（读取PGP私钥）的权限。

概念/服务	核心作用
AWS Organizations	集中管理多个AWS账户的服务，包含管理账户（主账户） 和成员账户，支持统一账单、策略管控、成本聚合。
成本分配标签（Cost Allocation Tags）	用于将AWS成本按业务维度（如业务单元、项目）拆分的标签，必须在管理账户激活（成员账户标签需被管理账户归集）。
AWS CUR（Cost and Usage Report）	AWS最详细的成本/使用量报告，可导出到S3，包含标签、账户、服务等维度的成本数据，是成本精细化分析的核心数据源。
Amazon S3	存储CUR报告的核心对象存储服务（CUR仅支持导出到S3）。
Amazon Athena	无服务器交互式查询服务，可直接查询S3中的CUR数据（无需ETL），支持SQL分析。
Amazon QuickSight	AWS原生BI工具，支持连接Athena/S3数据源，实现成本数据的可视化（仪表板、报表）。
Amazon CloudWatch仪表板	主要用于资源监控指标（如EC2 CPU、Lambda调用量），不适合成本的精细化分配可视化。


服务/异常	核心定义与关键特性
Amazon API Gateway	托管式API服务，作为前端（智能电表）与后端服务的入口，支持将请求转发到Lambda、Kinesis等服务，处理高并发HTTP/HTTPS请求。
AWS Lambda	无服务器计算服务，无需管理服务器，按执行时间/资源付费。核心限制：并发数限制（默认账户级1000），超过则触发TooManyRequestsException；内存配置关联vCPU性能，但不解决并发限流问题。
Amazon DynamoDB	托管NoSQL数据库，采用预配置吞吐量（WCU/RCU） 模型：
	- WCU（写入容量单位）：1个WCU支持每秒1次1KB写入，不足则触发ProvisionedThroughputExceededException；
	- RCU（读取容量单位）：本题仅涉及写入，无需关注。
Amazon Kinesis Data Streams	实时数据流服务，用于高吞吐、低延迟的流数据收集/处理，支持削峰填谷和批处理，适配海量设备的数据流场景。
Amazon SQS FIFO队列	先进先出消息队列，确保消息顺序性和仅一次处理，但并发处理能力有限（默认每秒300条），且单条消息触发Lambda无法解决批量写入效率问题。


1. Amazon WorkSpaces
AWS托管的桌面即服务（DaaS），允许用户通过任意设备访问云桌面。核心依赖：
	• AWS Directory Service：WorkSpaces必须关联目录（如Simple AD、AD Connector、Microsoft AD），目录是用户身份认证和WorkSpaces资源管理的核心。
	• 连接别名（Connection Alias）：用户访问WorkSpaces的自定义域名（如workspaces.company.com），需与目录关联，且跨区域高可用需在每个区域独立创建别名并关联对应区域的目录（别名不跨区域共享，需区域级创建）。
2. Amazon Route 53 路由策略
Route 53是AWS的DNS服务，托管区域用于管理域名解析，不同路由策略适配不同高可用/负载均衡场景：
策略类型	核心用途	适配场景
故障转移（Failover）	主备架构，主端点不可用时自动路由到备用端点（需开启“评估目标健康”检测状态）	跨区域高可用、故障自动切换
多值答案（Multivalue）	返回多个端点IP，客户端随机选择，无健康检测和自动故障转移	简单负载均衡（无故障转移）
加权（Weighted）	按权重分配流量到不同端点	蓝绿部署、流量比例分配
3. WorkSpaces跨区域高可用核心逻辑
需满足：
	• 每个区域（主/故障转移）独立部署WorkSpaces + 目录服务；
	• 每个区域创建连接别名，并关联本区域的目录；
	• Route 53配置故障转移路由，指向两个区域的连接别名DNS，开启健康检测实现自动切换。

1. AWS Application Discovery Service (ADS)
	• 核心目标：自动化发现本地数据中心的服务器（物理/虚拟）、网络拓扑、应用依赖关系，为AWS迁移提供基础数据。
	• 两种收集方式：
		○ 代理收集器（Agent-based）：轻量级软件，安装在每台本地VM/物理机上，可收集进程级依赖、资源使用（CPU/内存/磁盘）、网络连接（依赖关系核心数据源），支持所有操作系统（Windows/Linux）。
		○ 无代理收集器（Agentless）：仅支持VMware环境（OVA模板部署），无需在目标VM装代理，通过vCenter API收集VM配置，但依赖关系收集能力弱（无进程级）。
	• 数据流向：收集的数据自动同步到AWS Migration Hub，无需手动干预。
2. AWS Migration Hub（迁移中心）
	• 核心定位：AWS迁移的“单一控制台”，整合ADS、迁移工具（如Application Migration Service）的数据，核心能力：
		○ 可视化应用依赖关系（基于ADS的进程/网络数据生成拓扑图）；
		○ 深度集成Migration Evaluator，直接生成迁移评估报告；
		○ 跟踪迁移进度，无需跨多个控制台操作。
3. AWS Migration Evaluator（迁移评估）
	• 核心能力：基于ADS收集的本地数据，生成迁移评估报告（含“快速洞察评估报告”），内容包括：本地环境规模、AWS资源推荐、成本估算、应用依赖分析。
	• 集成性：与Migration Hub原生集成，无需手动导出/上传服务器列表，直接复用ADS同步的数据。
4. Amazon QuickSight
	• AWS托管的BI工具，需手动上传数据源（如服务器列表）、配置数据集和可视化，运营开销高，仅在自定义复杂报表时使用，不符合“最小运营开销”要求。

服务	核心定位	关键能力/限制
Amazon API Gateway	托管API的全生命周期管理服务	原生集成AWS WAF；可路由请求到Lambda/EC2等后端；支持API监控、认证授权
AWS Lambda	无服务器计算服务（无需管理服务器）	作为API Gateway的后端处理业务逻辑；按实际运行时间计费
Amazon EC2	弹性虚拟机服务，运行自定义应用（本题为旧版API）	裸EC2无法直接集成WAF；需搭配ALB才能通过WAF保护；支持安装Inspector Agent
AWS WAF	Web应用防火墙（防御Web层攻击）	保护对象：API Gateway/ALB/CloudFront；防御DoS、SQL注入、XSS等；支持速率限制
Amazon Inspector	自动化漏洞评估服务	仅分析/检测漏洞（非“保护”）；支持EC2/Lambda/容器的漏洞扫描（CVE/CIS基准）；需Agent（EC2）
Amazon GuardDuty	持续威胁检测服务	仅监控/检测恶意行为（非“阻止”）；分析VPC流量/CloudTrail日志等；生成告警（需手动/自动化响应）

英文术语	AWS 官方中文术语	核心功能	对 “最小化 Lambda 延迟” 的影响
Provisioned Concurrency	预置并发	提前预热 Lambda 实例，直接消除冷启动（Java Lambda 冷启动可达 100ms~1s），保证流量突增时低延迟。	✅ 直接解决核心延迟问题
Reserved Concurrency	预留并发	为 Lambda 预留固定并发额度，防止被同账户其他函数挤占配额，但不预热实例，无法消除冷启动。	❌ 对延迟无改善
RDS Proxy	RDS 代理	托管的数据库连接池，复用少量 RDS 连接支撑大量 Lambda 调用，解决max_connections耗尽，同时减少 Lambda 创建连接的耗时。	✅ 减少建连延迟 + 解决连接失败
max_connections	最大连接数	MySQL 限制并发连接的参数，受 RDS 实例规格硬限制，修改需重启数据库。	

Lambda冷启动	函数首次执行/长时间未执行时，AWS需分配资源、加载运行时、执行初始化代码（加载库/初始化类等），导致延迟升高	对延迟敏感的Java应用影响显著（Java初始化耗时更长）
Lambda SnapStart	针对Java函数的冷启动优化功能：发布版本时执行初始化代码并创建内存快照，调用时快速恢复快照，跳过重复初始化	1. 仅支持已发布的不可变版本（不支持$LATEST）；2. 快照会固化初始化状态，动态/唯一逻辑（如生成唯一ID）不能放在快照阶段
预快照钩子（Pre-snapshot Hook）	SnapStart创建快照前执行的代码，用于清理临时状态、排除无需固化的动态逻辑	确保快照仅保留通用初始化（加载库/初始化类），避免固化唯一/临时状态
预留并发（Provisioned Concurrency）	提前预置Lambda计算资源，让函数始终保持“热状态”，避免冷启动	成本高（按预留并发数持续计费），无成本效益优势
Lambda版本/别名	- $LATEST：开发版本，可随时更新，不支持SnapStart；	SnapStart仅绑定已发布版本
	- 已发布版本：不可变版本，支持SnapStart；
	- 别名：指向版本的指针，可动态切换

1. AWS Systems Manager (SSM)
AWS SSM是一站式基础设施管理服务，可集中管控AWS/本地实例，托管实例（Managed Instance） 是其核心概念——只有满足特定条件的实例，才会被SSM识别为托管实例并显示在控制台中。
2. EC2 VM Import
属于AWS Import/Export服务，用于将本地VM（VMware/Hyper-V等）镜像导入AWS并转换为EC2 AMI。这类自定义AMI通常未预装AWS官方组件（如SSM Agent）。
3. SSM Agent
运行在实例上的轻量级代理，是实例与SSM服务通信的唯一桥梁：
	• 官方AMI（Amazon Linux 2/Windows Server）默认预装；
	• 自定义/导入的AMI需手动安装并启动。
4. EC2 IAM实例配置文件
EC2实例无法直接关联IAM角色，需通过实例配置文件绑定IAM角色。该角色需包含SSM核心权限（AmazonSSMManagedInstanceCore），否则SSM Agent无法获取凭证与SSM服务认证。
5. VPC端点（SSM）
仅对私有子网无公网IP的实例必要（提供私有访问SSM的路径）；公共子网+公网IP的实例可直接访问SSM公网端点，无需VPC端点。
6. 其他无关概念
	• 应用程序发现代理：属于AWS Application Discovery Service，用于发现应用依赖，与SSM无关；
	• SSM服务链接角色：SSM服务自身使用的角色（如执行Run Command），不影响实例是否被识别为托管实例。

服务/工具	核心用途
AWS CloudFormation	基础设施即代码（IaC）工具，通过模板自动化创建/管理AWS资源
Amazon S3	对象存储服务，支持版本控制，用于存储二进制文件、模板等静态资源
Amazon EC2	弹性计算云，提供虚拟服务器，此处用于托管开发人员IDE
AWS CodePipeline	持续集成/持续部署（CI/CD）服务，串联代码提交、构建、测试、部署全流程
AWS CodeCommit	托管式Git代码仓库，替代第三方Git服务（如GitHub），用于源代码控制
AWS CodeBuild	托管式构建服务，无需管理构建服务器，支持运行测试、编译代码、安全扫描等
Amazon EventBridge	事件总线服务，捕获AWS服务事件（如CodeBuild测试失败）并触发后续动作
Amazon SNS	简单通知服务，用于发送短信、邮件、HTTP回调等警报
AWS CDK	云开发工具包，用高级编程语言（Python/TypeScript等）编写IaC，替代纯CloudFormation模板
CodePipeline手动批准阶段	CodePipeline内置功能，暂停管道执行，等待人工审批后继续部署
AWS Lambda	无服务器计算服务，运行短周期代码，但不适合作为构建/测试的核心工具
AWS Amplify	主要用于前端/移动应用快速开发部署，非通用CI/CD功能扩展工具
Jenkins	开源CI/CD工具，需自行管理服务器，不符合“全AWS托管”的隐含要求
Amazon SES	简单邮件服务，仅用于发邮件，无法实现“人工审批”的交互功能
AWS CodeDeploy	仅用于应用部署，无代码构建、测试、安全扫描的能力
Docker镜像	容器打包工具，仅能封装功能，无法“动态开关功能+自定义部署”


1. AWS Storage Gateway
AWS Storage Gateway是混合云存储服务，连接本地环境与AWS云存储，核心分为3类网关，是本题的核心考点：
网关类型	核心特性	访问协议	适用场景
卷网关（Volume Gateway）	块存储卷，持久化到S3	iSCSI（块级）	本地应用需挂载块存储卷
- 缓存模式	频繁访问数据缓存在本地，全量存S3	iSCSI	低延迟+可扩展存储
- 存储模式	全量数据存本地，增量备份到S3	iSCSI	本地需保留全量数据
文件网关（File Gateway）	文件存储，对接S3/FSx	NFS/SMB（文件级）	本地文件共享
磁带网关（Tape Gateway）	模拟磁带库，对接S3 Glacier	无（归档备份）	传统磁带备份迁移
2. AWS Backup
全托管备份服务，支持对AWS资源（含Storage Gateway卷网关卷）创建时间点（点对点）副本，核心能力：
	• 定义备份计划（自动定时备份）；
	• 备份库（Vault）存储备份副本；
	• 跨区域/跨账户备份，支持恢复到任意时间点。
3. iSCSI
块级存储网络协议，允许本地服务器将远程块存储卷挂载为本地设备（区别于NFS/SMB的文件级访问），是本题的关键技术要求。
4. 低延迟+可扩展存储
	• 低延迟：频繁访问数据需本地缓存；
	• 可扩展：核心数据需存储在S3（无限扩展能力）。



1. AWS KMS（Key Management Service）
AWS KMS是托管式密钥管理服务，用于创建、管理和使用加密密钥，支持对称/非对称加密，且与S3、EC2等AWS服务深度集成。核心子概念：
	• 客户主密钥（CMK）：KMS的核心，分为AWS管理CMK（AWS自动维护）和客户管理CMK（用户自主管控），CMK不直接加密大量数据，而是加密“数据密钥（DEK）”（DEK用于实际加密数据）。
	• 多区域主密钥（Multi-Region CMK）：KMS的特殊CMK类型，允许在多个AWS区域创建“副本密钥（Replica CMK）”。副本密钥与主密钥共享相同的密钥ID、元数据和密钥材料，跨区域使用时可通过本地副本密钥解密（本质是同一密钥），解决跨区域密钥一致性问题。
	• 数据密钥（DEK）：由CMK加密生成，用于实际加密S3对象等数据；解密时先通过CMK解密DEK，再用DEK解密数据。
2. Amazon S3 跨区域复制（CRR）
将源S3桶的对象自动复制到另一区域的目标S3桶，复制时会保留对象的加密元数据（如KMS密钥ID）。若对象用KMS加密，目标区域需能访问对应的密钥才能解密。
3. 其他关联概念（错误选项涉及）
	• AWS Private CA：私有证书颁发机构，用于签发私有SSL/TLS证书（用于身份验证、HTTPS等），与数据加密解密无关。
	• AWS RAM（Resource Access Manager）：跨账户/区域共享AWS资源（如EC2、S3），但无法共享加密密钥，且与CA结合无数据加密价值。
	• SSM Parameter Store：存储配置参数的服务，可存储敏感数据（用KMS加密），但不建议导出KMS密钥材料存储至此（安全风险高，且偏离KMS托管密钥的设计初衷）。

服务/工具	核心用途
AWS CloudFormation	基础设施即代码（IaC）工具，通过模板自动化创建/管理AWS资源
Amazon S3	对象存储服务，支持版本控制，用于存储二进制文件、模板等静态资源
Amazon EC2	弹性计算云，提供虚拟服务器，此处用于托管开发人员IDE
AWS CodePipeline	持续集成/持续部署（CI/CD）服务，串联代码提交、构建、测试、部署全流程
AWS CodeCommit	托管式Git代码仓库，替代第三方Git服务（如GitHub），用于源代码控制
AWS CodeBuild	托管式构建服务，无需管理构建服务器，支持运行测试、编译代码、安全扫描等
Amazon EventBridge	事件总线服务，捕获AWS服务事件（如CodeBuild测试失败）并触发后续动作
Amazon SNS	简单通知服务，用于发送短信、邮件、HTTP回调等警报
AWS CDK	云开发工具包，用高级编程语言（Python/TypeScript等）编写IaC，替代纯CloudFormation模板
CodePipeline手动批准阶段	CodePipeline内置功能，暂停管道执行，等待人工审批后继续部署
AWS Lambda	无服务器计算服务，运行短周期代码，但不适合作为构建/测试的核心工具
AWS Amplify	主要用于前端/移动应用快速开发部署，非通用CI/CD功能扩展工具
Jenkins	开源CI/CD工具，需自行管理服务器，不符合“全AWS托管”的隐含要求
Amazon SES	简单邮件服务，仅用于发邮件，无法实现“人工审批”的交互功能
AWS CodeDeploy	仅用于应用部署，无代码构建、测试、安全扫描的能力
Docker镜像	容器打包工具，仅能封装功能，无法“动态开关功能+自定义部署”


1. AWS Storage Gateway
AWS Storage Gateway是混合云存储服务，连接本地环境与AWS云存储，核心分为3类网关，是本题的核心考点：
网关类型	核心特性	访问协议	适用场景
卷网关（Volume Gateway）	块存储卷，持久化到S3	iSCSI（块级）	本地应用需挂载块存储卷
- 缓存模式	频繁访问数据缓存在本地，全量存S3	iSCSI	低延迟+可扩展存储
- 存储模式	全量数据存本地，增量备份到S3	iSCSI	本地需保留全量数据
文件网关（File Gateway）	文件存储，对接S3/FSx	NFS/SMB（文件级）	本地文件共享
磁带网关（Tape Gateway）	模拟磁带库，对接S3 Glacier	无（归档备份）	传统磁带备份迁移
2. AWS Backup
全托管备份服务，支持对AWS资源（含Storage Gateway卷网关卷）创建时间点（点对点）副本，核心能力：
	• 定义备份计划（自动定时备份）；
	• 备份库（Vault）存储备份副本；
	• 跨区域/跨账户备份，支持恢复到任意时间点。
3. iSCSI
块级存储网络协议，允许本地服务器将远程块存储卷挂载为本地设备（区别于NFS/SMB的文件级访问），是本题的关键技术要求。
4. 低延迟+可扩展存储
	• 低延迟：频繁访问数据需本地缓存；
	• 可扩展：核心数据需存储在S3（无限扩展能力）。



1. AWS KMS（Key Management Service）
AWS KMS是托管式密钥管理服务，用于创建、管理和使用加密密钥，支持对称/非对称加密，且与S3、EC2等AWS服务深度集成。核心子概念：
	• 客户主密钥（CMK）：KMS的核心，分为AWS管理CMK（AWS自动维护）和客户管理CMK（用户自主管控），CMK不直接加密大量数据，而是加密“数据密钥（DEK）”（DEK用于实际加密数据）。
	• 多区域主密钥（Multi-Region CMK）：KMS的特殊CMK类型，允许在多个AWS区域创建“副本密钥（Replica CMK）”。副本密钥与主密钥共享相同的密钥ID、元数据和密钥材料，跨区域使用时可通过本地副本密钥解密（本质是同一密钥），解决跨区域密钥一致性问题。
	• 数据密钥（DEK）：由CMK加密生成，用于实际加密S3对象等数据；解密时先通过CMK解密DEK，再用DEK解密数据。
2. Amazon S3 跨区域复制（CRR）
将源S3桶的对象自动复制到另一区域的目标S3桶，复制时会保留对象的加密元数据（如KMS密钥ID）。若对象用KMS加密，目标区域需能访问对应的密钥才能解密。
3. 其他关联概念（错误选项涉及）
	• AWS Private CA：私有证书颁发机构，用于签发私有SSL/TLS证书（用于身份验证、HTTPS等），与数据加密解密无关。
	• AWS RAM（Resource Access Manager）：跨账户/区域共享AWS资源（如EC2、S3），但无法共享加密密钥，且与CA结合无数据加密价值。
	• SSM Parameter Store：存储配置参数的服务，可存储敏感数据（用KMS加密），但不建议导出KMS密钥材料存储至此（安全风险高，且偏离KMS托管密钥的设计初衷）。


自动扩展组（ASG）	自动管理EC2实例数量，保障高可用和弹性；核心参数：
	✅ 健康检查宽限期：实例启动后，ASG等待该时间后才开始检查健康状态（默认0秒），宽限期内即使健康检查失败，也不会标记实例不健康。
	✅ 健康检查类型：可基于EC2自身状态或ELB（ALB）健康状态判断。


外来表（External Table）	关系型数据库特性：数据存储在外部系统（如本地Oracle），但AWS端数据库可直接查询（PostgreSQL通过Oracle FDW实现，Oracle通过DB_LINK实现）。

空间数据支持	Oracle有SDO_GEOMETRY，PostgreSQL通过PostGIS扩展原生支持空间数据；DynamoDB/Redshift无原生OLTP级空间数据支持。


本题的核心是解决“S3非空桶导致CloudFormation堆栈删除失败”的问题，且需避免重大架构变更。选项A通过Lambda自定义资源清理S3对象，是唯一符合要求的方案；Terraform代码则通过模拟这一逻辑，实现了相同的效果，同时兼顾了题目中“24小时删除对象”的附加条件。


概念	核心说明	关键约束/适用场景
S3 标准存储（Standard）	高可用性（99.99%）、高吞吐量，毫秒级访问，适用于频繁访问的对象	成本最高，无最低存储期限/对象大小限制
S3 标准-IA（Standard-IA）	适用于不频繁访问但需快速访问的对象，存储成本远低于Standard	最低存储期限30天，最小对象大小128KB；检索成本低，适合“偶尔访问”场景
S3 Glacier 即时检索（Glacier Instant Retrieval）	适用于极少访问（每年几次）但需毫秒级检索的对象，存储成本最低	最低存储期限90天，最小对象大小128KB；提前删除会产生额外费用
S3 多部分上传（Multipart Upload）	用于上传大文件（>100MB推荐，>5GB强制），将文件拆分为多个部分并行上传	未完成的多部分上传会残留“分片数据”，占用S3存储并产生成本
S3 生命周期配置（Lifecycle Configuration）	自动化管理对象的存储类别转换、过期删除、未完成多部分上传清理	可基于对象创建时间、前缀/标签等规则配置，是S3成本优化的核心手段
请求者支付存储桶（Requester Pays Buckets）	由访问/下载对象的请求者承担数据传输和请求费用，而非存储桶所有者	仅支持有AWS账户的请求者，匿名用户无法使用
S3 传输加速（Transfer Acceleration）	利用CloudFront边缘节点加速上传，解决弱网/跨地域上传失败问题	会产生额外的边缘节点传输费用，核心目的是“提升体验”而非“优化成本”


概念	核心说明	与题目需求的关联
Amazon S3 静态网站托管	S3可托管静态HTML/CSS/JS等内容，无需服务器，高可用、低成本	题目中Web应用的静态内容载体
Amazon CloudFront	CDN服务，将内容缓存到全球边缘节点，降低访问延迟，可集成WAF/Shield	分发静态网站和API请求，需集成防护组件
API Gateway	托管API服务，路由前端请求到Lambda，支持限流、监控等	连接前端与Lambda的核心桥梁
AWS Lambda 冷启动	Lambda函数长时间未调用时，首次启动需初始化运行时/加载代码，导致延迟	题目核心痛点：高峰时订单处理慢的主因
Lambda 预定并发性（Provisioned Concurrency）	提前预置Lambda执行环境，消除冷启动，适合可预测的高峰流量	解决冷启动的唯一有效方案
Lambda 超时/内存	超时=函数最大运行时长（与冷启动无关）；内存提升=CPU性能提升（不解决冷启动）	干扰项：超时/内存无法解决冷启动
Amazon RDS for MySQL	托管的MySQL（OLTP，事务型），支持按需/预留实例	订单处理的核心数据库（事务型场景）
RDS 按需实例	按使用付费，无承诺，适合波动负载	题目中DB负载稳定，按需成本高于预留实例
RDS 预留实例（Reserved Instances）	预付费/承诺1-3年使用时长，折扣高达70%，适合稳定负载	优化稳定负载的DB成本的核心方案
Aurora Serverless	无服务器Aurora，自动扩缩容，按使用付费	适合波动负载，稳定负载下成本不如预留实例
Amazon Redshift	数据仓库（OLAP），用于大数据分析，不支持事务型订单处理	干扰项：OLAP≠OLTP，排除
AWS WAF	Web应用防火墙，可配置规则防护SQL注入、XSS等Web漏洞，集成CloudFront/API Gateway	防护SQL注入/Web漏洞的核心工具
AWS Shield Advanced	高级DDoS防护，仅防护DDoS攻击，不防护SQL注入/Web漏洞	干扰项：与题目“防护SQL注入”需求无关
Amazon Inspector	漏洞评估服务，扫描EC2/ECS等实例的系统漏洞，不支持CloudFront集成	干扰项：无法防护Web应用漏洞


概念	核心定义	与题目关联
Auto Scaling Group (ASG) 自动扩展组	管理一组EC2实例，根据策略自动扩/缩容，保障应用性能和高可用	题目核心优化对象，需通过ASG解决单实例高峰性能问题
动态扩展策略	基于实时监控指标（如CPU利用率、网络流量）触发扩/缩容（目标跟踪/简单扩展/步进扩展）	应对题目中“高峰CPU超95%”的实时负载变化
预测性扩展策略	基于历史负载数据预测未来高峰，提前启动实例	仅适用于负载规律可预测的场景（题目未提及负载有规律）
热池（Warm Pool）	ASG的备用实例池，预先启动/停止的EC2实例，扩缩容时直接激活，无需从零启动	解决题目中“实例启动需几分钟（用户数据装包）”的核心痛点，减少新实例延迟
生命周期挂钩（Lifecycle Hooks）	在ASG实例生命周期（启动/终止）的特定阶段暂停实例，执行自定义操作（如运行脚本、配置检查）	确保用户数据脚本（装包）完成后，实例才加入可用池，避免未就绪实例提供服务
实例预热时间	新实例启动后，被ASG计入容量的等待时间；设为0秒会导致刚启动的实例立即被计入，易引发过度扩缩容，且无法解决启动慢问题	题目中设0秒无意义，无法降低应用延迟
实例维护策略	用于ASG实例更新/替换（如替换旧实例、更新启动模板）的维护窗口/策略	与“运行用户数据脚本”无关，用户数据是实例启动时的操作
用户数据脚本（User Data）	EC2启动时运行的脚本，用于安装包/配置实例	题目中实例启动慢的直接原因（装自定义包需几分钟）


1. AWS Schema Conversion Tool (AWS SCT)
	• 定位：数据库架构转换专用工具，解决异构数据库（如Oracle→RDS for PostgreSQL、SQL Server→RDS for MySQL）之间的架构不兼容问题。
	• 核心能力：
		○ 分析源数据库的自定义模式、存储过程、触发器等对象的兼容性；
		○ 自动将源架构转换为目标数据库兼容的格式（自动转换率80-90%，剩余手动调整）；
		○ 生成迁移评估报告，标注需手动修改的对象。
	• 适配场景：本题中“自定义模式和存储过程”是核心痛点，SCT是解决该问题的关键。
2. AWS Database Migration Service (AWS DMS)
	• 定位：全托管数据库迁移服务，专注结构化数据迁移（全量+增量），支持同构/异构数据库迁移。
	• 核心组件：
		○ 复制实例：DMS中转节点，负责读取源数据、轻量转换、写入目标；
		○ 源端点：连接本地源数据库（SQL Server/MySQL/Oracle）；
		○ 目标端点：连接Amazon RDS；
		○ 迁移任务：定义迁移类型（全量/增量/全量+增量）、表映射等。
	• 适配场景：架构转换后，将源数据迁移到RDS的核心工具。
3. 迁移评估快速洞察
	• 定位：宏观数据库资产盘点工具（如数据库数量、版本、资源占用），无深度架构/存储过程分析能力。
4. AWS Application Migration Service (MGN)
	• 定位：服务器整机迁移工具（物理机/虚拟机→EC2），与数据库架构分析无关。
5. AWS DataSync
	• 定位：文件/对象存储（NFS/S3）迁移工具，不支持关系型数据库的结构化数据迁移。


1. 混合云连接类
	• 站点到站点VPN（Site-to-Site VPN）：IPsec加密的私有连接，打通本地数据中心与AWS VPC，实现私有网络通信，无需公网暴露资源，是混合云场景的基础。
	• AWS Snowball Edge（存储优化型）：AWS物理迁移设备，专为TB级海量数据离线迁移设计，单台最高支持80TB存储，适合跨广域网带宽有限时的大规模数据迁移。
	• AWS Snowcone：小型便携迁移设备（单台最高8TB），适合边缘计算或GB级/小型TB级数据迁移，不适合海量数据。
2. 存储类
	• NAS（本地网络附加存储）：文件级共享存储，多客户端可挂载访问，需AWS等效服务替代。
	• Amazon EFS（弹性文件系统）：托管的NFS文件系统，跨AZ部署，多EC2实例可同时挂载，支持通过VPN从本地挂载，完美替代本地NAS。
	• Amazon EBS（弹性块存储）：块存储，多附加卷仅支持同一AZ内的EC2实例，无文件级共享能力，不适合多AZ文件共享场景。
	• Amazon S3：对象存储，高耐用性，适合归档数据存储，支持多种归档存储类（如Glacier）。
3. 计算与负载均衡类
	• Amazon EC2（多AZ部署）：弹性虚拟服务器，跨可用区部署提升高可用性。
	• Application Load Balancer (ALB)：应用层负载均衡器，分发HTTP/HTTPS流量到多AZ EC2实例，提升服务可用性。
4. 无服务器/调度类
	• Amazon EventBridge + Lambda：定时/事件触发的无服务器执行框架，但定时同步无法满足高频内容更新需求。






概念	核心作用	关联题目需求
AWS Elastic Beanstalk (EB)	托管式应用部署服务，支持Tomcat等Web容器，自动处理EC2、负载均衡、自动扩缩容、监控，无需手动管理底层基础设施	适配“无源码仅部署JAR”+“最小运营开销”核心需求
Amazon RDS for PostgreSQL	托管式PostgreSQL数据库服务，自动处理备份、高可用、多AZ部署、补丁更新，无需手动管理数据库服务器	替代自建PostgreSQL，降低运营开销
Auto Scaling Group (ASG)	根据流量/资源使用率自动增减EC2实例，适配流量波动（如月底峰值）	满足“月底流量增长”的弹性需求
Application Load Balancer (ALB)	七层（HTTP/HTTPS）负载均衡器，专为Web应用设计，支持路径路由、健康检查、多AZ部署	分发Web流量到EB实例，提升可用性
Amazon CloudFront	CDN服务，缓存静态资源（CSS/JS/图片），降低源站压力，提升用户访问速度	辅助流量扩展，减少EB实例负载
Multi-AZ部署	在多个可用区部署资源，避免单AZ故障，提升高可用性	核心高可用要求，所有关键组件需支持
Amazon EKS	托管式K8s集群，用于容器编排	运营开销高（需管理K8s集群），不符合“最小运营开销”
AWS Lambda	无服务器计算，适合短运行时/事件驱动场景	Tomcat是长运行时Web服务，且重构应用违反“无源码”前提
Amazon EFS	弹性共享文件存储	不适合数据库（PostgreSQL需块存储EBS），性能/一致性不足
Step Functions	工作流编排服务	非自动扩缩容工具，无法响应流量增长


概念	核心特性	成本/适用场景
Amazon EC2 + 自动扩展组（ASG）	EC2是云服务器，ASG自动维护指定数量的EC2实例（扩缩容、故障替换）；实例启动时可通过用户数据执行脚本	按实例规格/运行时间付费；适合弹性业务负载
Amazon S3（标准存储）	对象存储，高可用、高耐久，成本极低（~$0.023/GB/月）；支持直接访问最新对象，无本地缓存	适合存储文件、静态资源，频繁读取/更新的文件存储首选
Mountpoint for Amazon S3	AWS开源免费工具，可将S3桶挂载为EC2本地文件系统；直接访问S3最新对象，无本地缓存；仅依赖S3权限，无额外成本	替代“下载S3文件到EC2本地”的场景，解决本地文件过期问题
AWS Lambda	无服务器计算，事件驱动，按调用次数/执行时间付费（毫秒级计费）；无需管理服务器	适合轻量、短时长的自动化任务（如文件解析、触发通知）
Amazon DynamoDB	无服务器NoSQL数据库，低延迟、可扩展；按读写容量/按需付费（成本高于S3）	适合高频读写的结构化数据，不适合“文件级”访问
Amazon EFS	托管NFS文件系统，可多EC2挂载；成本高（~$0.30/GB/月，是S3的10倍+），按存储/IOPS付费	适合多实例共享文件且需POSIX文件系统语义的场景
Amazon EBS + Multi-Attach	块存储，Multi-Attach仅支持io1/io2类型卷，且仅限同一可用区的EC2挂载；按卷容量/IOPS付费	适合单实例持久化存储，跨AZ场景不可用，多实例共享易出数据一致性问题

概念/服务	核心作用
AWS CloudFormation	基础设施即代码（IaC）服务，通过模板定义、部署、管理一组AWS资源（如EC2、ASG），以“堆栈（Stack）”为单位管理资源生命周期。
自动扩展组（ASG）	自动管理EC2实例数量，根据负载扩缩容，保障应用可用性，是本题中应用环境的核心组件。
IAM角色（IAM Role）	无长期凭证的身份实体，用于为AWS服务/用户授予临时权限，本题中经理的角色拥有CloudFormation、EC2、ASG的API权限。
AWS Service Catalog	企业级“服务管控中台”：集中管理经批准的IT服务（如CloudFormation模板），向用户授予“仅启动预定义服务”的最小权限，底层资源操作由预设角色完成，避免用户直接拥有广泛权限。
启动约束（Launch Constraint）	Service Catalog的核心配置：指定启动产品时使用的IAM角色（底层资源部署由该角色执行），用户仅需Service Catalog操作权限，无需直接访问底层资源（EC2/ASG/CloudFormation）。
最小权限原则（Least Privilege）	AWS安全核心原则：仅授予用户完成工作所需的最小权限，本题核心需求就是“允许测试人员启动环境，但不授予EC2/ASG/CloudFormation的广泛权限”。
Amazon S3	对象存储服务，用于存储CloudFormation模板（Service Catalog/CloudFormation需从S3读取模板）。
AWS Elastic Beanstalk	PaaS服务，简化应用部署（底层封装EC2/ASG），但核心定位是“应用托管”，而非“受控分发预定义环境模板”。



概念/服务	核心作用
IAM身份中心（原SSO）	集中管理AWS账户的用户、组、权限集，实现单点登录和统一权限管控
权限集（Permission Set）	IAM身份中心的核心组件，本质是IAM策略集合，用于绑定用户/组到AWS账户的角色
主体标签（Principal Tag）	IAM用户/角色的自定义标签，策略中可通过${aws:PrincipalTag/标签名}动态引用
S3前缀（Prefix）	类似S3桶内的“文件夹”，用于按用户/业务划分对象存储路径（如s3://bucket/user1/*）
CloudTrail数据事件	记录S3对象级操作（如GetObject/PutObject，即“访问文档”），包含操作人、对象路径等
CloudTrail管理事件	记录S3桶级管理操作（如创建桶、修改桶策略），不包含对象访问记录
Athena	无服务器交互式查询服务，可直接查询S3中的日志文件（如CloudTrail日志）
S3访问日志	记录S3桶的访问请求，但目标仅支持另一个S3桶，不支持EMRFS


服务/概念	核心作用	与题目关联度
AWS Storage Gateway	混合云存储服务，连接本地与AWS云存储，分3类：	题目要求“从文件系统直接移动视频”，仅文件网关符合
	✅ 文件网关（File Gateway）：NFS/SMB文件接口，同步到S3
	❌ 磁带网关（Tape Gateway）：模拟磁带库，仅用于归档
	❌ 卷网关：块存储接口
Amazon Rekognition	托管ML服务，检测视频/图片中的物体、场景、人脸，支持“人脸集合”（匹配预定义人脸）	核心满足“元数据提取（人脸/物体/场景）”需求
AWS Lambda	无服务器计算，按需运行代码，无需管理服务器	满足“最少持续管理开销”，自动化触发元数据提取
AWS Direct Connect	本地与AWS的高速专用网络连接	保证30TB视频高速迁移，不干扰现有网络
Amazon S3	托管对象存储，持久/可扩展，是文件网关的后端存储	存储迁移后的视频，Rekognition可直接访问
Amazon Kinesis Video Streams	实时视频流传输服务	题目是“批量迁移已存储视频”，非实时流，不适用
EC2 + EBS	虚拟机+块存储，需手动管理实例/存储	违反“最少管理开销”，不适用


类型	核心特点	覆盖范围	折扣水平
EC2实例储蓄计划（EC2 Instance Savings Plans）	绑定实例族（如m5）+ 区域	同一实例族下所有规格的EC2实例（如m5.large/m5.xlarge）	更高（比计算储蓄计划高5%-10%）
计算储蓄计划（Compute Savings Plans）	无绑定限制（跨实例族、跨区域、跨服务）	EC2（所有实例族）、Lambda、Fargate（无服务器工作负载）	略低（但覆盖范围最广）



1. Amazon S3 多区域访问点（MRAP）
	• 定义：S3的托管式全球入口服务，将跨多个AWS区域的S3桶聚合为一个单一的全球DNS端点。
	• 核心能力：
		○ 智能路由：自动将客户端请求路由到地理最近的可用区域S3桶，最小化访问延迟；
		○ 高可靠：区域故障时自动故障转移到其他区域桶；
		○ 低运维：全托管，无需管理服务器/路由规则，运营开销极低。
2. S3 跨区域复制（CRR）
	• 定义：自动将源S3桶的对象复制到不同区域目标桶的托管服务（支持异步/同步）。
	• 核心能力：
		○ 内容一致性：确保多区域S3桶有相同静态内容；
		○ 灾备+低延迟：让数据靠近不同地理区域的客户，区域故障时数据不丢失；
		○ 零运维：配置后全自动运行，无额外管理成本。
3. AWS Lambda
	• 无服务器计算服务，按需运行代码，但本题中用Lambda跟踪路由属于“重复造轮子”——MRAP内置路由能力，自定义Lambda会增加运维开销（开发、监控、故障排查）。
4. AWS 站点到站点VPN
	• 基于公共互联网的加密隧道（IPsec），连接本地数据中心与AWS VPC，无法满足“不通过公共互联网”的要求，且公网波动会增加延迟。
5. AWS PrivateLink + Direct Connect
	• PrivateLink：让VPC内资源私有访问AWS服务（如S3），流量仅走AWS私有骨干网，不暴露公网IP；
	• Direct Connect：本地数据中心与AWS的专用物理光纤连接，绕过公网，提供低延迟、高带宽的私有连接；
	• 组合价值：本地数据访问S3完全脱离公网，但配置/运维成本高于MRAP+CRR。
6. S3 文件网关
	• 桥接本地文件接口（NFS/SMB）与S3的托管服务，让本地应用无需改造即可上传数据到S3。


1. 核心迁移服务
服务名称	核心用途	关键特性
AWS应用迁移服务（AMS，原MGN）	物理/虚拟/云服务器迁移到AWS	无代理迁移（无需修改源VM）、低停机时间、支持大规模VM迁移
VM Import/Export（VMIE）	导入/导出VM映像（本地↔AWS）	适合少量VM，需手动创建映像，大规模迁移效率低
应用发现服务（ADS）	发现本地基础设施（VM/应用依赖）	仅“发现”，不执行迁移，是迁移前准备工具
迁移中心（Migration Hub）	集中管理迁移项目进度	仅可视化，无实际迁移操作
2. 文件存储服务（Windows场景）
服务名称	协议支持	适用场景	兼容性（Windows文件共享）
FSx for Windows File Server	SMB 3.0/2.0	Windows工作负载专属	完全兼容（NTFS权限、AD集成）
Amazon EFS	NFS	Linux/UNIX工作负载	不兼容Windows SMB协议
3. 网络/离线迁移工具
工具名称	适用场景	带宽要求	迁移效率（本题场景）
Direct Connect	专用网络连接（本地↔AWS）	高带宽（本题10GB）	最优（无需运输，直接网络迁移）
Snowcone	离线数据迁移/边缘计算	低带宽/无网络	低效（需运输设备，增加耗时）


1. AWS Organizations
AWS多账户管理的核心服务，支持集中管理多个AWS账户，可实现：
	• 整合账户形成组织，划分OU（组织单元）进行权限管控；
	• 配置服务控制策略（SCP）限制账户权限；
	• 委派管理员（Delegated Administrator）：将某个成员账户指定为特定服务（如CloudTrail、Config）的管理员，代替管理账户执行跨账户管理操作，简化多账户服务运维。
2. AWS CloudTrail
记录AWS账户所有API调用和资源活动的审计服务，核心形态分为两种：
	• 传统CloudTrail Trail：将事件日志存储到S3/CloudWatch Logs，支持跨账户但需逐个配置，查询能力弱；
	• CloudTrail Lake：托管的日志数据湖，专为CloudTrail事件设计，支持标准SQL查询，可集中收集组织内所有账户的事件，是企业级集中审计的最佳实践。
3. 关键概念补充
	• 管理事件（Management Events）：CloudTrail的核心事件类型，记录对AWS资源的管理操作（如创建EC2、修改IAM策略），题目明确要求收集此类事件；
	• 委派管理员账户：代替Organizations管理账户，负责CloudTrail Lake的创建和组织级配置，避免管理账户权限过度集中；
	• CloudWatch Logs Insights：CloudWatch日志的查询工具，使用类SQL的自定义语法（非标准SQL），且跨账户配置复杂，无法满足“标准SQL+中央存储”需求。


概念	核心说明
Amazon API Gateway HTTP API	轻量级、高性能的无服务器API网关，专为HTTP(S)请求设计，支持Lambda集成、自定义授权器，成本更低、延迟更低，适合Web应用的API层。
AWS Lambda	无服务器计算服务，无需管理服务器即可运行代码，API Gateway可直接触发Lambda；Lambda授权器（自定义授权器）是API Gateway的核心授权机制之一。
Lambda授权器（Lambda Authorizer）	API Gateway的授权组件，分TOKEN（验证Bearer令牌）和REQUEST（验证请求参数）类型，支持自定义逻辑验证第三方令牌（如OAuth/JWT），是处理非AWS原生身份的核心方式。
OAuth令牌	第三方身份提供者（IdP）发放的身份凭证（常见为JWT格式），用于验证用户身份，区别于AWS IAM凭证。
AWS Directory Service	托管式目录服务（如AD），用于AWS资源的目录级身份管理，并非API Gateway的授权器类型。
AWS IAM Identity Center（原SSO）	集中管理AWS账户/应用访问的服务，支持SAML/OIDC集成，但API Gateway无“零配置”使用其验证OAuth令牌的能力，且STS令牌（AWS临时凭证）与OAuth令牌场景无关。
IAM用户	AWS账户的长期身份凭证，用于访问AWS资源，不适合Web应用的用户层授权（Web用户≠IAM用户）。



概念/服务	核心作用
Amazon EBS	为EC2实例提供持久化块存储，支持静态加密（依赖KMS密钥），题目核心管控对象。
Amazon EC2	弹性计算实例，EBS卷需附加到EC2才能使用。
AWS Config	持续监控、评估AWS资源配置的合规性服务：
	1. 内置/自定义“管理规则”检测资源配置（如未加密EBS卷）；
	2. 支持“自动修复”，触发自动化操作修正不合规配置。
AWS Systems Manager (SSM)	自动化管理AWS资源的服务：
	1. Automation Runbook（自动化运行簿）：预定义/自定义的自动化脚本，可执行创建EBS卷、迁移数据等操作；
	2. Fleet Manager：可视化管理EC2实例库存（非自动化检测/修复的核心工具）。
AWS账户级EBS加密设置	账户级别配置“EBS卷默认加密”，强制所有新创建的EBS卷自动加密（从源头防止未加密卷），无需额外策略。
AWS KMS	管理加密密钥（AWS托管/客户托管），EBS加密依赖KMS密钥，但密钥策略无法限制未加密EBS卷的创建（密钥策略仅控制对KMS密钥的访问）。
SCP（服务控制策略）	AWS Organizations中的权限策略，可限制账户操作，但依赖Organizations（题目未提及），且非最优解。


概念	核心说明
Amazon ECS	AWS托管的容器编排服务，支持EC2模式（需管理EC2实例）和Fargate模式（无服务器，无需管理底层实例），本题中是Fargate模式运行容器任务
AWS Fargate	无服务器容器运行时，为ECS/EKS提供按需容器执行能力，按任务的CPU/内存使用量计费，有账户级别的“最大任务数”服务配额
Service Quotas（服务配额）	AWS对每个账户的资源使用上限（如ECS Fargate最大并发任务数），可通过AWS Console/CLI/API查看，CloudWatch支持直接引用配额值做监控
CloudWatch Metrics	AWS的监控数据存储，按“命名空间”分类（如AWS/ECS是ECS任务监控，AWS/Usage是服务使用量/配额监控），是时间序列数据
CloudWatch Alarms	基于Metrics设置阈值规则，触发后可执行通知、触发Lambda等动作
AWS/Usage 指标命名空间	专门用于跟踪AWS服务使用量和配额的Metrics命名空间，是监控配额使用率的核心入口
Amazon SNS	托管的通知服务，支持多渠道（邮箱、短信、Lambda、SQS等）订阅，是CloudWatch Alarms的原生通知集成方案
AWS Lambda	无服务器函数，按需运行代码，但本题中无需轮询（CloudWatch原生支持配额监控）
AWS Config	配置合规性监控服务，聚焦“资源配置是否符合规则”，而非“资源使用量/配额实时监控”
Amazon SES	邮件发送服务，适合批量/营销邮件，而非监控警报的实时通知（SNS更适配）


概念	核心作用	与题目关联
Amazon EC2	弹性计算服务，提供可扩展的虚拟服务器	监控/停止的核心对象，通过标签（部门/业务单元/环境）分类
Amazon CloudWatch	AWS原生监控服务，收集资源指标（CPU、网络I/O）、日志、告警	核心数据源：收集EC2的CPU利用率、网络I/O指标，支持按标签筛选，可配置仪表板可视化
Amazon EventBridge	事件驱动服务（原CloudWatch Events），触发自动化操作	定时触发Lambda函数，实现“检测+停止”的自动化
AWS Lambda	无服务器计算服务，运行代码无需管理服务器	核心逻辑层：查询CloudWatch指标、判断低利用率条件、调用EC2 API停止实例
AWS Systems Manager (SSM)	实例运维管理（补丁、配置、远程操作）	非核心监控工具，题目中用SSM监控利用率属于冗余操作
AWS Trusted Advisor	提供AWS最佳实践建议（成本/性能/安全）	低利用率EC2检测阈值固定（如CPU<10%持续7天），无法自定义题目中的“14天至少4天+网络I/O≤5MB”条件
Amazon DynamoDB	无服务器NoSQL数据库	选项D中用于存储指标，但CloudWatch可直接查询指标，冗余且增加开销
Amazon QuickSight	BI可视化工具	仅能可视化数据，无法自动停止实例，需人工干预，运营开销高
EC2标签	键值对分类资源（部门/业务单元/环境=开发）	筛选“开发环境”实例的核心依据
IAM角色/策略	权限管理，控制Lambda访问CloudWatch/EC2	确保Lambda有读取指标、停止实例的权限

1. EC2 实例类型
	• 按需实例（On-Demand）：无长期使用承诺，按秒计费，灵活性最高但单价最高，适合短期、不可预测的负载。
	• 预留实例（RI）：承诺1年/3年使用周期，可预付部分/全部费用，单价比按需低30%-70%，适合稳定的基线负载（长期运行且容量固定的部分）。
	• Spot 实例：利用AWS闲置计算容量，单价仅为按需的10%-20%，但AWS可在2分钟内中断实例（因容量回收），适合容错、无状态、可中断的负载（如批处理），不适合高峰需稳定响应的场景。
2. 自动扩展组（ASG）
	• 核心功能：自动维护指定数量的EC2实例（最小/最大/期望容量），并基于云监控指标（如CPU利用率）自动扩缩容，跨可用区部署保证高可用。
	• 适配场景：负载波动（如高峰/低谷）的无状态应用，可匹配负载变化动态调整实例数，既保证性能又节省成本。
3. Spot Fleet
	• 一组Spot实例（可混合按需），支持两种请求类型：
		○ request：一次性请求指定容量的实例，不维持容量（实例中断后不替换）；
		○ maintain：维持指定目标容量，实例中断后自动替换。
	• 局限性：Spot实例的中断风险不适合高峰需稳定响应的场景，且固定目标容量无法应对负载波动。
4. 负载均衡器
	• 网络负载均衡器（NLB）：第4层（TCP/UDP）负载均衡，毫秒级延迟、超高吞吐量，支持静态IP，适合无状态TCP/UDP应用，本题中应用无状态且长期运行，NLB是最优选择。
	• 应用程序负载均衡器（ALB）：第7层（HTTP/HTTPS），支持基于路径/主机的路由，但本题无此类需求，替换NLB无意义且增加复杂度。


1. AWS IoT Core
	• 物联网核心服务，支持设备通过MQTT/HTTP协议连接云端，核心能力包括设备通信、规则引擎、设备管理。
	• Basic Ingest：IoT Core的优化传输模式，直接将设备数据路由到IoT规则引擎，跳过MQTT主题的完整消息路由层级，成本比普通IoT主题低50%左右，且延迟更低。
2. Kinesis Data Firehose
	• 完全托管的流式数据传输服务，专为“批量加载流式数据到S3/Redshift等存储”设计，支持：
		○ 自动缓冲（按时间/大小）：批量处理高频小数据，减少下游服务调用次数；
		○ 原生Lambda集成：触发Lambda对数据进行转换/丰富；
		○ 零运维：无需管理消费者、分片等，适合低成本批量处理场景。
3. Kinesis Data Streams (KDS)
	• 实时流式数据存储服务，需手动管理消费者（Lambda/EC2）、分片等，灵活性高但成本和运维复杂度高于Firehose。
4. AWS Lambda
	• 无服务器计算服务，按调用次数/运行时间计费，适合短时长的数据处理（如数据丰富），但高频单次调用成本极高。
5. Amazon Timestream
	• 时间序列数据库，专为传感器数据设计，但仅作为中转层时会增加冗余成本和步骤。
6. IoT Rule Engine
	• IoT Core的规则引擎，支持SQL过滤/转换设备消息，并路由到Firehose/Lambda/S3等服务。


1. VPC网关端点（Gateway VPC Endpoint）
	• 专用于S3/DynamoDB的免费 VPC端点类型，属于“网关”类（区别于接口端点）。
	• 核心作用：让VPC内资源（如EC2）无需通过公网（Internet Gateway/NAT Gateway），直接通过AWS私有网络访问S3，避免公网暴露；且网关端点绑定VPC，仅该VPC内资源可使用。
	• 配置要点：需关联VPC路由表，路由表中添加“S3前缀列表 → 网关端点”的路由条目。
2. S3访问点（S3 Access Points）
	• 为S3存储桶提供精细化、场景化的访问入口，每个访问点可独立配置：
		○ 网络控制：限制仅指定VPC/IP段访问；
		○ 权限策略：独立于存储桶策略的访问规则；
		○ 所有者隔离：按团队/场景分配专属访问点。
	• 核心价值：替代直接访问存储桶，实现“授权网络+精细化权限”双层管控。
3. IAM角色与策略条件
	• IAM角色：为EC2赋予访问AWS服务的权限（无需Access Key），题目中EC2已绑定该角色且有S3访问权限。
	• 策略条件（Condition）：通过条件键（如s3:DataAccessPointArn）限制操作触发条件（如“仅通过指定访问点访问时允许GetObject”）。
4. S3存储桶策略
	• 基于资源的策略，直接绑定存储桶，管控所有访问请求；可结合aws:SourceVpc（限制VPC）、s3:DataAccessPointArn（限制访问点）等条件键实现网络/访问方式管控。
5. VPC路由表
	• 控制VPC内流量转发路径，公共子网路由表默认包含“0.0.0.0/0 → Internet Gateway”（公网流量），需额外添加“S3前缀 → 网关端点”（S3私有流量）。


1. 总拥有成本（TCO, Total Cost of Ownership）
TCO是评估IT资产全生命周期的总成本，包含直接成本（硬件、软件许可、云资源费用等）和间接成本（运维人力、电力、机房、硬件折旧、故障维护等）。AWS迁移场景下的TCO估算，核心是对比“本地环境TCO”和“迁移到AWS后的TCO”，而非仅计算AWS资源的直接费用。
2. Amazon Elastic Kubernetes Service (Amazon EKS)
AWS托管的Kubernetes服务，AWS负责控制平面（API Server、etcd等）的运维、高可用、安全补丁，用户只需管理节点和容器工作负载。
	• EKS托管节点组：AWS完全管理的EC2节点组，自动处理节点的配置、更新、修复、替换，静态节点数表示节点数量固定（无自动扩缩容），是题目中指定的部署方式。
3. Amazon RDS for PostgreSQL
AWS托管的PostgreSQL数据库服务，AWS负责底层硬件、操作系统、数据库引擎的补丁、备份、高可用、故障恢复等，用户只需关注数据库的业务逻辑和性能调优，替代本地自管理的PostgreSQL。
4. AWS Migration Evaluator（迁移评估工具，原TCO Calculator for Migration）
AWS专门用于迁移前TCO估算的工具，核心能力：
	• 收集本地环境数据（服务器、容器、数据库、存储、网络等）；
	• 配置迁移目标场景（如EKS、RDS、EC2等）；
	• 生成TCO对比报告（本地vs AWS），包含快速洞察报告，覆盖3-5年的成本分析。
5. 其他相关概念
	• AWS DMS（Database Migration Service）：专注于数据库迁移（同构/异构），支持数据同步，无TCO评估能力；
	• AWS Application Migration Service（MGN）：专注于服务器（物理机/虚拟机）迁移到AWS EC2，无TCO评估功能；
	• AWS定价计算器：仅估算AWS资源的直接费用，无法覆盖本地TCO和全生命周期成本；
	• AWS云经济学中心：提供云经济学理论框架，非实操性TCO评估工具；
	• CUR（成本和使用报告）：已上云后的数据报告，用于成本监控，非迁移前估算。


概念	核心说明
Amazon ECS	弹性容器服务，用于管理容器化应用，支持EC2模式（依赖EC2实例）和Fargate模式；本题为EC2模式，EC2实例由自动扩展组管理。
EC2 Auto Scaling Group (ASG)	管理EC2实例数量，根据扩展策略自动扩缩容，保障应用容量；支持预测性扩展、预定扩展等策略。
预测性扩展策略	基于历史流量数据预测未来容量需求，提前扩容，避免性能瓶颈。
预定扩展策略	基于已知的时间（如活动时间）提前调整ASG期望容量，适合可预测的流量高峰。
NAT网关	VPC私有子网内的实例访问公网（如S3公网端点）的出口，按小时+数据处理量收费。
S3网关VPC端点	VPC内免费的S3访问端点，实例访问同区域S3时流量走亚马逊内网，无需经过NAT网关，降低成本且提升性能。
ECS容量提供者	将ECS集群与ASG关联，定义实例类型（按需/Spot），通过权重控制不同类型实例的使用比例。
EC2 Spot实例	竞价实例，价格仅为按需实例的10%-30%，但可能被AWS回收（中断），适合无状态、容错性高的工作负载。
按需容量预留	预留特定实例类型的按需容量，保障指定时间有实例可用，但价格与按需实例一致，无成本优化效果。
S3传输加速	利用CloudFront边缘节点加速跨区域/公网的S3传输，同区域使用会增加成本，无优化价值。