

function g(e) {
    var s =require("./enc1/index.js");
    var n = "04539279C0082E3938382D533335858B835911471133B79505F19584D64BC556C69E5BC5DF66B12841A30A83679D8A6D501D424D9869916124E30367919A03F758"
      , t = s.sm2.doEncrypt(e, n);
    return "04".concat(t);
}


function f(e){
    var a=require("./enc1/utils/s4");
    return a.a4.ea_CBC(e);

}