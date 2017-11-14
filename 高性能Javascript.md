## Chapter1 加载和执行
1. <body/>标签闭合之前，将所有的<script/>标签放在页面底部，这能确保在脚本执行前页面已经完成了渲染。
2. 合并脚本。页面中<script>标签越少，加载就越快，响应就更迅速。
3. 无阻塞下载javascript标签的方法：
 * 使用defer,async属性
 * 使用动态创建的<script/>标签来下载并执行代码
 * 使用XHR对象下载Javascript代码并注入页面中
 
## Chapter2 数据存取
1. 数据存储有4种方法：字面量、变量、数据项、对象成员
2. 访问字面量和局部变量的速度最快，相反，访问数组成员和对象成员相对较慢。（作用域链&&原型链）
3. 避免使用with语句，因为它会改变执行环境作用域链。
4. try-catch语句的catch子句也会改变函数的作用域，应该尽量简化代码使得catch子句对性能的影响最小化，推荐做法是将错误委托给一个函数来处理,由于只执行一条语句，且没有局部变量的访问，作用域链的临时改变不会影响代码性能。eg：
 ```
  try{
    //...
  }catch(ex){
    handleError(ex);
  }
 ```
5. with、ty-catch、eval语句都被认为是动态作用域，动态作用域只存在于代码执行过程中，无法通过静态分析检测出来
6. 应该把常用的对象成员，数组元素，跨域变量保存在局部变量中来改善javascript性能，因为局部变量访问速度更快。
  
 
## Chapter3 DOM编程
1. 浏览器中的DOM
 * DOM是一个独立于语言，用于操作XML和HTML文档的程序接口，但是它在浏览器中的接口是用javascript实现的。浏览器会把DOM和javascript独立实现，它们之间只能通过接口彼此连接，这就造成访问DOM天生就慢。应该`减少访问DOM的次数，把运算尽量留在ECMAScript这一端来处理`
2. DOM访问和修改
* innerHTML比原生的DOM方法要快，这是因为在设置innerHTML或outerHTML的时候，就会创建一个HTML解析器，这个解析器是在浏览器级别的代码基础上运行的，因此比执行javascript快得多。不过，创建innerHTML解析器也会带来性能损失，所以最好能够将设置innerHTML的次数保持在合理的范围内。
* 节点克隆：element.cloneNode()替代document.createElement()。
* HTML集合以一种“假定实时态”的实时存在，这意味着底层文档对象更新时，它也会自动更新。
* 遍历DOM，常见的不再赘述。需注意：document.querySelectorAll使用CSS选择器作为参数并返回一个NodeList，不返回HTML集合，因此返回的节点不会对应实时的文档结构。
3. 重绘和重排
* 渲染树：DOM树中每一个`需要显示`的节点在渲染树中至少存在一个对应的节点（隐藏的元素在渲染树中没有对应的节点），渲染树中的节点被称为“帧”或“盒boxes”，符合css模型的定义。一旦渲染树构建完成，浏览器就开始绘制页面元素。
* 重排发生的时机
  * 添加或删除可见的DOM元素
  * 元素位置改变
  * 元素尺寸改变（外边距，内边距，边框厚度，宽度，高度）
  * 内容改变eg：文本改变或者图片被另一个不同尺寸的图片替代
  * 页面渲染器初始化
  * 浏览器窗口尺寸改变
* 渲染树变化的排队和刷新：由于每次重排都会产生计算消耗，大多数浏览器通过队列化修改并批量执行来优化重排过程。然而，你写的代码会不知不觉强制刷新队列并要求计划任务立即执行。例如
  * offset(Top|Left|Width|Height)
  * scroll(Top|Left|Width|Height)
  * client(Top|Left|Width|Height)
  * getComputedStyle()(currentStyle in IE)
* 如何最小化重排和重绘
  * 使用cssText属性
  * 批量修改DOM：使文档脱离文档流，对其应用多重改变、把元素带回文档中。其中使DOM脱离文档流的方法有
   * 隐藏元素，应用修改，重新显示
   * 使用document fragment
   * 将原始元素拷贝到一个脱离文档的节点中，修改副本，完成后再替换原始元素
  * 缓存布局信息
