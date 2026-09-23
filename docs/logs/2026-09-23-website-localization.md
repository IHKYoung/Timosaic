# 2026-09-23 官网语言分离

## 目标与范围
支持和隐私页按语言独立展示。保留中文原路径，英文新增 /en/support/ 与 /en/privacy/；不改变数据处理政策、原生 App 或发布配置。

## 实现依据与风险
已阅读 website 的首页、帮助、隐私、样式、站点地图、README，以及 scripts/website/verify.py 和商店元数据生成器。沿用静态 HTML 模式；主要风险为跨语言误跳转或旧链接失效。以 URL 明确表示语言，语言切换链接指向对应内容页，旧中文 URL 保持可用。

## 修改
- 删除中文文档中的英文重复段落，建立内容完整的英文版本。
- 英文首页页脚、返回首页、帮助和隐私入口保持英文路径。
- 修正文档 canonical/hreflang，更新 sitemap 和字体字形子集。
- 更新英文商店元数据网址及生成器，避免下次生成覆盖。

## 验证
- python3 scripts/website/verify.py：90 项链接/元数据检查通过；7 个页面；语言配对、canonical、sitemap 通过。
- node --check website/app.js 与 scripts/store/render.cjs：通过。
- git diff --check：通过。
- 浏览器打开英文支持页、点击中文切换：成功进入同主题中文页，正文无混排。

## 发布与回退
推送 master 由既有 Vercel Git 集成部署；以正式域名 HTTP 返回内容验证部署。需要回退时使用 Vercel 上一成功部署或新的恢复提交，无数据迁移。
