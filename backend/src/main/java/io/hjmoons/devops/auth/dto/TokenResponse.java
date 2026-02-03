package io.hjmoons.devops.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TokenResponse {
    private String token;
    private String tokenType;
    private Long expiresIn;
}
