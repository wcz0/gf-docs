# 响应

响应通过 `ghttp.Response`对象实现，`ghttp.Response`对象实现了标准库的 `http.ResponseWriter`接口。数据输出使用 `Write*`相关方法实现，并且数据输出采用了 `Buffer`机制，因此数据的处理效率比较高。任何时候可以通过 `OutputBuffer`方法输出缓冲区数据到客户端，并清空缓冲区数据。

常用方法：更详细的接口列表请参考 [https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Response](https://pkg.go.dev/github.com/gogf/gf/v2/net/ghttp#Response)

## 缓冲控制

`Response`输出采用了缓冲控制，输出的内容预先写入到一块缓冲区，等待服务方法执行完毕后才真正地输出到客户端。该特性在提高执行效率同时为输出内容的控制提供了更高的灵活性。

相关方法：

```go
func (r *Response) Buffer() []byte
func (r *Response) BufferLength() int
func (r *Response) BufferString() string
func (r *Response) Flush()
func (r *Response) SetBuffer(data []byte)
```

其中 `Output`作用类似于 `Flush`将缓冲区的数据输出到客户端并清空缓冲区。

## JSON/XML

相关方法:

```
func (r *Response) WriteJson(content interface{}) error
func (r *Response) WriteJsonExit(content interface{}) error
func (r *Response) WriteJsonP(content interface{}) error
func (r *Response) WriteJsonPExit(content interface{}) error
func (r *Response) WriteXml(content interface{}, rootTag ...string) error
func (r *Response) WriteXmlExit(content interface{}, rootTag ...string) error
```

`Response`提供了对 `JSON/XML`数据格式输出的原生支持，通过以下方法实现：

1. `WriteJson*` 方法用于返回 `JSON`数据格式，参数为任意类型，可以为 `string`、`map`、`struct`等等。返回的 `Content-Type`为 `application/json`。
2. `WriteXml*` 方法用于返回 `XML`数据格式，参数为任意类型，可以为 `string`、`map`、`struct`等等。返回的 `Content-Type`为 `application/xml`。

::: tip

对 `JSON`数据格式支持的同时，同时也支持 `JSONP`协议。

:::

### `JSON`

```go
package main

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

func main() {
	s := g.Server()
	s.Group("/", func(group *ghttp.RouterGroup) {
		group.ALL("/json", func(r *ghttp.Request) {
			r.Response.WriteJson(g.Map{
				"id":   1,
				"name": "john",
			})
		})
	})
	s.SetPort(8199)
	s.Run()
}
```

### `JSONP`

需要注意使用 `JSONP`协议时必须通过 `Query`方式提供 `callback`参数。

```go
package main

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

func main() {
	s := g.Server()
	s.Group("/", func(group *ghttp.RouterGroup) {
		group.ALL("/jsonp", func(r *ghttp.Request) {
			r.Response.WriteJsonP(g.Map{
				"id":   1,
				"name": "john",
			})
		})
	})
	s.SetPort(8199)
	s.Run()
}
```

### `XML`

```go
package main

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

func main() {
	s := g.Server()
	s.Group("/", func(group *ghttp.RouterGroup) {
		group.ALL("/xml", func(r *ghttp.Request) {
            r.Response.Write(`<?xml version="1.0" encoding="UTF-8"?>`)
			r.Response.WriteXml(g.Map{
				"id":   1,
				"name": "john",
			})
		})
	})
	s.SetPort(8199)
	s.Run()
}
```

## 重定向Redirect

我们可以通过 `RedirectTo/RedirectBack`来实现页面之间的跳转，该功能通过 `Location Header`实现。相关方法：

```go
func (r *Response) RedirectBack(code ...int)
func (r *Response) RedirectTo(location string, code ...int)
```

### `RedirectTo`

`ReditectTo`用以引导客户端跳转到指定的地址，地址可以是一个本地服务的相对路径，也可以是一个完整的 `HTTP`地址。使用示例：

```go
package main

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

func main() {
	s := g.Server()
	s.BindHandler("/", func(r *ghttp.Request) {
		r.Response.RedirectTo("/login")
	})
	s.BindHandler("/login", func(r *ghttp.Request) {
		r.Response.Writeln("Login First")
	})
	s.Run()
}
```

运行后，我们通过浏览器访问 http://127.0.0.1:8000/ 随后可以 发现浏览器立即跳转到了 http://127.0.0.1:8000/login 页面。

### `RedirectBack`

`RedirectBack`用以引导客户端跳转到上一页面地址，上一页面地址是通过 `Referer Header`获取的，一般来说浏览器客户端都会传递这一Header。使用示例：

```go
package main

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

func main() {
	s := g.Server()
	s.BindHandler("/page", func(r *ghttp.Request) {
		r.Response.Writeln(`<a href="/back">back</a>`)
	})
	s.BindHandler("/back", func(r *ghttp.Request) {
		r.Response.RedirectBack()
	})
	s.Run()
}
```

运行后，我们通过浏览器访问 http://127.0.0.1:8000/page 点击页面的 `back`连接 ，可以发现点击后页面随后又跳转了回来

## Exit控制

`Exit`, `ExitAll`与 `ExitHook`

1. `Exit`: 仅退出当前执行的逻辑方法，不退出后续的请求流程，可用于替代 `return`。
2. `ExitAll`: 强行中断当前执行流程，当前执行方法的后续逻辑以及后续所有的逻辑方法将不再执行，常用于权限控制。
3. `ExitHook`: 当路由匹配到多个 `HOOK`方法时，默认是按照路由匹配优先级顺序执行 `HOOK`方法。当在 `HOOK`方法中调用 `ExitHook`方法后，后续的 `HOOK`方法将不会被继续执行，作用类似 `HOOK`方法覆盖。
4. 这三个退出函数仅在服务函数和 `HOOK`事件回调函数中有效，无法控制中间件的执行流程。

由于 `ExitAll`和 `ExitHook`方法在应用层比较少用，因此这里仅介绍 `Exit`方法的使用。

`Exit*`流程退出特性底层采用的是 `panic...recover...`机制来实现的，CPU执行损耗大约几十纳秒（`ns`），通过极少的运行时开销来提高易用性。

### `Exit`返回方法

```go
package main

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

func main() {
	s := g.Server()
	s.BindHandler("/", func(r *ghttp.Request) {
		if r.Get("type").Int() == 1 {
			r.Response.Writeln("john")
		}
		r.Response.Writeln("smith")
	})
	s.Run()
}
```

执行后，我们访问 http://127.0.0.1:8000/?type=1，可以看到页面输出了：

```
john
smith
```

我们将以上代码稍微调整一下：

```go
package main

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

func main() {
	s := g.Server()
	s.BindHandler("/", func(r *ghttp.Request) {
		if r.GetInt("type") == 1 {
            r.Response.Writeln("john")
            r.Exit()
		}
		r.Response.Writeln("smith")
	})
	s.Run()
}
```

执行后，我们再次访问 http://127.0.0.1:8000/?type=1，可以看到页面输出了：

```
john
```

此外，`Response`对象中提供了很多 `Write*Exit`的方法，表示输出内容后立即调用 `Exit`方法退出当前服务方法。

## 文件下载

`Response`对象支持文件下载。

相关方法：

```go
func (r *Response) ServeFile(path string, allowIndex ...bool)
func (r *Response) ServeFileDownload(path string, name ...string)
```

### `ServeFile`

通过给定文件路径 `path`，`ServeFile`方法将会自动识别文件格式，如果是目录或者文本内容将会直接展示文件内容。如果 `path`参数为目录，那么第二个参数 `allowIndex`控制是否可以展示目录下的文件列表。

使用示例：

```go
package main

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

func main() {
	s := g.Server()
	s.BindHandler("/", func(r *ghttp.Request) {
		r.Response.ServeFile("test.txt")
	})
	s.Run()
}
```

访问 [http://127.0.0.1:8999](http://127.0.0.1:8999/) 可以发现文件内容被展示到了页面。

### `ServeFileDownload`

`ServeFileDownload`是相对使用频率比较高的方法，用于直接引导客户端下载指定路径的文件，并可以重新给定下载的文件名称。`ServeFileDownload`方法采用的是流式下载控制，对内存占用较少。使用示例，我们把上面示例中的 `ServeFile`方法改为 `ServeFileDownload`方法：

```go
package main

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

func main() {
	s := g.Server()
	s.BindHandler("/", func(r *ghttp.Request) {
		r.Response.ServeFileDownload("test.txt")
	})
	s.Run()
}
```

## 模板解析
