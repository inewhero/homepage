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
│  ├─ home/          # 首页代表工作
│  ├─ journey/       # 双轨时间线
│  ├─ notes/         # Markdown 札记
│  └─ sections/      # Projects 与 Publications
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

首页中的示例论文仍是待替换内容。姓名与联系邮箱在中英文字典中统一维护。

## 编辑 Journey

Journey 的双语内容保存在：

```text
src/content/journey/journey_en.md
src/content/journey/journey_zh.md
```

页面标题与轨道名称写在 frontmatter 中；时间线通过 Markdown table 维护。每一行对应一个时间点，表头字段保持为 `id`、`year`、`academic_title`、`academic_text`、`academic_meta`、`practical_title`、`practical_text`、`practical_meta`。构建时会检查缺列、空白必填项、无效 id 与重复 id。

## 编辑项目与发表

Projects 与 Publications 的双语内容保存在：

```text
src/content/sections/projects_en.md
src/content/sections/projects_zh.md
src/content/sections/publications_en.md
src/content/sections/publications_zh.md
```

页面标题与 SEO 摘要写在 frontmatter 中；列表通过 Markdown table 维护，字段为 `title`、`text`、`meta`、`href`。其中 `meta` 与 `href` 可以留空，构建时会校验表格结构与必填内容。

首页 Selected Works 的双语内容保存在：

```text
src/content/home/selected_works_en.md
src/content/home/selected_works_zh.md
```

表格字段为 `title`、`year`、`venue`、`href`，构建时会检查所有字段是否完整。

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
