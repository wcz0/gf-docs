# 数据验证

`goframe`框架提供了功能强大、使用便捷、灵活易扩展的数据/表单校验组件，由 `gvalid`组件实现。`gvalid`组件实现了非常强大的数据校验功能，内置了数十种常用的校验规则，支持单数据多规则校验、多数据多规则批量校验、自定义错误信息、自定义正则校验、自定义校验规则注册、支持 `i18n`国际化处理、支持 `struct tag`规则及提示信息绑定等等特性，是目前功能最强大的 `Go`数据校验模块。

::: tip

数据校验设计的灵感来源于经典的 `PHP Laravel`框架 [https://laravel.com/](https://laravel.com/) 感谢 `Laravel` ❤️

:::

## 验证规则

`GoFrame`框架校验组件内置了数十项常用的校验规则，校验组件是开发者最频繁使用的框架核心组件之一。

::: warning

校验规则涉及到联合校验的场景时，规则中关联的参数名称会自动按照不区分大小写且忽略特殊字符的形式进行智能匹配。

:::

### 修饰规则

修饰规则本身不做任何的验证逻辑, 而是修改功能规则的实现逻辑

#### bail

* 格式：`bail`
* 说明：只要后续的多个校验中有一个规则校验失败则停止校验并立即返回校验结果。
* 注意：在框架的 `HTTP Server`组件中，如果采用规范路由注册方式，在其自动校验特性中将会自动开启 `bail`修饰规则，开发者无需在 `Req`对象中显式设置 `bail`。
* 示例：

  ```go
  func Example_Rule_Bail() {
  	type BizReq struct {
  		Account   string `v:"bail|required|length:6,16|same:QQ"`
  		QQ        string
  		Password  string `v:"required|same:Password2"`
  		Password2 string `v:"required"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Account:   "gf",
  			QQ:        "123456",
  			Password:  "goframe.org",
  			Password2: "goframe.org",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// output:
  	// The Account value `gf` length must be between 6 and 16
  }
  ```

#### `ci`

* 格式： `ci`
* 说明：字段值比较在默认情况下为区分大小写严格匹配比较，通过 `Case Insensitive`，可以设置对于需要比较值的规则字段为不区分大小写。如：`same`, `different`, `in`, `not-in`等。
* 示例：

  ```go
  func Example_Rule_CaseInsensitive() {
  	type BizReq struct {
  		Account   string `v:"required"`
  		Password  string `v:"required|ci|same:Password2"`
  		Password2 string `v:"required"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Account:   "gf",
  			Password:  "Goframe.org", // Diff from Password2, but because of "ci", rule check passed
  			Password2: "goframe.org",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// output:
  }
  ```

#### `foreach`

* 格式：`foreach`
* 说明：将待检验的参数作为数组遍历，并将后一个校验规则应用于数组中的每一项。
* 版本：框架版本 `>=v2.2.0`
* 示例：

  ```go
  func Example_Rule_Foreach() {
  	type BizReq struct {
  		Value1 []int `v:"foreach|in:1,2,3"`
  		Value2 []int `v:"foreach|in:1,2,3"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Value1: []int{1, 2, 3},
  			Value2: []int{3, 4, 5},
  		}
  	)
  	if err := g.Validator().Bail().Data(req).Run(ctx); err != nil {
  		fmt.Println(err.String())
  	}

  	// Output:
  	// The Value2 value `4` is not in acceptable range: 1,2,3
  }
  ```

### 功能规则

功能规则实现特定的校验逻辑，框架内置了非常丰富强大的内置校验规则。

#### `required`

* 格式: `required`
* 说明：必需参数，除了支持常见的字符串，也支持 `Slice/Map`类型。
* 示例：姓名字段 `Name`为必需参数必需不能为空。

  ```go
  func Example_Rule_Required() {
  	type BizReq struct {
  		ID   uint   `v:"required"`
  		Name string `v:"required"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			ID: 1,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The Name field is required
  }
  ```

#### `required-if`

* 格式: `required-if:field,value,...`
* 说明：必需参数(当任意所给定字段值与所给值相等时，即：当 `field`字段的值为 `value`时，当前验证字段为必须参数)。多个字段以 `,`号分隔。
* 示例：当 `Gender`字段为 `1`时 `WifeName`字段必须不为空， 当 `Gender`字段为 `2`时 `HusbandName`字段必须不为空。

  ```go
  func Example_Rule_RequiredIf() {
  	type BizReq struct {
  		ID          uint   `v:"required" dc:"Your ID"`
  		Name        string `v:"required" dc:"Your name"`
  		Gender      uint   `v:"in:0,1,2" dc:"0:Secret;1:Male;2:Female"`
  		WifeName    string `v:"required-if:gender,1"`
  		HusbandName string `v:"required-if:gender,2"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			ID:     1,
  			Name:   "test",
  			Gender: 1,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The WifeName field is required
  }
  ```

#### `required-unless`

* 格式: `required-unless:field,value,...`
* 说明：必需参数(当所给定字段值与所给值都不相等时，即：当 `field`字段的值不为 `value`时，当前验证字段为必须参数)。多个字段以 `,`号分隔。
* 示例：当 `Gender`不等于 `0`且 `Gender`不等于 `2`时，`WifeName`必须不为空；当 `Id` 不等于 `0`且 `Gender` 不等于 `2`时， `HusbandName` 必须不为空。

  ```go
  func Example_Rule_RequiredUnless() {
  	type BizReq struct {
  		ID          uint   `v:"required" dc:"Your ID"`
  		Name        string `v:"required" dc:"Your name"`
  		Gender      uint   `v:"in:0,1,2" dc:"0:Secret;1:Male;2:Female"`
  		WifeName    string `v:"required-unless:gender,0,gender,2"`
  		HusbandName string `v:"required-unless:id,0,gender,2"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			ID:     1,
  			Name:   "test",
  			Gender: 1,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The WifeName field is required; The HusbandName field is required
  }
  ```

#### `required-with`

* 格式: `required-with:field1,field2,...`
* 说明：必需参数(当所给定任意字段值其中之一不为空时)。
* 示例：当 `WifeName`不为空时，`HusbandName`必须不为空。

  ```go
  func Example_Rule_RequiredWith() {
  	type BizReq struct {
  		ID          uint   `v:"required" dc:"Your ID"`
  		Name        string `v:"required" dc:"Your name"`
  		Gender      uint   `v:"in:0,1,2" dc:"0:Secret;1:Male;2:Female"`
  		WifeName    string
  		HusbandName string `v:"required-with:WifeName"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			ID:       1,
  			Name:     "test",
  			Gender:   1,
  			WifeName: "Ann",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The HusbandName field is required
  }
  ```

#### `required-with-all`

* 格式: `required-with-all:field1,field2,...`
* 说明：必须参数(当所给定所有字段值全部都不为空时)。
* 示例：当 `Id，Name，Gender，WifeName`全部不为空时，`HusbandName`必须不为空。

  ```go
  func Example_Rule_RequiredWithAll() {
  	type BizReq struct {
  		ID          uint   `v:"required" dc:"Your ID"`
  		Name        string `v:"required" dc:"Your name"`
  		Gender      uint   `v:"in:0,1,2" dc:"0:Secret;1:Male;2:Female"`
  		WifeName    string
  		HusbandName string `v:"required-with-all:Id,Name,Gender,WifeName"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			ID:       1,
  			Name:     "test",
  			Gender:   1,
  			WifeName: "Ann",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The HusbandName field is required
  }
  ```

#### `required-without`

* 格式: `required-without:field1,field2,...`
* 说明：必需参数(当所给定任意字段值其中之一为空时)。
* 示例：当 `Id`或 `WifeName`为空时，`HusbandName`必须不为空。

  ```go
  func Example_Rule_RequiredWithout() {
  	type BizReq struct {
  		ID          uint   `v:"required" dc:"Your ID"`
  		Name        string `v:"required" dc:"Your name"`
  		Gender      uint   `v:"in:0,1,2" dc:"0:Secret;1:Male;2:Female"`
  		WifeName    string
  		HusbandName string `v:"required-without:Id,WifeName"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			ID:     1,
  			Name:   "test",
  			Gender: 1,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The HusbandName field is required
  }
  ```

#### `required-without-all`

* 格式: `required-without-all:field1,field2,...`
* 说明：必须参数(当所给定所有字段值全部都为空时)。
* 示例：当 `Id`和 `WifeName`都为空时，`HusbandName`必须不为空。

  ```go
  func Example_Rule_RequiredWithoutAll() {
  	type BizReq struct {
  		ID          uint   `v:"required" dc:"Your ID"`
  		Name        string `v:"required" dc:"Your name"`
  		Gender      uint   `v:"in:0,1,2" dc:"0:Secret;1:Male;2:Female"`
  		WifeName    string
  		HusbandName string `v:"required-without-all:Id,WifeName"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Name:   "test",
  			Gender: 1,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The HusbandName field is required
  }
  ```

#### `date`

* 格式: `date`
* 说明：参数为常用日期类型，日期之间支持的连接符号 `-`或 `/`或 `.`，也支持不带连接符号的 `8`位长度日期，格式如： `2006-01-02`, `2006/01/02`, `2006.01.02`, `20060102`
* 示例：

  ```go
  func Example_Rule_Date() {
  	type BizReq struct {
  		Date1 string `v:"date"`
  		Date2 string `v:"date"`
  		Date3 string `v:"date"`
  		Date4 string `v:"date"`
  		Date5 string `v:"date"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Date1: "2021-10-31",
  			Date2: "2021.10.31",
  			Date3: "2021-Oct-31",
  			Date4: "2021 Octa 31",
  			Date5: "2021/Oct/31",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Date3 value `2021-Oct-31` is not a valid date
  	// The Date4 value `2021 Octa 31` is not a valid date
  	// The Date5 value `2021/Oct/31` is not a valid date
  }
  ```

#### `datetime`

* 格式: `datetime`
* 说明：参数为常用日期时间类型，其中日期之间支持的连接符号只支持 `-`，格式如： `2006-01-02 12:00:00`
* 示例：

  ```go
  func Example_Rule_Datetime() {
  	type BizReq struct {
  		Date1 string `v:"datetime"`
  		Date2 string `v:"datetime"`
  		Date3 string `v:"datetime"`
  		Date4 string `v:"datetime"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Date1: "2021-11-01 23:00:00",
  			Date2: "2021-11-01 23:00",     // error
  			Date3: "2021/11/01 23:00:00",  // error
  			Date4: "2021/Dec/01 23:00:00", // error
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Date2 value `2021-11-01 23:00` is not a valid datetime
  	// The Date3 value `2021/11/01 23:00:00` is not a valid datetime
  	// The Date4 value `2021/Dec/01 23:00:00` is not a valid datetime
  }
  ```

#### `date-format`

* 格式: `date-format:format`
* 说明：判断日期是否为指定的日期/时间格式，`format`参数格式为 `gtime`日期格式(可以包含日期及时间)，格式说明参考章节：[gtime模块](https://goframe.org/pages/viewpage.action?pageId=1114883)
* 示例：`date-format:Y-m-d H:i:s`

  ```go
  func Example_Rule_DateFormat() {
  	type BizReq struct {
  		Date1 string `v:"date-format:Y-m-d"`
  		Date2 string `v:"date-format:Y-m-d"`
  		Date3 string `v:"date-format:Y-m-d H:i:s"`
  		Date4 string `v:"date-format:Y-m-d H:i:s"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Date1: "2021-11-01",
  			Date2: "2021-11-01 23:00", // error
  			Date3: "2021-11-01 23:00:00",
  			Date4: "2021-11-01 23:00", // error
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Date2 value `2021-11-01 23:00` does not match the format: Y-m-d
  	// The Date4 value `2021-11-01 23:00` does not match the format: Y-m-d H:i:s
  }
  ```

#### `before`

* 格式: `before:field`
* 说明：判断给定的日期/时间是否在指定字段的日期/时间之前。
* 版本：框架版本 `>=v2.2.0`
* ```go

  ```

  func Example_Rule_Before() {
  type BizReq struct {
  Time1 string `v:"before:Time3"`
  Time2 string `v:"before:Time3"`
  Time3 string
  }
  var (
  ctx = context.Background()
  req = BizReq{
  Time1: "2022-09-02",
  Time2: "2022-09-03",
  Time3: "2022-09-03",
  }
  )
  if err := g.Validator().Data(req).Run(ctx); err != nil {
  fmt.Println(err.String())
  }

  // Output:
  // The Time2 value `2022-09-03` must be before field Time3 value `2022-09-03`
  }

```

## `before-equal`

* 格式: `before-equal:field`
* 说明：判断给定的日期/时间是否在指定字段的日期/时间之前，或者与指定字段的日期/时间相等。
* 版本：框架版本`>=v2.2.0`

  ```go
  func Example_Rule_BeforeEqual() {
  	type BizReq struct {
  		Time1 string `v:"before-equal:Time3"`
  		Time2 string `v:"before-equal:Time3"`
  		Time3 string
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Time1: "2022-09-02",
  			Time2: "2022-09-01",
  			Time3: "2022-09-01",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Time1 value `2022-09-02` must be before or equal to field Time3
  }
```

#### `after`

* 格式: `after:field`
* 说明：判断给定的日期/时间是否在指定字段的日期/时间之后。
* 版本：框架版本 `>=v2.2.0`

  ```go
  func Example_Rule_After() {
  	type BizReq struct {
  		Time1 string
  		Time2 string `v:"after:Time1"`
  		Time3 string `v:"after:Time1"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Time1: "2022-09-01",
  			Time2: "2022-09-01",
  			Time3: "2022-09-02",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err.String())
  	}

  	// Output:
  	// The Time2 value `2022-09-01` must be after field Time1 value `2022-09-01`
  }
  ```

#### `after-equal`

* 格式: `after-equal:field`
* 说明：判断给定的日期/时间是否在指定字段的日期/时间之后，或者与指定字段的日期/时间相等。
* 版本：框架版本 `>=v2.2.0`

  ```go
  func Example_Rule_AfterEqual() {
  	type BizReq struct {
  		Time1 string
  		Time2 string `v:"after-equal:Time1"`
  		Time3 string `v:"after-equal:Time1"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Time1: "2022-09-02",
  			Time2: "2022-09-01",
  			Time3: "2022-09-02",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Time2 value `2022-09-01` must be after or equal to field Time1 value `2022-09-02`
  }
  ```

#### `array`

* 格式: `array`
* 说明：判断给定的参数是否数组格式。如果给定的参数为 `JSON`数组字符串，也将检验通过。
* 版本：框架版本 `>=v2.2.0`

  ```go
  func Example_Rule_Array() {
  	type BizReq struct {
  		Value1 string   `v:"array"`
  		Value2 string   `v:"array"`
  		Value3 string   `v:"array"`
  		Value4 []string `v:"array"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Value1: "1,2,3",
  			Value2: "[]",
  			Value3: "[1,2,3]",
  			Value4: []string{},
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Value1 value `1,2,3` is not of valid array type
  }
  ```

#### `email`

* 格式：`email`
* 说明：`EMAIL`邮箱地址格式。

  ```go
  func Example_Rule_Email() {
  	type BizReq struct {
  		MailAddr1 string `v:"email"`
  		MailAddr2 string `v:"email"`
  		MailAddr3 string `v:"email"`
  		MailAddr4 string `v:"email"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			MailAddr1: "gf@goframe.org",
  			MailAddr2: "gf@goframe", // error
  			MailAddr3: "gf@goframe.org.cn",
  			MailAddr4: "gf#goframe.org", // error
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The MailAddr2 value `gf@goframe` is not a valid email address
  	// The MailAddr4 value `gf#goframe.org` is not a valid email address
  }
  ```

#### `phone`

* 格式：`phone`
* 说明：大中国区手机号格式。

  ```go
  func Example_Rule_Phone() {
  	type BizReq struct {
  		PhoneNumber1 string `v:"phone"`
  		PhoneNumber2 string `v:"phone"`
  		PhoneNumber3 string `v:"phone"`
  		PhoneNumber4 string `v:"phone"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			PhoneNumber1: "13578912345",
  			PhoneNumber2: "11578912345", // error 11x not exist
  			PhoneNumber3: "17178912345", // error 171 not exit
  			PhoneNumber4: "1357891234",  // error len must be 11
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The PhoneNumber2 value `11578912345` is not a valid phone number
  	// The PhoneNumber3 value `17178912345` is not a valid phone number
  	// The PhoneNumber4 value `1357891234` is not a valid phone number
  }
  ```

#### `phone-loose`

* 格式: `phone`
* 说明：宽松的手机号验证，只要满足 `13、14、15、16、17、18、19`开头的11位数字都可以通过验证。可用于非严格的业务场景。

  ```go
  func Example_Rule_PhoneLoose() {
  	type BizReq struct {
  		PhoneNumber1 string `v:"phone-loose"`
  		PhoneNumber2 string `v:"phone-loose"`
  		PhoneNumber3 string `v:"phone-loose"`
  		PhoneNumber4 string `v:"phone-loose"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			PhoneNumber1: "13578912345",
  			PhoneNumber2: "11578912345", // error 11x not exist
  			PhoneNumber3: "17178912345",
  			PhoneNumber4: "1357891234", // error len must be 11
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The PhoneNumber2 value `11578912345` is invalid
  	// The PhoneNumber4 value `1357891234` is invalid
  }
  ```

#### `telephone`

* 格式: `telephone`
* 说明：大中国区座机电话号码，”XXXX-XXXXXXX”、”XXXX-XXXXXXXX”、”XXX-XXXXXXX”、”XXX-XXXXXXXX”、”XXXXXXX”、”XXXXXXXX”。

  ```go
  func Example_Rule_Telephone() {
  	type BizReq struct {
  		Telephone1 string `v:"telephone"`
  		Telephone2 string `v:"telephone"`
  		Telephone3 string `v:"telephone"`
  		Telephone4 string `v:"telephone"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Telephone1: "010-77542145",
  			Telephone2: "0571-77542145",
  			Telephone3: "20-77542145", // error
  			Telephone4: "775421451",   // error len must be 7 or 8
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Telephone3 value `20-77542145` is not a valid telephone number
  	// The Telephone4 value `775421451` is not a valid telephone number
  }
  ```

#### `passport`

* 格式: `passport`
* 说明：通用帐号规则（ **字母开头，只能包含字母、数字和下划线，长度在6~18之间** ）。

  ```go
  func Example_Rule_Passport() {
  	type BizReq struct {
  		Passport1 string `v:"passport"`
  		Passport2 string `v:"passport"`
  		Passport3 string `v:"passport"`
  		Passport4 string `v:"passport"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Passport1: "goframe",
  			Passport2: "1356666",  // error starting with letter
  			Passport3: "goframe#", // error containing only numbers or underscores
  			Passport4: "gf",       // error length between 6 and 18
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Passport2 value `1356666` is not a valid passport format
  	// The Passport3 value `goframe#` is not a valid passport format
  	// The Passport4 value `gf` is not a valid passport format
  }
  ```

#### `password`

* 格式: `password`
* 说明：通用密码规则（ **任意可见字符，长度在6~18之间** ）。

  ```go
  func Example_Rule_Password() {
  	type BizReq struct {
  		Password1 string `v:"password"`
  		Password2 string `v:"password"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Password1: "goframe",
  			Password2: "gofra", // error length between 6 and 18
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The Password2 value `gofra` is not a valid password format
  }
  ```

#### `password2`

* 格式: `password2`
* 说明：中等强度密码（ **在通用密码规则的基础上，要求密码必须包含大小写字母和数字** ）。

  ```go
  func Example_Rule_Password2() {
  	type BizReq struct {
  		Password1 string `v:"password2"`
  		Password2 string `v:"password2"`
  		Password3 string `v:"password2"`
  		Password4 string `v:"password2"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Password1: "Goframe123",
  			Password2: "gofra",      // error length between 6 and 18
  			Password3: "Goframe",    // error must contain lower and upper letters and numbers.
  			Password4: "goframe123", // error must contain lower and upper letters and numbers.
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Password2 value `gofra` is not a valid password format
  	// The Password3 value `Goframe` is not a valid password format
  	// The Password4 value `goframe123` is not a valid password format
  }
  ```

#### `password3`

* 格式: `password3`
* 说明：强等强度密码（ **在通用密码规则的基础上，必须包含大小写字母、数字和特殊字符** ）。

  ```go
  func Example_Rule_Password3() {
  	type BizReq struct {
  		Password1 string `v:"password3"`
  		Password2 string `v:"password3"`
  		Password3 string `v:"password3"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Password1: "Goframe123#",
  			Password2: "gofra",      // error length between 6 and 18
  			Password3: "Goframe123", // error must contain lower and upper letters, numbers and special chars.
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Password2 value `gofra` is not a valid password format
  	// The Password3 value `Goframe123` is not a valid password format
  }
  ```

#### `postcode`

* 格式: `postcode`
* 说明：大中国区邮政编码规则。

  ```go
  func Example_Rule_Postcode() {
  	type BizReq struct {
  		Postcode1 string `v:"postcode"`
  		Postcode2 string `v:"postcode"`
  		Postcode3 string `v:"postcode"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Postcode1: "100000",
  			Postcode2: "10000",   // error length must be 6
  			Postcode3: "1000000", // error length must be 6
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Postcode2 value `10000` is not a valid postcode format
  	// The Postcode3 value `1000000` is not a valid postcode format
  }
  ```

#### `resident-id`

* 格式:  resident-id
* 说明：公民身份证号码。

  ```go
  func Example_Rule_ResidentId() {
  	type BizReq struct {
  		ResidentID1 string `v:"resident-id"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			ResidentID1: "320107199506285482",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The ResidentID1 value `320107199506285482` is not a valid resident id number
  }
  ```

#### `bank-card`

* 格式:   bank-card
* 说明：大中国区银行卡号校验。

  ```go
  func Example_Rule_BankCard() {
  	type BizReq struct {
  		BankCard1 string `v:"bank-card"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			BankCard1: "6225760079930218",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The BankCard1 value `6225760079930218` is not a valid bank card number
  }
  ```

#### `qq`

* 格式: `qq`
* 说明：腾讯QQ号码规则。

  ```go
  func Example_Rule_QQ() {
  	type BizReq struct {
  		QQ1 string `v:"qq"`
  		QQ2 string `v:"qq"`
  		QQ3 string `v:"qq"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			QQ1: "389961817",
  			QQ2: "9999",       // error >= 10000
  			QQ3: "514258412a", // error all number
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The QQ2 value `9999` is not a valid QQ number
  	// The QQ3 value `514258412a` is not a valid QQ number
  }
  ```

#### `ip`

* 格式: `ip`
* 说明：`IPv4/IPv6`地址。

  ```go
  func Example_Rule_IP() {
  	type BizReq struct {
  		IP1 string `v:"ip"`
  		IP2 string `v:"ip"`
  		IP3 string `v:"ip"`
  		IP4 string `v:"ip"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			IP1: "127.0.0.1",
  			IP2: "fe80::812b:1158:1f43:f0d1",
  			IP3: "520.255.255.255", // error >= 10000
  			IP4: "ze80::812b:1158:1f43:f0d1",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The IP3 value `520.255.255.255` is not a valid IP address
  	// The IP4 value `ze80::812b:1158:1f43:f0d1` is not a valid IP address
  }
  ```

#### `ipv4`

* 格式: `ipv4`
* 说明：`IPv4`地址。

  ```go
  func Example_Rule_IPV4() {
  	type BizReq struct {
  		IP1 string `v:"ipv4"`
  		IP2 string `v:"ipv4"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			IP1: "127.0.0.1",
  			IP2: "520.255.255.255",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The IP2 value `520.255.255.255` is not a valid IPv4 address
  }
  ```

#### `ipv6`

* 格式: `ipv6`
* 说明：`IPv6`地址。

  ```go
  func Example_Rule_IPV6() {
  	type BizReq struct {
  		IP1 string `v:"ipv6"`
  		IP2 string `v:"ipv6"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			IP1: "fe80::812b:1158:1f43:f0d1",
  			IP2: "ze80::812b:1158:1f43:f0d1",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The IP2 value `ze80::812b:1158:1f43:f0d1` is not a valid IPv6 address
  }
  ```

#### `mac`

* 格式: `mac`
* 说明：`MAC`地址。

  ```go
  func Example_Rule_Mac() {
  	type BizReq struct {
  		Mac1 string `v:"mac"`
  		Mac2 string `v:"mac"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Mac1: "4C-CC-6A-D6-B1-1A",
  			Mac2: "Z0-CC-6A-D6-B1-1A",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The Mac2 value `Z0-CC-6A-D6-B1-1A` is not a valid MAC address
  }
  ```

#### `url`

* 格式: `url`
* 说明：URL
* 示例：支持以 `http，https，ftp，file`开头的地址。

  ```go
  func Example_Rule_Url() {
  	type BizReq struct {
  		URL1 string `v:"url"`
  		URL2 string `v:"url"`
  		URL3 string `v:"url"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			URL1: "http://goframe.org",
  			URL2: "ftp://goframe.org",
  			URL3: "ws://goframe.org",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The URL3 value `ws://goframe.org` is not a valid URL address
  }
  ```

#### `domain`

* 格式: `domain`
* 说明：域名
* 示例：域名规则。`xxx.yyy`（首位必须为字母）。

  ```go
  func Example_Rule_Domain() {
  	type BizReq struct {
  		Domain1 string `v:"domain"`
  		Domain2 string `v:"domain"`
  		Domain3 string `v:"domain"`
  		Domain4 string `v:"domain"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Domain1: "goframe.org",
  			Domain2: "a.b",
  			Domain3: "goframe#org",
  			Domain4: "1a.2b",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Domain3 value `goframe#org` is not a valid domain format
  	// The Domain4 value `1a.2b` is not a valid domain format
  }
  ```

#### `size`

* 格式: `size:size`
* 说明：参数**长度**为 `<span> </span><span><span>size</span><span> </span></span>`(长度参数为整形)，注意底层使用 `Unicode`计算长度，因此中文一个汉字占 `1`个长度单位。

  ```go
  func Example_Rule_Size() {
  	type BizReq struct {
  		Size1 string `v:"size:10"`
  		Size2 string `v:"size:5"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Size1: "goframe欢迎你",
  			Size2: "goframe",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The Size2 value `goframe` length must be 5
  }
  ```

#### `length`

* 格式: `length:min,max`
* 说明：参数**长度**为 `min`到 `max`(长度参数为整形)，注意底层使用 `Unicode`计算长度，因此中文一个汉字占 `1`个长度单位。

  ```go
  func Example_Rule_Length() {
  	type BizReq struct {
  		Length1 string `v:"length:5,10"`
  		Length2 string `v:"length:10,15"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Length1: "goframe欢迎你",
  			Length2: "goframe",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The Length2 value `goframe` length must be between 10 and 15
  }
  ```

#### `min-length`

* 格式: `min-length:min`
* 说明：参数**长度**最小为 `min`(长度参数为整形)，注意底层使用 `Unicode`计算长度，因此中文一个汉字占 `1`个长度单位。

  ```go
  func Example_Rule_MinLength() {
  	type BizReq struct {
  		MinLength1 string `v:"min-length:10"`
  		MinLength2 string `v:"min-length:8"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			MinLength1: "goframe欢迎你",
  			MinLength2: "goframe",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The MinLength2 value `goframe` length must be equal or greater than 8
  }
  ```

#### `max-length`

* 格式: `max-length:max`
* 说明：参数**长度**最大为 `max`(长度参数为整形)，注意底层使用 `Unicode`计算长度，因此中文一个汉字占 `1`个长度单位。

  ```go
  func Example_Rule_MaxLength() {
  	type BizReq struct {
  		MaxLength1 string `v:"max-length:10"`
  		MaxLength2 string `v:"max-length:5"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			MaxLength1: "goframe欢迎你",
  			MaxLength2: "goframe",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The MaxLength2 value `goframe` length must be equal or lesser than 5
  }
  ```

#### `between`

* 格式: `between:min,max`
* 说明：参数**大小**为 `min`到 `max`(支持整形和浮点类型参数)。

  ```go
  func Example_Rule_Between() {
  	type BizReq struct {
  		Age1   int     `v:"between:1,100"`
  		Age2   int     `v:"between:1,100"`
  		Score1 float32 `v:"between:0.0,10.0"`
  		Score2 float32 `v:"between:0.0,10.0"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Age1:   50,
  			Age2:   101,
  			Score1: 9.8,
  			Score2: -0.5,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Age2 value `101` must be between 1 and 100
  	// The Score2 value `-0.5` must be between 0 and 10
  }
  ```

#### `min`

* 格式: `min:min`
* 说明：参数**大小**最小为 `min`(支持整形和浮点类型参数)。

  ```go
  func Example_Rule_Min() {
  	type BizReq struct {
  		Age1   int     `v:"min:100"`
  		Age2   int     `v:"min:100"`
  		Score1 float32 `v:"min:10.0"`
  		Score2 float32 `v:"min:10.0"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Age1:   50,
  			Age2:   101,
  			Score1: 9.8,
  			Score2: 10.1,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Age1 value `50` must be equal or greater than 100
  	// The Score1 value `9.8` must be equal or greater than 10
  }
  ```

#### `max`

* 格式: `max:max`
* 说明：参数**大小**最大为 `max`(支持整形和浮点类型参数)。

  ```go
  func Example_Rule_Max() {
  	type BizReq struct {
  		Age1   int     `v:"max:100"`
  		Age2   int     `v:"max:100"`
  		Score1 float32 `v:"max:10.0"`
  		Score2 float32 `v:"max:10.0"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Age1:   99,
  			Age2:   101,
  			Score1: 9.9,
  			Score2: 10.1,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Age2 value `101` must be equal or lesser than 100
  	// The Score2 value `10.1` must be equal or lesser than 10
  }
  ```

#### `json`

* 格式: `json`
* 说明：判断数据格式为 `JSON`。

  ```go
  func Example_Rule_Json() {
  	type BizReq struct {
  		JSON1 string `v:"json"`
  		JSON2 string `v:"json"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			JSON1: "{\"name\":\"goframe\",\"author\":\"郭强\"}",
  			JSON2: "{\"name\":\"goframe\",\"author\":\"郭强\",\"test\"}",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The JSON2 value `{"name":"goframe","author":"郭强","test"}` is not a valid JSON string
  }
  ```

#### `integer`

* 格式: `integer`
* 说明：整数（正整数或者负整数）。

  ```go
  func Example_Rule_Integer() {
  	type BizReq struct {
  		Integer string `v:"integer"`
  		Float   string `v:"integer"`
  		Str     string `v:"integer"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Integer: "100",
  			Float:   "10.0",
  			Str:     "goframe",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Float value `10.0` is not an integer
  	// The Str value `goframe` is not an integer
  }
  ```

#### `float`

* 格式: `float`
* 说明：浮点数。

  ```go
  func Example_Rule_Float() {
  	type BizReq struct {
  		Integer string `v:"float"`
  		Float   string `v:"float"`
  		Str     string `v:"float"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Integer: "100",
  			Float:   "10.0",
  			Str:     "goframe",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(err)
  	}

  	// Output:
  	// The Str value `goframe` is invalid
  }
  ```

#### `boolean`

* 格式: `boolean`
* 说明：布尔值(`1`,`true`,`on`,`yes`为 `true` | `0`,`false`,`off`,`no`,`""`为 `false`)。

  ```go
  func Example_Rule_Boolean() {
  	type BizReq struct {
  		Boolean bool    `v:"boolean"`
  		Integer int     `v:"boolean"`
  		Float   float32 `v:"boolean"`
  		Str1    string  `v:"boolean"`
  		Str2    string  `v:"boolean"`
  		Str3    string  `v:"boolean"`
  	}

  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Boolean: true,
  			Integer: 1,
  			Float:   10.0,
  			Str1:    "on",
  			Str2:    "",
  			Str3:    "goframe",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Float value `10` field must be true or false
  	// The Str3 value `goframe` field must be true or false
  }
  ```

#### `same`

* 格式: `same:field`
* 说明：参数值必需与 `field`字段参数的值相同。
* 示例：在用户注册时，提交密码 `Password`和确认密码 `Password2`必须相等（服务端校验）。

  ```go
  func Example_Rule_Same() {
  	type BizReq struct {
  		Name      string `v:"required"`
  		Password  string `v:"required|same:Password2"`
  		Password2 string `v:"required"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Name:      "gf",
  			Password:  "goframe.org",
  			Password2: "goframe.net",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The Password value `goframe.org` must be the same as field Password2
  }
  ```

#### `different`

* 格式: `different:field`
* 说明：参数值不能与 `field`字段参数的值相同。
* 示例：备用邮箱 `OtherMailAddr`和邮箱地址 `MailAddr`必须不相同。

  ```go
  func Example_Rule_Different() {
  	type BizReq struct {
  		Name            string `v:"required"`
  		MailAddr        string `v:"required"`
  		ConfirmMailAddr string `v:"required|different:MailAddr"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Name:            "gf",
  			MailAddr:        "gf@goframe.org",
  			ConfirmMailAddr: "gf@goframe.org",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The ConfirmMailAddr value `gf@goframe.org` must be different from field MailAddr
  }
  ```

#### `eq`

* 格式: `eq:field`
* 说明：参数值必需与 `field`字段参数的值相同。`same`规则的别名，功能同 `same`规则。
* 版本：框架版本 `>=v2.2.0`

  ```go
  func Example_Rule_EQ() {
  	type BizReq struct {
  		Name      string `v:"required"`
  		Password  string `v:"required|eq:Password2"`
  		Password2 string `v:"required"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Name:      "gf",
  			Password:  "goframe.org",
  			Password2: "goframe.net",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The Password value `goframe.org` must be equal to field Password2 value `goframe.net`
  }
  ```

#### `not-eq`

* 格式: `not-eq:field`
* 说明：参数值必需与 `field`字段参数的值不相同。`different`规则的别名，功能同 `different`规则。
* 版本：框架版本 `>=v2.2.0`

  ```go
  func Example_Rule_NotEQ() {
  	type BizReq struct {
  		Name          string `v:"required"`
  		MailAddr      string `v:"required"`
  		OtherMailAddr string `v:"required|not-eq:MailAddr"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Name:          "gf",
  			MailAddr:      "gf@goframe.org",
  			OtherMailAddr: "gf@goframe.org",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The OtherMailAddr value `gf@goframe.org` must not be equal to field MailAddr value `gf@goframe.org`
  }
  ```

#### `gt`

* 格式: `gt:field`
* 说明：参数值必需大于给定字段对应的值。
* 版本：框架版本 `>=v2.2.0`

  ```go
  func Example_Rule_GT() {
  	type BizReq struct {
  		Value1 int
  		Value2 int `v:"gt:Value1"`
  		Value3 int `v:"gt:Value1"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Value1: 1,
  			Value2: 1,
  			Value3: 2,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err.String())
  	}

  	// Output:
  	// The Value2 value `1` must be greater than field Value1 value `1`
  }
  ```

#### `gte`

* 格式: `gte:field`
* 说明：参数值必需大于或等于给定字段对应的值。
* 版本：框架版本 `>=v2.2.0`

  ```go
  func Example_Rule_GTE() {
  	type BizReq struct {
  		Value1 int
  		Value2 int `v:"gte:Value1"`
  		Value3 int `v:"gte:Value1"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Value1: 2,
  			Value2: 1,
  			Value3: 2,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err.String())
  	}

  	// Output:
  	// The Value2 value `1` must be greater than or equal to field Value1 value `2`
  }
  ```

#### `lt`

* 格式: `lt:field`
* 说明：参数值必需小于给定字段对应的值。
* 版本：框架版本 `>=v2.2.0`

  ```go
  func Example_Rule_LT() {
  	type BizReq struct {
  		Value1 int
  		Value2 int `v:"lt:Value1"`
  		Value3 int `v:"lt:Value1"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Value1: 2,
  			Value2: 1,
  			Value3: 2,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err.String())
  	}

  	// Output:
  	// The Value3 value `2` must be lesser than field Value1 value `2`
  }
  ```

#### `lte`

* 格式: `lte:field`
* 说明：参数值必需小于或等于给定字段对应的值。
* 版本：框架版本 `>=v2.2.0`

  ```go
  func Example_Rule_LTE() {
  	type BizReq struct {
  		Value1 int
  		Value2 int `v:"lte:Value1"`
  		Value3 int `v:"lte:Value1"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Value1: 1,
  			Value2: 1,
  			Value3: 2,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err.String())
  	}

  	// Output:
  	// The Value3 value `2` must be lesser than or equal to field Value1 value `1`
  }
  ```

#### `in`

* 格式: `in:value1,value2,...`
* 说明：参数值应该在 `value1,value2,...`中（字符串匹配）。
* 示例：性别字段 `Gender`的值必须在 `0/1/2`中。

  ```go
  func Example_Rule_In() {
  	type BizReq struct {
  		ID     uint   `v:"required" dc:"Your Id"`
  		Name   string `v:"required" dc:"Your name"`
  		Gender uint   `v:"in:0,1,2" dc:"0:Secret;1:Male;2:Female"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			ID:     1,
  			Name:   "test",
  			Gender: 3,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The Gender value `3` is not in acceptable range: 0,1,2
  }
  ```

#### `not-in`

* 格式: `not-in:value1,value2,...`
* 说明：参数值不应该在 `value1,value2,...`中（字符串匹配）。
* 示例：无效索引 `InvalidIndex`的值必须不在 `-1/0/1`中。

  ```go
  func Example_Rule_NotIn() {
  	type BizReq struct {
  		ID           uint   `v:"required" dc:"Your Id"`
  		Name         string `v:"required" dc:"Your name"`
  		InvalidIndex uint   `v:"not-in:-1,0,1"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			ID:           1,
  			Name:         "test",
  			InvalidIndex: 1,
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Println(err)
  	}

  	// Output:
  	// The InvalidIndex value `1` must not be in range: -1,0,1
  }
  ```

#### `regex`

* 格式: `regex:pattern`
* 说明：参数值应当满足正则匹配规则 `pattern`

  ```go
  func Example_Rule_Regex() {
  	type BizReq struct {
  		Regex1 string `v:"regex:[1-9][0-9]{4,14}"`
  		Regex2 string `v:"regex:[1-9][0-9]{4,14}"`
  		Regex3 string `v:"regex:[1-9][0-9]{4,14}"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Regex1: "1234",
  			Regex2: "01234",
  			Regex3: "10000",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Regex1 value `1234` must be in regex of: [1-9][0-9]{4,14}
  	// The Regex2 value `01234` must be in regex of: [1-9][0-9]{4,14}
  }
  ```

#### `not-regex`

* 格式: `not-regex:pattern`
* 说明：参数值不应当满足正则匹配规则 `pattern`。
* 版本：框架版本 `>=v2.2.0`

  ```go
  func Example_Rule_NotRegex() {
  	type BizReq struct {
  		Regex1 string `v:"regex:\\d{4}"`
  		Regex2 string `v:"not-regex:\\d{4}"`
  	}
  	var (
  		ctx = context.Background()
  		req = BizReq{
  			Regex1: "1234",
  			Regex2: "1234",
  		}
  	)
  	if err := g.Validator().Data(req).Run(ctx); err != nil {
  		fmt.Print(gstr.Join(err.Strings(), "\n"))
  	}

  	// Output:
  	// The Regex2 value `1234` should not be in regex of: \d{4}
  }
  ```

## 验证对象

## 验证结果

## 参数类型

## 可选验证

## 递归验证

## 自定义规则

## 自定义错误

## 方法介绍

## FAQ
