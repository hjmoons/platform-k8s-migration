package io.hjmoons.devops.auth;

import io.hjmoons.devops.auth.dto.OAuthCallbackRequest;
import io.hjmoons.devops.auth.dto.TokenResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "인증 관련 API")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/oauth/callback")
    @Operation(summary = "OAuth 콜백 처리", description = "Keycloak에서 받은 authorization code를 토큰으로 교환합니다")
    public ResponseEntity<TokenResponse> handleOAuthCallback(@RequestBody OAuthCallbackRequest request) {
        log.info("Handling OAuth callback with code: {}", request.getCode());

        try {
            TokenResponse tokenResponse = authService.exchangeCodeForToken(request.getCode());
            return ResponseEntity.ok(tokenResponse);
        } catch (Exception e) {
            log.error("OAuth callback failed", e);
            return ResponseEntity.badRequest().build();
        }
    }
}
