function loginFrom(){
    var Title= document.getElementById("Title");
    var Conent= document.getElementById("Conent");
    var Smt= document.getElementById("Smt");
    Title.innerHTML="登录";
    Input1="<input type=\"text\" class=\"form-control\" id=\"user\" placeholder=\"用户名\"><br>";
    Input2="<input type=\"text\" class=\"form-control\" id=\"password\" placeholder=\"密码\"><br>";
    From=Input1+Input2;
    Conent.innerHTML=From;
    Smt.innerHTML="<button type=\"button\" onclick=\"login()\" class=\"btn btn-primary\">登录</button>";
}



function AddbookFrom(){
    var Title= document.getElementById("Title");
    var Conent= document.getElementById("Conent");
    var Smt= document.getElementById("Smt");
    Title.innerHTML="书籍添加";
    Input1="<input type=\"text\" class=\"form-control\" id=\"tname\" placeholder=\"书籍名字\"><br>";
    From=Input1;
    Conent.innerHTML=From;
    Smt.innerHTML="<button type=\"button\" onclick=\"admin_add_book()\" class=\"btn btn-primary\">添加</button>";;
  
}


function AddpostingFrom(){
    var Title= document.getElementById("Title");
    var Conent= document.getElementById("Conent");
    var Smt= document.getElementById("Smt");
    Title.innerHTML="添加章节";
    Input1="<input type=\"text\" class=\"form-control\" id=\"add_posting_title\" placeholder=\"标题\"><br>";
    Input2="<textarea class=\"form-control\"  rows=\"18\" id=\"add_posting_content\" placeholder=\"需要修改内容\"></textarea>";

    From=Input1+Input2;
    Conent.innerHTML=From;
    Smt.innerHTML="<button type=\"button\"   onclick=\"Sendposting()\"  class=\"btn btn-primary\">添加</button>";;
  
}



function UpbookFrom(){
    var Title= document.getElementById("Title");
    var Conent= document.getElementById("Conent");
    var Smt= document.getElementById("Smt");
    Title.innerHTML="书籍添加";
    Input1="<input type=\"text\" class=\"form-control\" id=\"tname\" placeholder=\"书籍名字\"><br>";
    From=Input1;
    Conent.innerHTML=From;
    Smt.innerHTML="<button type=\"button\" onclick=\"Up_book()\" class=\"btn btn-primary\">添加</button>";;
  
}