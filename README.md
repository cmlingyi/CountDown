# CountDown
计时器

##用法

###页面引入
```javascript

<script src="countdown.js"></script>

```

###创建实例


```javascript
var countdown = new Countdown();
countdown.on('name', 'time', function (time) {
        //渲染
    })
```



##功能
可通过format修改时间单位 默认显示天数

```javascript
countdown.format('h');
```



