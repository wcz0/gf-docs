# 常见问题

## Q:框架是否支持常见的MVC开发模式

A: 当然！作为一款模块化设计的基础开发框架，GoFrame不会局限代码设计模式，并且框架提供了非常强大的模板引擎核心组件，可快速用于MVC模式中常见的模板渲染开发。相比较MVC开发模式，在复杂业务场景中，我们更推荐使大家用三层架构设计模式。

## Q:如何清晰界定和管理service和controller的分层职责

A: controller层处理Req/Res外部接口请求。负责接收、校验请求参数，并调用一个或多个 service来实现业务逻辑处理，根据返回数据结构组装数据再返回。

service层处理Input/Output内部方法调用。负责内部可复用的业务逻辑封装，封装的方法粒度往往比较细。

因此， 禁止 从controller层直接透传Req对象给service，也禁止service直接返回Res数据结构对象，因为service服务的主体与controller完全不同。当您错误地使用service方法处理特定的Req对象的时候，该方法也就与对于的外部接口耦合，仅为外部接口服务，难以复用。这种场景下service替代了controller的作用，造成了本末倒置。

如何清晰界定和管理service和dao的分层职责
这是一个很经典的问题。

痛点：

常见的，开发者把数据相关的业务逻辑实现封装到了dao代码层中，而service代码层只是简单的dao调用，这么做的话会使得原本负责维护数据的dao层代码越来越繁重，反而业务逻辑service层代码显得比较轻。开发者存在困惑，我写的业务逻辑代码到底应该放到dao还是service中？

业务逻辑其实绝大部分时候都是对数据的CURD处理，这样做会使得几乎所有的业务逻辑会逐步沉淀在dao层中，业务逻辑的改变其实会频繁对dao层的代码产生修改。例如：数据查询在初期的时候可能只是简单的逻辑，目前代码放到dao好像也没问题，但是查询需求增加或变化变得复杂之后，那么必定会继续维护修改原有的dao代码，同时service代码也可能同时做更新。原本仅限于service层的业务逻辑代码职责与dao层代码职责模糊不清、耦合较重，原本只需要修改service代码的需求变成了同时修改service+dao，使得项目中后期的开发维护成本大大增加。

建议：

我们的建议。dao层的代码应该尽量保证通用性，并且大部分场景下不需要增加额外方法，只需要使用一些通用的链式操作方法拼凑即可满足。业务逻辑、包括看似只是简单的数据操作的逻辑都应当封装到service中，service中包含多个业务模块，每个模块独自管理自己的dao对象，service与service之间通过相互调用方法来实现数据通信而不是随意去调用其他service模块的dao对象。

## Q:为什么要使用internal目录包含业务代码
A: internal目录是Golang语言专有的特性，防止同级目录外的其他目录引用其下面的内容。业务项目中存在该目录的目的，是避免若项目中存在多个子项目（特别是大仓管理模式时），多个项目之间无限制随意访问，造成难以避免的多项目不同包之间耦合。

## Q:在规范路由下，同一接口如何支持多种HTTP Method提交方式
A: 一个接口应当只做一件事情，HTTP Method是有意义的，一个接口支持多种HTTP Method方式是接口设计不合理，在规范路由下不支持。建议重新审视接口设计。

如果确实需要注册类似于ALL这种请求处理路由，在标准的OpenAPI协议里面不支持，可以不使用规范路由，而是使用普通的路由注册方式，将方法定义为func(r *ghttp.Request)即可。不同的路由注册方式可以结合使用，虽然不是很推荐

## Q:在使用默认提供的Response结构体下，如何让Data字段只返回数组而无需指定名称的键值对

A: 使用类型别名即可。