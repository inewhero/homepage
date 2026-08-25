---
title: "CortexLume"
summary: "一套离线 fNIRS 空间设计工作站，从功能靶点出发规划光极阵列，并保留可复查的解剖覆盖、坐标与方法记录。"
repository: "https://github.com/inewhero/CortexLume"
order: 10
selected: true
draft: false
---

一项 fNIRS 研究在正式采集前就要回答空间问题：哪些皮层区域值得关注，现有设备能否形成合适的通道，阵列贴到曲面头部后是否仍保持合理间距。二维草图、功能图、三维头模与分析坐标若散落在不同软件中，研究者很难保留每次调整的依据。

CortexLume 将这段流程放进离线 Windows 工作站。研究者可以从 132 个经 FDR 校正的 Neurosynth Quick Target 开始，也可以导入经过严格检查的统计 NIfTI。高密度编辑器负责建立 source、detector 与 channel，完成的 patch 随后放到三维头模上调整。单个光极、完整阵列的 Harvard-Oxford 覆盖、源探距与皮层 MNI 都能在布局仍可修改时查看。

本地 MCP 接口还可以按功能靶点、图谱区域、MNI 点或授权的 NIfTI 规划三套不同候选，并报告覆盖、特异性、放置扰动、光极净距与间距变形。研究者再回到桌面端检查和细调，而不是把判断交给黑箱。format-v2 项目保留功能图与规划来源，结果可导出为 CSV、BIDS-NIRS geometry、技术 JSON 或 BrainNet Viewer 文件。关于几何筛查的适用范围、模板选择和这些输出为何可审查，可继续阅读[设计札记](../notes/cortexlume-spatial-design/)。
