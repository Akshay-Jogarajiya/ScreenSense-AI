package com.ScreenSense.ScreenSense.AI.controller;

import com.ScreenSense.ScreenSense.AI.dto.LoginRequest;
import com.ScreenSense.ScreenSense.AI.dto.ProfileResponse;
import com.ScreenSense.ScreenSense.AI.dto.ProfileUpdateRequest;
import com.ScreenSense.ScreenSense.AI.entity.User;
import com.ScreenSense.ScreenSense.AI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController()
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){

        boolean isLogin = userService.login(loginRequest);

        if (isLogin) {
            return ResponseEntity.ok("Login Successful!");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        if (userService.checkEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        boolean isRegister = userService.register(user);
        if (isRegister) {
            return ResponseEntity.ok("Register Successful!");
        }
        return ResponseEntity.status(401).body("Error: Email is already in use!");
    }

    @GetMapping("/profile/{email}")
    public ResponseEntity<ProfileResponse> getProfile(@PathVariable String email){

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
