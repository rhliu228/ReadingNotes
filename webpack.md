webpack的require.context用于创建自己的模块上下文，
* 该方法接收三个参数，要搜索的文件夹目录、是否搜索子目录以及一个匹配文件的正则表达式.
* 该方法返回一个require函数，该函数可以接受一个参数：request函数---这里的request是指在require（）语句中的表达式
* 该方法返回的require方法有三个属性：resolve、keys、id
   * resolve是一个函数，它返回请求被解析后得到的模块id。
   * keys也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
   * id是上下文模块包含的模块id，它可能在你使用module.hot.accept的时候被用到。
