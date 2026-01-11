package com.ScreenSense.ScreenSense.AI.service;

import com.ScreenSense.ScreenSense.AI.dto.LoginRequest;
import com.ScreenSense.ScreenSense.AI.dto.ProfileResponse;
import com.ScreenSense.ScreenSense.AI.dto.ProfileUpdateRequest;
import com.ScreenSense.ScreenSense.AI.entity.User;
import org.springframework.http.ResponseEntity;

public interface UserService {

    public User login(LoginRequest loginRequest);

    public User register(User user);

    public boolean checkEmail(String email);

    public ProfileResponse getProfile(int userId);

    public String updateProfile(int userId, ProfileUpdateRequest profileUpdateRequest);
}
