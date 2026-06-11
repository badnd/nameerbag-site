# Nameerbag SEO Fixed Website Package

本包已按你的优先级修复：

1. 产品页 canonical 全部指向各自页面，不再指向首页。
2. 首页删除重复 BreadcrumbList，首页只保留 Organization / WebSite 结构化数据。
3. 全站 BreadcrumbList 的首页 item 统一为 `https://www.nameerbag.com/`。
4. 新增 PDF Catalog 下载表单：`Download Custom Backpack & Bag Catalog / OEM/ODM / Custom Logo / Private Label`。
5. Catalog 表单字段只保留 Name、Email、Company、Interested Products。
6. 表单后端为 `/api/catalog-lead.js`，默认收件人为 `232119507@qq.com`，不在前端暴露邮箱密码。
7. 新增 `sitemap.xml` 和 `robots.txt`。
8. 新增俄语核心页面：`/ru/`、`/ru/products.html`、`/ru/about.html`、`/ru/factory.html`、`/ru/contact.html`、`/ru/product-waist-bag.html`，并配置 hreflang。
9. Factory 页面预留真实工厂照片位。请用真实车间/裁床/缝纫/打包/QC/仓库照片替换 `assets/images/factory/` 下同名文件。
10. 保留隐藏后台入口：连续点击左上角 Nameer Bag Logo 5 下。

## 部署前必须做的 2 件事

### 1. 配置 Catalog 表单发信
在 Vercel 环境变量里配置：

- `LEAD_TO_EMAIL=232119507@qq.com`
- `RESEND_API_KEY=你的 Resend API Key`
- `LEAD_FROM_EMAIL=Nameerbag Leads <leads@你的已验证发信域名>`

不配置时，表单仍会下载 PDF，并打开用户邮箱作为备用发送方式，但不会自动后台发信。

### 2. 替换真实工厂照片
把你的真实照片覆盖这些文件名：

- `assets/images/factory/factory-sewing-line.svg`
- `assets/images/factory/factory-cutting-table.svg`
- `assets/images/factory/factory-sample-room.svg`
- `assets/images/factory/factory-packing-area.svg`
- `assets/images/factory/factory-qc-check.svg`
- `assets/images/factory/factory-warehouse.svg`

建议最终换成 `.webp` 或 `.jpg` 后，同步修改 HTML 图片路径。

## 技术检查结果
详见 `CHECK_REPORT.txt`。
