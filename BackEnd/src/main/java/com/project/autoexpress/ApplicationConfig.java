package com.project.autoexpress;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.sql.DataSource;
import java.util.Properties;


@Configuration
@EnableWebMvc
public class ApplicationConfig {

  @Bean(name = "sessionFactory")
  public LocalSessionFactoryBean sessionFactory() {
    LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
    sessionFactory.setDataSource(dataSource()); // which DB you want to connect?
    sessionFactory.setPackagesToScan("com.project.autoexpress.entity"); // where to scan entities (POJO class)?
    sessionFactory.setHibernateProperties(hibernateProperties()); // use what ORM properties?
    return sessionFactory;
  }

  // NOTICE:
  // If you want to use Amazon RDS database, then uncomment RDS section, and comment the local section
  // If you want to use local database, then uncomment the local section, and comment the RDS section
  // 如果你希望使用云端数据库，请comment local段落，并uncomment RDS段落。（前端的同学请尽量使用云端数据库）
  // 如果你希望使用本地数据库，则反之。 （前提是你配置了一个本地数据库）

  @Bean(name = "dataSource")
  public DataSource dataSource() {
    // RDS:
    final String INSTANCE = "autoexpress-instance.c5cogveqk32k.us-east-2.rds.amazonaws.com"; // instance address - endpoint - API
    final String PORT_NUM = "3306";
    final String DB_NAME = "autoexpress";
    final String USERNAME = "admin";
    final String PASSWORD = "hksssyyyyz";

    // Local:
//    final String INSTANCE = "localhost";
//    final String PORT_NUM = "3306";
//    final String DB_NAME = "autoexpress";
//    final String USERNAME = "root";
//    final String PASSWORD = "asdf";

    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
    dataSource.setUrl("jdbc:mysql://" + INSTANCE + ":" + PORT_NUM + "/" + DB_NAME);
    dataSource.setUsername(USERNAME);
    dataSource.setPassword(PASSWORD);

    return dataSource;
  }


  private final Properties hibernateProperties() {
    Properties hibernateProperties = new Properties();
    hibernateProperties.setProperty("hibernate.hbm2ddl.auto", "update");
    hibernateProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5InnoDBDialect");
    hibernateProperties.setProperty("hibernate.show_sql", "true");
    return hibernateProperties;
  }
}
