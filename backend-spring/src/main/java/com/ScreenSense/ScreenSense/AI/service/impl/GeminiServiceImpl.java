package com.ScreenSense.ScreenSense.AI.service.impl;
import com.ScreenSense.ScreenSense.AI.service.GeminiService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiServiceImpl implements GeminiService {

    @Value("${gemini.api-key}")
    private String apiKey;

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    public String analyzeProductivity(String prompt) {

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> body = new HashMap<>();
        body.put("contents", new Object[]{
                Map.of("parts", new Object[]{
                        Map.of("text", prompt)
                })
        });

        String url = GEMINI_URL + "?key=" + apiKey;
        Map response = restTemplate.postForObject(
                url,
                body,
                Map.class
        );

        try {
            return ((Map)((Map)((java.util.List)response.get("candidates"))
                    .get(0))
                    .get("content"))
                    .toString();
        } catch (Exception e) {
            return "AI insight unavailable";
        }
    }



    private final WebClient webClient = WebClient.create(
            "https://generativelanguage.googleapis.com"
    );

    public String getInsight(String summary) {

        String prompt = """
        Analyze this browsing behavior and give productivity advice:
        %s
        """.formatted(summary);

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );

        return webClient.post()
                .uri("/v1beta/models/gemini-pro:generateContent?key=" + apiKey)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(json -> json.at("/candidates/0/content/parts/0/text").asText())
                .block();
    }
}
