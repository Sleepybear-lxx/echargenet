# 方法论

首先是定位加密逻辑的代码位置，可尝试搜索关键字
```
搜索算法关键字（AES DES 3DES encry）
搜索请求关键字（如本例的EVOneUni,x-evone-signature）
如果没有明显关键字或关键字也被加密（自定义请求头），可以搜索 headers

```
定位后便是针对关键步骤下断点调试分析，其中某些复杂的JS可以使用python execjs库执行，节省时间

# 实例

观察请求数据包，加密参数中含有EVOneUni字段

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684119330816-5d2930f2-46bc-4acd-9571-6b184540dd6e.png#averageHue=%23eaeff3&clientId=u3894a8cc-33f5-4&from=paste&height=762&id=u726ecd87&originHeight=762&originWidth=1432&originalType=binary&ratio=1&rotation=0&showTitle=false&size=172063&status=done&style=none&taskId=u2dfbdd0e-b4c4-4206-acd9-02c2cae5f72&title=&width=1432)

全局搜索该字段，下断点进行调试，可见return处的返回值和数据包加密内容格式基本一致，此处大概率为加密逻辑，关键即是分析l和d两个变量的生成

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684119616657-b0cc989e-9fa7-43e5-8f0c-ee8d47231004.png#averageHue=%2338312a&clientId=u3894a8cc-33f5-4&from=paste&height=885&id=u49b9632a&originHeight=885&originWidth=1253&originalType=binary&ratio=1&rotation=0&showTitle=false&size=233990&status=done&style=none&taskId=u68e31236-bdc7-4261-acee-6aab630a8cc&title=&width=1253)

## 其他逻辑

分析源代码，79行m变量定义处完成加密逻辑实现，127行m值作为http请求头内容，该部分内容重点关注

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684120221013-425fbd23-70c0-44d1-9206-d51f5517b44a.png#averageHue=%232c2a26&clientId=u3894a8cc-33f5-4&from=paste&height=43&id=u953f4150&originHeight=43&originWidth=275&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3559&status=done&style=none&taskId=u11ebaddf-6981-4a0a-b38e-079d86eea65&title=&width=275)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684120233599-f880d721-2c74-462a-9e48-caac3995d6c4.png#averageHue=%232b2725&clientId=u3894a8cc-33f5-4&from=paste&height=49&id=uf822ea03&originHeight=49&originWidth=463&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5075&status=done&style=none&taskId=u5a8c5c54-9e38-45bf-9a96-37912f9510a&title=&width=463)

首先是r变量生成，大体逻辑为将请求头中以"x-evone"开头的请求行存入r字典中（键为请求头key,值为请求头value）

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684120484357-77e98aaa-ea8a-48d0-bdb9-7b0c6a9fd312.png#averageHue=%23282624&clientId=u3894a8cc-33f5-4&from=paste&height=103&id=udecdc6d3&originHeight=103&originWidth=503&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8357&status=done&style=none&taskId=u6c0370c6-baf1-4bcd-905c-deab9a8746a&title=&width=503)

之后调用fucntion(n,t)函数，形参t接收值为r字典

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684120977630-01ab635b-9ba4-4dfa-856d-223d361d3ef4.png#averageHue=%23282727&clientId=u3894a8cc-33f5-4&from=paste&height=178&id=udacd2b70&originHeight=178&originWidth=893&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21742&status=done&style=none&taskId=u4628adcd-6f8d-4ec0-b3bf-a0f9c6643b8&title=&width=893)

形参n接收值如下

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684120988430-5f3b9f31-44a7-4d38-8827-1d7e866d7a82.png#averageHue=%23262d37&clientId=u3894a8cc-33f5-4&from=paste&height=211&id=u877ded9e&originHeight=211&originWidth=1141&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32331&status=done&style=none&taskId=ud5e1d2f5-cfb3-461b-8f0a-a1d68d8c72b&title=&width=1141)

87-121行代码逻辑主要完成两件事

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684121222946-e21e2d8f-4cac-407c-baaf-464aaad737cc.png#averageHue=%23392d23&clientId=u3894a8cc-33f5-4&from=paste&height=511&id=v0PbY&originHeight=511&originWidth=742&originalType=binary&ratio=1&rotation=0&showTitle=false&size=102572&status=done&style=none&taskId=u5802b0e9-8b84-48d1-bdbd-5c2a0e0cb4d&title=&width=742)

### 1.生成o变量用于后续加密

这里重新生成一个时间戳，之后v函数对该时间戳加上"evone"字符串作为变量o

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684121414063-f8b2a64f-9c5c-4599-a27d-73c51243603b.png#averageHue=%23282625&clientId=u3894a8cc-33f5-4&from=paste&height=38&id=TG2yZ&originHeight=38&originWidth=357&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2694&status=done&style=none&taskId=u3638d399-da49-4717-8af0-0e726299e21&title=&width=357)

### 2.生成a列表用于后续加密

a列表按照元素，"\n"，元素，"\n"...的顺序进行生成，每个元素生成逻辑为

1. o变量（与1中相同）
2. 形参n.method（http请求方法）
3. 小写的p字符串（jsong格式的n.body首先转为字符串i，之后对i base64编码得到u，使用sm3算法对u进行哈希得到p）
4. 形参n.headers["Content-type"]
5. 1中重新生成的时间戳（不带"evone"）
6. 处理得到的字符串

