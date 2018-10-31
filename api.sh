#!/bin/bash
#创建用户
#curl -d "{ \"cmd\":\"add_user\" ,\"user\":\"hcwq\", \"email\":\"751164212@qq.com\", \"name\":\"huangchengwu1\" ,\"password\":\"qq751164212\" ,\"mobile\":\"17710136904\" }" 10.104.93.249:8082 
#查看用户
#curl -d "{\"cmd\":\"show_user\"}" 10.104.93.249:8082 
#删除用户
#curl -d "{\"cmd\":\"del_user\",\"user\":\"hcw\"}" 10.104.93.249:8082 

#修改密码
#curl -d "{\"cmd\":\"up_user\",\"user\":\"hcw1\",\"password\":\"123.com\"}" 10.104.93.249:8082 

################################
#添加书
#curl -d "{\"cmd\":\"add_book\",\"bookname\":\"java5201\"}" 10.104.93.249:8082 
#curl -d "{\"cmd\":\"add_book\",\"bookname\":\"python\"}" 10.104.93.249:8082 
#修改书名
#curl -d "{\"cmd\":\"up_book\",\"sbookname\":\"test1\",\"dbookname\":\"java\"}" 10.104.93.249:8082 
#删除书
#curl -d "{\"cmd\":\"del_book\",\"bookname\":\"java\"}" 10.104.93.249:8082 
#查询书
#curl -d "{\"cmd\":\"show_book\"}" 10.104.93.249:8082 


######################################
#添加贴 和修改贴不冲突
#curl -d "{\"cmd\":\"add_posting\",\"content\":{\"test1\":\"test1\"},\"bookname\":\"java5201\"}" 10.104.93.249:8082 
#删除贴

#修改贴

#查询贴
#curl -d "{\"cmd\":\"show_posting\"}" 10.104.93.249:8082 
#算法命令为 echo -n "~hcwq@qq751164212&"|md5sum

#用户登录
#邮箱登录操作 ,登录验证算法为   ~751164212@qq.com@qq751164212& md5

#curl -d "{\"cmd\":\"show_user\",\"sign\":\"2f4730a62656341258a1f4ad1e2ee73e\",\"code\":\"email\",\"email\":\"751164212@qq.com\",\"password\":\"qq751164212\"}" 10.104.93.249:8082 
#手机登录操作 ,登录验证算法为 ~17710136904@qq751164212&   md5
#curl -d "{\"cmd\":\"show_posting\",\"sign\":\"77fdcfa2481333164080ab9fd1948ae3\",\"code\":\"mobile\",\"mobile\":\"17710136904\",\"password\":\"qq751164212\"}" 134.175.199.180:8082

#用户登录操作, 登录验证算法为
curl -d "{\"cmd\":\"show_posting\",\"sign\":\"31f37ca2f1ca3b16099860a262ec15bb\",\"code\":\"user\",\"user\":\"hcw1\",\"password\":\"qq\"}" 134.175.199.180:8082

