## Chapter1 加载和执行
-<body/>标签闭合之前，将所有的<script/>标签放在页面底部，这能确保在脚本执行前页面已经完成了渲染。
-合并脚本。页面中<script>标签越少，加载就越快，响应就更迅速。
-无阻塞下载javascript标签的方法：
  *使用defer 、async属性
  *使用动态创建的<script/>标签来下载并执行代码
  *使用XHR对象下载Javascript代码并注入页面中
