var utils = {}
utils.proxy = function (obj, fn) {
  return function() {
    fn.apply(obj, arguments);
  }
}

var a = {
    name: 'Jerry',
    sayHi: function () {
        console.log('Hello, I am ' + this.name)
    }
}

var b = {
    name: 'Lucy',
}

var c = {
    name: 'Jerry',
    sayHi: function (x) {
        console.log('Hello, I am ' + this.name + x[0] + x[1]);
    }
}

var d = {
    name: 'Jerry',
    sayHi: function (x, y) {
        console.log('Hello, I am ' + this.name + x + y);
    }
}

/* ================ 测试代码 ============== */
a.sayHi()
//Hello, I am Jerry 
result = utils.proxy(b, a.sayHi);
result();
//Hello, I am Lucy
result = a.sayHi.bind(b);
result();
//Hello, I am Lucy

/* ======== 不同参数形式传递测试 =========== */

var ar = [1, 2];
result = utils.proxy(b, c.sayHi);
result(ar);
//Hello, I am Lucy12 参数为数组的时候

var p1 = 1, p2 = 'ly';
result = utils.proxy(b, d.sayHi);
result(p1, p2);
//Hello, I am Lucy1ly 参数不为数组的时候
