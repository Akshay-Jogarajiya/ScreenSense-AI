package com.ScreenSense.ScreenSense.AI.controller;

import com.ScreenSense.ScreenSense.AI.dto.UsageRequest;
import com.ScreenSense.ScreenSense.AI.entity.UsageEntity;
import com.ScreenSense.ScreenSense.AI.service.GeminiService;
import com.ScreenSense.ScreenSense.AI.service.UsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "chrome-extension://bglddkjbeennmkhmahfblchhgbibmiik",
        allowedHeaders = "*"
)
public class TrackingController {

    @Autowired
    private UsageService usageService;

    @Autowired
    private final GeminiService geminiService;

    @PostMapping("/track")
    public ResponseEntity<Void> track(@RequestBody UsageRequest request) {
        usageService.saveUsage(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/insights")
    public ResponseEntity<String> insights() {

        List<UsageEntity> data = usageService.todayUsage();

        String summary = data.stream()
                .collect(Collectors.groupingBy(
                        UsageEntity::getDomain,
                        Collectors.summingLong(UsageEntity::getTimeSpent)
                ))
                .toString();

        String aiResponse = geminiService.getInsight(summary);
        return ResponseEntity.ok(aiResponse);
    }
}
