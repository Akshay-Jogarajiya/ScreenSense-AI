package com.ScreenSense.ScreenSense.AI.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class DashboardResponse {

    private Map<String, Object> profile;
    private Map<String, Object> status;
    private Map<String, Object> productivity;
    private List<Map<String, Object>> apps;
    private List<Map<String, Object>> weeklySummary;
    private String aiInsight;
}
