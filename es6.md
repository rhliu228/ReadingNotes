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
* Array.of:用于将一组值，转换为数组
1. Array.of()  //[]
2. Array.of(3)  //[3]
* 数组实例的copyWithin():在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
Array.prototype.copyWithin(target,start=0,end=this.length)
target:必需值，从该位置开始替换数据。如果为负数，表示倒数
start：可选，从该位置开始读取数据，默认为0，如果为负数，表示倒数
end：可选，到该位置前停止读取数据，默认为0，如果为负数，表示倒数
1.
```
[1,2,3,4,5].copyWithin(0,3);
//[4,5,3,4,5]
```
* find() 和 findIndex()
1.
```
[1,4,-5,10].find((n)=>n<0);
//-5
```
``
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10`
```
2.
```
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```
3.这两个方法都可以接受第二个参数，用来绑定回调函数的this对象
```
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```
