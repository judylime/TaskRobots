package com.project.autoexpress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.time.Duration;
import java.util.Arrays;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private DataSource dataSource;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
            .cors() // all CORS request
            .and()
            .csrf()
            .disable(); // 先不处理跨站点请求伪造的问题（Cross-site request forgery）

    http
            .formLogin()
            .successHandler((httpServletRequest, httpServletResponse, authentication) -> {
              System.out.println(authentication.getName() + "logged in.");
//              httpServletResponse.setHeader("username", authentication.getName()); // return the email ID
              httpServletResponse.setStatus(HttpStatus.OK.value());
            })
            .failureHandler((httpServletRequest, httpServletResponse, e) -> {
              httpServletResponse.setStatus(HttpStatus.BAD_REQUEST.value()); // if fail to login, return the bad request status code
            });

    // antMatchers是帮我们设置不同页面的权限的。
    http
            .authorizeRequests() // 指明权限，*是任意字符；**是可以匹配/a/b这种多个level的。
            .antMatchers("/accountinfo/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
            .antMatchers("/payment/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
            .antMatchers("/admin/**").hasAnyAuthority("ROLE_ADMIN")
            .anyRequest().permitAll();
    // 而且权限不够的时候，会自动redirect to login

    http   // logout不用写，用默认的就好了。
            .logout()
            .logoutUrl("/logout");
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth. // 这是一个测试用的账号。
            inMemoryAuthentication().withUser("admin")
            .password("123").authorities("ROLE_ADMIN");

    auth
            .jdbcAuthentication()
            .dataSource(dataSource) //上面autowired进来
            .usersByUsernameQuery("SELECT emailId, password, enabled FROM users WHERE emailId=?")
            .authoritiesByUsernameQuery("SELECT emailId, authorities FROM authorities WHERE emailId=?");
// 这两行只能是raw SQL，留下问号”?”可以让框架帮我们输入用户的输入值。
  }

  @SuppressWarnings("deprecation") // spring5必须要加密，我们没有encode。所以直接返回就行了。
  @Bean
  public static NoOpPasswordEncoder passwordEncoder() {
    return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance(); // 所以直接返回就行了。
  }

  // 响应OPTION request
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowCredentials(true);
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // 注意如果允许的是*，那么credentials会出问题。
    configuration.setAllowedMethods(Arrays.asList("*"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setMaxAge(Duration.ofHours(1));
    source.registerCorsConfiguration("/**",configuration);
    return source;
  }
}
