
/**
 普通登录
*/
function login(){
    alert("用户开始登录");
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    sign = hex_md5("~"+user+"@"+password+"&");
    data={
        "user":user,
        "password" :password,
        "code":"user",
        "sign":sign
    }
    from_post(HOST_PORT,data,function(data){
        if (data == -1){
        alert("密码不正确");
    }
    if (data == 0 ){
        alert("用户不存在");
    }

    if (data.status == 1){
        alert("登录成功")
      setCookie("password",data.password,30);
      setCookie("username",data.user,30);
      setCookie("sign",data.sign,30);
      window.location.href="admin.html"
    }
      });
}
// 注册用户
function createUser(fn){
    var user = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;
    data_post={
        "Cmd":"createUser",
        "Username":user,
        "Password" :password,
        "Mobile":parseInt(mobile),
        "Email": email
    }
    from_post(HOST_PORT,data_post,function(data){
      
      if (data.code == 1){
          alert("用户已经存在请试试别的用户名");
      }
          if (data.code == 0){
        alert("注册成功");
      }
    });
}
//获取书籍
function GetBook(){
    data={
        "cmd":"show_book"
        
        }

        from_post(HOST_PORT,data,function(data){    
            var result_book="";
            for (i=0;i<data.result.length;i++){
                result_book+="<li class=\"list-group-item\" ><a onclick=\"GetPosting('"+data.result[i]+"')\">"+data.result[i]+"</a></li>\n";
            }
            console.log(result_book);
            document.getElementById("book_list").innerHTML=result_book;

       
        });
}



//搜索帖子

//监控



/**

 检测登录
*/
function checkCookie(){
    var username=getCookie("username");
    var password=getCookie("password");
    var sign=getCookie("sign");
    if (username!="" && password != "" && sign !=""){
        GetBook();
        document.getElementById("logininfo").innerHTML="<a style=\"background-color:#96B97D;color:#F0FFFF;font-size:15px\">"+username+"</a>";
        document.getElementById("handle").innerHTML="<li><a href=\"admin.html\"  style=\"background-color:#96B97D;color:#F0FFFF;font-size:15px\">后台</a></li><li><a onclick=\"loginout()\"  style=\"background-color:#96B97D;color:#F0FFFF;font-size:15px\">注销</a></li><li></li>";

    }else{
        GetBook();

        
    }
    }
//注销
function loginout(){
        clearCookie("password");
        clearCookie("username");
        clearCookie("sign");
        alert("注销成功");
        window.location.href="index.html";
}

//获取章节
function GetPosting(bookname){
    data={
        "cmd":"show_posting",
        "bookname":bookname
        }
        from_post(HOST_PORT,data,function(data){    
            var result_postring="";
            for (k in data){
                result_postring+="<li class=\"list-group-item\" ><a onclick=\"show_posting_content(\'"+data[k][0]+"\',\'"+data[k][4]+"\')\">"+data[k][0]+"</a></li>\n";
            }
          
            document.getElementById("book_list").innerHTML=result_postring;
        });
}
//查询章节和帖子 id | title | content      | time                                       | reply | book_key
function show_posting_content(title,bookname){
    data={
        "cmd":"show_Posting_content",
        "bookname":bookname,
        "title":title
        }
    from_post(HOST_PORT,data,function(data){    
        document.getElementById("posting_title").innerHTML="<h4  style=\"font-weight:bold;color:#96B97D;\" >"+data[0]+"</h4>";
        document.getElementById("posting_content").innerHTML="<pre>"+data[1]+"</pre>";
        document.getElementById("posting_time").innerHTML="<pre style=\"font-size:10px;text-align:center;\" >发表时间:   "+data[2]+"</pre>";
        GetPosting(bookname);

    });
}


