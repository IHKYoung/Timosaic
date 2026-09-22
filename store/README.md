# 时格 · App Store 素材包（2026-09-22）

打开 `index.html` 审阅。可切换简体中文 / English、iPhone / iPad，放大图片、下载原图、逐项复制文案。

## 叙事与上传顺序

1. 今天：把时间，涂成生活 / A little color. A day to remember.
2. 快速记录：一段时光，一个小故事 / A little time. A story of your own.
3. 回顾：平凡的日子，也有自己的光 / Ordinary days. A beautiful whole.
4. 日记：今天，也听听自己 / How was your day, really?
5. 发现：看见时间，更懂自己 / See your time. Know yourself.
6. 深色：夜深了，也温柔记录 / A softer glow. A kinder goodnight.

六幅组成从记录、回顾到理解自己的旅程。轻柔植物与 LXGW 霞鹜臻楷标题呼应 App，不用概念图替换真实界面。第二幅为快速记录详情，需要点保存才提交；只有 Today 直接涂格是每笔自动保存。

## 文件与规格

- `screenshots/iphone/{zh-Hans,en}/`：每组 6 张，1320 × 2868。
- `screenshots/ipad/{zh-Hans,en}/`：每组 6 张，2064 × 2752。
- `metadata/{zh-Hans,en}.{json,txt}`：名称、副标题、推广文本、关键词、描述、版本说明、审核说明。
- `overview/*.png`：六图总览，仅供审阅，不上传。
- `raw/{iphone,ipad}/`：原生真实截图、XCTest 结果。第 07 张为日期下拉回归证据，不是上传图。
- `manifest.json`：成品与原图对应关系、尺寸、SHA-256。
- `validation.json`：24 张成品 RGB、无透明通道、尺寸、文案长度、排版边界检查。
- `evidence/verification.json`：预览站交互、下载链接、复制内容、图片完整性检查。
- `timosaic-store-assets.zip`：完整交接包。

上传 `screenshots` 对应设备/语言的 01–06 文件，勿上传 overview 或 raw。示例数据在内存中独立生成；普通首次使用没有预装记录。海报标明“示例记录 / SAMPLE JOURNAL”。原图未抹除内容或重画界面。

## 发布前仍需处理

这是一套可审阅的商店素材，不代表已经提交审核。

- 支持网址、隐私政策网址、版权主体、Apple ID 和审核联系人需填写有效资料；占位项不得直接提交。
- 定价、地区、年龄分级与隐私申报由所有者确认。
- 本轮完成截图对应的主流程英文显示，**不代表全 App 英文本地化验收完成**。中文仍为当前默认；新版引导、我/设置、个人资料等页面的英文尚需补齐并做完整英文回归。英文素材先用于审阅，英文版发布前完成这一项。
- 当前数据只保存在本机；不要宣传云同步、AI 推断、自动监测、后台计时、年度无限画布或未实现的功能。

## 复现

在仓库根目录运行：

```sh
scripts/store/capture.sh IPHONE_SIMULATOR_UUID IPAD_SIMULATOR_UUID
node scripts/store/render.cjs
node scripts/store/build-gallery.cjs
node scripts/store/verify.cjs
bash scripts/store/package.sh
```

依赖已有 Xcode、XcodeGen、Node 与运行时中的 Playwright/Sharp。capture 使用独立内存数据，不触碰用户数据库。运行时字体已随仓库提供，授权见 App 的字体资源目录。