* 让元素脱离动画流
 4. 事件委托可减少事件处理器的数量
 
## Chapter4 算法和流程控制
1. 循环
* for-in比标准for循环，do-while，while慢，因此for-in最好仅在需要迭代一个属性数量未知的对象时使用。
* 基于函数的迭代forEach比基于循环的迭代慢8倍。
* 使用“达夫设备”循环展开技术，可以做到一次迭代实际上执行了多次迭代的操作
2. 条件语句：少条件的用if-else，多的用switch，当单个键和单个值之间存在逻辑映射时，使用查找表。
3. 递归、迭代、memoization
```
 funciton memoize(func,cache){
  cache=cache||{};
  var shell=function(args){
   if(!cache.hasOwnProperty(arg)){
     cache[args]=func(arg);
   }
   return cache[arg];
  }
  return shell;
 }
```
## Chapter5 字符串和正则表达式
1. 字符串
* 如何优化str+='one'+'two';此代码运行时，会经历四个步骤：
  * 在内存中创建一个临时字符串
  * 连接后的字符串"onetwo"被赋给该临时字符串
  * 临时字符串和str的当前值相连接
  * 结果赋给str；
* 优化(非IE):str+='one'; str+='two'; 或者：str=str+'one'+'two';这两种方式可以避免产生临时字符串的过程(第二步),原理在于与浏览器合并字符串时分配内存的方法有关。浏览器会尝试为表达式左侧的字符串分配更多的内存，然后简单地将第二个字符串拷贝至它的末尾。
* 但是IE7以及更早版本中上述优化只会更慢。在IE8中，连接字符串只是记录现有的字符串的引用来构造新的字符串，在最后时刻，字符串的各个部分才会被逐个拷贝到一个真正的字符串中。IE7以及更早版本在每连接一对字符串时都要把它复制到一块新分配的内存中，可以在这些版本中考虑用Array.prototype.join方法来优化
2. 正则表达式
```
\\去除收尾空白
String.prototype.trim=function(){
  var str=this.replace(/^\s+/,""),
  end=str.length-1,
  ws=/\s/;
  while(ws.test(str.charAt(end))){
    end--;
  }
  return this.slice(0,end+1);
  
}
```
## Chapter6 快速响应的用户界面
1. 浏览器UI线程
* 浏览器限制了javascipt的运行时间。包括两类限制：调用栈大小限制和长时间运行脚本限制，单个javascript的运行时间应远远小于浏览器的限制，一般来说，不应超过100ms。
2. 使用定时器让出时间段
3. web worker多线程
* 由于web workers没有绑定UI线程，这意味它们不能访问浏览器的许多资源，运行环境由如下部分组成
   * navigator对象，只有appName,appVersion,userAgent,platform四个属性
   * location对象，只读
   * self对象，指向全局worker对象
   * importScripts(),加载js文件
   * 所有的ECMAScript对象
   * XMLHttpRequest对象
   * close方法
* 由于web workers有着不同的全局运行环境，因此你无法从js代码中创建它，必须使用 var worker=new Worker('code.js');语法，且使用事件接口进行通信，网页代码可以通过postMessage（）方法给worker传递数据，此外，worker还有一个用来接收信息的onmessage的事件处理器。

## Chapter7 Ajax
1. 请求数据的方法
* XHR
* 动态脚本注入
* iframes
* comet
* Multipart
2. 发送数据的方法
* XHR
* 图片信标
3. 数据格式
* XML
* HTML
* JSON
* 自定义格式，使用split（）方法分割即可

## Chapter8 编程实践
1. 避免双重求值(eval,Function构造函数,setTimout,setInteval避免传入字符串)
2. 使用Object/Array直接量
3. 懒加载
4. 条件预加载
5. 巧妙使用位操作和原生js方法（例如Math对象）
