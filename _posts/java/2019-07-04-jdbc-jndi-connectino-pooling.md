---
layout: 'post'
title: '挖賽! 是java耶~ jdbc and connection pooling'
permalink: 'java/jdbc-and-connection-pooling'
tags: java connection-pooling jdbc
---

> 挖賽!!! 都快忘記自己進入行的一切源頭 就是陌生又熟悉的 `java `葛格了!
<br/> 感謝[一姐][pon-blog]{:target="_back"}的點名，讓我又再一次的跟我的貴人 說聲好~ :)

> 主要資料和資訊來源: ~我認真在資策會練功的學習筆記~ :smile:

# JDBC

- Java 提供一組資料庫存取的 API，名為 [JDBC](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/){:target="_back"} (Java Database Connectivity) API

- JDBC API 已經包含在 Java SE (8) 的版本中，**不用另外安裝**
   - java.sql : JDBC Core API，支援最基本的資料庫連存取功能
   - javax.sql: JDBC Extension API, 支援進階的資料庫連線
>
- JDBC API能讓 Java 程式存取關聯式資料庫 (Relational Database) 的資料
   - 即支援SQL(Structured Query Language) 敘述的關聯式資料庫管理系統(Relational Database Management System, RDBMS) 



## JDBC API 的設計目標:
- JDBC API 的設計目標:
   - 可以連接各個廠商所提供的RDBMS
>
- JDBC Driver:
   - JDBC API 透過JDBC Driver 來實現連接各個廠商所提供的RDBMS

