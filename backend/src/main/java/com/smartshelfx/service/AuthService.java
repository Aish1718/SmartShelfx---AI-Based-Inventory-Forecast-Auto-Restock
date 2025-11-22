package com.smartshelfx.service;

import com.smartshelfx.dto.LoginRequest;
import com.smartshelfx.dto.LoginResponse;
import com.smartshelfx.dto.RegisterRequest;
import com.smartshelfx.exception.BadRequestException;
import com.smartshelfx.model.User;
import com.smartshelfx.model.enums.Role;
import com.smartshelfx.repository.UserRepository;
import com.smartshelfx.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        return new LoginResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    @Transactional
    public String register(RegisterRequest request) {
        try {
            // Validate email
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new BadRequestException("Email already exists");
            }

            // Validate role
            if (request.getRole() == null || request.getRole().trim().isEmpty()) {
                throw new BadRequestException("Role is required");
            }

            // Create user
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            // Convert string → ROLE ENUM
            try {
                user.setRole(Role.valueOf(request.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid role: " + request.getRole() + ". Valid roles are: ADMIN, MANAGER, VENDOR, BUYER");
            }

            user.setIsActive(true);

            // Save user
            userRepository.save(user);
            return "User registered successfully";
        } catch (BadRequestException e) {
            // Re-throw BadRequestException as-is
            throw e;
        } catch (Exception e) {
            // Log the full exception for debugging
            e.printStackTrace();
            throw new BadRequestException("Registration failed: " + e.getMessage());
        }
    }

}