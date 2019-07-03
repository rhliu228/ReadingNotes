```
function run(gen) {
  var args = [].slice.call(arguments, 1),it;
  //初始化迭代器
  it = gen.apply(this, args);
  return Promise.resolve()    //resolve一个空参数，表明启动生成器并不需要向其传递参数
    .then(function handleNext(value){
      var next = it.next(value);
      return (function handleResult(next){
        if(next.done) return next.value;
        return Promise.resolve(next.value)
          .then(
            //成功就恢复异步循环，把决议的值传回生成器
            handleNext, 
            function(err){
              Promise.resolve(it.throw(err))
                .then(handleResult)     // 仍可继续执行，前提是生成器处理了该错误
          })
      })(next);
    })
}
```
#### 形实转换程序
形实转换程序（thunk）是指一个用于调用另一个函数的函数，没有任何参数。换句话说，用一个函数定义函数调用，包含所需的任何参数，来定义这个调用的执行，那么这个封装函数就是一个形实转换程序。把这个狭义的thunk定义扩展为让它可以接收一个回调函数作为参数，书写一个生成thunk的工厂函数：
```
function thunkify(fn) {
  return function(){
    var args = [].slice.call(arguments);
    return function(cb) {
      args.push(cb);
      return fn.apply(null,args);
    }
  }
}
```
thinkify产生thunkory（thunk+factory），然后thunkory产生thunk。
