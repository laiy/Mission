utils = {};

utils.extend = function () {
  for (var i = 1; i < arguments.length; i++) {
    for (propName in arguments[i]) {
      if (arguments[i].hasOwnProperty(propName)) {
        arguments[0][propName] = arguments[i][propName];
      }
    }
  }
  return arguments[0];
};

// ================ 对象合并扩展 ================
var a = {
    name: 'Jerry'
};

var b = {
    name: 'Tommy',
    age: 34
};

var c = {
    slogan: 'I am the king of the world!!!'
};

var d = utils.extend(a, b, c);

console.log(d);
console.log(a);
console.log(b);
console.log(c);
// ================== 结果 =====================
// >>> d
// {name: 'Tommy', age: 34, slogan: 'I am the king of the world!!!'} // d为a对b、c的扩展

// >>> a 
// {name: 'Tommy', age: 34, slogan: 'I am the king of the world!!!'} // a对象已经被改变

// >>> d === a
// true // a和d是同一个对象

// >>> b
// {name: 'Tommy', age: 34} // b不变

// >>> c
// {slogan: 'I am the king of the world!!!'} // c不变
