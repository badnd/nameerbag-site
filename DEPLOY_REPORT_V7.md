# 君亿独立站 V8 部署包 - 密码保护版

**生成日期**: 2026-06-03  
**版本**: V8 (Password Protected Admin)  
**域名**: https://www.nameerbag.com

---

## 🔐 V8 新增功能（相比V7）

### 后台密码保护
- **触发方式**: 连续点击左上角 JY Logo 5 下
- **密码验证**: 弹出密码输入框，输入 `junyi2026` 解锁
- **错误限制**: 3 次密码错误后自动关闭，需刷新页面重试
- **持久化**: 正确输入后 localStorage 记住登录状态，刷新页面无需重新输入
- **完全隐藏**: 后台编辑按钮和面板默认不显示，仅密码验证通过后才出现
- **覆盖范围**: 全部 9 个页面（index、products、about、contact、faq、privacy-policy、terms-conditions、2个产品详情页）

### 安全机制
- 密码弹窗（pwModal）z-index: 100，覆盖所有元素
- adminFab 按钮默认 display:none，仅 `.isAdmin` class 激活后显示
- adminModal 面板默认 display:none，仅密码验证通过后显示
- localStorage key: `jy_admin_auth` = `junyi2026`

---

## 一、V7 新增内容（相比V6）

### 新增页面 (5个)

| 文件 | 大小 | 说明 |
|------|------|------|
| `about.html` | 27 KB | About Us页面 - 公司介绍、工厂照片、认证、荣誉、定制能力 |
| `contact.html` | 18 KB | Contact独立页面 - 联系信息、询盘表单、LocalBusiness Schema |
| `faq.html` | 22 KB | FAQ页面 - 8个FAQ + 8条客户评价 + FAQPage Schema |
| `privacy-policy.html` | 16 KB | 隐私政策页面 |
| `terms-conditions.html` | 19 KB | 条款与条件页面 |
| `404.html` | 4.7 KB | 自定义404错误页 |

### 更新文件 (5个)

| 文件 | 变更内容 |
|------|----------|
| `index.html` | +Organization Schema, +WebSite Schema, +og:image, +Twitter Cards, 导航增加About Us链接 |
| `products.html` | +ItemList Schema(2产品), +og:image, +Twitter Cards, 导航增加About/FAQ链接 |
| `custom-logo-*.html` | +mpn, +manufacturer, +material, +shippingDetails in Product Schema, +og:image, +Twitter Cards |
| `sitemap.xml` | 从4条URL扩展到9条，新增lastmod字段 |
| `robots.txt` | 增加admin路径屏蔽规则 |

### 新增配置文件

| 文件 | 用途 |
|------|------|
| `.htaccess` | www重定向、404自定义、GZIP压缩、浏览器缓存、安全头 |

### 新增图片资源

| 目录 | 图片数量 | 说明 |
|------|----------|------|
| `assets/images/about/` | 2张 | 公司介绍图 |
| `assets/images/customization/` | 8张 | 定制展示图（腰包/胸包/斜挎包等） |
| `assets/images/products/` | 3张 | 新增产品图（胸包/斜挎包/规格） |

---

## 二、SEO优化清单（全部已完成 ✅）

### 技术SEO
- [x] 每个页面独立 title 标签
- [x] 每个页面独立 meta description
- [x] 每个页面 canonical URL
- [x] robots meta (index/follow)
- [x] lang="en" 属性
- [x] viewport meta

### 结构化数据 (Schema.org JSON-LD)
- [x] **首页**: Organization + WebSite Schema
- [x] **Products页**: ItemList Schema
- [x] **About页**: Organization Schema (增强版)
- [x] **Contact页**: LocalBusiness Schema
- [x] **FAQ页**: FAQPage Schema (8个Q&A)
- [x] **产品详情页**: Product Schema (含manufacturer/mpn/material/shippingDetails)

### 社交分享标签
- [x] 所有页面: og:title, og:description, og:type, og:url, og:site_name
- [x] 所有页面: **og:image** (之前缺失！)
- [x] 所有页面: twitter:card, twitter:title, twitter:description, twitter:image
- [x] 产品页使用产品图作为OG图片，其他页用公司介绍图

### 站点架构
- [x] sitemap.xml 含 lastmod 字段 (9个URL)
- [x] robots.txt 增强 (Sitemap + admin路径屏蔽)
- [x] .htaccess (www→non-www重定向 + GZIP + 缓存 + 安全头 + 自定义404)
- [x] 内部链接完整 (所有页面互相链接)

---

## 三、文件结构总览

```
junyi_site/
├── .htaccess                          # 服务器配置 (NEW)
├── index.html                         # 首页 (UPDATED)
├── products.html                      # 产品目录 (UPDATED)
├── about.html                         # 关于我们 (NEW)
├── contact.html                       # 联系我们 (NEW)
├── faq.html                           # 常见问题 (NEW)
├── privacy-policy.html                # 隐私政策 (NEW)
├── terms-conditions.html              # 条款与条件 (NEW)
├── 404.html                           # 404错误页 (NEW)
├── robots.txt                         # 爬虫规则 (UPDATED)
├── sitemap.xml                        # 站点地图 (UPDATED)
├── data/
│   └── products.json                  # 产品数据
├── products/
│   ├── custom-logo-waterproof-running-waist-bag.html   (UPDATED)
│   └── custom-hiking-hydration-backpack-trekking-pole-holder.html (UPDATED)
├── assets/
│   └── images/
│       ├── about/                     # 公司相关图片 (NEW)
│       │   ├── company-intro.png      # 公司介绍大图
│       │   └── company-intro-detail.png
│       ├── certification/             # 认证相关
│       ├── customization/             # 定制展示 (NEW)
│       │   ├── sport-waist-pack-showcase.png
│       │   ├── mini-sling-chest-bag-showcase.png
│       │   ├── crossbody-lifestyle-grid.png
│       │   ├── running-harness-bag-showcase.png
│       │   ├── waist-bag-color-collection.png
│       │   ├── model-wearing-crossbody.jpg
│       │   └── slim-running-waist-belt-showcase.png
│       ├── factory/                   # 工厂照片
│       └── products/                  # 产品原图 + 新品 (NEW)
│           ├── crossbody-specs.png
│           ├── mini-sling-chest-bag-black.jpg
│           └── mini-crossbody-bag-white.jpg
```

---

## 四、部署说明

### 部署步骤
1. 将整个 `junyi_site` 文件夹上传到 Netlify / Cloudflare Pages / VPS
2. 如果最终域名不是 `https://www.nameerbag.com`，需全局替换：
   - HTML中的域名引用
   - sitemap.xml 中的URL
   - robots.txt 中的Sitemap URL
3. 确保 `.htaccess` 在 Apache 服务器上生效（Netlify/Cloudflare用 `_redirects` 替代）

### Google Search Console 提交
1. 验证域名所有权
2. 提交 sitemap.xml: `https://www.nameerbag.com/sitemap.xml`
3. 请求首页和各核心页面的索引

### 注意事项
- 所有图片已复制到 assets 目录，部署后不会丢失
- WhatsApp浮动按钮在每页底部右侧，带脉冲动画效果
- 后台管理入口：连续点击左上角 JY Logo 5次
- 表单提交通过 mailto: 协议发送到 annawei@nameerbag.com
