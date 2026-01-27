package io.hjmoons.devops.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OAuthCallbackRequest {
    private String code;
}
