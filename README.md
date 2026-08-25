# Academic Homepage

一个面向 GitHub Pages 的轻量双语学术主页。技术栈为 Astro 7、TypeScript、Markdown 与原生 CSS；没有 React、Three.js 或客户端运行时。

英文使用根路径，中文使用 `/zh/`。首次访问无前缀页面时，会根据浏览器首选语言自动进入对应语言；导航栏中的语言切换会在本地保存用户选择。

## 本地运行

```bash
npm install
npm run dev
```

生产检查与构建：

```bash
npm run check
npm run build
npm run preview
```

`npm run dev`、`check` 和 `build` 会先扫描页面字典与 Markdown，只准备当前内容需要的中文字体分片。

## 目录结构

```text
src/
├─ components/       # 页面级与共享组件
├─ content/
│  ├─ journey/       # 双轨时间线
│  ├─ notes/         # Markdown 札记
│  ├─ projects/      # 项目介绍与首页代表工作
│  ├─ publications/  # 学位论文、手稿与正式发表成果
│  └─ sections/      # 页面标题与 SEO 摘要
├─ i18n/             # 页面界面的中英文文案
├─ layouts/          # 基础页面与札记正文布局
├─ lib/              # 内容解析、校验与路由工具
├─ pages/            # 英文根路由与 /zh/ 中文路由
└─ styles/           # 全局样式与构建生成的字体声明
```

`dist/`、`.astro/`、字体分片与浏览器测试输出均为生成内容，不作为手写源码维护。

## 修改页面内容

- 中文页面文案：`src/i18n/zh.ts`
- 英文页面文案：`src/i18n/en.ts`
- 页面结构与视觉：`src/components/`、`src/styles/global.css`

姓名与联系邮箱在中英文字典中统一维护。

## 编辑 Journey

Journey 的双语内容保存在：

```text
src/content/journey/journey_en.md
src/content/journey/journey_zh.md
```

页面标题与轨道名称写在 frontmatter 中；时间线通过 Markdown table 维护。每一行对应一个时间点，表头字段保持为 `id`、`year`、`academic_title`、`academic_text`、`academic_meta`、`practical_title`、`practical_text`、`practical_meta`。同一行可以只填写学术或实践一侧，但每个非空节点必须同时包含标题和正文。构建时会检查缺列、残缺节点、无效 id 与重复 id。

## 编辑项目

Projects 页面标题与 SEO 摘要保存在：

```text
src/content/sections/projects_en.md
src/content/sections/projects_zh.md
```

每个项目的双语介绍分别保存在 `src/content/projects/`：

```text
project-name_en.md
project-name_zh.md
```

Frontmatter 中的 `order` 决定 Projects 页面顺序，`selected: true` 会将项目自动加入首页 Selected Works。`summary` 用于首页卡片，正文使用普通 Markdown 编写，可自然分成 1 至 3 段：

```yaml
---
title: "Project Name"
summary: "首页使用的简短说明"
repository: "https://github.com/example/project"
order: 10
selected: true
draft: false
---
```

## 新增发表成果

学位论文、手稿与正式发表成果保存在 `src/content/publications/`，文件名语言后缀与札记相同：

```text
work-title_en.md
work-title_zh.md
```

两份文件的基础名称相同时会被识别为互译，并生成：

```text
/publications/work-title/       # English
/zh/publications/work-title/    # 中文
```

成果日期、类型、作者和外部资源均由 Markdown frontmatter 控制：

```yaml
---
title: "成果标题"
description: "列表与 SEO 摘要"
date: 2023-05-31
updated: 2026-08-10 # 可选
type: "本科毕业论文"
authors: ["黄睿逸"]
repository: "https://github.com/example/repository" # 可选
materials: "https://doi.org/example" # 可选
draft: false
---
```

正文直接使用 Markdown 编写，支持表格与 LaTeX。

## 新增双语文档

札记保存在 `src/content/notes/`，文件名后缀决定语言：

```text
topic_zh.md
topic_en.md
```

两份文件去掉语言后缀后名称相同，即视为互译。公开地址不会显示后缀：

```text
/notes/topic/       # English（默认语言）
/zh/notes/topic/    # 中文
```

Frontmatter 示例：

```yaml
---
title: "标题"
description: "摘要"
published: 2026-08-06
updated: 2026-08-07 # 可选
tags: ["注意", "方法"]
draft: false
---
```

如果只存在一种语言，语言切换会显示为不可用，不会伪造回退内容。

## GitHub Pages

`.github/workflows/deploy.yml` 使用 Astro 官方 Action。推送到 `main` 后，在仓库 **Settings → Pages** 中选择 **GitHub Actions** 作为 Source。

构建配置会从 `GITHUB_REPOSITORY` 自动判断：

- `username.github.io` 用户主页使用根路径 `/`；
- 普通仓库自动使用 `/<repository>/`，导航、字体与图片地址都会带上该 base。

如需自定义域名或手动构建，可设置 `SITE_URL` 和 `BASE_PATH` 环境变量。
