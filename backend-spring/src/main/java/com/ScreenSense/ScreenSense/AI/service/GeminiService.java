package com.ScreenSense.ScreenSense.AI.service;

import com.ScreenSense.ScreenSense.AI.dto.UsageRequest;

public interface GeminiService {

    public String getInsight(String summary);

    public String analyzeProductivity(String prompt);

}
