package io.hjmoons.devops.github.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GitHubRepoInfo(
        Long id,
        String name,
        @JsonProperty("full_name") String fullName,
        String description,
        @JsonProperty("html_url") String htmlUrl,
        @JsonProperty("clone_url") String cloneUrl,
        @JsonProperty("ssh_url") String sshUrl,
        @JsonProperty("private") boolean isPrivate,
        @JsonProperty("default_branch") String defaultBranch
) {
}
