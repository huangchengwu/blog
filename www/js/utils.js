
//post方式提交json数据
function from_post(url,data, callback){
    var myXMLHttpRequest = null;
    if (window.ActiveXObject) {
        myXMLHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        myXMLHttpRequest = new XMLHttpRequest();
    }
    
    myXMLHttpRequest.open("post",url , true);
    myXMLHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");    
    var stringData=JSON.stringify(data);
    myXMLHttpRequest.send(stringData);
    myXMLHttpRequest.onreadystatechange = function(){
        if (myXMLHttpRequest.readyState == 4 && myXMLHttpRequest.status == 200) {
            // alert(myXMLHttpRequest.responseText);
            var obj = JSON.parse(myXMLHttpRequest.responseText);
            if(callback!=null){
                callback(obj);
            }
        }
    }
}

function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}


function clearCookie(name) {
    setCookie(name, "",-1);  
}


