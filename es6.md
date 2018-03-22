## es6 
### 数组的扩展
#### 1.扩展运算符：将一个数组转化为用逗号分隔的参数序列（此处的数组可以是一个实现了Iterator接口的对象）
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
#### 2.Array.from ：将两类对象转化为真正的数组：类似数组的对象和可遍历的对象
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
#### 3.Array.of:用于将一组值，转换为数组
1. Array.of()  //[]
2. Array.of(3)  //[3]
#### 4. 数组实例的copyWithin():在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
Array.prototype.copyWithin(target,start=0,end=this.length)
target:必需值，从该位置开始替换数据。如果为负数，表示倒数
start：可选，从该位置开始读取数据，默认为0，如果为负数，表示倒数
end：可选，到该位置前停止读取数据，默认为0，如果为负数，表示倒数
1.
```
[1,2,3,4,5].copyWithin(0,3);
//[4,5,3,4,5]
```
#### 5.find() 和 findIndex()
1.
```
[1,4,-5,10].find((n)=>n<0);
//-5
```
```
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
#### 6.fill()方法使用一个给定值填充数组
1.
```
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```
2.fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
```
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```
3. 如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
```
let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
```
#### 7. entries(),keys(),values():用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
#### 8. includes():返回一个bool值，表示某个数组是否包含给定的值，该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
1.
```
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```
2. 与indexof的对比：indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。
```
[NaN].indexOf(NaN)
// -1
```
3. 与Map和set的has方法的区别：
Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。
#### 9.数组的空位
1. ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
* forEach(), filter(), reduce(), every() 和some()都会跳过空位。
* map()会跳过空位，但会保留这个值
* join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
```
// map方法
[,'a'].map(x => 1) // [,1]
// join方法
[,'a',undefined,null].join('#') // "#a##"
// some方法
[,'a'].some(x => x !== 'a') // false
```
2. ES6 则是明确将空位转为undefined。
```
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]
```
