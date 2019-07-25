//从utf-16字符串转换成utf-8字节数组	
function utf8_from_str(s) {
    for(var i=0, enc = encodeURIComponent(s), a = []; i < enc.length;) {
        if(enc[i] === '%') {
            a.push(parseInt(enc.substr(i+1, 2), 16))
            i += 3
        } else {
            a.push(enc.charCodeAt(i++))
        }
    }
    return a
}
//console.log(utf8_from_str('𠮷'));
//console.log(uintToString(utf8_from_str('𠮷')))
//从utf-8字节数组转换成utf-16字符
function uintToString(uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray);
//     console.log(encodedString);
//     console.log(escape(encodedString));
//     console.log(encodeURIComponent(encodedString));
//     console.log(decodeURIComponent(encodeURIComponent(encodedString)));
    var decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}
//or 从utf-8字节数组转换成utf-16字符
function utf8_to_str(a) {
    for(var i=0, s=''; i<a.length; i++) {
        var h = a[i].toString(16)
        if(h.length < 2) h = '0' + h
        s += '%' + h
    }
    return decodeURIComponent(s)
}
//console.log(uintToString([240,160,174,183]))
//从utf-16编码转换成utf-8编码
function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}
console.log(encode_utf8('𠮷'));
//从utf-8编码转换成utf-16编码
function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}
console.log(decode_utf8('ð ®·'));

// 字符串转为ArrayBuffer对象，参数为字符串，借助ArrayBuffer对象的byteLength可以获取字节长度
const str2ab = function(str) {
  var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  console.log(bufView);
  return buf;
}
console.log(str2ab('𠮷'));

// ArrayBuffer转为字符串，参数为ArrayBuffer对象, 字符串编码为一个字节
const ab2str = function (buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

// ArrayBuffer转为字符串，参数为ArrayBuffer对象字符串编码为js默认编码
const ab2strU16 = function (buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
