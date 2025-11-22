// package com.smartshelfx.config;

// import com.smartshelfx.security.CustomUserDetailsService;
// import com.smartshelfx.config.JwtAuthenticationFilter;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity
// @RequiredArgsConstructor
// public class SecurityConfig {

//     private final CustomUserDetailsService customUserDetailsService;
//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public DaoAuthenticationProvider authenticationProvider() {
//         DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//         authProvider.setUserDetailsService(customUserDetailsService);
//         authProvider.setPasswordEncoder(passwordEncoder());
//         return authProvider;
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
//         return authConfig.getAuthenticationManager();
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable())
//             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/api/auth/**").permitAll()
//                 .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                 .requestMatchers("/api/manager/**").hasAnyRole("ADMIN", "MANAGER")
//                 .requestMatchers("/api/vendor/**").hasAnyRole("ADMIN", "VENDOR")
//                 .anyRequest().authenticated()
//             );

//         http.authenticationProvider(authenticationProvider());
//         http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }
// }


package com.smartshelfx.config;

import com.smartshelfx.security.CustomUserDetailsService;
import com.smartshelfx.config.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // ====================
    // PASSWORD ENCODER
    // ====================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ====================
    // AUTH PROVIDER
    // ====================
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // ====================
    // AUTH MANAGER
    // ====================
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // ====================
    // MAIN SECURITY FILTER
    // ====================
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {}) // allow global CORS
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth

                // PUBLIC ROUTES
                .requestMatchers(
                        "/api/auth/**",
                        "/uploads/**",
                        "/public/**",

                        // must be public, otherwise image upload = 403
                        "/api/upload/**"
                ).permitAll()

                // PRODUCT ROUTES (Admin + Manager allowed)
                .requestMatchers("/api/products/**")
                    .hasAnyRole("ADMIN", "MANAGER", "VENDOR")

                // PURCHASE ORDER ROUTES  ✅ FIX ADDED
                .requestMatchers("/api/purchase-orders/**")
                    .hasAnyRole("ADMIN", "MANAGER", "VENDOR")

                // ADMIN ROUTES
                .requestMatchers("/api/admin/**")
                    .hasRole("ADMIN")

                // MANAGER ROUTES
                .requestMatchers("/api/manager/**")
                    .hasAnyRole("ADMIN", "MANAGER")

                // VENDOR ROUTES
                .requestMatchers("/api/vendor/**")
                    .hasAnyRole("ADMIN", "VENDOR")

                // BUYER ROUTES
                .requestMatchers("/api/buyer/**")
                    .hasAnyRole("ADMIN", "BUYER")

                // ANY OTHER ENDPOINT REQUIRES AUTHENTICATION
                .anyRequest().authenticated()
            );

        // AUTHENTICATION PROVIDER + JWT FILTER
        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
