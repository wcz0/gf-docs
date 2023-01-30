import{_ as e,c as a,o,d as c}from"./app.ce21e48a.js";const u=JSON.parse('{"title":"如何从v1升级到v2","description":"","frontmatter":{},"headers":[{"level":2,"title":"写在前面","slug":"写在前面","link":"#写在前面","children":[]},{"level":2,"title":"v1与v2的兼容性","slug":"v1与v2的兼容性","link":"#v1与v2的兼容性","children":[]},{"level":2,"title":"将依赖替换为v2","slug":"将依赖替换为v2","link":"#将依赖替换为v2","children":[]}],"relativePath":"guide/introduction/upgrade.md","lastUpdated":1675081585000}'),d={name:"guide/introduction/upgrade.md"},t=c(`<h1 id="如何从v1升级到v2" tabindex="-1">如何从v1升级到v2 <a class="header-anchor" href="#如何从v1升级到v2" aria-hidden="true">#</a></h1><h2 id="写在前面" tabindex="-1">写在前面 <a class="header-anchor" href="#写在前面" aria-hidden="true">#</a></h2><p><code>GoFrame</code>框架发布了 <code>v2</code>版本，这是一个里程碑版本，包含了很多新功能特性和大量改进，并且发布了一些开创性的特性。</p><p>如果是新用户，请直接使用 <code>v2</code>起飞。如果是老用户，墙裂推荐从 <code>v1</code>升级为 <code>v2</code>，更加稳定可靠。</p><p><code>v2</code>升级的几点重要说明：</p><ol><li>为保证兼容性，按照 <code>Golang</code>官方 <code>module</code>管理的规范，我们将 <code>import</code>路径变化了，因此需要全局替换 <code>import</code>路径。</li><li>由于是大版本升级，因此存在部分方法删减、更新的情况，大家放心一切都有更好的方案提供啦。</li><li>一般来说升级后重新编译，根据编译错误提示修改代码即可完成升级。</li><li><code>gredis</code>组件由于支持集群化，因此配置发生了变化，这块需要注意。</li></ol><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>我们没有提供升级工具，因为我们觉得提供升级指导即可。</p></div><h2 id="v1与v2的兼容性" tabindex="-1">v1与v2的兼容性 <a class="header-anchor" href="#v1与v2的兼容性" aria-hidden="true">#</a></h2><p>为了保证项目兼容性，能够同时依赖 <code>v1</code>和 <code>v2</code>版本，因此我们发布了 <code>v1</code>最后一个版本 <code>v1.16.7</code>，大家有需要可以升级。并且解决了 <code>client_tracing.go:73:3: undefined: attribute.Any</code>的常见问题。但同时依赖两个版本的 <code>GoFrame</code>可能会降低项目维护性，因此建议大家尽快升级到 <code>v2</code>版本。</p><h2 id="将依赖替换为v2" tabindex="-1">将依赖替换为v2 <a class="header-anchor" href="#将依赖替换为v2" aria-hidden="true">#</a></h2><p>全局替换源代码即可，规则如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&quot;github.com/gogf/gf/ =&gt; &quot;github.com/gogf/gf/v2/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h1 id="下载最新v2版本" tabindex="-1">下载最新v2版本 <a class="header-anchor" href="#下载最新v2版本" aria-hidden="true">#</a></h1><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">go</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-u</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">github.com/gogf/gf/v2@latest</span></span>
<span class="line"></span></code></pre></div><h1 id="工程目录的调整" tabindex="-1">工程目录的调整 <a class="header-anchor" href="#工程目录的调整" aria-hidden="true">#</a></h1><p>如果您使用的是 <code>GoFrame</code>官方推荐的工程目录结构，可以参考最新的工程目录结构手动调整即可：<a href="./../getting-start/structure.html">目录结构</a></p><p>需要注意的是，最新的 <code>cli</code>工具不再支持旧版工程目录的项目创建。</p><h1 id="编译运行修改" tabindex="-1">编译运行修改 <a class="header-anchor" href="#编译运行修改" aria-hidden="true">#</a></h1><p>运行您的项目，如果遇到编译问题，根据错误提示进行手动修改，如此循环。</p><p>如果您不知道如何修改，请在本文档评论，我们的社区团队小伙伴将会及时给与升级帮助。</p><h1 id="cli的重要变化" tabindex="-1">CLI的重要变化 <a class="header-anchor" href="#cli的重要变化" aria-hidden="true">#</a></h1><ol><li>去掉了 <code>swagger</code>命令。<code>v1</code>版本的 <code>gf swagger</code>命令时通过自动安装第三方的 <code>swag</code>工具，解析源代码中的注释生成的 <code>swagger</code>文档。这种文档的管理维护方式会有一些问题：仅支持 <code>Swagger2.0</code>协议、使用体验很差、注释难以和代码同步维护，造成接口文档与代码不一致的问题。新版本有了规范路由，该命令即废弃掉了。如果需要继续使用该命令的功能，可以手动安装使用第三方 <code>swag</code>工具：<a href="https://github.com/swaggo/swag" target="_blank" rel="noreferrer">https://github.com/swaggo/swag</a></li><li>去掉了 <code>update</code>命令。<code>v2</code>版本开始，<code>CLI</code>工具的安装下载统一走 <code>github</code>，以减少 <code>CLI</code>工具的维护工作量。后续可能会重新增加该命令。</li></ol><h1 id="一些重要说明" tabindex="-1">一些重要说明 <a class="header-anchor" href="#一些重要说明" aria-hidden="true">#</a></h1><ol><li><code>gf-cli</code>的仓库已经搬迁到了 <code>gf</code>主库维护，便于保证工具与框架版本同步。原有仓库不再维护。具体请查看说明：<a href="https://github.com/gogf/gf/tree/master/cmd/gf" target="_blank" rel="noreferrer">https://github.com/gogf/gf/tree/master/cmd/gf</a></li><li>框架核心组件采用了接口化设计，为保证接口通用性，对外暴露的方法有个别删减。</li><li>框架核心组件大量使用了 <code>gvar</code>泛型，以提高易用性、屏蔽底层的具体类型实现。为保证稳定性和易用性，框架在未来 <code>2-3</code>年内不会考虑使用 <code>Golang</code>官方泛型。官方泛型在框架部分组件的部分特性下有改造价值。</li></ol>`,24),s=[t];function l(i,r,n,h,p,g){return o(),a("div",null,s)}const f=e(d,[["render",l]]);export{u as __pageData,f as default};