function Search(){
    _search =  document.getElementById("_search").value;
    var con=document.getElementById("posting_content")

    data={
        "cmd":"search",
        "search_info":_search
        }
        var date = new Date();
        from_post(HOST_PORT,data,function(data){
            if (data == null){
                alert("未找到");
            }else{
                var content="";
                for(i=0;i<data.length;i++){
                    content+="<a onclick=\"show_posting_content(\'"+data[i][0]+"\',\'"+data[i][3]+"\')\">"+data[i][0]+"</a>"+"<p>"+data[i][1]+"</p><p>发布时间:  "+data[i][2]+"</p>"
                }
                document.getElementById("posting_title").innerHTML="<p>搜索内容为:  "+_search+"</p>";
                document.getElementById("posting_content").innerHTML=content;
                document.getElementById("posting_time").innerHTML="<p>搜索时间为:   "+date+"</p>";
                   
            }
        }); 
}

/**
 @管理员初始化
*/
function adminInit(){
    data={
        "cmd":"show_book"
        }
    var username=getCookie("username");
    var password=getCookie("password");
    var sign=getCookie("sign");
    if (username!="" && password != "" && sign !=""){

        document.getElementById("logininfo").innerHTML="<a style=\"background-color:#96B97D;color:#F0FFFF;font-size:15px\">"+username+"</a>";
        from_post(HOST_PORT,data,function(data){    
            var result_book="";
            for (i=0;i<data.result.length;i++){
                result_book+="<li><a onclick=\"select('"+data.result[i]+"')\">"+data.result[i]+"</a></li>\n";
            }
            document.getElementById("show_book").innerHTML=result_book;
        });
}else{
    alert("请登录");
    window.location.href="index.html"
}
}
//书籍添加
function admin_add_book(){
    var username=getCookie("username");
    var password=getCookie("password");
    var sign=getCookie("sign");
    //获取数据
    var tname = document.getElementById("tname").value;
    //拼装json
    data={
        "user":username,
        "password" :password,
        "code":"user",
        "sign":sign,
        "cmd":"add_book",
        "bookname":tname
    }
    //发送

    from_post(HOST_PORT,data,function(data){
        //返回       
        if(data.status == 0 ){
            alert("添加成功");
            setCookie("select_book",tname,30);
            location.reload();
        }else{
            alert("添加失败");
        }
    });
}

//章节添加
function Sendposting(){
    var username=getCookie("username");
    var password=getCookie("password");
    var sign=getCookie("sign");
    //获取数据
    //获取书籍名字
    var tname = document.getElementById("select").value;
    //内容
    var date = new Date();
    var _date = date.toString();
    var add_posting_title = document.getElementById("add_posting_title").value;
    var add_posting_content = document.getElementById("add_posting_content").value;
    // //拼装json
    var tname = document.getElementById("select").value;
    data_post={
        "user":username,
        "password" :password,
        "code":"user",
        "sign":sign,
        "cmd":"add_posting",
        "book_key":tname,
        "title":add_posting_title,
        "content":add_posting_content,
        "time":_date
}
from_post(HOST_PORT,data_post,function(data){ 
     //返回      
     if(data.status == 0 ){
        alert("添加成功");
        location.reload();
    }else{
        alert("添加失败");
    }
  });
}
//书籍选择
function select(data){
    document.getElementById("select").innerHTML=data;
    document.getElementById("select").value=data;
    data={
        "cmd":"show_posting",
        "bookname":data
    } 
    from_post(HOST_PORT,data,function(data){
        table="";
        for(obj in data){
            table+="<tr><td><input type=\"checkbox\" name=\"p_id\" value=\""+obj+"\" ></td><td>"+data[obj][0]+"</td><td>"+data[obj][1]+"</td><td>"+data[obj][2]+"</td><td>"+data[obj][3]+"</td></tr>"     
        }
        document.getElementById("posting_content_table").innerHTML=table;
        });
}


