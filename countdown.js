export default class Countdown {
    constructor(delay) {
        this.delay = delay || 1000
        this.list = {}
        this.timer = null
        this.tag = 'd' // d: 最大单位为天， h: 最大单位为时， m: 最大单位为分， s: 最大单位为秒
    }
    on(name, endtime, cb, delta) {
        this.list[name] = {
            name: name,
            endtime: endtime,
            cb: cb,
            delta: delta || 1,
            times: 0
        }
        if (!this.timer) {
            this.update()
        }
        return this
    }
    off(name) {
        delete this.list[name]
        return this
    }
    changeEnd (name, endtime) {
        this.list[name].endtime = endtime;
    }
    update() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            for (let key in this.list) {
                let obj = this.list[key]
                obj.times++;
                if (obj.times % obj.delta == 0) {
                    let diff = this.diffTime(obj.endtime);
                    obj.cb.call(this, diff);
                }
            }
            this.update();
        }, this.delay);
    }
    _cover(num) {
        var n = parseInt(num, 10);
        return n < 10 ? '0' + n : String(n);
    }
    format(tag) {
        this.tag = tag;
        return this;
    }
    _formatTime(ms) {
        let s = ms / 1000;
        let tag = 4;
        let ts = s,
            dd = 0,
            hh = 0,
            mm = 0,
            ss = 0;
        switch (this.tag) {
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
            d: this._cover(dd),
            h: this._cover(hh),
            m: this._cover(mm),
            s: this._cover(ss),
            total: s
        };
    }
    removeDD(diff) {
        if (diff && diff.d !== '00') {
            diff.h = this._cover((Number(diff.d) * 24) + Number(diff.h))
            diff.d = '00'
        }
        return diff
    }
    diffTime(target) {
        let now = new Date().getTime();
        if (now < target) {
            let diff = target - now
            let ret = this._formatTime(diff)
            return ret
        } else {
            return null
        }
    }
}
