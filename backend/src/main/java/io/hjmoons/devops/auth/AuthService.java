package io.hjmoons.devops.auth;

import io.hjmoons.devops.auth.dto.TokenResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${spring.security.oauth2.client.provider.keycloak.token-uri}")
    private String tokenUri;

    @Value("${spring.security.oauth2.client.registration.keycloak.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.keycloak.client-secret}")
    private String clientSecret;

    @Value("${frontend.redirect-uri}")
    private String redirectUri;

    /**
     * Authorization Code를 Access Token으로 교환
     */
    public TokenResponse exchangeCodeForToken(String code) {
        try {
            // Keycloak 토큰 엔드포인트로 요청
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code");
            params.add("code", code);
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            params.add("redirect_uri", redirectUri);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

            log.info("Exchanging code for token with Keycloak: {}", tokenUri);
            Map<String, Object> response = restTemplate.postForObject(
                    tokenUri,
                    request,
                    Map.class
            );

            if (response == null) {
                throw new RuntimeException("Failed to get token from Keycloak");
            }

            String accessToken = (String) response.get("access_token");
            Integer expiresIn = (Integer) response.get("expires_in");

            log.info("Successfully exchanged code for token");
            return new TokenResponse(accessToken, "Bearer", expiresIn.longValue());

        } catch (Exception e) {
            log.error("Error exchanging code for token", e);
            throw new RuntimeException("Failed to exchange code for token: " + e.getMessage(), e);
        }
    }
}
