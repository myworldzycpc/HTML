//1， 鼠标放box上，按钮出现， 鼠标离开box， 按钮隐藏
//获取元素
var box = document.getElementById('box');
var left_btn = document.getElementById('left_btn');
var rig_btn = document.getElementById('rig_btn');
var ul01 = document.getElementById('ul01');
//给盒子box 注册事件
box.addEventListener('mouseenter', function() {
	left_btn.style.display = 'block';
	rig_btn.style.display = 'block';
	//停止自动播放
	clearInterval(timer);
	//停止后 清空计时器变量
	timer = null;
});
box.addEventListener('mouseleave', function() {
	left_btn.style.display = 'none';
	rig_btn.style.display = 'none';
	//开启自动播放
	//timer已经声明过了，这里就不用重复声明了
	timer = setInterval(function() {
	rig_btn.click();
	//直接调用右侧按钮的点击事件
	}, 1500);
});
//创建动画函数 这里的动画函数用了缓动效果，可以提升用户体验
function animate(obj, target, callback) {
//obj是谁要移动 target是移动到目标位置的距离 callback是回调函数形参
	//先清除定时器
	clearInterval(obj.timer);
     //每次移动的距离 = （目标值-现在的位置）/10
     function move() {
     //缓动的核心 把obj移动到目标值的过程分为若干个小步
     //让这个移动有一个过程，而不是瞬移到目的地
      var step = (target - obj.offsetLeft) / 10;
      //代码简化： 三元运算符
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      //obj.style.marginLeft = obj.offsetLeft + step + 'px';
      if(obj.offsetLeft == target) {
        clearTimeout(obj.timer);
          if(callback) {
            callback();
           }
       }
       //用left记录下移动每一小步的过程
	   obj.style.left = obj.offsetLeft + step + 'px';
   }
   //用定时器让盒子动起来 看见动这个字，基本都是要用定时器的
   //每50毫秒移动一个step的距离
   obj.timer = setInterval(move, 50);
   }
