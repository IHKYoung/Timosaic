// Current four-tab native app. Screenshot headlines and metadata share one source.
module.exports = {
 'zh-Hans': {
  brand:'时格',tagline:'把生活过成可回顾的时间格子',
  title:'时格 Timosaic - 时间日记',subtitle:'涂下时间，记住心情，发现生活的节奏',
  promotionalText:'生活不只有待办，也有值得留住的片刻。轻轻涂下时间，写几句今天的心情，再从彩色日历里回望自己。认真工作值得记录，好好休息也一样。',
  keywords:'时间管理,日历,手账,手帐,备忘录,随笔,小记,复盘,专注,习惯,自律,效率,情绪,自我关怀,睡眠,运动,工作,学习,创作,休息,成长,每日总结,离线,隐私,涂色,时间轴,统计,周报,月报,生活记录',
  description:`好的生活，是先照顾好自己，再拥抱世界。

时格，是一本用颜色记录生活的时间日记。把一天变成 96 个小格，每格 15 分钟。给工作、学习、创作、休息留一种颜色，也给平凡的一天留一点温柔。

涂下时间，不必填写复杂表单
在「今天」选好活动，点一下，或连续涂过几格，每一笔结束后自动保存。涂错了可以撤销、重做或擦除；长按格子，可以精确调整一段时间。相邻同类记录会在时间轴上连成完整时段。

一段时光，也可以有自己的故事
点中间的 +，选择时间、活动与颜色，写下备注，还可以加上标签和地点。一天的感受则放在「日记」里：可以自由填写的心情、今天的收获，还有对明天的小期待。

在回顾里，看见走过的自己
月历用柔和的活动颜色呈现每一天。翻到某一天，重看时间轴、日记和时光小记；也可以按分类筛选、搜索记录，让值得记住的片刻更容易找到。

从记录里，发现生活的线索
睡眠、运动、工作与清醒活动分别观察，也看看工作与睡眠之外留给自己的生活片段。睡眠参考和工作提醒线可以调整，未记录的时间不会被当作零；关键词来自自己的标签。查看每日时间分布、分类时长与生活节奏。记录足够时，比较前后周期相同进度的变化。洞察只依据你主动记录的数据，不读取屏幕使用时间，也不把留白当成休息或替你判断心情。

让这里，有你的样子
自定义活动分类、颜色和图标；为自己选择头像、昵称和签名。柔和植物、暖心短句与浅色和深色外观，让每一次打开都轻松一点。

你的记录，留在你的设备上
无需账号，可以离线使用。导出 JSON 留存完整数据，或导出 CSV 继续整理时间记录。当前版本没有云同步，请为重要记录保存独立备份。

不用把每一格都填满。
认真生活，也包括好好休息。

时格 · 记录，看见，理解。`,
  whatsNew:'时格 1.0，让平凡的一天有迹可循。\n15 分钟时间格、连续涂色、时间轴、可自定义心情的日记、月历回顾、生活观察与本地数据导出。',
  reviewNotes:`无需账号或测试凭据；所有记录在本机保存。
1. 完成引导后，「今天」可直接选择分类并拖动涂格，每笔结束自动保存；长按精确编辑。
2. 底部 + 打开快速记录：选择时间、下一步添加活动/颜色/备注/标签/地点，点击完成记录才保存。
3. 今天中间的「日记」可写全天感受、选择或自定义心情、记录收获与明日期待。
4. 「回顾」支持月历翻月、分类筛选、搜索和单日时间轴。「发现」提供周/月统计，变化比较受记录覆盖门槛约束。
5. 「我」管理本地头像、昵称、签名、分类、外观、提醒与 JSON/CSV 导出。照片选择使用系统 PhotosPicker。
6. 仅开启提醒时申请通知权限。没有云同步、后台计时或自动活动监测。
商店截图为当前原生界面，使用隔离的内存示例数据；普通首次使用为空。截图不是预装用户记录。`,
  frames:[
   {slug:'today',eyebrow:'01 / 看见今天',title:['把时间，','涂成生活。'],sub:'一格 15 分钟，认真工作，也好好休息。',chip:'每一种颜色，都是你的一天',theme:'cream'},
   {slug:'paint',eyebrow:'02 / 记下这一刻',title:['一段时光，','一个小故事。'],sub:'选好时间，留下活动、备注与小小细节。',chip:'时间之外，也留一点心情',theme:'mint'},
   {slug:'calendar',eyebrow:'03 / 回望生活',title:['平凡的日子，','也有自己的光。'],sub:'彩色月历，把走过的每一天慢慢连起来。',chip:'回头看，原来已经走了这么远',theme:'forest'},
   {slug:'memo',eyebrow:'04 / 靠近自己',title:['今天，','也听听自己。'],sub:'记下心情、收获，还有明天的小期待。',chip:'不必写得漂亮，真实就很好',theme:'peach'},
   {slug:'composition',eyebrow:'05 / 发现节奏',title:['看见时间，','更懂自己。'],sub:'睡眠、运动、工作，让关心落在日常。',chip:'了解自己，慢慢来就好',theme:'lavender'},
   {slug:'dark',eyebrow:'06 / 温柔收尾',title:['夜深了，','也温柔记录。'],sub:'浅色与深色，让每次打开都舒服一点。',chip:'谢谢今天的自己',theme:'night'}
  ]
 },
 en:{
  brand:'Timosaic',tagline:'See your life, one block at a time.',
  title:'Timosaic: Time Journal',subtitle:'Color your day. Find your flow',
  promotionalText:'Life is more than a to-do list. Paint a little time, save a thought, and look back at the days that make you, you. Good work matters. Good rest does, too.',
  keywords:'diary,mood,calendar,reflection,focus,habits,selfcare,notes,tracker,sleep,offline,wellbeing,activity',
  description:`Make a little room for yourself.

Timosaic is a time journal you fill with color. Each day has 96 little blocks, each holding 15 minutes. Give work, learning, creativity and rest a place in the picture — without turning every minute into a target.

PAINT A MOMENT
Choose an activity in Today, then tap or swipe across the grid. Each stroke saves automatically. Undo, redo or erase when you need to; hold a block to adjust its times. Adjacent entries of the same activity become one continuous stretch on your timeline.

KEEP THE STORY, TOO
Tap + to choose a time, activity and color. Add a note, tags or a place. For the day as a whole, Diary holds your thoughts, a feeling in your own words, a little joy and something to look forward to tomorrow.

LOOK BACK WITH KINDNESS
A colorful month of entries helps you revisit ordinary days. Open a date to see its timeline and notes, or filter by activity and search for a memory.

FIND YOUR OWN RHYTHM
Observe sleep, movement, work and waking activities separately, with a little room for life beyond work and sleep. Adjust personal sleep references and work reminders; missing entries are never treated as zero. Keywords come from your own tags. Explore daily distributions, activity totals and periods of focus. When enough time has been recorded, compare the same elapsed portion of two periods. Insights use only your own entries: no Screen Time access, no guessing your feelings, and no treating blank time as rest.

MAKE IT FEEL LIKE YOU
Personalize your activities, colors and icons, along with your profile photo, name and signature. Gentle botanical art, little words of encouragement, and light and dark appearances make space for a softer daily ritual.

ON YOUR DEVICE
No account required. Record offline and export your data as JSON, or time entries as CSV. This version does not include cloud sync; keep separate exports of important memories.

You do not have to fill every block.
Rest belongs in the picture, too.

Timosaic. See your life, one block at a time.`,
  whatsNew:'Welcome to Timosaic 1.0. A little color for ordinary days.\nPaint 15-minute blocks, keep notes for moments and days, revisit your calendar, explore your rhythm and export your local data.',
  reviewNotes:`No login or test credentials are needed. All records are stored locally.
1. After onboarding, choose an activity in Today and drag across blocks. Each stroke saves automatically. Hold a block to edit its times.
2. The central + opens Quick Capture: select time, then activity, color, note, tags or place. Save moment commits the draft.
3. Today > Diary holds a daily note, a preset or custom mood, little joys and plans for tomorrow.
4. Review provides a monthly calendar, activity filters, search and daily timelines. Discover provides week/month statistics. Period comparisons require sufficient recorded coverage.
5. Me contains local profile, category, appearance, reminder and JSON/CSV export settings. Photo selection uses PhotosPicker. Notification permission is requested only when enabling reminders.
Screenshots use the actual native interface with isolated, fictional in-memory data. Normal first launch is empty. No cloud sync, background timer or automatic activity monitoring is provided.`,
  frames:[
   {slug:'today',eyebrow:'01 / YOUR DAY, IN COLOR',title:['A little color.','A day to remember.'],sub:'One block, fifteen minutes, a little more clarity.',chip:'Make room for work. And rest.',theme:'cream'},
   {slug:'paint',eyebrow:'02 / KEEP THE MOMENT',title:['A little time.','A story of your own.'],sub:'Give a moment a color, a note and a place.',chip:'The details make it yours',theme:'mint'},
   {slug:'calendar',eyebrow:'03 / LOOK BACK GENTLY',title:['Ordinary days.','A beautiful whole.'],sub:'Let your days become a colorful mosaic.',chip:'You have already come so far',theme:'forest'},
   {slug:'memo',eyebrow:'04 / A MOMENT FOR YOU',title:['How was','your day, really?'],sub:'A feeling, a little joy, a hope for tomorrow.',chip:'A sentence is enough',theme:'peach'},
   {slug:'composition',eyebrow:'05 / FIND YOUR RHYTHM',title:['See your time.','Know yourself.'],sub:'Notice sleep, movement and waking patterns.',chip:'Understanding yourself takes time',theme:'lavender'},
   {slug:'dark',eyebrow:'06 / A SOFTER EVENING',title:['A softer glow.','A kinder goodnight.'],sub:'Light and dark looks, made to feel at home.',chip:'Thank yourself for today',theme:'night'}
  ]
 }
};
