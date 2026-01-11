package com.ScreenSense.ScreenSense.AI.controller;

import com.ScreenSense.ScreenSense.AI.dto.DashboardResponse;
import com.ScreenSense.ScreenSense.AI.service.impl.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public DashboardResponse getDashboard() {
        return dashboardService.buildDashboard();
    }
}
