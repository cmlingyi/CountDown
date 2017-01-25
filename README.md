# CountDown
计时器

### 创建实例

```
var countdown = new Countdown();
```

### API
#### .on (name, time, callback, tag)
添加监听
```
countdown.on('a', new Date().getTime() + 300000, function (time) {
        //渲染
        console.log('还剩：' + time.d + ':' + time.h + ':' + time.m + ':' + time.s);
})
```
#### .off(name)
```
countdown.off('a');
```
#### .format(name, tag)
设置时间格式，'d'代表天，'h'代表时，'m'代表分， 's'代表秒，默认格式为 d : h : m : s.
```
countdown.format('a', 'h');
```
#### .changeEnd(name, endtime)
修改倒计时结束时间
```
countdown.changeEnd('a', new Date().getTime() + 360000);
```







