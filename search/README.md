# louie. search — 接入说明

主站 `louie1.com` 的 ⌘K / Ctrl+K 搜索引擎，任何站点一行脚本接入：

```html
<script defer src="https://louie1.com/lib/search/louie-search.js"></script>
```

加载后自动监听 **⌘K**（Windows: **Ctrl+K**），弹出搜索浮层。样式隔离在
Shadow DOM 内，不会影响宿主页面。

## 搜索内容来源

| 来源 | 说明 |
|---|---|
| 内置条目 | louie.* 站点、项目、社交链接（随 SDK 发布） |
| 博客文章 | 运行时拉取 `blog.louie1.com` 的 `head_librarian.json` 与各合集 `librarian.json` —— **博客更新后无需任何操作**，搜索结果自动同步（会话内缓存 30 分钟） |
| `search/extra_content.json` | 手动追加的条目，想加什么进搜索就写在这里 |

## extra_content.json 格式

```jsonc
{
  "version": 1,
  "items": [
    {
      "title": { "zh": "标题", "en": "Title" },   // 或纯字符串
      "sub":   { "zh": "副标题", "en": "Subtitle" },
      "hint":  "example.com",                      // 右侧灰色提示
      "url":   "https://example.com",
      "newTab": true,                              // 默认 true
      "icon":  "link",   // folder/code/clock/chat/dna/github/tv/book/link/post/stack/info/mail/file/lang/heart
      "group": { "zh": "更多", "en": "More" },
      "kw":    "额外 搜索 关键词"
    }
  ]
}
```

## 可选配置（script 标签 data 属性）

```html
<script defer src="https://louie1.com/lib/search/louie-search.js"
        data-lang="zh"                <!-- 锁定语言，默认跟随浏览器 -->
        data-auto="false"             <!-- 不自动绑定快捷键，仅暴露 API -->
></script>
```

## JS API

```js
LouieSearch.open();          // 打开浮层
LouieSearch.close();
LouieSearch.toggle();
LouieSearch.setLang('en');   // 同步语言（页面切换语言时调用）
LouieSearch.prefetch();      // 提前拉取博客索引
LouieSearch.configure({
  onLangSwitch: (next) => {},  // 浮层内"切换语言"被点击时回调；
                               // 宿主页面切换自己的 UI 后再调 setLang(next)。
                               // 不设置时浮层自行切换并记住选择。
  localItems: [ /* 与 extra_content.json 相同结构，支持 run: () => {} */ ]
});
```

> 语言同步约定：**页面是语言权威**。如果你的站点自己管理双语，
> 在初始化和每次切换时调用 `LouieSearch.setLang(lang)`，并通过
> `onLangSwitch` 接管浮层内的切换动作，两边就永远一致。

## 浮层内置操作（默认列表底部「操作」分组）

- 切换语言 · English / 中文
- 查看本站源码（GitHub）
- 通过 `configure({ localItems })` 可追加自定义操作

## 跨域说明

- 博客索引托管在 GitHub Pages，自带 `Access-Control-Allow-Origin: *`。
- 主站的 `/search/*` 与 `/lib/search/*` 通过仓库根目录的 `_headers`
  文件开放 CORS，供其他子域读取。
