package io.hjmoons.devops.github.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record GitHubRepoCreateRequest(
        String name,
        String description,
        @JsonProperty("private") boolean isPrivate,
        @JsonProperty("auto_init") boolean autoInit
) {
}