//2，动态生成小圆圈
//图片宽度是 ① box.clientWidth 不含盒子边框的盒子宽度
//② box.offsetWidth 是包含盒子边框的盒子宽度
//因为我这里为了直观观察，给盒子加了边框 所以我这里用box.clientWidth去掉边框
//点击小圆点，左右按钮等都要用到盒子宽度
//所以需要把盒子宽度设置成全局变量
var pic_width = box.clientWidth;
//（2）添加元素  往ul02里面添加 所以先获取ul02元素
var ul02 = document.getElementById('ul02');
//要添加几个小圆点呢  有几张图片就添加几个li
//所以用for循环添加
//console.log(ul01.children.length);
for (var i = 0; i < ul01.children.length; i++) {
	//（1）要添加元素，就必须先创建元素li 顺便给小li添加index属性
	var cre_li = document.createElement('li');
	//创建小li的属性
	cre_li.setAttribute('index', i);
	ul02.appendChild(cre_li);//每次添加都要先创建
	//给小li添加一个current类。 改变被点击的小li的颜色
	//默认第一个小li是被选中的
	ul02.children[0].className = 'current';
	//当点击小圆圈时 被点击的小圆圈颜色会改变。用到排他思想
	//小圆圈的排他思想。 用for循环来做
	//所有小圆圈都移除current类 给点击的当前小圆圈添加current类
	//给创建的cre_li添加事件，对cre_li进行操作
	//注意，要把事件添加到添加元素的for循环里面
	//因为在for循环里面添加的小li，在for循环里适用
	//如果在for循环外面添加事件，就失效了。出了作用域
	cre_li.addEventListener('click', function() {
		//清除所有小li的current类
		for(var i = 0; i < ul02.children.length; i++) {
		ul02.children[i].className = '';
		}
		//留下当前被点击的小li的current类
		this.className = 'current';

		//3，点击小圆点 让ul01图片动起来 所以写在点击事件内
		//ul要想脱离标准流动起来  ul01必须是绝对定位
		//点击第一个小圆点时 ul01移动距离0
		//点击第二个小圆点时 ul01移动距离是图片的宽度的负值
		//点击第三个小圆点时 ul01移动距离是图片的宽度的负值*2
		//结论： ul01的移动距离是 小圆点的索引号index*图片的宽度的负值

		//console.log(pic_width);
		//索引号index怎么来的呢？
		//在创建小li 的时候，就给小li添加一个index属性。
		//当点击小圆点的时候  获取当前小li的索引号
		var index = this.getAttribute('index');
		//这里有个bug
		//就是当点击小圆点显示出图片2时 再点右侧按钮，图片就不动了
		//所以需要将num和索引号绑定
		//在num自增的时候 索引号也跟着变化，就解决bug了
		num = index;
		//同样的，当点击小圆圈时，索引号和circle也要绑定
		circle = index;
		//console.log(index);
		//调用动画函数
		animate(ul01, -index*pic_width);
	});
}
//3，点击左右按钮 图片移动
//（1）先看右侧按钮 点击右侧按钮1次 图片往左移动1个图片的宽度
//点击2次 图片往左移动2个图片的宽度 点击num次，就往左移动num*图片的宽度
//所以 声明一个变量num
var num = 0;
//4，点击右侧按钮，小圆点跟着移动
//声明一个全局变量 circle ，每次点击右侧按钮 让circle自增1
var circle = 0;
//因为图片总共有3张 点击第2次，会显示图片3 再点击就会出现空白
//所以需要在第3张图片后面把图片1克隆出来
//这样第3次点击时，出现的就是图片1了
//出现图片1后，让left值迅速归零，跳转到第一张图片1
//这样用户看到的还是第1张图片1
//点击第4次的时候 轮播图会显示图片2 以此类推
//注意：克隆图片的程序一定要放在创建小圆点代码之后
//因为小圆点的个数是和图片数量相关的。如果在小圆点代码之前就克隆
//小圆点个数也会增加 影响实际效果
//-----------------------------
//这里就是所谓的“无缝连接”了 克隆图片1 放在图片3后面 也就是最后位置
//克隆图片1  和添加元素一样  一定要先克隆 后添加
//node.cloneNode(参数) 参数为空或false 浅克隆 参数为true 为深克隆
//深克隆就是会连同元素内的内容一起克隆 所以这里我们需要深克隆
var liCopy0 = ul01.children[0].cloneNode(true);
//添加克隆元素 放在最后面
ul01.appendChild(liCopy0);
//注意 一定要先克隆元素 再注册点击事件 不然点击事件里是不会存在克隆元素的
//注册右侧按钮的点击事件
//节流阀 flag 用来控制调用定时器的频率（或速度）
var flag = true;
rig_btn.addEventListener('click', function() {
	if(flag) {
		//把节流阀关了 一张图片移动结束前 点击按钮无效
		flag = false;
		//先做一次判断 第2张图片1后再点击 就直接跳过第1张图片1
		if (num == ul01.children.length - 1) {
			ul01.style.left = 0;
			num = 0;
		}
		//每点击一次，num就自增1
		num++;
		//调用动画函数
		animate(ul01, -num*pic_width, function() {
			//一张图片播放完毕，打开节流阀 点击按钮让图片移动
			flag = true;
		});
		//小圆点跟着移动
		circle++;
		//做个判断 如果显示图片3后 再点击 就让circle重置为0 重新开始轮播
		//不然在点第四次的时候 小圆圈就没了
		if(circle == ul02.children.length) {
			circle = 0;
		}
		cir();
	}
});

//（2）再看左侧按钮，点击左侧按钮1次，图片就往右移动1个图片的宽度
//移动方向不同 数据也需要修改一下
//注册左侧按钮的点击事件
left_btn.addEventListener('click', function() {
	if(flag) {
		flag = false;
		//先做一次判断 第2张图片1后再点击 就直接跳过第1张图片1
		if (num == 0) {
			num = ul01.children.length - 1;
			ul01.style.left = -num*pic_width + 'px';
		}
		//每点击一次，num就自增1
		num--;
		//调用动画函数
		animate(ul01, -num*pic_width, function() {
			flag = true;
		});
		circle--;
		//做个判断 如果显示图片3后 再点击 就让circle重置为0 重新开始轮播
		//不然在点第四次的时候 小圆圈就没了
		if(circle < 0) {
			circle = ul02.children.length - 1;
		}
		//先清除其他小圆圈的类名
		cir();
	}
});
function cir() {
	for(var i = 0; i < ul02.children.length; i++) {
		ul02.children[i].className = '';
	}
	//再给当前小圆圈一个类名
	ul02.children[circle].className = 'current';
}
//5，图片自动播放
//相当于点击右侧按钮 添加一个定时器 自动点击按钮
var timer = setInterval(function() {
	rig_btn.click();
	//直接调用右侧按钮的点击事件
}, 1500);
//6，鼠标放在图片上 停止自动播放 鼠标离开 恢复自动播放
//7，节流阀 控制点击按钮时 图片的播放速度
//防止快速点击 造成图片播放速度过快的情况
//当点击按钮时 图片要在完成播放后 点击按钮才能继续播放图片
//声明变量flag进行控制 控制谁 就把节流阀安装在谁的里面
//这里是控制按钮点击的 因为左右按钮都需要 所以flag需要是全局变量

