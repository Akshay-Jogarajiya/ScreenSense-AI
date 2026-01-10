package com.ScreenSense.ScreenSense.AI.service.impl;

import com.ScreenSense.ScreenSense.AI.dto.LoginRequest;
import com.ScreenSense.ScreenSense.AI.dto.ProfileResponse;
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
    public boolean login(LoginRequest loginRequest) {

        Optional<User> user = userRepo.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
        return user.isPresent();
    }

    @Override
    public boolean register(User user) {

        userRepo.save(user);
        return true;
    }

    @Override
    public boolean checkEmail(String email) {

        return userRepo.existsByEmail(email);
    }

    @Override
    public ProfileResponse getProfile(String email) {

        Optional<User> user =  userRepo.findByEmail(email);

        return user.map(value -> modelMapper.map(value, ProfileResponse.class)).orElse(null);
    }
}
