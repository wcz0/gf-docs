# 数据库ORM

## 介绍

`GoFrame`框架的 `ORM`功能由 `gdb`模块实现，用于常用关系型数据库的 `ORM`操作

::: tip

`gdb`数据库引擎底层采用了 **链接池设计** ，当链接不再使用时会自动关闭，因此链接对象不用的时候不需要显式使用 `Close`方法关闭数据库连接。

:::

::: warning

为提高数据库操作安全性，在 `ORM`操作中不建议直接将参数拼接成 `SQL`字符串执行，建议使用预处理的方式（充分使用 `?`占位符）来传递 `SQL`参数。`gdb`的底层实现中均采用的是预处理的方式处理开发者传递的参数，以充分保证数据库操作安全性。

:::

**驱动引入**

为了将数据库驱动与框架主库解耦，从 `v2.1`版本开始，所有的数据库驱动都需要通过社区包手动引入。

数据库驱动的安装和引入请参考: [https://github.com/gogf/gf/tree/master/contrib/drivers](https://github.com/gogf/gf/tree/master/contrib/drivers)

**接口文档**

[https://pkg.go.dev/github.com/gogf/gf/v2/database/gdb](https://pkg.go.dev/github.com/gogf/gf/v2/database/gdb)

### 组件特性
