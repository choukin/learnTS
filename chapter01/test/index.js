var str2utf8 = window.TextEncoder ? function(str) {
    console.log(123213);
    var encoder = new TextEncoder('utf8');
    var bytes = encoder.encode(str);
    var result = '';
    for(var i = 0; i < bytes.length; ++i) {
        result += String.fromCharCode(bytes[i]);
    }
    return result;
} : function(str) {
    return eval('\''+encodeURI(str).replace(/%/gm, '\\x')+'\'');
}

// var str2utf8 =  function(str) {
//     return eval('\''+encodeURI(str).replace(/%/gm, '\\x')+'\'');
// }
function charToUnicode(str) {
    let temp;
    let i = 0;
    let r = '';
   
    for (let val of str) {
        temp = val.codePointAt(0).toString(16);
   
        while ( temp.length < 4 )
        temp = '0' + temp;
   
        r += '＼u' + temp;
    };
  
    return r;
}
function unicodeToChar(str){
   //方案一
//   return eval("'" + str + "'");
  //方案二
  return unescape(str.replace(/＼u/g, "%u")); 
}
function unicodeToChar2(str){
    //方案一
 //   return eval("'" + str + "'");
   //方案二
   return unescape(str.replace(/＼u200b/g, "").replace(/＼u/g, "%u")); 
 }
var str = '你好吗？测试，测试，测试，测试阿迪发放，';
var unicode = charToUnicode(str);
console.log(unicode)

console.log(unicodeToChar(unicode));
console.log(unicodeToChar2(unicode));
unicode 和汉字能转我去会诊加上逻辑试试