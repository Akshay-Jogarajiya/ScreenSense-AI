package com.ScreenSense.ScreenSense.AI.controller;

import com.ScreenSense.ScreenSense.AI.dto.AuthResponse;
import com.ScreenSense.ScreenSense.AI.dto.LoginRequest;
import com.ScreenSense.ScreenSense.AI.dto.ProfileResponse;
import com.ScreenSense.ScreenSense.AI.dto.ProfileUpdateRequest;
import com.ScreenSense.ScreenSense.AI.entity.User;
import com.ScreenSense.ScreenSense.AI.service.UserService;
import com.ScreenSense.ScreenSense.AI.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController()
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){

        User user = userService.login(loginRequest);

        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {

            String token = jwtUtils.generateToken(user.getEmail());
            return ResponseEntity.ok(new AuthResponse(token, user.getName()));
        } else {
            return ResponseEntity.status(401).body("Invalid Credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userService.checkEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        boolean isRegister = userService.register(user);
        if (isRegister) {
            String token = jwtUtils.generateToken(user.getEmail());
            return ResponseEntity.ok(new AuthResponse(token, user.getName()));
        }
        return ResponseEntity.status(401).body("Error: Email is already in use!");
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfile(@RequestParam String email){

        ProfileResponse profileResponse = userService.getProfile(email);
        if (profileResponse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(profileResponse);
    }

    @PutMapping("/profile/update/{email}")
    public ResponseEntity<String> updateProfile(@PathVariable String email, @RequestBody ProfileUpdateRequest profileUpdateRequest) {

        String message = userService.updateProfile(email, profileUpdateRequest);
        return ResponseEntity.ok(message);
    }
}
