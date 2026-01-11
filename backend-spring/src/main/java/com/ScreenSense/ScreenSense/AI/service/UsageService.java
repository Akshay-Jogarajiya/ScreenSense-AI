package com.ScreenSense.ScreenSense.AI.service;

import com.ScreenSense.ScreenSense.AI.dto.UsageRequest;
import com.ScreenSense.ScreenSense.AI.entity.UsageEntity;

import java.util.List;

public interface UsageService {

    public void saveUsage(UsageRequest usageRequest);

    public List<UsageEntity> todayUsage();
}
