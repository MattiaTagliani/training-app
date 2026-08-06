package com.trainingapp.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean //HttpSecurity http -> si può pensarlo come fosse un builder
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                //csrf (cross site request forgery). di solito in REST api non c'è session nè cookie quindi 99% delle volte si disabilita
                .csrf(csrf -> csrf.disable())
                //qui si decide chi può accedere a cosa. auth è un altro builder
                .authorizeHttpRequests(auth -> auth
                        //chiunque può vedere gli end point che cominciano con /api/
                        //.requestMatchers("/api/**").permitAll()
                        //per tutti gli altri endpoint, devi essere autenticato. altrimenti esce 401 unauthorized
                        //.anyRequest().authenticated()
                                //permit all per ora perchè sennò spring continua a generare la sua passkey
                                .anyRequest().permitAll()
                        );
                //lo rimetto più avanti quando ci sarà bisogno
                //.httpBasic(Customizer.withDefaults());

        return http.build();

    }
}
