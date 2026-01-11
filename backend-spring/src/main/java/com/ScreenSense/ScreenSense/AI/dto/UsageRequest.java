package com.ScreenSense.ScreenSense.AI.dto;

import lombok.Data;

@Data
public class UsageRequest {

    private String domain;

    private long timeSpent;
}
