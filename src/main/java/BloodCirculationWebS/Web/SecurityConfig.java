package BloodCirculationWebS.Web;

import BloodCirculationWebS.Web.models.UserInfoService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import java.io.IOException;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    @Autowired
    private UserInfoService userInfoService;

    @Bean
    public UserDetailsService userDetailsService() {
        System.out.println("userDetailsService");
        return userInfoService;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userInfoService);
        authProvider.setPasswordEncoder(passwordEncoder());
        System.out.println("authenticationProvider");
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        System.out.println("passwordEncoder");
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(httpForm -> {
                    httpForm.loginPage("/login").permitAll();
//                    httpForm.defaultSuccessUrl("/");
//                    httpForm.failureUrl("/login?error=true");
                    httpForm.successHandler(new AuthenticationSuccessHandler() {
                        @Override
                        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                            response.setStatus(HttpServletResponse.SC_OK);
                        }
                    });
                    httpForm.failureHandler(new AuthenticationFailureHandler() {

                        @Override
                        public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        }
                    });
                })

                .authorizeHttpRequests(registry -> {
//                    registry.requestMatchers("/registration", "/css/**", "/bottomTab.html", "/topTab.html","/images/**", "/js/**", "/calc", "/").permitAll();
//                    registry.anyRequest().authenticated();
                    registry.requestMatchers("/history").authenticated();
                    registry.anyRequest().permitAll();

                })
                .logout(log ->{
                    log.logoutUrl("/logout");
                    log.logoutSuccessUrl("/");
                    log.permitAll();
                })

                .build();
    }
}
