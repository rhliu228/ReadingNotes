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