形参e接收值实际为开头生成的r变量

   1. 对e的key按照字符串顺序排序，将排序后的字典赋值给t

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684132402858-f935352c-8c73-4e9b-8c12-3ea362f9b59a.png#averageHue=%232c2b2a&clientId=u296265a4-c468-4&from=paste&height=59&id=ua98da215&originHeight=59&originWidth=870&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6837&status=done&style=none&taskId=u5a7b512b-d669-4305-b345-990398d0d71&title=&width=870)

   2. 将t的key和value全部进行拼接，作为返回值

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684132548205-1e301d9b-9367-4d80-b7e2-4afa62d5bab8.png#averageHue=%232c2826&clientId=u296265a4-c468-4&from=paste&height=69&id=u2158c2d2&originHeight=69&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8967&status=done&style=none&taskId=ud4f71b90-69e3-4de6-a9be-5d85e0e7d0e&title=&width=1200)

最终的a列表如下

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684132687974-7e217267-3400-4a98-b72f-2f323582b3f5.png#averageHue=%23242b34&clientId=u296265a4-c468-4&from=paste&height=241&id=u15702baa&originHeight=241&originWidth=1189&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25593&status=done&style=none&taskId=uc014a29e-397b-40f0-90db-71cda0174c4&title=&width=1189)

之后下断点查看两个加密变量l和d的生成逻辑

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684133054586-0adcc0e6-3a04-4859-b890-54da47f78fb7.png#averageHue=%23c79d51&clientId=u296265a4-c468-4&from=paste&height=58&id=u6df8843d&originHeight=58&originWidth=467&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6342&status=done&style=none&taskId=u74c4b467-03f6-4846-98f4-c27bfa0b773&title=&width=467)

## 变量l

跟进g函数，首先调用i.get2a（）方法，跟进

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684133116712-755179ae-699e-4675-86f7-528dd841dd12.png#averageHue=%23322c25&clientId=u296265a4-c468-4&from=paste&height=77&id=udd48aabb&originHeight=77&originWidth=380&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8541&status=done&style=none&taskId=u7f14468e-4dc1-46d4-850a-e72ad6e43a2&title=&width=380)

返回四个变量拼接

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684133202738-264307cd-fbc3-4b98-b2b1-dfb8ac04d2c4.png#averageHue=%23b8a652&clientId=u296265a4-c468-4&from=paste&height=49&id=u6fbaf0b1&originHeight=49&originWidth=398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4919&status=done&style=none&taskId=u08c92337-a2b8-4390-b1c8-a0c90c7e274&title=&width=398)

全局搜索s2a1字符串，发现四个字符串都为固定值，之后便是调用sm2算法进行加密

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684133245915-2ba73dd1-7d1f-473b-9115-ec70a4823199.png#averageHue=%23322926&clientId=u296265a4-c468-4&from=paste&height=297&id=u7629f869&originHeight=297&originWidth=504&originalType=binary&ratio=1&rotation=0&showTitle=false&size=28602&status=done&style=none&taskId=u02878938-b702-43fe-bd25-4ab73d508e3&title=&width=504)

## 变量d

首先是tostring函数将列表转换为对应字符串

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684135315636-ef1d1578-5b85-4933-a13a-1ee35546ae26.png#averageHue=%23b3b4b4&clientId=u296265a4-c468-4&from=paste&height=149&id=u04e40c92&originHeight=149&originWidth=1199&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17868&status=done&style=none&taskId=ud5a01d63-07d2-46b9-b1e9-ed7e0ae39a4&title=&width=1199)

然后是调用ea_CBC函数进行加密

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684135400009-70c74420-8753-4792-a293-9409b5d0c411.png#averageHue=%23342b22&clientId=u296265a4-c468-4&from=paste&height=78&id=u7fb51189&originHeight=78&originWidth=743&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11265&status=done&style=none&taskId=u50a5fce0-28e7-4a75-89a8-dc0bde53e21&title=&width=743)

# 注意事项

1. 关于具体加密逻辑的实现可以直接使用python execjs库运行js（需要拷贝js文件及其依赖）。具体用法可参考
[https://blog.csdn.net/qq_57421630/article/details/123500499](https://blog.csdn.net/qq_57421630/article/details/123500499)
2. 微信小程序使用nodejs运行，而python execjs默认引擎为JSscript，需要安装nodejs环境
3. 定位原始js文件时不要直接拷贝开发者平台中代码（微信开发者平台会增加其他代码）
4. 某些情况下可尝试删除不需要的依赖，如含有ea_CBC函数的js代码，引入了util

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684136132200-cf40435c-3e67-46f9-96d3-d9d2869e261d.png#averageHue=%232b2725&clientId=u296265a4-c468-4&from=paste&height=181&id=uc6a0b970&originHeight=181&originWidth=586&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21770&status=done&style=none&taskId=uf4b511ff-89dd-4bb7-8352-3d4eb966584&title=&width=586)

而util引入了log，log调用了getApp()

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684136276888-b9ca6b9c-39c1-44c8-9b40-5497b4bb2092.png#averageHue=%2336312f&clientId=u296265a4-c468-4&from=paste&height=218&id=u5b7adf57&originHeight=218&originWidth=610&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18536&status=done&style=none&taskId=u8ccaf076-2e35-4e50-94ea-36a88423393&title=&width=610)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/28328736/1684136264209-ea68c3a5-1742-43ef-b361-9cf51865b6cd.png#averageHue=%2332302f&clientId=u296265a4-c468-4&from=paste&height=267&id=uf81d2d6d&originHeight=267&originWidth=688&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16819&status=done&style=none&taskId=uedc49575-5094-4857-be6a-be23847f865&title=&width=688)

而getApp方法似乎为小程序框架本身提供的方法，js无法直接执行，删掉关于util的引用后，报错消失
5. 部分函数为小程序初次编译时运行，调试过程中下断点并不执行，需要重新编译再调试观察
