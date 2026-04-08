// 站点配置 - 支持环境变量，提供默认值

const DEFAULT_URL = 'https://patterns.qiuyun.dev';
const DEFAULT_TITLE = '秋云设计模式';
const DEFAULT_DESCRIPTION = '深入理解设计模式的在线学习平台';
const DEFAULT_AUTHOR = '秋云';

// 在 Astro/Vite 环境中使用 import.meta.env
// 在 Node 环境中使用 process.env
const getEnv = (key: string, defaultValue: string): string => {
  // Vite/Astro 环境
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  // Node 环境
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  return defaultValue;
};

export const siteConfig = {
  url: getEnv('PUBLIC_SITE_URL', DEFAULT_URL),
  title: getEnv('PUBLIC_SITE_TITLE', DEFAULT_TITLE),
  description: getEnv('PUBLIC_SITE_DESCRIPTION', DEFAULT_DESCRIPTION),
  author: getEnv('PUBLIC_SITE_AUTHOR', DEFAULT_AUTHOR),
};

// 导出默认值供其他地方使用
export const siteDefaults = {
  url: DEFAULT_URL,
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  author: DEFAULT_AUTHOR,
};
