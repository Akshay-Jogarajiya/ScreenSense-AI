package com.ScreenSense.ScreenSense.AI.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProfileResponse {

    private String email;

    private String name;

    private int age;

    private String gender;

    private String deviceType;

    private String goal;

    private String time;
}
