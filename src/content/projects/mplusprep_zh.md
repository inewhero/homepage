---
title: "MplusPrep"
summary: "用一条命令把常见研究数据转为可运行的 Mplus 中介模型脚手架。"
repository: "https://github.com/inewhero/MplusPrep"
order: 50
selected: false
draft: false
---

在生成式 AI 普及之前，开始一项 Mplus 分析往往意味着一边回忆陌生语法，一边把数据转换成软件要求的精确格式。许多步骤高度重复，一个变量名或格式错误却足以让模型在正式分析前停止运行。

MplusPrep 用一条命令将 CSV、Excel 或 SPSS 文件转换为 Mplus `.dat` 数据文件和可继续编辑的 `.inp` 语法脚手架。它支持简单中介与调节中介模型，可在确认后修复不合法变量名，并用变量映射记录全部改动。生成的模板保留需要研究者判断的部分，同时省去每次重复编写的准备工作。
