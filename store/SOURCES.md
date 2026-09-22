# 功能与规范依据

核验：2026-09-22。素材描述当前四栏版，不沿用历史无限画布文案。

| 表述 | 实现依据 |
| --- | --- |
| 15 分钟格子、连续涂色、自动保存与撤销 | SoftHomeView、PaintCanvas、TimeStore |
| 快速记录、备注、颜色、标签、地点 | SoftCaptureView、TimeStore.saveMoment |
| 日记、自定义心情、收获、明日期待 | SoftDayReview、TimeStore.saveDayReview |
| 月历颜色、分类筛选、搜索、单日时间线 | SoftReviewDiscover |
| 两处日历填色一致 | TimeControls：calendarCategory/calendarFill；SoftMonthCard 共用 |
| 周/月时间分布、可解释洞察 | InsightsEngine：同进度周期、记录覆盖门槛；SoftDiscoverDetail；CareRhythm/CareRhythmView：独立睡眠、运动、工作、生活片段及清醒活动观察和显式标签统计 |
| 本地头像昵称签名、JSON/CSV 导出 | LocalProfileStore、ProfileEditor、ExportService |
| LXGW 字体、柔和植物、暖心短句 | Theme、Resources/Fonts、KindWords、DailyInspiration |
| 真实截图与用户数据隔离 | StoreCaptureTests、TimeStore.seedDemo、App 的 -demo 内存路径 |

日历原有视觉规则是「当天记录最多的分类的柔和颜色」，不是多个 RGB 值的平均；本次保留这一规则并共用到 Today 日期下拉。未记录日期留白，选中态描边不覆盖填色。同样长的分类以 UUID 排序稳定处理。

插画来源见 assets/PROVENANCE.md；海报复用既有原创柔和植物，原生界面来自实际截图，不由生成模型重绘。

## Apple 官方规范

- [Screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications)：采用 iPhone 1320 × 2868、iPad 2064 × 2752。
- [Platform version information](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information)：推广文本 170 字符、描述 4000 字符、关键词限制；本包关键词保守按 100 UTF-8 字节校验。
- [App information](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information)：名称与副标题各不超过 30 字符。

没有宣传云同步、自动追踪、后台计时、番茄钟、AI 总结、永久免费等未验证功能。中英文商店描述独立润色，提供相同功能事实。英文主流程截图不是完整英文发布验收，见 README 的明确待办。
