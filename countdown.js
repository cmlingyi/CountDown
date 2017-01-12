;(function (global) {
    function Countdown(delay) {
        this.delay = delay || 1000
        this.list = {}
        this.timer = null
    }

    //时间格式化 小于10的单位在前面补一个0
    var _cover = function (num) {
        var n = parseInt(num, 10);
        return n < 10 ? '0' + n : String(n);
    }

    //把毫秒时间转换成需要的时间单位
    var _formatTime = function (ms, name) {
        var s = ms / 1000;
        var tag = 4;
        var ts = s,
            dd = 0,
            hh = 0,
            mm = 0,
            ss = 0;
        switch (this.list[name].tag) {
            case 'd':
                tag = 4;
                break;
            case 'h':
                tag = 3;
                break;
            case 'm':
                tag = 2;
                break;
            case 's':
                tag = 1;
                break;
            default:
                tag = 4
        }
        if (tag >= 4) {
            dd = parseInt(ts / 60 / 60 / 24, 10); // 计算剩余的天数
            ts -= dd * 60 * 60 * 24;
        }
        if (tag >= 3) {
            hh = parseInt(ts / 60 / 60, 10); // 计算剩余的小时数
            ts -= hh * 60 * 60;
        }
        if (tag >= 2) {
            mm = parseInt(ts / 60, 10); // 计算剩余的分钟数
            ts -= mm * 60;
        }
        if (tag >= 1) {
            ss = parseInt(ts, 10); // 计算剩余的秒数
        }
        return {
            d: _cover.call(this, dd),
            h: _cover.call(this, hh),
            m: _cover.call(this, mm),
            s: _cover.call(this, ss),
            total: s
        };
    }

    /**
     * 注册计时器
     * name: [string] 标识
     * endtime: [number] 时间终点
     * cb: [function] 回调函数
     * tag: [string] 计时器规格   d: 最大单位为天， h: 最大单位为时， m: 最大单位为分， s: 最大单位为秒
     * delta: 触发间隔
     */
    Countdown.prototype.on = function (name, endtime, cb, tag, delta) {
        this.list[name] = {
            name: name,
            endtime: endtime,
            cb: cb,
            delta: typeof delta === 'number' ? delta : 1,
            tag: typeof tag === 'string' ? tag : 'd', // 
            times: 0,
        }
        if (!this.timer) {
            this.update();
        }
        return this;
    }

    Countdown.prototype.off = function (name) {
        delete this.list[name];
        return this;
    }

    Countdown.prototype.changeEnd = function (name, endtime) {
        this.list[name].endtime = endtime;
    }

    Countdown.prototype.update = function () {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            for (var key in this.list) {
                if (this.list.hasOwnProperty(key)) {
                    var obj = this.list[key]
                    obj.times++;
                    if (obj.times % obj.delta == 0) {
                        var diff = this.diffTime(obj.endtime, key);
                        obj.cb.call(this, diff);
                    }
                }
            }
            this.update();
        }, this.delay);
    }

    Countdown.prototype.format = function (name, tag) {
        if (arguments.length === 1) {
            this.list[Object.keys(this.list)[0]].tag = arguments[0];
        } else {
            this.list[name].tag = tag;
        }
        return this;
    }

    Countdown.prototype.diffTime = function (target, name) {
        var now = new Date().getTime();
        if (now < target) {
            var diff = target - now
            var ret = _formatTime.call(this, diff, name)
            return ret
        } else {
            return null
        }
    }

    
    if (typeof module != 'undefined' && module.exports) {
        module.exports = Countdown;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return Countdown;
        })
    } else {
        global.Countdown = global.Countdown || Countdown;
    }
})(window || this);