// //删除帖
function Posting_delete(){
    //选择书
    tname=document.getElementById("select").value;
    var username=getCookie("username");
    var password=getCookie("password");
    var sign=getCookie("sign");
        obj = document.getElementsByName("p_id");
        check_val = [];
        for(k in obj){
            if(obj[k].checked)
                check_val.push(obj[k].value);
        }
        data_post={
            "user":username,
            "password" :password,
            "code":"user",
            "sign":sign,
            "cmd":"del_posting",
            "id":check_val,
            "bookname":tname
        }
  from_post(HOST_PORT,data_post,function(data){ 
    if(data.status == 0 ){
        alert("删除成功");
        location.reload();
    }
  });

}
function up_posting(){
      var username=getCookie("username");
      var password=getCookie("password");
      var sign=getCookie("sign");
      //获取数据
      //获取书籍名字
      var date = new Date();
      var _date = date.toString();
      var tname = document.getElementById("select").value;
      //内容
      var id = document.getElementById("up_posting_id").value;
      var title=document.getElementById("up_posting_title").value;
      var content=document.getElementById("up_posting_content").value;
      var id_str=id.toString();
            data_post={
          "user":username,
          "password" :password,
          "code":"user",
          "sign":sign,
          "id":id_str,
          "cmd":"up_posting",
          "book_key":tname,
          "title":title,
          "content":content,
          "time":_date
  }
  from_post(HOST_PORT,data_post,function(data){ 
       //返回      
       if(data.status == 0 ){
          alert("修改成功");
          location.reload();
      }else{
          alert("添加失败");
      }
    });
}
function Del_book(){
    var username=getCookie("username");
    var password=getCookie("password");
    var sign=getCookie("sign");
    //获取数据
    //获取书籍名字
    var tname = document.getElementById("select").value;
    //内容
        data_post={
            "user":username,
            "password" :password,
            "code":"user",
            "sign":sign,
            "cmd":"del_book",
            "bookname":tname
        }

from_post(HOST_PORT,data_post,function(data){ 
     //返回      
     if(data.status == 0 ){
        alert("修改成功");
        location.reload();
    }else{
        alert("添加失败");
    }
  });
}
function Up_book(){
    var username=getCookie("username");
    var password=getCookie("password");
    var sign=getCookie("sign");
    //获取数据
    //获取书籍名字
    var tname = document.getElementById("select").value;
    //内容
    var up_name = document.getElementById("tname").value;
        data_post={
            "user":username,
            "password" :password,
            "code":"user",
            "sign":sign,
            "cmd":"up_book",
            "sbookname":tname,
            "dbookname":up_name          
        }

from_post(HOST_PORT,data_post,function(data){ 
     //返回      
     if(data.status == 0 ){
        alert("修改成功");
        location.reload();
    }else{
        alert("添加失败");
    }
  });
}





//获取编辑

function getPosting(){

    tname=document.getElementById("select").value;
    var username=getCookie("username");
    var password=getCookie("password");
    var sign=getCookie("sign");
    var date = new Date();
    var _date = date.toString();
    
     var  obj = document.getElementsByName("p_id");
        check_val = [];
        for(k in obj){
            if(obj[k].checked)
                check_val.push(obj[k].value);
        }
        data_post={
            "user":username,
            "password" :password,
            "code":"user",
            "sign":sign,
            "cmd":"show_posting_limit",
            "id":check_val,
            "bookname":tname,
            "time":_date
        }
        from_post(HOST_PORT,data_post,function(data){ 
            for(var i=0;i<data.length;i++){
                
                for (key in data[i]){
                    document.getElementById("up_posting_id").value=key;
                    document.getElementById("up_posting_title").value=data[i][key][0];
                    document.getElementById("up_posting_content").value=data[i][key][1];
                }
            }

          });

}

//排序
	// var arr = [1,5,10];
	// 	arr.reverse(); //大到小
	// 		arr.sort(); //小到大
	// 	alert(arr);

//全选删除
function checkAll(){
    var all=document.getElementById('all');
    var one=document.getElementsByName('p_id');
    if(all.checked==true){
            for(var i=0;i<one.length;i++){
                one[i].checked=true;
            }
 
    }else{
            for(var j=0;j<one.length;j++){
                one[j].checked=false;
            }
        }
}




