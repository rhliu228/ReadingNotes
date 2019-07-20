我们已经对currring有了很多了解，currying的本质就是部分求值，currying的函数首先会接受一些参数，接受了这些 参数之后，该函数不会立即求值，而是继续返回另一个函数，刚才传入的参数在函数形成的闭包中
被保存起来。待到函数需要真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。

下面我们来说一下uncurrying，指的是把泛化this的过程提取出来，让一个对象去借用一个原本不属于它的方法。

动态语言中，当我们调用对象的某个方法时，并不用去关心该对象原本是否被设计为拥有这个方法，也就是常说的**鸭子类型**思想。首先用call或者apply来实现这个需求:
```
var obj1 = {name: 'sven'};
var obj1 = {
  getName: function(){
    return this.name;
  }
};
console.log(obj2.getName.call(obj1));
```
我们常常让类数组对象去借用Array.prototype的方法，这是call或者apply的常见应用场景之一：
```
(function(){
  Array.prototype.push(arguments, 4);
  console.log(arguments);  //[1,2,3,4]
})(1,2,3);
```
其实可以把这个泛化this的过程提取出来，这就是uncurrying：
```
Function.prototype.uncurring = function(){
  var self = this;
  return function() {
    var obj = [].shift.call(arguments);
    return self.apply(obj, arguments);
  }
}
// or
Function.prototype.uncurring = function(){
  var self = this;
  return function() {
    return Function.prototype.call.apply(self, arguments);
  }
}

var push = Array.prototype.push.uncurrying();
(function(){
  push(arguments, 4);
  console.log(arguments);  //[1,2,3,4]
})(1,2,3);
```
