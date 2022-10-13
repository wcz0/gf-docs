import{_ as s,c as a,o as n,d as o}from"./app.29df8a3d.js";const A=JSON.parse('{"title":"\u8BF7\u6C42","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u8BF7\u6C42\u7B80\u4ECB","slug":"\u8BF7\u6C42\u7B80\u4ECB","link":"#\u8BF7\u6C42\u7B80\u4ECB","children":[{"level":3,"title":"\u63D0\u4EA4\u7C7B\u578B","slug":"\u63D0\u4EA4\u7C7B\u578B","link":"#\u63D0\u4EA4\u7C7B\u578B","children":[]},{"level":3,"title":"\u53C2\u6570\u4F18\u5148\u7EA7","slug":"\u53C2\u6570\u4F18\u5148\u7EA7","link":"#\u53C2\u6570\u4F18\u5148\u7EA7","children":[]}]},{"level":2,"title":"\u590D\u6742\u53C2\u6570","slug":"\u590D\u6742\u53C2\u6570","link":"#\u590D\u6742\u53C2\u6570","children":[{"level":3,"title":"\u540C\u540D\u53C2\u6570","slug":"\u540C\u540D\u53C2\u6570","link":"#\u540C\u540D\u53C2\u6570","children":[]},{"level":3,"title":"\u6570\u7EC4\u53C2\u6570","slug":"\u6570\u7EC4\u53C2\u6570","link":"#\u6570\u7EC4\u53C2\u6570","children":[]},{"level":3,"title":"Map\u53C2\u6570","slug":"map\u53C2\u6570","link":"#map\u53C2\u6570","children":[]}]},{"level":2,"title":"\u5BF9\u8C61\u5904\u7406","slug":"\u5BF9\u8C61\u5904\u7406","link":"#\u5BF9\u8C61\u5904\u7406","children":[{"level":3,"title":"\u5BF9\u8C61\u8F6C\u6362","slug":"\u5BF9\u8C61\u8F6C\u6362","link":"#\u5BF9\u8C61\u8F6C\u6362","children":[]},{"level":3,"title":"\u53C2\u6570\u6620\u5C04","slug":"\u53C2\u6570\u6620\u5C04","link":"#\u53C2\u6570\u6620\u5C04","children":[]},{"level":3,"title":"Parse \u8F6C\u6362","slug":"parse-\u8F6C\u6362","link":"#parse-\u8F6C\u6362","children":[]}]},{"level":2,"title":"Context","slug":"context","link":"#context","children":[{"level":3,"title":"\u65B9\u6CD5\u5217\u8868","slug":"\u65B9\u6CD5\u5217\u8868","link":"#\u65B9\u6CD5\u5217\u8868","children":[]}]},{"level":2,"title":"\u6587\u4EF6\u4E0A\u4F20","slug":"\u6587\u4EF6\u4E0A\u4F20","link":"#\u6587\u4EF6\u4E0A\u4F20","children":[]}],"relativePath":"guide/basics/request.md","lastUpdated":1665644317000}'),e={name:"guide/basics/request.md"},l=o(`<h1 id="\u8BF7\u6C42" tabindex="-1">\u8BF7\u6C42 <a class="header-anchor" href="#\u8BF7\u6C42" aria-hidden="true">#</a></h1><p>\u8BF7\u6C42\u8F93\u5165\u4F9D\u9760 <code>ghttp.Request</code> \u5BF9\u8C61\u5B9E\u73B0\uFF0C<code>ghttp.Request</code>\u7EE7\u627F\u4E86\u5E95\u5C42\u7684 <code>http.Request</code>\u5BF9\u8C61</p><p>\u76F8\u5173\u65B9\u6CD5: <a href="https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Request" target="_blank" rel="noreferrer">https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Request</a></p><h2 id="\u8BF7\u6C42\u7B80\u4ECB" tabindex="-1">\u8BF7\u6C42\u7B80\u4ECB <a class="header-anchor" href="#\u8BF7\u6C42\u7B80\u4ECB" aria-hidden="true">#</a></h2><h3 id="\u63D0\u4EA4\u7C7B\u578B" tabindex="-1">\u63D0\u4EA4\u7C7B\u578B <a class="header-anchor" href="#\u63D0\u4EA4\u7C7B\u578B" aria-hidden="true">#</a></h3><p><code>GoFrame</code>\u6846\u67B6\u7684\u53C2\u6570\u83B7\u53D6\u4E0D\u662F\u901A\u8FC7 <code>HTTP Method</code>\u6765\u505A\u533A\u5206\uFF0C\u800C\u662F\u901A\u8FC7\u53C2\u6570\u63D0\u4EA4\u7C7B\u578B\u6765\u533A\u5206\u3002\u4F8B\u5982\uFF0C\u5206\u522B\u901A\u8FC7 <code>HTTP Method: POST\u3001INPUT\u3001DELETE</code>\u6765\u63D0\u4EA4\u8868\u5355\u53C2\u6570\uFF0C\u5728\u670D\u52A1\u7AEF\u83B7\u53D6\u53C2\u6570\u4E0D\u662F\u901A\u8FC7 <code>GetPost</code>/<code>GetInput</code>/<code>GetDelete</code>\u7684\u65B9\u5F0F\u6765\u83B7\u53D6\uFF0C\u800C\u662F\u7EDF\u4E00\u901A\u8FC7 <code>GetForm</code>\u65B9\u6CD5\u6765\u83B7\u53D6\u8868\u5355\u53C2\u6570\uFF0C\u9488\u5BF9\u5176\u4ED6\u7684 <code>HTTP Method</code>\u4E5F\u662F\u5982\u6B64\u3002</p><p>\u5728 <code>GoFrame</code>\u6846\u67B6\u4E0B\uFF0C\u6709\u4EE5\u4E0B\u51E0\u79CD\u63D0\u4EA4\u7C7B\u578B\uFF1A</p><ol><li><code>Router</code>: \u8DEF\u7531\u53C2\u6570\uFF0C\u6765\u6E90\u4E8E\u8DEF\u7531\u89C4\u5219\u5339\u914D</li><li><code>Query</code>: <code>URL</code>\u4E2D\u7684 <code>Query String</code>\u53C2\u6570\u89E3\u6790</li><li><code>Form</code>: \u8868\u5355\u63D0\u4EA4\u53C2\u6570\uFF0C\u6700\u5E38\u89C1\u7684\u63D0\u4EA4\u65B9\u5F0F\uFF0C\u63D0\u4EA4\u7684 <code>Content-Type</code>\u5F80\u5F80\u4E3A\uFF1A<code>application/x-www-form-urlencoded</code>\u3001<code>multipart/form-data</code>\u3001<code>multipart/mixed</code>\u3002</li><li><code>Body</code>: \u539F\u59CB\u63D0\u4EA4\u5185\u5BB9\uFF0C\u4ECE <code>Body</code>\u4E2D\u83B7\u53D6\u5E76\u89E3\u6790\u5F97\u5230\u7684\u53C2\u6570\uFF0C<code>JSON</code>/<code>XML</code>\u8BF7\u6C42\u5F80\u5F80\u4F7F\u7528\u8FD9\u79CD\u65B9\u5F0F\u63D0\u4EA4\u3002</li><li><code>Custom</code>: \u81EA\u5B9A\u4E49\u53C2\u6570\uFF0C\u5F80\u5F80\u5728\u670D\u52A1\u7AEF\u7684\u4E2D\u95F4\u4EF6\u3001\u670D\u52A1\u51FD\u6570\u4E2D\u901A\u8FC7 <code>SetParam/GetParam</code>\u65B9\u6CD5\u7BA1\u7406\u3002</li></ol><p>\u83B7\u53D6\u7684\u53C2\u6570\u65B9\u6CD5\u53EF\u4EE5\u5BF9\u6307\u5B9A\u952E\u540D\u7684\u6570\u636E\u8FDB\u884C\u81EA\u52A8\u7C7B\u578B\u8F6C\u6362, \u83B7\u53D6\u5230\u7684\u53C2\u6570\u90FD\u662F\u6CDB\u578B\u53D8\u91CF\uFF0C\u6839\u636E\u8BE5\u6CDB\u578B\u53D8\u91CF\u518D\u6839\u636E\u9700\u8981\u8C03\u7528\u5BF9\u5E94\u7684\u65B9\u6CD5\u8F6C\u6362\u4E3A\u5BF9\u5E94\u7684\u6570\u636E\u7C7B\u578B\u3002</p><h3 id="\u53C2\u6570\u4F18\u5148\u7EA7" tabindex="-1">\u53C2\u6570\u4F18\u5148\u7EA7 <a class="header-anchor" href="#\u53C2\u6570\u4F18\u5148\u7EA7" aria-hidden="true">#</a></h3><p>\u5728 <code>GoFrame</code>\u6846\u67B6\u4E0B\uFF0C\u6211\u4EEC\u6839\u636E\u4E0D\u540C\u7684\u83B7\u53D6\u65B9\u6CD5\uFF0C\u5C06\u4F1A\u6309\u7167\u4E0D\u540C\u7684\u4F18\u5148\u7EA7\u8FDB\u884C\u83B7\u53D6\uFF0C\u4F18\u5148\u7EA7\u9AD8\u7684\u65B9\u5F0F\u63D0\u4EA4\u7684\u53C2\u6570\u5C06\u4F1A\u4F18\u5148\u8986\u76D6\u5176\u4ED6\u65B9\u5F0F\u7684\u540C\u540D\u53C2\u6570\u3002\u4F18\u5148\u7EA7\u89C4\u5219\u5982\u4E0B\uFF1A</p><ol><li><code>Get</code>\u53CA <code>GetRequset</code>\u65B9\u6CD5\uFF1A<code>Router &lt; Query &lt; Body &lt; Form &lt; Custom</code>\uFF0C\u4E5F\u5C31\u662F\u8BF4\u81EA\u5B9A\u4E49\u53C2\u6570\u7684\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u5176\u6B21\u662F <code>Form</code>\u8868\u5355\u53C2\u6570\uFF0C\u518D\u6B21\u662F <code>Body</code>\u63D0\u4EA4\u53C2\u6570\uFF0C\u4EE5\u6B64\u7C7B\u63A8\u3002\u4F8B\u5982\uFF0C<code>Query</code>\u548C <code>Form</code>\u4E2D\u90FD\u63D0\u4EA4\u4E86\u540C\u6837\u540D\u79F0\u7684\u53C2\u6570 <code>id</code>\uFF0C\u53C2\u6570\u503C\u5206\u522B\u4E3A <code>1</code>\u548C <code>2</code>\uFF0C\u90A3\u4E48 <code>Get(&quot;id&quot;)</code>/<code>GetForm(&quot;id&quot;)</code>\u5C06\u4F1A\u8FD4\u56DE <code>2</code>\uFF0C\u800C <code>GetQuery(&quot;id&quot;)</code>\u5C06\u4F1A\u8FD4\u56DE <code>1</code>\u3002</li><li><code>GetQuery</code>\u65B9\u6CD5\uFF1A<code>Query &gt; Body</code>\uFF0C\u4E5F\u5C31\u662F\u8BF4 <code>query string</code>\u7684\u53C2\u6570\u5C06\u4F1A\u8986\u76D6 <code>Body</code>\u4E2D\u63D0\u4EA4\u7684\u540C\u540D\u53C2\u6570\u3002\u4F8B\u5982\uFF0C<code>Query</code>\u548C <code>Body</code>\u4E2D\u90FD\u63D0\u4EA4\u4E86\u540C\u6837\u540D\u79F0\u7684\u53C2\u6570 <code>id</code>\uFF0C\u53C2\u6570\u503C\u5206\u522B\u4E3A <code>1</code>\u548C <code>2</code>\uFF0C\u90A3\u4E48 <code>Get(&quot;id&quot;)</code>\u5C06\u4F1A\u8FD4\u56DE <code>2</code>\uFF0C\u800C <code>GetQuery(&quot;id&quot;)</code>\u5C06\u4F1A\u8FD4\u56DE <code>1</code>\u3002</li><li><code>GetForm</code>\u65B9\u6CD5\uFF1A\u7531\u4E8E\u8BE5\u7C7B\u578B\u7684\u65B9\u6CD5\u4EC5\u7528\u4E8E\u83B7\u53D6 <code>Form</code>\u8868\u5355\u53C2\u6570\uFF0C\u56E0\u6B64\u6CA1\u4EC0\u4E48\u4F18\u5148\u7EA7\u7684\u5DEE\u522B\u3002</li></ol><h2 id="\u590D\u6742\u53C2\u6570" tabindex="-1">\u590D\u6742\u53C2\u6570 <a class="header-anchor" href="#\u590D\u6742\u53C2\u6570" aria-hidden="true">#</a></h2><p><code>ghttp.Request</code>\u5BF9\u8C61\u652F\u6301\u667A\u80FD\u7684\u53C2\u6570\u7C7B\u578B\u89E3\u6790\uFF08\u4E0D\u533A\u5206\u8BF7\u6C42\u63D0\u4EA4\u65B9\u5F0F\u53CA\u8BF7\u6C42\u63D0\u4EA4\u7C7B\u578B\uFF09\uFF0C\u4EE5\u4E0B\u4E3A\u63D0\u4EA4\u53C2\u6570\u793A\u4F8B\u4EE5\u53CA\u670D\u52A1\u7AEF\u5BF9\u5E94\u89E3\u6790\u7684\u53D8\u91CF\u7C7B\u578B</p><table><thead><tr><th>Parameter</th><th>Variable</th></tr></thead><tbody><tr><td><code>k1=m&amp;k2=n</code></td><td><code>map[k1:m k2:n]</code></td></tr><tr><td><code>k=m&amp;k=n</code></td><td><code>map[k:n]</code></td></tr><tr><td><code>k=m&amp;k[a]=n</code></td><td><code>error</code></td></tr><tr><td><code>k[]=m&amp;k[]=n</code></td><td><code>map[k:[m n]]</code></td></tr><tr><td><code>k[a]=m&amp;k[b]=n</code></td><td><code>map[k:map[a:m b:n]]</code></td></tr><tr><td><code>k[a][]=m&amp;k[a][]=n</code></td><td><code>map[k:map[a:[m n]]]</code></td></tr><tr><td><code>k[a][a]=m&amp;k[a][b]=n</code></td><td><code>map[k:map[a:map[a:m b:n]]]</code></td></tr></tbody></table><h3 id="\u540C\u540D\u53C2\u6570" tabindex="-1">\u540C\u540D\u53C2\u6570 <a class="header-anchor" href="#\u540C\u540D\u53C2\u6570" aria-hidden="true">#</a></h3><p>\u540C\u540D\u53C2\u6570\u63D0\u4EA4\u683C\u5F0F\u4E3A: k=v1&amp;k=v2, \u540E\u7EED\u7684\u53D8\u91CF\u503C\u5C06\u4F1A\u8986\u76D6\u524D\u9762\u7684\u53D8\u91CF\u503C</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u5728\u6807\u51C6\u5E93 <code>net/http</code>\u5904\u7406\u4E2D\uFF0C\u63D0\u4EA4\u7684\u540C\u540D\u53C2\u6570\u5C06\u4F1A\u88AB\u8F6C\u6362\u4E3A\u5B57\u7B26\u4E32\u6570\u7EC4\u3002</p></div><h3 id="\u6570\u7EC4\u53C2\u6570" tabindex="-1">\u6570\u7EC4\u53C2\u6570 <a class="header-anchor" href="#\u6570\u7EC4\u53C2\u6570" aria-hidden="true">#</a></h3><p>\u63D0\u4EA4\u683C\u5F0F\u4E3A: k[]=v1&amp;k1[]=v2</p><h3 id="map\u53C2\u6570" tabindex="-1">Map\u53C2\u6570 <a class="header-anchor" href="#map\u53C2\u6570" aria-hidden="true">#</a></h3><p>\u63D0\u4EA4\u683C\u5F0F\u4E3A: k[a]=1&amp;k[b]=2, \u5E76\u4E14\u652F\u6301\u591A\u7EA7Map, \u4F8B\u5982: k[a][a]=1&amp;k[a][b]=2</p><h2 id="\u5BF9\u8C61\u5904\u7406" tabindex="-1">\u5BF9\u8C61\u5904\u7406 <a class="header-anchor" href="#\u5BF9\u8C61\u5904\u7406" aria-hidden="true">#</a></h2><h3 id="\u5BF9\u8C61\u8F6C\u6362" tabindex="-1">\u5BF9\u8C61\u8F6C\u6362 <a class="header-anchor" href="#\u5BF9\u8C61\u8F6C\u6362" aria-hidden="true">#</a></h3><p>\u5BF9\u8C61\u8F6C\u6362\u5728\u8BF7\u6C42\u5904\u7406\u4E2D\u975E\u5E38\u5E38\u89C1\u3002\u6211\u4EEC\u63A8\u8350\u5C06\u8F93\u5165\u548C\u8F93\u51FA\u5B9A\u4E49\u4E3A <code>struct</code>\u7ED3\u6784\u4F53\u5BF9\u8C61\uFF0C\u4EE5\u4FBF\u4E8E\u7ED3\u6784\u5316\u7684\u53C2\u6570\u8F93\u5165\u8F93\u51FA\u7EF4\u62A4\u3002<code>GoFrame</code>\u6846\u67B6\u652F\u6301\u975E\u5E38\u4FBF\u6377\u7684\u5BF9\u8C61\u8F6C\u6362\uFF0C\u652F\u6301\u5C06\u5BA2\u6237\u7AEF\u63D0\u4EA4\u7684\u53C2\u6570\u5982 <code>Query</code>\u53C2\u6570\u3001\u8868\u5355\u53C2\u6570\u3001\u5185\u5BB9\u53C2\u6570\u3001<code>JSON/XML</code>\u7B49\u53C2\u6570\u975E\u5E38\u4FBF\u6377\u5730\u8F6C\u6362\u4E3A\u6307\u5B9A\u7684 <code>struct</code>\u7ED3\u6784\u4F53\uFF0C\u5E76\u4E14\u652F\u6301\u63D0\u4EA4\u53C2\u6570\u4E0E <code>struct</code>\u5C5E\u6027\u7684\u6620\u5C04\u5173\u7CFB\u7EF4\u62A4\u3002</p><p>\u5BF9\u8C61\u8F6C\u6362\u65B9\u6CD5\u4F7F\u7528 <code>Request</code>\u5BF9\u8C61\u7684 <code>Parse</code>\u65B9\u6CD5\u6216\u8005 <code>Get*Struct</code>\u65B9\u6CD5\uFF0C\u5177\u4F53\u65B9\u6CD5\u5B9A\u4E49\u8BF7\u53C2\u8003API\u6587\u6863\uFF1A <a href="https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Request" target="_blank" rel="noreferrer">https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Request</a></p><h3 id="\u53C2\u6570\u6620\u5C04" tabindex="-1">\u53C2\u6570\u6620\u5C04 <a class="header-anchor" href="#\u53C2\u6570\u6620\u5C04" aria-hidden="true">#</a></h3><h4 id="\u9ED8\u8BA4\u89C4\u5219" tabindex="-1">\u9ED8\u8BA4\u89C4\u5219 <a class="header-anchor" href="#\u9ED8\u8BA4\u89C4\u5219" aria-hidden="true">#</a></h4><p>\u5BA2\u6237\u7AEF\u63D0\u4EA4\u7684\u53C2\u6570\u5982\u679C\u9700\u8981\u6620\u5C04\u5230\u670D\u52A1\u7AEF\u5B9A\u4E49\u7684 <code>struct</code>\u5C5E\u6027\u4E0A\uFF0C\u53EF\u4EE5\u91C7\u7528\u9ED8\u8BA4\u7684\u6620\u5C04\u5173\u7CFB\uFF0C\u8FD9\u4E00\u70B9\u975E\u5E38\u65B9\u4FBF\u3002\u9ED8\u8BA4\u7684\u8F6C\u6362\u89C4\u5219\u5982\u4E0B\uFF1A</p><ol><li><code>struct</code>\u4E2D\u9700\u8981\u5339\u914D\u7684\u5C5E\u6027\u5FC5\u987B\u4E3A <strong><code>\u516C\u5F00\u5C5E\u6027</code></strong> (\u9996\u5B57\u6BCD\u5927\u5199)\u3002</li><li>\u53C2\u6570\u540D\u79F0\u4F1A\u81EA\u52A8\u6309\u7167 <strong><code>\u4E0D\u533A\u5206\u5927\u5C0F\u5199</code></strong> \u4E14 <strong>\u5FFD\u7565 <code>-/_/\u7A7A\u683C</code>\u7B26\u53F7</strong> \u7684\u5F62\u5F0F\u4E0E <code>struct</code>\u5C5E\u6027\u8FDB\u884C\u5339\u914D\u3002</li><li>\u5982\u679C\u5339\u914D\u6210\u529F\uFF0C\u90A3\u4E48\u5C06\u952E\u503C\u8D4B\u503C\u7ED9\u5C5E\u6027\uFF0C\u5982\u679C\u65E0\u6CD5\u5339\u914D\uFF0C\u90A3\u4E48\u5FFD\u7565\u8BE5\u952E\u503C\u3002</li></ol><p>\u793A\u4F8B:</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">map\u952E\u540D    struct\u5C5E\u6027     \u662F\u5426\u5339\u914D</span></span>
<span class="line"><span style="color:#A6ACCD;">name       Name           match</span></span>
<span class="line"><span style="color:#A6ACCD;">Email      Email          match</span></span>
<span class="line"><span style="color:#A6ACCD;">nickname   NickName       match</span></span>
<span class="line"><span style="color:#A6ACCD;">NICKNAME   NickName       match</span></span>
<span class="line"><span style="color:#A6ACCD;">Nick-Name  NickName       match</span></span>
<span class="line"><span style="color:#A6ACCD;">nick_name  NickName       match</span></span>
<span class="line"><span style="color:#A6ACCD;">nick name  NickName       match</span></span>
<span class="line"><span style="color:#A6ACCD;">NickName   Nick_Name      match</span></span>
<span class="line"><span style="color:#A6ACCD;">Nick-name  Nick_Name      match</span></span>
<span class="line"><span style="color:#A6ACCD;">nick_name  Nick_Name      match</span></span>
<span class="line"><span style="color:#A6ACCD;">nick name  Nick_Name      match</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u7531\u4E8E\u5E95\u5C42\u5BF9\u8C61\u8F6C\u6362\u5B9E\u73B0\u4F7F\u7528\u7684\u662F <code>gconv</code>\u6A21\u5757\uFF0C\u56E0\u6B64\u4E5F\u652F\u6301 <code>c/gconv/json</code>\u6807\u7B7E\uFF0C\u66F4\u8BE6\u7EC6\u7684\u89C4\u5219\u53EF\u4EE5\u53C2\u8003\u8BF7\u53C2\u8003 <a href="#%E8%AF%B7%E6%B1%82%E7%AE%80%E4%BB%8B">\u7C7B\u578B\u8F6C\u6362-Struct\u8F6C\u6362</a>\u3002</p></div><h4 id="\u81EA\u5B9A\u4E49\u89C4\u5219" tabindex="-1">\u81EA\u5B9A\u4E49\u89C4\u5219 <a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u89C4\u5219" aria-hidden="true">#</a></h4><p>\u81EA\u5B9A\u4E49\u7684\u53C2\u6570\u6620\u5C04\u89C4\u5219\u53EF\u4EE5\u901A\u8FC7\u4E3A <code>struct</code>\u5C5E\u6027\u7ED1\u5B9A <code>tag</code>\u5B9E\u73B0\uFF0C<code>tag</code>\u540D\u79F0\u53EF\u4EE5\u4E3A <code>p/param/params</code></p><p>\u793A\u4F8B:</p><div class="language-go"><button class="copy"></button><span class="lang">go</span><pre><code><span class="line"><span style="color:#89DDFF;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">User</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">struct{</span></span>
<span class="line"><span style="color:#A6ACCD;">    Id    </span><span style="color:#C792EA;">int</span></span>
<span class="line"><span style="color:#A6ACCD;">    Name  </span><span style="color:#C792EA;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">    Pass1 </span><span style="color:#C792EA;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">p:&quot;password1&quot;</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#A6ACCD;">    Pass2 </span><span style="color:#C792EA;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">p:&quot;password2&quot;</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5176\u4E2D\u6211\u4EEC\u4F7F\u7528\u4E86 <code>p</code>\u6807\u7B7E\u6765\u6307\u5B9A\u8BE5\u5C5E\u6027\u7ED1\u5B9A\u7684\u53C2\u6570\u540D\u79F0\u3002<code>password1</code>\u53C2\u6570\u5C06\u4F1A\u6620\u5C04\u5230 <code>Pass1</code>\u5C5E\u6027\uFF0C<code>password2</code>\u5C06\u4F1A\u6620\u5C04\u5230 <code>Pass2</code>\u5C5E\u6027\u4E0A\u3002\u5176\u4ED6\u5C5E\u6027\u91C7\u7528\u9ED8\u8BA4\u7684\u8F6C\u6362\u89C4\u5219\u5373\u53EF\uFF0C\u65E0\u9700\u8BBE\u7F6E <code>tag</code>\u3002</p><h3 id="parse-\u8F6C\u6362" tabindex="-1">Parse \u8F6C\u6362 <a class="header-anchor" href="#parse-\u8F6C\u6362" aria-hidden="true">#</a></h3><p>\u6211\u4EEC\u540C\u65F6\u53EF\u4EE5\u4F7F\u7528 <code>Parse</code>\u65B9\u6CD5\u6765\u5B9E\u73B0 <code>struct</code>\u7684\u8F6C\u6362\uFF0C\u8BE5\u65B9\u6CD5\u662F\u4E00\u4E2A\u4FBF\u6377\u65B9\u6CD5\uFF0C\u5185\u90E8\u4F1A\u81EA\u52A8\u8FDB\u884C\u8F6C\u6362\u53CA\u6570\u636E\u6821\u9A8C\uFF0C\u4F46\u5982\u679C <code>struct</code>\u4E2D\u6CA1\u6709\u6821\u9A8C <code>tag</code>\u7684\u7ED1\u5B9A\u5C06\u4E0D\u4F1A\u6267\u884C\u6821\u9A8C\u903B\u8F91\u3002</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u4ECE <code>GoFrame v2</code>\u7248\u672C\u5F00\u59CB\uFF0C\u6211\u4EEC\u63A8\u8350\u4F7F\u7528\u7ED3\u6784\u5316\u7684\u65B9\u5F0F\u6765\u5B9A\u4E49\u8DEF\u7531\u65B9\u6CD5\uFF0C\u66F4\u4FBF\u6377\u5730\u7BA1\u7406\u8F93\u5165\u8F93\u51FA\u6570\u636E\u7ED3\u6784\u53CA\u5176\u5B9E\u4F8B\u5BF9\u8C61\uFF0C\u5177\u4F53\u8BF7\u53C2\u8003\uFF1A<a href="./route.html#\u89C4\u8303\u6CE8\u518C-\u63A8\u8350">\u8DEF\u7531\u6CE8\u518C-\u89C4\u8303\u8DEF\u7531</a></p></div><h2 id="context" tabindex="-1">Context <a class="header-anchor" href="#context" aria-hidden="true">#</a></h2><p>\u8BF7\u6C42\u6D41\u7A0B\u5F80\u5F80\u4F1A\u5728\u4E0A\u4E0B\u6587\u4E2D\u5171\u4EAB\u4E00\u4E9B\u81EA\u5B9A\u4E49\u8BBE\u7F6E\u7684\u53D8\u91CF\uFF0C\u4F8B\u5982\u5728\u8BF7\u6C42\u5F00\u59CB\u4E4B\u524D\u901A\u8FC7\u4E2D\u95F4\u4EF6\u8BBE\u7F6E\u4E00\u4E9B\u53D8\u91CF\uFF0C\u968F\u540E\u5728\u8DEF\u7531\u670D\u52A1\u65B9\u6CD5\u4E2D\u53EF\u4EE5\u83B7\u53D6\u8BE5\u53D8\u91CF\u5E76\u76F8\u5E94\u5BF9\u4E00\u4E9B\u5904\u7406.</p><p>\u5728 <code>GoFrame</code>\u6846\u67B6\u4E2D\uFF0C\u6211\u4EEC\u63A8\u8350\u4F7F\u7528 <code>Context</code>\u4E0A\u4E0B\u6587\u5BF9\u8C61\u6765\u5904\u7406\u6D41\u7A0B\u5171\u4EAB\u7684\u4E0A\u4E0B\u6587\u53D8\u91CF\uFF0C\u751A\u81F3\u5C06\u8BE5\u5BF9\u8C61\u8FDB\u4E00\u6B65\u4F20\u9012\u5230\u4F9D\u8D56\u7684\u5404\u4E2A\u6A21\u5757\u65B9\u6CD5\u4E2D\u3002</p><h3 id="\u65B9\u6CD5\u5217\u8868" tabindex="-1">\u65B9\u6CD5\u5217\u8868 <a class="header-anchor" href="#\u65B9\u6CD5\u5217\u8868" aria-hidden="true">#</a></h3><div class="language-go"><button class="copy"></button><span class="lang">go</span><pre><code><span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GetCtx</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Context</span></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">SetCtx</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ctx context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Context</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GetCtxVar</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">key </span><span style="color:#89DDFF;">interface{},</span><span style="color:#A6ACCD;"> def </span><span style="color:#89DDFF;">...interface{})</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">gvar</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Var</span></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">SetCtxVar</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">key </span><span style="color:#89DDFF;">interface{},</span><span style="color:#A6ACCD;"> value </span><span style="color:#89DDFF;">interface{})</span></span>
<span class="line"></span></code></pre></div><ul><li><code>GetCtx</code>\u65B9\u6CD5\u7528\u4E8E\u83B7\u53D6\u5F53\u524D\u7684 <code>context.Context</code>\u5BF9\u8C61\uFF0C\u4F5C\u7528\u540C <code>Context</code>\u65B9\u6CD5\u3002</li><li><code>SetCtx</code>\u65B9\u6CD5\u7528\u4E8E\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u7684 <code>context.Context</code>\u4E0A\u4E0B\u6587\u5BF9\u8C61\u3002</li><li><code>GetCtxVar</code>\u65B9\u6CD5\u7528\u4E8E\u83B7\u53D6\u4E0A\u4E0B\u6587\u53D8\u91CF\uFF0C\u5E76\u53EF\u7ED9\u5B9A\u5F53\u8BE5\u53D8\u91CF\u4E0D\u5B58\u5728\u65F6\u7684\u9ED8\u8BA4\u503C\u3002</li><li><code>SetCtxVar</code>\u65B9\u6CD5\u7528\u4E8E\u8BBE\u7F6E\u4E0A\u4E0B\u6587\u53D8\u91CF\u3002</li></ul><p>\u793A\u4F8B:</p><p><code>SetCtx</code>\u65B9\u6CD5\u5E38\u7528\u4E8E\u4E2D\u95F4\u4EF6\u4E2D\u6574\u5408\u4E00\u4E9B\u7B2C\u4E09\u65B9\u7684\u7EC4\u4EF6\uFF0C\u4F8B\u5982\u7B2C\u4E09\u65B9\u7684\u94FE\u8DEF\u8DDF\u8E2A\u7EC4\u4EF6\u7B49\u7B49\u3002</p><div class="language-go"><button class="copy"></button><span class="lang">go</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">context</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">github.com/gogf/gf/v2/frame/g</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">github.com/gogf/gf/v2/net/ghttp</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">	TraceIdName </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">trace-id</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	s </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> g</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Server</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">	s</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Group</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func(</span><span style="color:#A6ACCD;">group </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">ghttp</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">RouterGroup</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		group</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Middleware</span><span style="color:#89DDFF;">(func(</span><span style="color:#A6ACCD;">r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">ghttp</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			ctx </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> context</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WithValue</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Context</span><span style="color:#89DDFF;">(),</span><span style="color:#A6ACCD;"> TraceIdName</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">HBm876TFCde435Tgf</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">			r</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">SetCtx</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ctx</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">			r</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Middleware</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Next</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">		group</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ALL</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func(</span><span style="color:#A6ACCD;">r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">ghttp</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			r</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Write</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Context</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">Value</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">TraceIdName</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#676E95;">// \u4E5F\u53EF\u4EE5\u4F7F\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#676E95;">// r.Response.Write(r.GetCtxVar(TraceIdName))</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">	s</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Run</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="\u6587\u4EF6\u4E0A\u4F20" tabindex="-1">\u6587\u4EF6\u4E0A\u4F20 <a class="header-anchor" href="#\u6587\u4EF6\u4E0A\u4F20" aria-hidden="true">#</a></h2><p>\u5728\u670D\u52A1\u7AEF\u901A\u8FC7 <code>Request</code>\u5BF9\u8C61\u83B7\u53D6\u4E0A\u4F20\u6587\u4EF6\uFF1A</p><div class="language-go"><button class="copy"></button><span class="lang">go</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">github.com/gogf/gf/v2/frame/g</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">github.com/gogf/gf/v2/net/ghttp</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// Upload uploads files to /tmp .</span></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Upload</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">ghttp</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	files </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> r</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetUploadFiles</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">upload-file</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    names</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> files</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Save</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/tmp/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		r</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteExit</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	r</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteExit</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">upload successfully: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> names</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	s </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> g</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Server</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">	s</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Group</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/upload</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func(</span><span style="color:#A6ACCD;">group </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">ghttp</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">RouterGroup</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		group</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">POST</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Upload</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">	s</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Run</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><a href="http://127.0.0.1:8000/upload" target="_blank" rel="noreferrer">http://127.0.0.1:8000/upload</a> \u63A5\u53E3\u7528\u4E8E\u6587\u4EF6\u4E0A\u4F20\uFF0C\u8BE5\u63A5\u53E3\u540C\u65F6\u652F\u6301\u5355\u4E2A\u6587\u4EF6\u6216\u8005\u591A\u4E2A\u6587\u4EF6\u4E0A\u4F20\uFF1B</p><p><strong>\u5173\u952E\u4EE3\u7801\u8BF4\u660E</strong></p><ol><li>\u6211\u4EEC\u5728\u670D\u52A1\u7AEF\u53EF\u4EE5\u901A\u8FC7 <code>r.GetUploadFiles</code>\u65B9\u6CD5\u83B7\u5F97\u4E0A\u4F20\u7684\u6240\u6709\u6587\u4EF6\u5BF9\u8C61\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7 <code>r.GetUploadFile</code>\u83B7\u53D6\u5355\u4E2A\u4E0A\u4F20\u7684\u6587\u4EF6\u5BF9\u8C61\u3002</li><li>\u5728 <code>r.GetUploadFiles(&quot;upload-file&quot;)</code>\u4E2D\u7684\u53C2\u6570 <code>&quot;upload-file&quot;</code>\u4E3A\u672C\u793A\u4F8B\u4E2D\u5BA2\u6237\u7AEF\u4E0A\u4F20\u65F6\u7684\u8868\u5355\u6587\u4EF6\u57DF\u540D\u79F0\uFF0C\u5F00\u53D1\u8005\u53EF\u4EE5\u6839\u636E\u524D\u540E\u7AEF\u7EA6\u5B9A\u5728\u5BA2\u6237\u7AEF\u4E2D\u5B9A\u4E49\uFF0C\u4EE5\u65B9\u4FBF\u670D\u52A1\u7AEF\u63A5\u6536\u8868\u5355\u6587\u4EF6\u57DF\u53C2\u6570\u3002</li><li>\u901A\u8FC7 <code>files.Save</code>\u53EF\u4EE5\u5C06\u4E0A\u4F20\u7684\u591A\u4E2A\u6587\u4EF6\u65B9\u4FBF\u5730\u4FDD\u5B58\u5230\u6307\u5B9A\u7684\u76EE\u5F55\u4E0B\uFF0C\u5E76\u8FD4\u56DE\u4FDD\u5B58\u6210\u529F\u7684\u6587\u4EF6\u540D\u3002\u5982\u679C\u662F\u6279\u91CF\u4FDD\u5B58\uFF0C\u53EA\u8981\u4EFB\u610F\u4E00\u4E2A\u6587\u4EF6\u4FDD\u5B58\u5931\u8D25\uFF0C\u90FD\u5C06\u4F1A\u7ACB\u5373\u8FD4\u56DE\u9519\u8BEF\u3002\u6B64\u5916\uFF0C<code>Save</code>\u65B9\u6CD5\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u652F\u6301\u968F\u673A\u81EA\u52A8\u547D\u540D\u4E0A\u4F20\u6587\u4EF6\u3002</li><li>\u901A\u8FC7 <code>group.POST(&quot;/&quot;, Upload)</code>\u6CE8\u518C\u7684\u8DEF\u7531\u4EC5\u652F\u6301 <code>POST</code>\u65B9\u5F0F\u8BBF\u95EE\u3002</li></ol>`,56),p=[l];function t(c,r,D,d,F,y){return n(),a("div",null,p)}const C=s(e,[["render",t]]);export{A as __pageData,C as default};
