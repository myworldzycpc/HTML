import time

s = """
2013的某一天 他认识了PHP
可他从不敢相信 那是噩梦的开启
2015的某一天 加班到无法休息
忙里偷闲打开微信 却没人发消息
2017的某一天 面试之前认真复习
上上知乎问问建议 当初就不该学PHP
他们说用Python的看不起用Java的啊
Java的也只能骂PHP啦
就算你们都是用Python的鸭
Python3和Python2也势不两立啊
用AS的看不起用Eclipse的啊
可苹果也看不起做Android的
Vim和Emacs吵个不停啦
还天天骂Sublime的智障吗
用React的看不起用Angular的
Git用户天天骂SVN傻瓜
Docker用户说Puppet是上个世纪的吗?
用图形界面不用命令，智商不够用吗?
用Debian的瞧不起用Ubuntu的
用MBP的说用win没钱吗？
BAT的说小公司也算公司吗？
独角兽说我分十亿你分得起吗？
黑轴茶轴天天纠缠不休啊
难怪双飞燕的妹子插不上话
坐Aeron的看不起坐办公椅的
站着打代码的说你俩会长胖的
985的看不起211的啊
他们还天天骂北大青鸟呢
考计算机二级是有病吗
Gayhub没有一千星星别来丢人啦
啊 ~ 别再骂啦~~
女朋友呢~ 找到了吗？"""

l = [[i, 0] for i in s.split("\n")]

start_time = time.time()
the_time = start_time
print("开始")
for i in l:
    input(i[0])
    now_time = time.time()
    i[1] = now_time-the_time

print(l)
