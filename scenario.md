
---

### AWS SAP 核心场景与服务组合矩阵

#### 1. 多账户治理与权限管理 (Multi-Account Strategy & Governance)
*这是 SAP 考试中最基础也最重要的模块，通常涉及 Landing Zone 的概念。*

| 核心服务 | 在此场景中的角色与考点 |
| :--- | :--- |
| **AWS Organizations** | **核心骨架**。用于合并计费、OU (组织单元) 分组。关键考点是 **SCP (服务控制策略)**，它是“拒绝名单”，限制成员账户的最大权限边界（即 Root 用户也受限）。 |
| **AWS Control Tower** | **自动化治理**。基于 Organizations 的“一键式”最佳实践环境搭建。考点：**Guardrails (护栏)**，分为预防性（基于 SCP）和侦探性（基于 Config）。 |
| **AWS RAM (Resource Access Manager)** | **资源共享**。避免资源重复创建。常用于共享 **Transit Gateway (TGW)**、子网 (Subnet)、Route 53 Resolver 规则。 |
| **AWS CloudFormation StackSets** | **跨账户部署**。考点：在管理账户定义 StackSet，自动在所有成员账户/Region 部署基线资源（如 IAM 角色、Config 规则）。 |
| **AWS Service Catalog** | **合规分发**。允许开发人员启动资源，但不给他们底层权限。考点：**启动约束 (Launch Constraint)**，利用预设的 IAM 角色代为执行部署。 |
| **IAM Identity Center (SSO)** | **身份入口**。集中管理访问，支持与 AD / Azure AD 集成。考点：权限集 (Permission Sets) 与 IAM 角色的映射。 |
| **Cost Explorer / Budgets** | **成本管控**。考点：管理账户查看合并账单；**Cost Anomaly Detection (成本异常检测)** 比单纯的静态阈值报警更智能。 |

#### 2. 混合云网络与连接 (Hybrid Connectivity)
*SAP 考试最难的模块之一，涉及本地 DC 与 AWS 的复杂互联。*

| 核心服务 | 在此场景中的角色与考点 |
| :--- | :--- |
| **Direct Connect (DX)** | **专用物理线**。考点：**DX Gateway** (连接多 Region 的 VPC) vs **Transit VIF** (连接 TGW)。MACsec 提供物理层加密。 |
| **Transit Gateway (TGW)** | **云上路由器**。解决 VPC 对等连接 (Peering) 的“网状复杂度”问题。考点：TGW + DX Gateway 实现全球网络互通；跨账户共享 TGW。 |
| **Site-to-Site VPN** | **备份与加密**。考点：作为 DX 的备份链路；DX + VPN 实现传输加密（IPSec 跑在 DX 上）。 |
| **Route 53 Resolver** | **混合 DNS 解析**。考点：**Outbound Endpoint** (AWS 访问本地 AD 域名) 和 **Inbound Endpoint** (本地访问 AWS 私有域名)。 |
| **VPC Peering** | **点对点连接**。考点：**不支持传递路由** (A-B, B-C, A不能通C)；**不支持 CIDR 重叠**。如果题目强调低延迟且无中转需求，选 Peering 而非 TGW。 |
| **AWS PrivateLink** | **私有服务暴露**。考点：CIDR 重叠时的救命稻草；单向访问（消费者 -> 提供者）；配合 NLB 使用。 |

#### 3. 迁移与现代化 (Migration & Modernization)
*区分“评估阶段”和“实施阶段”，以及不同工作负载（DB、VM、File）的工具选择。*

