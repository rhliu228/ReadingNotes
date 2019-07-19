面向切面编程（AOP）是指把与核心业务逻辑无关的功能抽离出来，这些功能主要包括日志统计、异常处理等，再通过“动态织入”的方式渗入到业务逻辑之中，这样可以保持核心业务逻辑的纯净和高内聚性，其次可以很好地复用日志统计等功能模块。
在java语言中，AOP主要通过反射和动态代理来实现，而在javascript这种动态语言中，AOP的实现更加简单，这是javascript与生俱来的能力。
通常，在javascript中实现AOP，都是把一个函数“动态织入”到另一个函数中，比如可以通过扩展Function.prototype来做到这一点：
```
Function.prototype.before = function(fn) {
  let _self = this;
  return function() {
    fn.apply(this, arguments);
    return _self.apply(this, arguments);
  }
}
Function.prototype.after = function(fn) {
  let _self = this;
  return funtion(){
    let _ret = _self.apply(this, arguments);
    fn.apply(this, arguments);
    return _ret;
  }
}
let func = function() {
  console.log(2);
}
func = func.before(function(){console.log(1)}).after(function(){console.log(3)});
func();   //1 2 3
```

这种使用AOP的方式来给函数添加职责，也是javascript中非常巧妙的**装饰者模式**实现。
