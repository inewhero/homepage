import type { SiteCopy } from './types';

export const zh = {
  locale: 'zh',
  languageName: '中文',
  switchLanguage: 'English',
  nav: {
    home: '首页',
    notes: '札记',
    projects: '项目',
    publications: '发表',
    journey: '旅程',
    contact: '联系',
  },
  meta: {
    title: 'Ruiyi Huang Homepage',
    description: '一个关注注意、心智、行为与心理健康的个人学术主页。',
  },
  home: {
    name: '黄睿逸',
    welcomeBefore: '欢迎来到',
    welcomeAfter: '的主页',
    headline: 'Look Closer. Explore Further.',
    subheadline: 'Turning curiosity into real-world discovery.',
    intro:
      '我研究认知加工如何塑造心智与行为，并尝试将基础发现转化为能够改善心理健康与生活质量的实践。',
  },
  pages: {
    contact: {
      title: '联系',
      intro:
        '我仍是一名在精神病学、神经科学与心理学交叉处学习的学生。若研究者、同学或实践工作者愿意交流想法、分享经验或提出建议，我都会很珍惜。',
      items: [
        {
          eyebrow: '邮箱',
          title: 'yosoro0814(at)gmail.com',
          text: '很欢迎同学、研究者，以及对这些话题感兴趣的朋友来信。无论是交流一个想法、分享一段经验，还是简单打个招呼，我都会很开心地读到。',
        },
        {
          eyebrow: 'GitHub',
          title: 'github.com/inewhero',
          text: '代码、小工具与仍在推进的工作。',
          href: 'https://github.com/inewhero',
        },
        {
          eyebrow: 'ORCID',
          title: '0000-0001-9202-8139',
          text: '用于关联研究记录的长期学术标识。',
          href: 'https://orcid.org/0000-0001-9202-8139',
        },
      ],
    },
  },
  notes: {
    indexTitle: '札记',
    indexIntro: '在大型成果之间，记录论文阅读、研究方法、实验与反思。',
    tableOfContents: '本页目录',
    published: '发布于',
    updated: '更新于',
    unavailable: '暂无对应译文',
    backToNotes: '全部札记',
  },
  footer: {
    rights: '使用 Astro 与 Markdown 构建。',
  },
} satisfies SiteCopy;
