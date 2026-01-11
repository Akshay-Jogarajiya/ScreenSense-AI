package com.ScreenSense.ScreenSense.AI.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class DashboardDTO {

    public ProfileDTO profile;
    public StatusDTO status;
    public ProductivityDTO productivity;
    public List<AppUsageDTO> apps;
    public List<WeeklySummaryDTO> weeklySummary;

    @Getter
    @Setter
    public static class ProfileDTO {
        private String name;
        private String email;
        private String role;
        private String avatar;
    }

    @Getter
    @Setter
    public static class StatusDTO {
        private boolean tracking;
        private String trackerOffTime;
        private String lastActive;
        private String currentTask;
    }

    @Getter
    @Setter
    public static class ProductivityDTO {
        private int score;
        private String totalTime;
        private String productiveTime;
        private String wastedTime;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class AppUsageDTO {
        private String name;
        private int time;
        private int openCount;
        private String type;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class WeeklySummaryDTO {
        private String day;
        private int productive;
        private int wasted;
        private int score;
    }

}
