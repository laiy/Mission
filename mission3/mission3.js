util = {};
util.type = function(obj) {
  var type = Object.prototype.toString.call(obj);
  var count = 8;
  var ans = "";
  while (type[count] != ']') {
    ans += type[count];
    count++;
  }
  console.log(ans)
}

util.type({})
util.type([])
util.type(null)
util.type('Hello')
util.type(34)
util.type(undefined)
util.type(function(){})
util.type(document.body)
