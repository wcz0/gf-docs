# 配置管理

## 基本介绍

`GoFrame`的配置管理由 `gcfg`组件实现，`gcfg`组件的所有方法是并发安全的。`gcfg`组件采用接口化设计，默认提供的是基于文件系统的接口实现。

**使用方式** ：

```go
import "github.com/gogf/gf/v2/os/gcfg"
```

**接口文档** : [https://pkg.go.dev/github.com/gogf/gf/v2/os/gcfg](https://pkg.go.dev/github.com/gogf/gf/v2/os/gcfg)

### 组件特性

`gcfg`组件具有以下显著特性：

* 接口化设计，很高的灵活性及扩展性，默认提供文件系统接口实现
* 支持多种常见配置文件格式：`yaml/toml/json/xml/ini/properties`
* 支持配置项不存在时读取指定环境变量或命令行参数
* 支持检索读取资源管理组件中的配置文件
* 支持配置文件自动检测热更新特性
* 支持层级访问配置项
* 支持单例管理模式

## 配置对象

我们推荐使用单例模式获取配置管理对象。我们可以方便地通过 `g.Cfg()`获取默认的全局配置管理对象。同时，我们也可以通过 `gcfg.Instance`包方法获取配置管理对象单例。

### 使用 `g.Cfg`

我们来看一个示例，演示如何读取全局配置的信息。需要注意的是，全局配置是与框架相关的，因此统一使用 `g.Cfg()`进行获取。以下是一个默认的全局配置文件，包含了模板引擎的目录配置以及 `MySQL`数据库集群（两台 `master`）的配置。

示例配置：

```yaml
viewpath: "/home/www/templates/"
database:
  default:
  - link: "mysql:root:12345678@tcp(127.0.0.1:3306)/test"
    role: "master"
  - link: "mysql:root:12345678@tcp(127.0.0.1:3306)/test"
    role: "slave"
```

示例代码：

```go
package main

import (
	"fmt"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gctx"
)

func main() {
	var ctx = gctx.New()
	fmt.Println(g.Cfg().Get(ctx, "viewpath"))
	fmt.Println(g.Cfg().Get(ctx, "database.default.0.role"))
}
```

以上示例为读取数据库的第一个配置的 `role`信息。运行后输出：

```
/home/www/templates/
master
```

可以看到，我们可以通过 `g.Cfg()`方法获取一个全局的配置管理器单例对象。配置文件内容可以通过英文“`.`”号进行层级访问（数组默认从 `0`开始），`pattern`参数 `database.default.0.role`表示读取 `database`配置项中 `default`数据库集群中的第 `0`项数据库服务器的 `role`数据。

### 使用 `gcfg.Instance`

当然也可以独立使用 `gcfg`包，通过 `Instance`方法获取单例对象。

```go
import (
	"fmt"

	"github.com/gogf/gf/v2/os/gcfg"
	"github.com/gogf/gf/v2/os/gctx"
)

func main() {
	var ctx = gctx.New()
	fmt.Println(gcfg.Instance().Get(ctx, "viewpath"))
	fmt.Println(gcfg.Instance().Get(ctx, "database.default.0.role"))
}
```

### 自动检索特性

单例对象在创建时会按照文件后缀 `toml/yaml/yml/json/ini/xml/properties`自动检索配置文件。默认情况下会自动检索配置文件 `config.toml/yaml/yml/json/ini/xml/properties`并缓存，配置文件在外部被修改时将会自动刷新缓存。

为方便多文件场景下的配置文件调用，简便使用并提高开发效率，单例对象在创建时将会自动使用**单例名称**进行文件检索。例如：`g.Cfg("redis")`获取到的单例对象将默认会自动检索 `redis.toml/yaml/yml/json/ini/xml/properties`，如果检索成功那么将该文件加载到内存缓存中，下一次将会直接从内存中读取；当该文件不存在时，则使用默认的配置文件（`config.toml`）。

## 文件配置

`gcfg`组件采用接口化设计，默认提供的是基于文件系统的接口实现。支持的数据文件格式包括： `JSON/XML/YAML(YML)/TOML/INI/PROPERTIES`，项目中开发者可以灵活地选择自己熟悉的配置文件格式来进行配置管理。

### 配置文件

#### 默认配置文件

配置对象我们推荐使用单例方式获取，单例对象将会按照文件后缀 `toml/yaml/yml/json/ini/xml/properties`文自动检索配置文件。默认情况下会自动检索配置文件 `config.toml/yaml/yml/json/ini/xml/properties`并缓存，配置文件在外部被修改时将会自动刷新缓存。

如果想要自定义文件格式，可以通过 `SetFileName`方法修改默认读取的配置文件名称（如：`default.yaml`, `default.json`, `default.xml`等等）。例如，我们可以通过以下方式读取 `default.yaml`配置文件中的数据库 `database`配置项。

```go
// 设置默认配置文件，默认读取的配置文件设置为 default.yaml
g.Cfg().GetAdapter().(*gcfg.AdapterFile).SetFileName("default.yaml")

// 后续读取时将会读取到 default.yaml 配置文件内容
g.Cfg().Get(ctx, "database")
```

#### 默认文件修改

文件可以是一个具体的文件名称或者完整的文件绝对路径。

我们可以通过多种方式修改默认文件名称：

1. 通过配置管理方法 `SetFileName`修改。
2. 修改命令行启动参数 - `gf.gcfg.file`。
3. 修改指定的环境变量 - `GF_GCFG_FILE`。

假如我们的执行程序文件为 `main`，那么可以通过以下方式修改配置管理器的配置文件目录(`Linux`下)：

1. ****通过单例模式****

   ```
   g.Cfg().GetAdapter().(*gcfg.AdapterFile).SetFileName("default.yaml")
   ```
2. **通过命令行启动参数**

   ```shell
    ./main --gf.gcfg.file=config.prod.toml
   ```
3. **通过环境变量（常用在容器中）**

   * 启动时修改环境变量：
     ```shell
       GF_GCFG_FILE=config.prod.toml; ./main
     ```
   * 使用 `genv`模块来修改环境变量：
     ```go
       genv.Set("GF_GCFG_FILE", "config.prod.toml")
     ```

### 配置目录

#### 目录配置方法

`gcfg`配置管理器支持非常灵活的多目录自动搜索功能，通过 `SetPath`可以修改目录管理目录为**唯一**的目录地址，同时，我们推荐通过 `AddPath`方法添加多个搜索目录，配置管理器底层将会按照添加目录的顺序作为优先级进行自动检索。直到检索到一个匹配的文件路径为止，如果在所有搜索目录下查找不到配置文件，那么会返回失败。

#### 默认目录配置

`gcfg`配置管理对象初始化时，默认会自动添加以下配置文件搜索目录：

1. **当前工作目录及其下的 `config`、`manifest/config`目录** ：例如当前的工作目录为 `/home/www`时，将会添加：
2. `/home/www`
3. `/home/www/config`
4. `/home/www/manifest/config`
5. **当前可执行文件所在目录及其下的 `config`、`manifest/config`目录** ：例如二进制文件所在目录为 `/tmp`时，将会添加：
6. `/tmp`
7. `/tmp/config`
8. `/tmp/manifest/config`
9. **当前 `main`源代码包所在目录及其下的 `config`、`manifest/config`目录** (仅对源码开发环境有效)：例如 `main`包所在目录为 `/home/john/workspace/gf-app`时，将会添加：
10. `/home/john/workspace/gf-app`
11. `/home/john/workspace/gf-app/config`
12. `/home/john/workspace/gf-app/manifest/config`

#### 默认目录修改

注意这里修改的参数必须是一个目录，不能是文件路径。

我们可以通过以下方式修改配置管理器的配置文件搜索目录，配置管理对象将会只在该指定目录执行配置文件检索：

1. 通过配置管理器的 `SetPath`方法手动修改；
2. 修改命令行启动参数 - `gf.gcfg.path`；
3. 修改指定的环境变量 - `GF_GCFG_PATH`；

假如我们的执行程序文件为 `main`，那么可以通过以下方式修改配置管理器的配置文件目录(Linux下)：

1. **通过单例模式**

   ```
   g.Cfg().GetAdapter().(*gcfg.AdapterFile).SetPath("/opt/config")
   ```
2. **通过命令行启动参数**

   ```shell
    ./main --gf.gcfg.path=/opt/config/
   ```
3. **通过环境变量（常用在容器中）**

   * 启动时修改环境变量：
     ```shell
       GF_GCFG_PATH=/opt/config/; ./main
     ```
   * 使用 `genv`模块来修改环境变量：
     ```go
       genv.Set("GF_GCFG_PATH", "/opt/config")
     ```

### 内容配置

`gcfg`包也支持直接内容配置，而不是读取配置文件，常用于程序内部动态修改配置内容。通过以下包配置方法实现全局的配置：

```go
func (c *AdapterFile) SetContent(content string, file ...string)
func (c *AdapterFile) GetContent(file ...string) string
func (c *AdapterFile) RemoveContent(file ...string)
func (c *AdapterFile) ClearContent()
```

需要注意的是该配置是全局生效的，并且优先级会高于读取配置文件。因此，假如我们通过 `SetContent("v = 1", "config.toml")`配置了 `config.toml`的配置内容，并且也同时存在 `config.toml`配置文件，那么只会使用到 `SetContent`的配置内容，而配置文件内容将会被忽略。

### 层级访问

在默认提供的文件系统接口实现下，`gcfg`组件支持按层级获取配置数据，层级访问默认通过英文 `.`号指定，其中 `pattern`参数和 [通用编解码-gjson](https://goframe.org/pages/viewpage.action?pageId=1114881) 的 `pattern`参数一致。例如以下配置（`config.yaml`）：

```yaml
server:
  address:    ":8199"
  serverRoot: "resource/public"

database:
  default:
    link:   "mysql:root:12345678@tcp(127.0.0.1:3306)/focus"
    debug:  true
```

例如针对以上配置文件内容的层级读取：

```go
// :8199
g.Cfg().Get("server.address")

// true
g.Cfg().Get("database.default.debug")
```

### 注意事项

大家都知道，在 `Golang`里面，`map/slice`类型其实是一个”引用类型”（也叫”指针类型”），因此当你对这种类型的变量 键值对/索引项 进行修改时，会同时修改到其对应的底层数据。从效率上考虑，`gcfg`包某些获取方法返回的数据类型为 `map/slice`时，没有对其做值拷贝，因此当你对返回的数据进行修改时，会同时修改 `gcfg`对应的底层数据。

例如：

```go
// For testing/example only.
content := `{"map":{"key":"value"}, "slice":[59,90]}`
gcfg.SetContent(content)
defer gcfg.RemoveContent()

m := g.Cfg().GetMap("map")
fmt.Println(m)

// Change the key-value pair.
m["key"] = "john"

// It changes the underlying key-value pair.
fmt.Println(g.Cfg().GetMap("map"))

s := g.Cfg().GetArray("slice")
fmt.Println(s)

// Change the value of specified index.
s[0] = 100

// It changes the underlying slice.
fmt.Println(g.Cfg().GetArray("slice"))

// output:
// map[key:value]
// map[key:john]
// [59 90]
// [100 90]
```

### 检测更新

配置管理器使用了 **缓存机制** ，当配置文件第一次被读取后会被缓存到内存中，下一次读取时将会直接从缓存中获取，以提高性能。同时，配置管理器提供了对配置文件的 **自动检测更新机制** ，当配置文件在外部被修改后，配置管理器能够即时地刷新配置文件的缓存内容。

## 常用方法

## 接口化设计

## YAML格式

### 简介

YAML 语言（发音 /ˈjæməl/ ）的设计目标，就是方便人类读写。它实质上是一种通用的数据串行化格式。

它的基本语法规则如下。

* 大小写敏感
* 使用缩进表示层级关系
* 缩进时不允许使用Tab键，只允许使用空格。
* 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

`#` 表示注释，从这个字符一直到行尾，都会被解析器忽略。

YAML 支持的数据结构有三种。

* 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
* 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
* 纯量（scalars）：单个的、不可再分的值

以下分别介绍这三种数据结构。

### 对象

对象的一组键值对，使用冒号结构表示。

```yaml
animal: pets
```

转为 JavaScript 如下。

```javascript
{ animal: 'pets' }
```

Yaml 也允许另一种写法，将所有键值对写成一个行内对象。

```yaml
hash: { name: Steve, foo: bar } 
```

转为 JavaScript 如下。

```javascript
{ hash: { name: 'Steve', foo: 'bar' } }
```

### 数组

一组连词线开头的行，构成一个数组。

```yaml
- Cat
- Dog
- Goldfish
```

转为 JavaScript 如下。

```javascript
[ 'Cat', 'Dog', 'Goldfish' ]
```

数据结构的子成员是一个数组，则可以在该项下面缩进一个空格。

```yaml
-
 - Cat
 - Dog
 - Goldfish
```

转为 JavaScript 如下。

```javascript
[ [ 'Cat', 'Dog', 'Goldfish' ] ]
```

数组也可以采用行内表示法。

```yaml
animal: [Cat, Dog]
```

转为 JavaScript 如下。

```javascript
{ animal: [ 'Cat', 'Dog' ] }
```

### 复合结构

对象和数组可以结合使用，形成复合结构。

```yaml
languages:
 - Ruby
 - Perl
 - Python 
websites:
 YAML: yaml.org 
 Ruby: ruby-lang.org 
 Python: python.org 
 Perl: use.perl.org 
```

转为 JavaScript 如下。

```javascript
{ languages: [ 'Ruby', 'Perl', 'Python' ],
  websites: 
   { YAML: 'yaml.org',
     Ruby: 'ruby-lang.org',
     Python: 'python.org',
     Perl: 'use.perl.org' } }
```

### 纯量

纯量是最基本的、不可再分的值。以下数据类型都属于 JavaScript 的纯量。

* 字符串
* 布尔值
* 整数
* 浮点数
* Null
* 时间
* 日期

数值直接以字面量的形式表示。

```yaml
number: 12.30
```

转为 JavaScript 如下。

```javascript
{ number: 12.30 }
```

布尔值用 `true`和 `false`表示。

```yaml
isSet: true
```

转为 JavaScript 如下。

```javascript
{ isSet: true }
```

`null`用 `~`表示。

```javascript
parent: ~ 
```

转为 JavaScript 如下。

```yaml
{ parent: null }
```

时间采用 ISO8601 格式。

```javascript
iso8601: 2001-12-14t21:59:43.10-05:00 
```

转为 JavaScript 如下。

```javascript
{ iso8601: new Date('2001-12-14t21:59:43.10-05:00') }
```

日期采用复合 iso8601 格式的年、月、日表示。

```yaml
date: 1976-07-31
```

转为 JavaScript 如下。

```javascript
{ date: new Date('1976-07-31') }
```

YAML 允许使用两个感叹号，强制转换数据类型。

```yaml
e: !!str 123
f: !!str true
```

转为 JavaScript 如下。

```javascript
{ e: '123', f: 'true' }
```

### 字符串

字符串是最常见，也是最复杂的一种数据类型。

字符串默认不使用引号表示。

```yaml
str: 这是一行字符串
```

转为 JavaScript 如下。

```javascript
{ str: '这是一行字符串' }
```

如果字符串之中包含空格或特殊字符，需要放在引号之中。

```yaml
str: '内容： 字符串'
```

转为 JavaScript 如下。

```javascript
{ str: '内容: 字符串' }
```

单引号和双引号都可以使用，双引号不会对特殊字符转义。

```yaml
s1: '内容\n字符串'
s2: "内容\n字符串"
```

转为 JavaScript 如下。

```javascript
{ s1: '内容\\n字符串', s2: '内容\n字符串' }
```

单引号之中如果还有单引号，必须连续使用两个单引号转义。

```javascript
str: 'labor''s day' 
```

转为 JavaScript 如下。

```javascript
{ str: 'labor\'s day' }
```

字符串可以写成多行，从第二行开始，必须有一个单空格缩进。换行符会被转为空格。

```yaml
str: 这是一段
  多行
  字符串
```

转为 JavaScript 如下。

```javascript
{ str: '这是一段 多行 字符串' }
```

多行字符串可以使用 `|`保留换行符，也可以使用 `>`折叠换行。

```yaml
this: |
  Foo
  Bar
that: >
  Foo
  Bar
```

转为 JavaScript 代码如下。

```javascript
{ this: 'Foo\nBar\n', that: 'Foo Bar\n' }
```

`+`表示保留文字块末尾的换行，`-`表示删除字符串末尾的换行。

```yaml
s1: |
  Foo
>
s2: |+
  Foo
>
>
s3: |-
  Foo
```

转为 JavaScript 代码如下。

```javascript
{ s1: 'Foo\n', s2: 'Foo\n\n\n', s3: 'Foo' }
```

字符串之中可以插入 HTML 标记。

```yaml
message: |
>
  <p style="color: red">
    段落
  </p>
```

转为 JavaScript 如下。

```javascript
{ message: '\n<p style="color: red">\n  段落\n</p>\n' }
```

### 引用

锚点 `&`和别名 `*`，可以用来引用。

```yaml
defaults: &defaults
  adapter:  postgres
  host:     localhost
>
development:
  database: myapp_development
  <<: *defaults
>
test:
  database: myapp_test
  <<: *defaults
```

等同于下面的代码。

```javascript
>
defaults:
  adapter:  postgres
  host:     localhost
>
development:
  database: myapp_development
  adapter:  postgres
  host:     localhost
>
test:
  database: myapp_test
  adapter:  postgres
  host:     localhost
```

`&`用来建立锚点（`defaults`），`<<`表示合并到当前数据，`*`用来引用锚点。

下面是另一个例子。

```yaml
- &showell Steve 
- Clark 
- Brian 
- Oren 
- *showell 
```

转为 JavaScript 代码如下。

```javascript
[ 'Steve', 'Clark', 'Brian', 'Oren', 'Steve' ]
```

## TOML格式

### 基本介绍

`Toml`是一种易读、`mini`语言，由 `github`前CEO `Tom`创建。`Tom's Obvious, Minimal Language`。

`TOML`致力于配置文件的小型化和易读性。

1. WIKI介绍: [https://github.com/toml-lang/toml/wiki](https://github.com/toml-lang/toml/wiki)
2. 官方地址: [https://github.com/toml-lang/toml](https://github.com/toml-lang/toml)
3. 汉化版: [https://github.com/LongTengDao/TOML](https://github.com/LongTengDao/TOML)

### 与其他格式比较

`TOML`与用于应用程序配置和数据序列化的其他文件格式(如 `YAML`和 `JSON`)具有相同的特性。`TOML`和 `JSON`都很简单，并且使用普遍存在的数据类型，这使得它们易于编写代码或使用机器进行解析。`TOML`和 `YAML`都强调人的可读性，比如注释，它使理解给定行的目的变得更容易。`TOML`的不同之处在于，它支持注释(不像 `JSON`)，但保持了简单性(不像 `YAML`)。

由于 `TOML`被显式地设计为一种配置文件格式，所以解析它很容易，但并不打算序列化任意的数据结构。`TOML`的文件顶层是一个哈希表，它很容易在键中嵌套数据，但是它不允许顶级数组或浮点数，所以它不能直接序列化一些数据。也没有标准来标识 `TOML`文件的开始或结束，这会使通过流发送文件变得复杂。这些细节必须在应用层进行协商。

`INI`文件经常与 `TOML`进行比较，因为它们在语法和用作配置文件方面具有相似性。然而，`INI`没有标准化的格式，它们不能优雅地处理超过一两个层次的嵌套。

### 基础语法

```toml
title = "TOML 例子"

[owner]
name = "Tom Preston-Werner"
organization = "GitHub"
bio = "GitHub Cofounder & CEO\nLikes tater tots and beer."
dob = 1979-05-27T07:32:00Z # 日期时间是一等公民。为什么不呢？

[database]
server = "192.168.1.1"
ports = [ 8001, 8001, 8002 ]
connection_max = 5000
enabled = true

[servers]
  # 你可以依照你的意愿缩进。使用空格或Tab。TOML不会在意。
  [servers.alpha]
  ip = "10.0.0.1"
  dc = "eqdc10"

  [servers.beta]
  ip = "10.0.0.2"
  dc = "eqdc10"

[clients]
data = [ ["gamma", "delta"], [1, 2] ]

#在数组里换行没有关系。
hosts = [
  "alpha",
  "omega"
]
```

特点：

* 大小写敏感，必须是 `UTF-8`编码
* 注释：`#`
* 空白符：`tab(0x09)`或 `space(0x20)`
* 换行符：`LF(0x0A)`或 `CRLF(0x0D 0x0A)`
* 键值对：同一行，无值的键不可用，每行只能保存一个键值对

`TOML`主要结构是键值对，与 `JSON`类似。值必须是如下类型： `String`, `Integer`, `Float`, `Boolean`, `Datetime`, `Array`, `Table`

### 注释

使用 `#` 表示注释：

```toml
# I am a comment. Hear me roar. Roar.
key = "value" # Yeah, you can do this.
```

### 字符串

`TOML`中有4种字符串表示方法：基本、多行-基本、字面量、多行-字面量

#### 1. 基本字符串

由双引号包裹，所有 `Unicode`字符均可出现，除了双引号、反斜线、控制字符(`U+0000` to `U+001F`)需要转义。

#### 2. 多行-基本字符串

由三个双引号包裹，除了分隔符开始的换行外，字符串内的换行将被保留：

```toml
str1 = """
Roses are red
Violets are blue"""
```

#### 3. 字面量字符串

由单引号包裹，其内不允许转义，因此可以方便的表示基本字符串中需要转义的内容：

```toml
winpath = 'C:\Users\nodejs\templates'
```

#### 4. 多行-字面量字符串

与多行-基本字符串相似：

```toml
str1 = '''
Roses are red
Violets are blue'''
```

### 数值与BOOL值

```toml
int1  = +99
flt3  = -0.01
bool1 = true
```

### 日期时间

```toml
date = 1979-05-27T07:32:00Z
```

### 数组

数组使用方括号包裹。空格会被忽略。元素使用逗号分隔。

注意，同一个数组下不允许混用数据类型。

```toml
array1 = [ 1, 2, 3 ]
array2 = [ "red", "yellow", "green" ]
array3 = [ [ 1, 2 ], [3, 4, 5] ]
array4 = [ [ 1, 2 ], ["a", "b", "c"] ] # 这是可以的。
array5 = [ 1, 2.0 ] # 注意：这是不行的。
```

### 表格

表格（也叫哈希表或字典）是键值对的集合。它们在方括号内，自成一行。注意和数组相区分，数组只有值。

```toml
[table]
```

在此之下，直到下一个　`table` 或　`EOF` 之前，是这个表格的键值对。键在左，值在右，等号在中间。键以非空字符开始，以等号前的非空字符为结尾。键值对是无序的。

```toml
[table]
key = "value"
```

你可以随意缩进，使用 `Tab` 或 `空格`。为什么要缩进呢？因为你可以嵌套表格。

嵌套表格的表格名称中使用 `.`符号。你可以任意命名你的表格，只是不要用点，点是保留的。

```toml
[dog.tater]
type = "pug"
```

以上等价于如下的 `JSON` 结构：

```go
{ "dog": { "tater": { "type": "pug" } } }
```

如果你不想的话，你不用声明所有的父表。TOML　知道该如何处理。

```toml
# [x] 你
# [x.y] 不需要
# [x.y.z] 这些
[x.y.z.w] # 可以直接写
```

空表是允许的，其中没有键值对。

只要父表没有被直接定义，而且没有定义一个特定的键，你可以继续写入：

```toml
[a.b]
c = 1

[a]
d = 2
```

然而你不能多次定义键和表格。这么做是不合法的。

```toml
# 别这么干！

[a]
b = 1

[a]
c = 2
# 也别这个干

[a]
b = 1

[a.b]
c = 2
```

### 表格数组

最后要介绍的类型是表格数组。表格数组可以通过包裹在双方括号内的表格名来表达。使用相同的双方括号名称的表格是同一个数组的元素。表格按照书写的顺序插入。双方括号表格如果没有键值对，会被当成空表。

```toml
[[products]]
name = "Hammer"
sku = 738594937

[[products]]

[[products]]
name = "Nail"
sku = 284758393
color = "gray"
```

等价于以下的　`JSON` 结构：

```go
{
  "products": [
    { "name": "Hammer", "sku": 738594937 },
    { },
    { "name": "Nail", "sku": 284758393, "color": "gray" }
  ]
}
```

表格数组同样可以嵌套。只需在子表格上使用相同的双方括号语法。每一个双方括号子表格从属于最近定义的上层表格元素。

```toml
[[fruit]]
  name = "apple"

  [fruit.physical]
    color = "red"
    shape = "round"

  [[fruit.variety]]
    name = "red delicious"

  [[fruit.variety]]
    name = "granny smith"

[[fruit]]
  name = "banana"

  [[fruit.variety]]
    name = "plantain"
```

等价于如下的　`JSON` 结构：

```go
{
  "fruit": [
    {
      "name": "apple",
      "physical": {
        "color": "red",
        "shape": "round"
      },
      "variety": [
        { "name": "red delicious" },
        { "name": "granny smith" }
      ]
    },
    {
      "name": "banana",
      "variety": [
        { "name": "plantain" }
      ]
    }
  ]
}
```

尝试定义一个普通的表格，使用已经定义的数组的名称，将抛出一个解析错误：

```toml
# 不合法的　TOML

[[fruit]]
  name = "apple"

  [[fruit.variety]]
    name = "red delicious"

  # 和上面冲突了
  [fruit.variety]
    name = "granny smith"
```
