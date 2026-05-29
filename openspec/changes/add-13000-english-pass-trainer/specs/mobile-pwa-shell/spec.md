## ADDED Requirements

### Requirement: iOS 主屏幕 PWA
系统 SHALL 提供移动端优先的 PWA 体验，可在 iOS Safari 中打开，并可添加到 iPhone 主屏幕。

#### Scenario: 用户在 iPhone Safari 打开应用
- **WHEN** 用户在 iOS Safari 中打开应用 URL
- **THEN** 应用渲染适合触控的移动端界面，且不要求通过 App Store 安装

#### Scenario: 用户从主屏幕启动
- **WHEN** 用户将 PWA 添加到 iPhone 主屏幕并启动
- **THEN** 应用以类似独立 App 的视图打开，并提供相同的核心学习导航

### Requirement: 简单学习导航
系统 SHALL 将每日学习流程置于宽泛菜单浏览之前。

#### Scenario: 用户进入应用
- **WHEN** 用户打开应用
- **THEN** 首屏显示今日必做学习任务、当前进度和复习快捷入口

#### Scenario: 用户需要其他模块
- **WHEN** 用户打开导航
- **THEN** 应用提供练习、错题、复习、进度和设置入口

### Requirement: 移动端可读性
系统 SHALL 在小尺寸 iPhone 屏幕上以可读布局呈现学习内容、解析和操作控件。

#### Scenario: 用户阅读较长解析
- **WHEN** 解析包含答案原因、选项分析、翻译、词汇和短语
- **THEN** 应用以清晰分区和纵向滚动展示内容，不出现横向滚动

#### Scenario: 用户作答练习题
- **WHEN** 用户在小屏幕上查看选项
- **THEN** 每个选项都足够容易点击，并在提交后能与对应解析保持视觉关联
