#!/bin/bash
#db 配置
dbname="blog"
dbhost="10.104.93.249"
dbpassword="doingadmin"
dbuser="root"
Log_dir=${1:-"/var/log/blog"}
#blog  -h 是帮助可以指定日志     默认日志在 /var/log/blog/
#指定目录的话需要些./start.sh ./blog
#http 配置 true是必须登录   false 是不登录   false用于curl api调试  

httpserver="10.104.93.249:8082"
Debug=true
mysql -u${dbuser} -p${dbpassword} -h${dbhost} $dbname -e "drop database blog1"
connect=$(mysql -u${dbuser} -p${dbpassword} -h${dbhost} -e "show databases"|grep -w "${dbname}"|wc -l)
if [ $connect == 0  ];then
echo -e "\033[33m--------------------------------------\033[0m"
echo -e "\033[32m \n开始创建数据库\n \033[0m"
echo -e "\033[33m--------------------------------------\033[0m"

mysql -u${dbuser} -p${dbpassword} -h${dbhost} -e "CREATE DATABASE $dbname DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci"
echo -e "\033[33m--------------------------------------\033[0m"
echo -e "\033[32m \n创建表结构\n \033[0m"
echo -e "\033[33m--------------------------------------\033[0m"
mysql -u${dbuser} -p${dbpassword} -h${dbhost} $dbname <<EOF
CREATE TABLE Bookname (
  id int(11) NOT NULL AUTO_INCREMENT,
  bookname varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY bookname (bookname)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
CREATE TABLE Posting (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(50) DEFAULT NULL,
  content text,
  time varchar(255) DEFAULT NULL,
  reply text,
  book_key varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE userinfo (
  id int(11) NOT NULL AUTO_INCREMENT,
  user varchar(50) DEFAULT NULL,
  password varchar(50) DEFAULT NULL,
  email varchar(50) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  mobile varchar(11) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY user (user)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
INSERT INTO userinfo VALUES (1,'hcw','doingadmin','751164212@doingadmin.com','hcwq','17710136904');
EOF
[ $? == 0 ] && echo -e  "\033[32m \n创建成功\n \033[0m" && chmod +x blog && ./blog -httpserver=$httpserver    -DBhost=$dbhost  -Debug=$Debug -DBname=$dbname -log_dir=$Log_dir||echo -e  "\033[31m  \n创建失败，可能数据库存在\n \033[0m"
else
	echo -e "\033[33m--------------------------------------\033[0m"
	echo -e "\033[32m \n启动服务器\n \033[0m"
	echo -e "\033[33m--------------------------------------\033[0m"
chmod +x blog
./blog -httpserver=$httpserver    -DBhost=$dbhost  -Debug=$Debug -DBname=$dbname -log_dir=$Log_dir
fi