| 核心服务 | 在此场景中的角色与考点 |
| :--- | :--- |
| **Migration Evaluator (TCO)** | **评估阶段**。无代理收集，生成 TCO (总拥有成本) 报告，用于商业论证。 |
| **Application Discovery Service (ADS)** | **发现阶段**。考点：**Agentless** (仅 VMware，数据少) vs **Agent-based** (物理机/所有VM，收集进程依赖关系、精确性能)。 |
| **AWS MGN (App Migration Service)** | **服务器迁移**。Lift-and-shift (直接迁移) 的首选。块级复制，停机时间短。 |
| **AWS DMS + SCT** | **数据库迁移**。考点：**SCT** 做异构转换 (Oracle -> Aurora)；**DMS** 做数据搬运，利用 **CDC** 实现零停机。 |
| **DataSync** | **在线数据传输**。考点：NFS/SMB 数据迁移到 S3/EFS/FSx。比手动脚本快，带校验。 |
| **Storage Gateway** | **混合存储/缓存**。考点：**File Gateway** (本地 SMB 访问 S3)；**Volume Gateway** (iSCSI 块存储缓存)；**Tape Gateway** (磁带备份)。 |
| **Snow Family** | **离线海量迁移**。考点：带宽不足时使用。Snowball Edge (TB/PB级)，Snowcone (小规模/边缘计算)。 |

#### 4. 高可用与灾难恢复 (HA & DR)
*关键在于 RPO (丢数据量) 和 RTO (恢复时间) 的权衡。*

| 核心服务 | 在此场景中的角色与考点 |
| :--- | :--- |
| **Route 53** | **流量切换**。考点：**Failover Routing** (主备切换)；**Health Checks** (健康检查)。 |
| **Aurora Global Database** | **数据库 DR**。考点：跨 Region 复制延迟 < 1秒；**RPO 极低**；故障转移极快。 |
| **DynamoDB Global Tables** | **多活数据库**。考点：多 Region 同时读写 (Active-Active)；基于流 (Streams) 同步。 |
| **S3 CRR / MRAP** | **存储 DR**。考点：**CRR** (跨区域复制) 满足合规/灾备；**MRAP** (多区域接入点) 提供全球统一接入点和自动故障转移。 |
| **Elastic Disaster Recovery (DRS)** | **服务器 DR**。考点：低成本 DR 方案，平时只存数据，灾难时启动计算实例 (Pilot Light 模式)。 |
| **AWS Backup** | **集中备份**。考点：跨账户、跨区域复制备份；**Vault Lock** (防篡改/WORM 合规)。 |

#### 5. 安全与合规 (Security & Compliance)
*主要涉及密钥管理、边缘防护和审计。*

| 核心服务 | 在此场景中的角色与考点 |
| :--- | :--- |
| **KMS** | **加密核心**。考点：**Multi-Region Keys** (多区域密钥) 方便全局表/DR 场景下不需要重加密。**Envelope Encryption** (信封加密) 原理。 |
| **Secrets Manager** | **凭证管理**。考点：**自动轮换** (Rotation) RDS 密码；跨账户访问需 KMS 权限 + Resource Policy。 |
| **WAF & Shield Advanced** | **边缘防护**。考点：**WAF** 防护应用层 (SQL注入/XSS)；**Shield Advanced** 防护 DDoS 并免除扩容费用。 |
| **Firewall Manager** | **集中管控**。在 Organizations 层面强制推行 WAF 规则或安全组规则。 |
| **GuardDuty / Inspector** | **检测与扫描**。**GuardDuty** (智能威胁检测，看日志)；**Inspector** (漏洞扫描，看 EC2 内部/镜像)。 |

#### 6. 计算与无服务器架构 (Compute & Serverless)
*关注解耦、高并发处理和冷启动问题。*

| 核心服务 | 在此场景中的角色与考点 |
| :--- | :--- |
| **ASG (Auto Scaling Group)** | **弹性伸缩**。考点：**Lifecycle Hooks** (实例启动/终止前执行脚本)；**Warm Pools** (预热实例减少启动延迟)。 |
| **Lambda** | **胶水代码**。考点：**RDS Proxy** (解决数据库连接耗尽)；**Provisioned Concurrency** (解决冷启动)；结合 EventBridge 做自动化运维。 |
| **SQS + SNS** | **解耦**。考点：**SQS FIFO** (严格顺序)；**Standard** (高吞吐)；**DLQ** (死信队列处理失败消息)。 |
| **API Gateway** | **流量入口**。考点：**Private Endpoint** (仅 VPC 内访问)；**Usage Plans** (租户限流)；**Lambda Authorizer** (自定义鉴权)。 |
| **EKS / ECS** | **容器**。考点：**Fargate** (无服务器容器，减少运维)；**EKS 托管节点组**。 |

---