package com.ScreenSense.ScreenSense.AI.service.impl;

import com.ScreenSense.ScreenSense.AI.dto.UsageRequest;
import com.ScreenSense.ScreenSense.AI.entity.UsageEntity;
import com.ScreenSense.ScreenSense.AI.entity.User;
import com.ScreenSense.ScreenSense.AI.repo.UsageRepo;
import com.ScreenSense.ScreenSense.AI.repo.UserRepo;
import com.ScreenSense.ScreenSense.AI.service.UsageService;
import com.ScreenSense.ScreenSense.AI.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UsageServiceImpl implements UsageService {

    @Autowired
    private UsageRepo usageRepo;

    @Autowired
    private UserRepo userRepo;

    public void saveUsage(UsageRequest request) {
        UsageEntity entity = new UsageEntity();
        entity.setDomain(request.getDomain());

        String email = SecurityUtil.getCurrentUsername();
        Optional<User> user = userRepo.findByEmail(email);
        user.ifPresent(value -> entity.setUserId(value.getId()));

        entity.setTimeSpent(request.getTimeSpent());
        entity.setDate(LocalDate.now());
        usageRepo.save(entity);
    }

    public List<UsageEntity> todayUsage() {
        return usageRepo.findByDate(LocalDate.now());
    }
}
