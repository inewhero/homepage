---
title: "光极成阵，循光见脑：用 CortexLume 重想 fNIRS 阵列设计"
description: "CortexLume 把功能靶点、二维阵列、三维头模、解剖覆盖与可复现输出接入同一套离线工作流，让 fNIRS 空间设计更快，也更容易说明依据。"
published: 2026-08-12
updated: 2026-08-25
tags: ["CortexLume", "fNIRS", "脑成像", "研究工具"]
---

[CortexLume](https://github.com/inewhero/CortexLume) 是一套开源、离线运行的 Windows 工作站，用于设计 fNIRS 光源与探测器阵列。它把功能靶点、二维阵列编辑和三维头模放在同一个项目里：研究者可以先查看感兴趣的皮层分布，再画出 source-detector 关系，把 patch 放到头表，检查实际间距和解剖覆盖，最后导出坐标与方法记录。原本散落在图谱网站、表格、头模软件和脚本之间的决定，因此有了连续的来路。

这条连续性比功能数量更重要。阵列在二维编辑器中建立后，仍可在三维放置阶段修改通道、移动单个 optode、旋转或复制 patch。五点标志与 10-10 位置提供熟悉的参照，头皮、灰质和白质则保留必要的解剖背景。每一次调整都会更新头表位置、皮层接触、源探距和图谱结果，研究者无需为了回答一个放置问题，先导出坐标再去另一套工具重建阵列。

新版进一步把设计的起点提前到了“想研究什么”。内置 Quick Target 收录 132 个离线功能靶点，涵盖八类常见的 fNIRS 研究主题。这些图来自固定版本的 Neurosynth 数据，由 NiMARE 完成关联检验和 FDR 校正，并映射到 Cedalion 的 25,000 顶点皮层表面。它们显示的是 meta-analysis association z 统计量，不是激活概率。已经在 Compose、NiMARE、SPM、FSL 或 NeuroVault 中得到统计图的研究者，也可以导入 `.nii` 或 `.nii.gz` 文件。软件会检查空间、仿射、单位、数据类型和有限值，再将结果放到同一功能图层中。

目标图不会替研究者画阵列。它提供一个可见的空间依据，layout 仍由人来决定。这个分工很合适：文献汇总适合指出值得关注的皮层范围，设备通道数、头发分布、实验任务和实际佩戴条件则需要研究者判断。

## CortexLume 处在工作流的哪里

fNIRS 的空间语言很大程度上继承自 EEG。10-20、10-10 和 10-05 系统提供标准化头皮位置，但 fNIRS 通道不是一个传感器点，而是由一对 source 和 detector 共同定义。光极之间的距离、阵列在曲面上的变形，以及通道下方的组织，都会影响设计是否可用。

现有工具分别处理了这个问题的不同部分。fOLD 从目标脑区出发，搜索可能覆盖该区域的标准位置，并以光子传播模拟估计敏感性；devfOLD 加入年龄特异性头模；AtlasViewer 可以读取已经确定的探头、数字化坐标、头模与敏感性分布；Array Designer 则自动搜索 source-detector 组合，优化目标区域上的敏感性。

CortexLume 关注这些步骤之间常被忽略的一段。研究者往往已经受到设备、通道数或现有 patch 形状的约束，需要反复判断这个阵列放到曲面头部后是否合理。此时，能够直接移动 patch、修改单个光极、检查间距并看到解剖解释，通常比为每次鼠标移动重新运行一次模拟更有用。设计收敛之后，少数候选仍可送往 AtlasViewer、Array Designer 或 Monte Carlo 流程做进一步验证。

## 坐标、模板与功能靶点

一个 MNI 坐标只有在指定图谱后才会得到解剖标签。结构、细胞构筑和连接组图谱采用不同的分区标准，同一点可能对应不同名称；位于边界附近时，概率图谱也可能返回多个候选。

模板与图谱同样需要区分。BigBrain、fsaverage、Colin27 和 MNI152 提供参考解剖或坐标空间，Harvard-Oxford、Jülich 和 Desikan-Killiany 则定义脑区。BigBrain 有很高的离体解剖分辨率，但来自单一供体，也没有适合常规光学设计的人群平均头皮和颅骨。fsaverage 适合皮层拓扑与表面分析，其平均脑沟脑回不等同于任一被试。Colin27 通过重复扫描同一个人降低成像噪声，却没有增加解剖样本量。

CortexLume 使用 `MNI152NLin6Asym`，即 TemplateFlow 分发的第六代非线性 MNI ICBM152 非对称模板。它不是某个人头部的精确替身，而是一个支持广泛、便于连接概率图谱的公共坐标框架。为一组被试设计可复用 layout 时，设计对象本来就不是某一个人的皮层。把单人的高精度解剖用于所有人的通用帽子，反而会把阵列绑定在一套偶然的脑沟、脑回和头部几何上。

如果研究已经采集个体 T1，而且问题要求个体定位，那么 subject-specific anatomy 更合适。一项使用 32 份个体 MRI 的验证研究报告，注册到 Colin27 后重建模拟激活的平均定位误差约为 18 mm，使用各自 MRI 时约为 9.1 mm。这说明个体解剖能改善个体定位，却不能推出每个群体 layout 都应围绕一颗具体的头来设计。

Harvard-Oxford 的概率值也有明确边界。FSL 图谱中，每个三维 volume 对应一个区域，体素值表示图谱样本中被归入该区域的比例。62% 因此是图谱内部的空间归属比例，不表示某条 fNIRS 通道有 62% 的概率测到该脑区，更不表示任务有 62% 的概率激活它。CortexLume 报告原始的前三个候选，不重新归一化，以免把边界处的不确定性抹掉。

Quick Target 在解剖坐标上增加了一层功能信息。内置图以固定的 Neurosynth 0.7 数据、NiMARE 0.20.0、TF-IDF 阈值和 MKDAChi2 参数构建，只保留独立 FDR 校正后为正的顶点。每张图都保留数据来源、参数与哈希。它适合在设计初期回答“哪些皮层位置值得优先查看”，但不能预言某一实验将产生多大的血氧反应。解剖图谱描述区域归属，功能 meta-analysis 则提供跨研究的关联线索。

## 为什么拖动阵列时不计算光子传播

近红外光在头部不会沿直线行进。细致的 sensitivity map 取决于光极位置、组织边界、scalp-to-cortex distance、光学参数与局部解剖。真实采集还会受到头发、皮肤色素、颅骨厚度、浅表血管和 optode coupling 影响，而通用头模无法提前知道这些条件。

Monte Carlo simulation 很有价值，但它的精度受输入约束。通用头模和假定参数可以产生细腻的结果，却仍然描述一颗现实中并不存在的标准头。实际放置偏移几毫米，或 coupling 稍有变化，结果就可能改变。若在每次拖动后都重算 photon map，界面细节容易超过实验现场能够复现的程度。

设计阶段的问题更朴素：光极在曲面上是否重叠，实际源探距是否合理，通道大致经过哪片皮层，移动 patch 后覆盖是否偏离目标。这些是几何筛查问题。CortexLume 先把它们做快、做清楚，再把最终候选交给更精细的光学模型。

这种做法没有把光路解释成直线。CortexLume 为每条通道建立一条进入皮层的几何路径，并在 25,000 顶点表面上计算有限范围的核，用于阵列覆盖和候选比较。覆盖图合并所有可见 patch，再以 Harvard-Oxford 归属划分区域。它是 geometric coverage prior，不是 fluence、Jacobian、measurement probability 或个体 sensitivity map。界面保留了这条界线，研究者看到的是空间设计依据，不是一幅伪装成光学模拟的热图。

当 layout 已缩小到少数方案，设备几何明确，并且有数字化光极位置、个体 MRI 或可说明的组织参数时，Monte Carlo 才能提供与投入相称的信息。几何筛查与光学模拟也可以直接比较，例如考察覆盖与敏感性质心的距离、区域标签一致性，或二者对候选阵列的排序。若某些目标或头型下排序明显变化，就有充分理由进入个体化建模。

## 阵列移动时，软件在计算什么

source、detector 和 channel 的关系先在 10 mm 网格的二维编辑器中定义，30 mm 参考线用于观察常见源探距。阵列贴到头模后，二维矩阵仍可修改，硬件拓扑和空间放置不会变成两个互不相干的版本。软件在 patch 锚点建立局部切平面，将二维位置映射到三维头皮，并使用球体感知的碰撞与表面投影处理有限大小的光极。局部调整只影响被选中的 optode。

坐标语义被分开保存。scalp coordinate 表示光极球心的物理头表位置；display coordinate 用于避免渲染节点进入深脑沟；cortical coordinate 表示与 Cedalion 对应的灰质表面首次接触。图谱查询和 BrainNet 导出使用 cortical coordinate，显示修正不会混入科学结果。

若 source 位置为 $s$，detector 位置为 $d$，通道的几何中心为

$$
m = \frac{s+d}{2}.
$$

软件随后求取与灰质表面的接触点 $p$，并读取图谱值 $P_k(p)$。完整通道的解剖结果汇总采样后的几何路径，单个 optode 则保留单射线参照。这个表达承担的是设计阶段的空间映射，不是扩散光子传播的替代模型。

新版 Anatomical Coverage 将计算扩展到整个阵列。对于通道路径 $c$ 与表面顶点 $v$，软件按顶点到路径的最短距离计算截断高斯核。默认参数为 $\sigma=12$ mm、半径 24 mm，多通道以逐顶点最大值合并，避免密集重叠通道仅因数量更多而抬高覆盖。区域摘要随后结合 Harvard-Oxford 原始概率。参数、阈值、坐标约定与资产哈希都会写入结果，覆盖图因而可以被复查，而不仅是一层着色效果。

## 从手工调整到机器辅助规划

CortexLume 现在提供本地 stdio MCP 接口。科研人员可以让支持 MCP 的 agent 读取功能靶点目录、Harvard-Oxford 区域、RAS+ MNI 点或经过授权的本地 NIfTI 文件，再生成完整的 `.cortexlume` 项目。整个过程在本机运行，不向 GUI 加入聊天窗口，也不绑定模型服务商。文件访问必须落在用户明确授权的目录中。

规划器返回三套空间上不同且可重复生成的候选。排序记录目标质量覆盖、目标外特异性、位置扰动后的稳健性、图谱对齐、光极净距和源探距变形。候选必须落在由皮层表面支持的颅顶头皮范围内，耳、面部与颈部位置会在排序前被排除。面对分散的功能图，规划器还会判断单个 patch 是否足够，并给出 patch 数量建议。

agent 适合承担组合搜索，不适合替代科研判断。它快速提出三套有数值依据的起点，桌面端则留给人做三维检查和细调。研究者能看到指标、功能图、解剖覆盖与阵列结构，再决定采用、修改或放弃哪一套方案。

format-v2 `.cortexlume` archive 保存稀疏功能图、当前表面叠层和完整规划 provenance，并以 `project.json` 与 `manifest.json` 的哈希核验内容。基于旧项目规划时，新结果写入派生文件并记录源项目哈希，不覆盖原文件。NIfTI 项目保存映射后的 25k 顶点数值、原文件名与 SHA-256，而不是把原始 volume 复制进 archive。

## 让空间设计能够复查

最终阵列的方法学价值取决于别人能否重建其空间假设。CortexLume 项目保存阵列拓扑、头模放置、功能图与规划来源；两个 CSV 表分别提供 optode 和 channel 的坐标、距离及图谱结果；`cortexlume_export.json` 记录模板与图谱哈希、投影设置、设备元数据、阈值、质量标记和导出警告。易读结果与机器审计信息分开，前者不再被内部 QC 字段淹没，后者也没有被省略。

BIDS-NIRS 输出建立 subject 和 session 目录，写入几何、坐标系、设备信息与每个 source-detector-wavelength 组合。加入匹配的 SNIRF 记录后，即可形成完整数据集。BrainNet Viewer 导出生成 `.node` 文件和 MATLAB 脚本，直接将 cortical MNI 传入 ICBM152 表面，并保存适合检查 fNIRS 阵列的多个视角。

科学资产也经过完整性检查。Cedalion 26.5.1 的官方 25,000 顶点 MNI 对应表相对于 canonical surface 的第 95 百分位残差为 0.000689 mm；TemplateFlow 目标网格与 Cedalion volume 的对应偏移为 `[5, 6, 76]`，brain-mask Dice 为 0.953731。运行时皮层接触使用保留官方对应关系的未简化 25k mesh，Harvard-Oxford volume 无损映射到锁定的 1 mm RAS+ 网格，发行资产以 SHA-256 校验。

这些数字证明软件内部坐标、表面和图谱之间没有悄然错位，并不承诺个体层面的亚毫米定位。numerical precision、software consistency 与 biological accuracy 仍是三件不同的事。CortexLume 的作用就在这个尺度上：尽早显示阵列的空间后果，保存决定依据，并从大量草图中筛出值得进一步模拟的方案。

fNIRS layout 不应只留在一张帽子截图或方法部分的几句话里。功能靶点、阵列几何、图谱解释、设备约束和设计来源若能一起保存，其他研究者就能检查、复用或比较这套布局。CortexLume 没有替代个体 MRI 和 photon modelling，而是让使用这些昂贵方法之前的每一步更清楚，也让没有这些资源的研究仍能留下可信的空间记录。

---

## 参考资料

- [CortexLume repository](https://github.com/inewhero/CortexLume)
- [CortexLume Quick Target data pipeline](https://github.com/inewhero/CortexLume/blob/main/docs/quick-target-data.md)
- [CortexLume scientific asset pipeline](https://github.com/inewhero/CortexLume/blob/main/docs/SCIENTIFIC_ASSET_PIPELINE.md)
- [fOLD: a toolbox for fNIRS optode placement](https://pmc.ncbi.nlm.nih.gov/articles/PMC5820343/)
- [devfOLD: age-specific fNIRS channel placement](https://pmc.ncbi.nlm.nih.gov/articles/PMC8647945/)
- [AtlasViewer tutorial](https://pmc.ncbi.nlm.nih.gov/articles/PMC4478785/)
- [Array Designer for fNIRS probe optimisation](https://pmc.ncbi.nlm.nih.gov/articles/PMC6135986/)
- [FSL atlas datasets and probability volumes](https://fsl.fmrib.ox.ac.uk/fsl/docs/other/datasets.html)
- [BigBrain: an ultrahigh-resolution 3D human brain model](https://doi.org/10.1126/science.1235381)
- [Colin27 high-resolution stereotaxic model](https://www.bic.mni.mcgill.ca/ServicesAtlases/Colin27Highres)
- [Impact of anatomical variability on fNIRS sensitivity](https://pmc.ncbi.nlm.nih.gov/articles/PMC9962997/)
- [Hair and skin characteristics in fNIRS signal quality](https://pmc.ncbi.nlm.nih.gov/articles/PMC13264803/)
- [Subject-specific light propagation and scalp-cortex correspondence](https://pmc.ncbi.nlm.nih.gov/articles/PMC8046049/)
- [Optode positional calibration in diffuse optical tomography](https://opg.optica.org/abstract.cfm?uri=ao-42-16-3154)
- [Atlas-guided versus subject-specific DOT](https://pmc.ncbi.nlm.nih.gov/articles/PMC3408558/)
- [Best practices for fNIRS publications](https://pmc.ncbi.nlm.nih.gov/articles/PMC7793571/)
- [SNIRF data format](https://fnirs.github.io/snirf/)