![Imgur](https://i.imgur.com/HNkybR6.jpg)


[pon-blog]: https://pengpon.github.io/

## 接下來的範例 code:
> 就是直接寫一支程式去接 DB，中間沒有經過其他額外的程式邏輯串接！

![Imgur](https://i.imgur.com/98rhEby.jpg?1)

**速度來看code**

~~~java
package com.iii.eeit99.yuting;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class NewTestConnection {

	public static void main(String[] args)  {
		Connection conn =null;
     try {
        //1. load jdbc driverManager
	    Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		
	    //2. DataBase URL string 1)serverName 2)DBMS 3)databaseName
	    String connUrl ="jdbc:sqlserver://localhost:1433;databaseName=jdbc";
		
	    //3. create a connection linking to DB w/ 1) userName 2)Password 
	    conn = DriverManager.getConnection(connUrl, "sa", "passw0rd");
		
	    //4. execute a statement and access database
	    String qryStmt ="Select * from employee";
        Statement stmt=conn.createStatement(); 
        
        ResultSet rs = stmt.executeQuery(qryStmt);
        while(rs.next()) {
           System.out.print("name = " + rs.getString("ename") + ", ");
           System.out.print("Salary = " + rs.getDouble("salary") + ", ");
        }
              
     
     } catch (ClassNotFoundException e) {
		e.printStackTrace();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}finally {
		if(conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
  }
}
~~~

> 哇～～　好懷念唷：）

1. JDBC API:
~~~java 
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
~~~
2. 可以知道這隻程式是去接　MSSQL
~~~java
Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver"); // JDBC 4.0 會自動載入
~~~
3. 可以知道要連的ＤＢ位置在哪和資料庫(databaseName)名稱
~~~java
String connUrl ="jdbc:sqlserver://localhost:1433;databaseName=jdbc";
~~~
4. 輸入連線字串，連DB的帳號密碼，__建立連線__
~~~java
conn = DriverManager.getConnection(connUrl, "sa", "passw0rd");
~~~
5. 送出/執行 sql 指令
~~~java
String qryStmt ="Select * from employee";
Statement stmt=conn.createStatement();
ResultSet rs = stmt.executeQuery(qryStmt);
while(rs.next()) {
   System.out.print("name = " + rs.getString("ename") + ", ");
   System.out.print("Salary = " + rs.getDouble("salary") + ", ");
}
~~~
6. 肥肥的　try catch!!!!
~~~java
try {
  // 
} catch (ClassNotFoundException e) {
  // 
} catch (SQLException e) {
  //
} finally {
  
    if (conn != null) {
        try {
          conn.close();
        } catch (SQLException e) {
           //
        }
    }
}
~~~
7. **一定** **千萬** **百分百** 要close 連線！！
~~~java
conn.close();
~~~
  - 建立一個連線，會吃很多資源(造成運行效能低落)，所以使用完後要速度關閉連線釋放資源出來。


> 上面的資料存取模式(two-tier)在工作實務經驗上也真的有碰過唷！
<br/>但在較常見的網頁/網際網路資料存取的架構下，每次請求都要和資料庫建立連線，會造成資料庫生氣氣的情況！！！

![Imgur](https://i.imgur.com/NfwBLMU.jpg?1)

**有屎就要拉屎<br/>想吃火鍋就要配牛頭牌<br/>想要發大財民調就要唯一指名Korea-Fish<br/>想要解決資料庫生氣氣就要知道Connection-Poling!!!**

![Imgur](https://i.imgur.com/BhV6xpB.jpg)

## Connection Pooling:
   - 分配、管理和釋放資料庫連線
   - 允許應用程式重複使用一現有資料庫連線，而不是重新建立連線

<br/>
## 在網頁/網際網路資料存取架構下，DB的連線管理(connection pooling)，交給容器(EX: [Tomcat](https://tomcat.apache.org/tomcat-8.5-doc/jndi-resources-howto.html){:target="_back"})來管

### __設定:__

1. META-INF/context.xml

   ~~~xml
   <Resource
     maxWait="5000" 
     maxIdle="4"
     maxActive="8"
     url="jdbc:sqlserver://127.0.0.1:1433;DatabaseName=jspdb"    driverClassName="com.microsoft.sqlserver.jdbc.SQLServerDriver"    password="sa123456"
     username="sa"
     type="javax.sql.DataSource"
     name="jdbc/BookDataSQLver"
   />
   ~~~

2. WEB-INF/web.xml

   ~~~xml
   <resource-ref>
     <description>JNDI DataSource </description>
     <res-ref-name>jdbc/BookDataSQLver</res-ref-name>
     <res-type>javax.sql.DataSource</res-type>
     <res-auth>Container</res-auth>
   </resource-ref>
   ~~~


速度來看程式

~~~ java
package _02_login.model;
import java.sql.*;

import javax.naming.*;
import javax.sql.*;

import _00_init.util.*;
import _01_register.model.*;

public class LoginServiceImpl implements LoginService {
	private DataSource ds = null;
	public LoginServiceImpl() {
		try {
			Context ctx = new InitialContext();
			ds = (DataSource) ctx.lookup("java:comp/env/jdbc/BookDataSQLver");
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage()); 
		}
	}
	// 檢查帳號與密碼是否與某位已登入會員的帳號密碼完全相同。
	public MemberBean checkIDPassword(String userId, String password)	
	{
		MemberBean mb = null;
		String sql = "SELECT * FROM Member m WHERE m.memberId = ? and m.password = ?";
		try (
			Connection con = ds.getConnection(); 
			PreparedStatement ps = con.prepareStatement(sql);
		) {
			ps.setString(1, userId);
			ps.setString(2, password);
			try (ResultSet rs = ps.executeQuery();) {
				if (rs.next()) {
					mb = new MemberBean();
					mb.setSeqNo(rs.getInt("seqNo"));
					mb.setMemberId(rs.getString("memberId"));
					mb.setName(rs.getString("name"));
					mb.setPassword(rs.getString("password"));
					mb.setAddress(rs.getString("address"));
					mb.setEmail(rs.getString("email"));
					mb.setTel(rs.getString("tel"));
					mb.setUserType(rs.getString("userType"));
					mb.setRegisterTime(rs.getTimestamp("registerTime"));
					mb.setTotalAmt(rs.getDouble("totalAmt"));
					mb.setMemberImage(rs.getBlob("memberImage"));
					mb.setFileName(rs.getString("filename"));
					mb.setComment(rs.getClob("comment"));
					mb.setUnpaid_amount(rs.getDouble("Unpaid_amount"));
				}
			}
		} catch (Exception ex) {
			throw new RuntimeException("發生例外：" + ex.getMessage());
		}
		return mb;
	}
}
~~~

- 不用寫 con.close()自動幫你把連線丟回到pool裡面：
~~~java
try (
	   Connection con = ds.getConnection(); 
	   PreparedStatement ps = con.prepareStatement(sql);
	) catch (xxx){
        //
        }
~~~

> 還蠻佩服自己都還記的一些重點　哈哈哈～～～

## Hibernate
   - 種點就是上面 code 的範例，程式要跟DB作互動時，跟 javax.sql.DataSource 拿取連線。
   - 當架構有用到 Hibernate 時候跟Hibernate 的session Factory拿取連線。

設定：
1. META-INF/context.xml

   ~~~xml
    <Context>
      <Resource
      url="jdbc:sqlserver://localhost:1433;database=java"
      driverClassName="com.microsoft.sqlserver.jdbc.SQLServerDriver"
      password="passw0rd"
      username="sa"
      maxWaitMillis="10000"
      maxIdle="30"
      maxTotal="100"
      type="javax.sql.DataSource"
      auth="Container"
      name="jdbc/xxx"/>
    </Context>
   ~~~

2. WEB-INF/web.xml

   ~~~xml
   <resource-ref>
     <res-ref-name>jdbc/xxx</res-ref-name>
     <res-type>javax.sql.DataSource</res-type>
     <res-auth>Container</res-auth>
     <res-sharing-scope>Shareable</res-sharing-scope>
   </resource-ref>
   ~~~

3. src/main/resources/hibernate.cfg.xml [在Maven Web 專案架構下]

   ~~~xml
   -<hibernate-configuration>
      <session-factory>
        <property name="hibernate.connection.datasource">java:comp/env/jdbc/xxx</property>
        <property name="hibernate.dialect">org.hibernate.dialect.SQLServerDialect</property>
        <property name="hibernate.current_session_context_class">thread</property>
        <property name="hibernate.show_sql">true</property>
        <mapping class="model.ProductBean"/>
        <mapping class="model.CustomerBean"/>
      </session-factory>
   </hibernate-configuration>
   ~~~

### 速度來看程式:

1. web app 一啟動就init SessionFactory

   ~~~java
   package model.hibernate;
   
   import javax.servlet.ServletContextEvent;
   import javax.servlet.ServletContextListener;
   import javax.servlet.annotation.WebListener;
   
   import org.hibernate.SessionFactory;
   
   @WebListener
   public class SessionFactoryListener implements ServletContextListener {
   	private SessionFactory sessionFactory;
   	
   	@Override
   	public void contextInitialized(ServletContextEvent event) {
   		System.out.println("Create SessionFactory");
   		sessionFactory = HibernateUtil.getSessionFactory();
   	}
   	@Override
   	public void contextDestroyed(ServletContextEvent event) {
   		System.out.println("Close SessionFactory");
   		if(sessionFactory!=null) {
   			sessionFactory.close();
   		}
   	}
   }
   ~~~

2. Hibernate SessionFactory
    ~~~java
    package model.hibernate;

    import org.hibernate.SessionFactory;
    import org.hibernate.boot.MetadataSources;
    import org.hibernate.boot.registry.StandardServiceRegistry;
    import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
    
    public class HibernateUtil {
    	private static SessionFactory sessionFactory = createSessionFactory();
    	private static SessionFactory createSessionFactory() {
    		try {
    			StandardServiceRegistry serviceRegistry =
    					new StandardServiceRegistryBuilder().configure().build();
    			return new MetadataSources(serviceRegistry).buildMetadata().buildSessionFactory();
    		} catch (Exception e) {
    			e.printStackTrace();
    			throw new ExceptionInInitializerError(e);
    		}
    	}
    	
    	public static SessionFactory getSessionFactory() {
    		return sessionFactory;
    	}
    	public static void closeSessionFactory() {
    		if(sessionFactory!=null) {
    			sessionFactory.close();
    		}
    	}
    }

    ~~~

3. 在DAO中使用

   ~~~java
   package model.dao;

    import org.hibernate.Session;
    import org.hibernate.SessionFactory;
    
    import model.CustomerBean;
    import model.CustomerDAO;
    import model.hibernate.HibernateUtil;
    
    public class CustomerDAOHibernate implements CustomerDAO {
    	public static void main(String[] args) {
    		try {
    			HibernateUtil.getSessionFactory().getCurrentSession().beginTransaction();
    			
    			CustomerDAO customerDao = new CustomerDAOHibernate(HibernateUtil.getSessionFactory());
    			CustomerBean bean = customerDao.select("Alex");
    			System.out.println("select="+bean);
    			
    			boolean update = customerDao.update(
    					"ABC".getBytes(), "ellen@yahoo.com", new java.util.Date(0), "Ellen");
    			System.out.println("update="+update);
    		
    			HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().commit();
    			HibernateUtil.getSessionFactory().getCurrentSession().close();
    		} finally {
    			HibernateUtil.closeSessionFactory();
    		}
    	}
    	private SessionFactory sessionFactory;
    	public CustomerDAOHibernate(SessionFactory sessionFactory) {
    		this.sessionFactory = sessionFactory;
    	}
    	public Session getSession() {
    		return sessionFactory.getCurrentSession();
    	}
    
    	@Override
    	public CustomerBean select(String custid) {
    		return this.getSession().get(CustomerBean.class, custid);
    	}
    
    	@Override
    	public boolean update(byte[] password, String email, java.util.Date birth, String custid) {
    		CustomerBean result = this.getSession().get(CustomerBean.class, custid);
    		if(result!=null) {
    			result.setPassword(password);
    			result.setEmail(email);
    			result.setBirth(birth);
    			return true;
    		}
    		return false;
    	}
    }

   ~~~


> 爽！！！！！！！！　先這樣！！！　哈哈哈哈哈哈哈