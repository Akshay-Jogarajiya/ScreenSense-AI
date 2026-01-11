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
            return ResponseEntity.ok(new AuthResponse(token, user.getId()));
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

        User registredUser = userService.register(user);
        if (registredUser != null) {
            String token = jwtUtils.generateToken(registredUser.getEmail());
            return ResponseEntity.ok(new AuthResponse(token, registredUser.getId()));
        }
        return ResponseEntity.status(401).body("Error: Email is already in use!");
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<ProfileResponse> getProfile(@PathVariable int userId) {

        ProfileResponse profileResponse = userService.getProfile(userId);
        if (profileResponse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(profileResponse);
    }

    @PutMapping("/profile/update/{userId}")
    public ResponseEntity<String> updateProfile(@PathVariable int userId, @RequestBody ProfileUpdateRequest profileUpdateRequest) {

        String message = userService.updateProfile(userId, profileUpdateRequest);
        return ResponseEntity.ok(message);
    }
}
