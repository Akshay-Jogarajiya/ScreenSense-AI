package com.ScreenSense.ScreenSense.AI.service.impl;

import com.ScreenSense.ScreenSense.AI.dto.DashboardResponse;
import com.ScreenSense.ScreenSense.AI.entity.UsageEntity;
import com.ScreenSense.ScreenSense.AI.entity.User;
import com.ScreenSense.ScreenSense.AI.repo.UsageRepo;
import com.ScreenSense.ScreenSense.AI.repo.UserRepo;
import com.ScreenSense.ScreenSense.AI.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private final UserRepo userRepository;

    @Autowired
    private final UsageRepo usageRepository;
    @Autowired
    private final GeminiService geminiService;

    public DashboardService(UserRepo userRepository,
                            UsageRepo usageRepository,
                            GeminiService geminiService) {
        this.userRepository = userRepository;
        this.usageRepository = usageRepository;
        this.geminiService = geminiService;
    }

    public DashboardResponse buildDashboard() {
        // 🔐 Current user
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        LocalDate today = LocalDate.now();
        List<UsageEntity> todayUsage =
                usageRepository.findByUserIdAndDate(user.getId(), today);

        long totalMs = todayUsage.stream()
                .mapToLong(UsageEntity::getTimeSpent)
                .sum();
        long productiveMs = todayUsage.stream()
                .filter(u -> !u.getDomain().contains("youtube"))
                .mapToLong(UsageEntity::getTimeSpent)
                .sum();

        long wastedMs = totalMs - productiveMs;

        // 🔹 Profile
        Map<String, Object> profile = Map.of(
                "name", user.getName(),
                "email", user.getEmail(),
                "role", "AI Productivity User",
                "avatar", "https://i.pravatar.cc/100"
        );

        Map<String, Object> status = Map.of(
                "tracking", true,
                "trackerOffTime", "0h",
                "lastActive", new Date().toString(),
                "currentTask", "Idle"
        );

        // 🔹 Productivity
        Map<String, Object> productivity = Map.of(
                "score", (int) ((productiveMs * 100) / Math.max(totalMs, 1)),
                "totalTime", formatTime(totalMs),
                "productiveTime", formatTime(productiveMs),
                "wastedTime", formatTime(wastedMs)
        );

        // 🔹 Apps
        Map<String, Long> appTime = new HashMap<>();
        for (UsageEntity u : todayUsage) {
            appTime.merge(u.getDomain(), u.getTimeSpent(), Long::sum);
        }

        List<Map<String, Object>> apps = new ArrayList<>();
        appTime.forEach((k, v) -> {
            apps.add(Map.of(
                    "name", k,
                    "time", v / 60000,
                    "openCount", 1,
                    "type", k.contains("youtube") ? "Unproductive" : "Productive"
            ));
        });
        // 🔹 Weekly Summary
        List<Map<String, Object>> weekly = new ArrayList<>();
        for (int i = 4; i >= 0; i--) {
            LocalDate d = today.minusDays(i);
            long dayMs = usageRepository
                    .findByUserIdAndDate(user.getId(), d)
                    .stream()
                    .mapToLong(UsageEntity::getTimeSpent)
                    .sum();

            weekly.add(Map.of(
                    "day", d.getDayOfWeek().name().substring(0, 3),
                    "productive", dayMs / 60000,
                    "wasted", 0,
                    "score", 70
            ));
        }
        // 🔹 AI Insight
        String prompt = "Analyze productivity based on total time "
                + formatTime(totalMs)
                + " and productive time "
                + formatTime(productiveMs);

        String aiInsight = geminiService.analyzeProductivity(prompt);

        DashboardResponse response = new DashboardResponse();
        response.setProfile(profile);
        response.setStatus(status);
        response.setProductivity(productivity);
        response.setApps(apps);
        response.setWeeklySummary(weekly);
        response.setAiInsight(aiInsight);

        return response;}

    private String formatTime(long ms) {
        long minutes = ms / 60000;
        return (minutes / 60) + "h " + (minutes % 60) + "m";
    }

    }
