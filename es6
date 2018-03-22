## es6 
### 数组的扩展
* 扩展运算符：将一个数组转化为用逗号分隔的参数序列（此处的数组可以是一个实现了Iterator接口的对象）
1. 替换函数的apply方法
```
//ES5的写法
Math.max.apply(Max,[14,3,77]);
//ES6的写法
Math.max(...[14,3,77]);
```
2. 将字符串转为真正的数组
```
[...'hello'];
//等同于'hello'.split('');
```
* Array.from ：将两类对象转化为真正的数组：类似数组的对象和可遍历的对象
1.
```
let arraylike={
  '0':'a',
  '1':'b',
  length:3
}
//es5
var arr1=[].slice.call(arraylike);
//es6
var arr2=Array.from(arraylike);
```
```
Array.from('hello');
```
2.Array.from 还可以接受第二个函数参数，作用类似于数组的map方法，用于对每个元素进行处理，将处理后的值放入返回的数组中。
``` 
Array.from(arrayLike,x=>x*x);
//等同于
Array.from(arrLike).map(x=>x*x);
```
