package com.ScreenSense.ScreenSense.AI.service.impl;

import com.ScreenSense.ScreenSense.AI.dto.LoginRequest;
import com.ScreenSense.ScreenSense.AI.dto.ProfileResponse;
import com.ScreenSense.ScreenSense.AI.dto.ProfileUpdateRequest;
import com.ScreenSense.ScreenSense.AI.entity.User;
import com.ScreenSense.ScreenSense.AI.repo.UserRepo;
import com.ScreenSense.ScreenSense.AI.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public User login(LoginRequest loginRequest) {

        Optional<User> user = userRepo.findByEmail(loginRequest.getEmail());
        return user.orElse(null);
    }

    @Override
    public User register(User user) {

        return userRepo.save(user);
    }

    @Override
    public boolean checkEmail(String email) {

        return userRepo.existsByEmail(email);
    }

    @Override
    public ProfileResponse getProfile(int userId) {

        Optional<User> user =  userRepo.findById(userId);

        return user.map(value -> modelMapper.map(value, ProfileResponse.class)).orElse(null);
    }

    @Override
    public String updateProfile(String email, ProfileUpdateRequest profileUpdateRequest) {

        Optional<User> user = userRepo.findByEmail(email);
        if(user.isPresent()){
            User userData = user.get();
            userData.setName(profileUpdateRequest.getName());
            userData.setAge(profileUpdateRequest.getAge());
            userData.setGender(profileUpdateRequest.getGender());
            userData.setGoal(profileUpdateRequest.getGoal());
            userData.setTime(profileUpdateRequest.getTime());
            userData.setDeviceType(profileUpdateRequest.getDeviceType());
            userRepo.save(userData);
            return "Profile updated successfully";
        }
        return "Profile not found";
    }
}
