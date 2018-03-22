## fetch：基于promise设计的异步api
* 优点
1. 语法简单，更加语义化
2. 基于标准的Promise实现，支持async、await
* 缺点
1. 兼容性不好，需要promise polyfill、fetch polyfill
2. fetch默认不携带cookie
3. fetch请求对某些http错误状态码不会reject
4. fetch不支持超时处理
5. fetch不支持jsonp
6.
