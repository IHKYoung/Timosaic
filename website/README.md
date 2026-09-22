# Timosaic 官网

正式域名：https://timosaic.ahaknow.com
App Store：https://apps.apple.com/app/id6812809147

## 结构与发布

静态 HTML/CSS/JS，无框架或安装步骤。仓库根 vercel.json 的 outputDirectory 固定为 website；.vercelignore 仅上传网站和配置，不包含原生 App、测试数据、构建归档或商店素材。Vercel 项目 ahaknow/timosaic 连接 IHKYoung/Timosaic，推送生产分支触发部署。

- `/` 中文首页，`/en/` 英文首页。
- `/support/` 中英使用帮助，以 GitHub Issues 为现有支持渠道。
- `/privacy/` 中英隐私说明，区分 App 本地记录与网站托管请求日志。
- `/404.html` 错误页；robots.txt 与 sitemap.xml 已配置。
- App Store ID 固定 6812809147。当前按钮仅称“查看”，不宣称已经上架。

## 本地验证

仓库根运行 `python3 -m http.server 8834 --directory website`。
执行 `python3 scripts/website/verify.py` 与 `node --check website/app.js`。
字体源为原 App 的 LXGW 屏幕阅读字体；修改文案后运行 `sh scripts/website/font.sh` 重新生成字形子集（使用已安装的 hb-subset、woff2_compress）。发布目录只保留约 111 KB 的 WOFF2，保留 OFL 许可与署名。

截图及插画复用 App 原生示例截图和已有水彩位图；scripts/website/assets.py 为尺寸优化脚本（需本机原生 App 资源与 store/raw）。页面已预生成，部署不需要这些源文件或图像处理依赖。

## 交互与数据

体验格仅保存在当前页面内存，刷新清空；支持鼠标拖动、触屏点击、键盘激活、撤销和重新涂色。触屏保留纵向滚动，避免网页画布阻塞浏览。没有账号、表单、Cookie、分析脚本或记录上传。

## 回退

可用 Vercel 控制台回滚到上一成功部署；文案和静态样式可通过新提交恢复。无需数据库迁移。
