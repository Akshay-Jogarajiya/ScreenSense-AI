package com.ScreenSense.ScreenSense.AI.service;

import com.ScreenSense.ScreenSense.AI.dto.LoginRequest;
import com.ScreenSense.ScreenSense.AI.entity.User;

public interface UserService {

    public boolean login(LoginRequest loginRequest);

    public boolean register(User user);

    public boolean checkEmail(String email);
}
