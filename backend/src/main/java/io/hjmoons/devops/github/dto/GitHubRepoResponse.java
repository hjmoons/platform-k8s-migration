package io.hjmoons.devops.github.dto;

import io.hjmoons.devops.github.GitHubRepo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Schema(description = "GitHub 저장소 응답")
@Getter
@Builder
public class GitHubRepoResponse {

    private static final String GITHUB_BASE_URL = "https://github.com";

    @Schema(description = "ID", example = "1")
    private Long id;

    @Schema(description = "프로젝트 ID", example = "1")
    private Long projectId;

    @Schema(description = "프로젝트명", example = "my-project")
    private String projectName;

    @Schema(description = "소유자 (username 또는 org)", example = "username")
    private String owner;

    @Schema(description = "저장소명", example = "my-repo")
    private String repoName;

    @Schema(description = "저장소 설명", example = "My awesome repository")
    private String description;

    @Schema(description = "GitHub URL", example = "https://github.com/username/my-repo")
    private String htmlUrl;

    @Schema(description = "Clone URL", example = "https://github.com/username/my-repo.git")
    private String cloneUrl;

    @Schema(description = "기본 브랜치", example = "main")
    private String defaultBranch;

    @Schema(description = "생성일시", example = "2024-01-01T00:00:00")
    private LocalDateTime createdAt;

    public static GitHubRepoResponse from(GitHubRepo repo) {
        String owner = repo.getOwner();
        String repoName = repo.getRepoName();

        return GitHubRepoResponse.builder()
                .id(repo.getId())
                .projectId(repo.getProject().getId())
                .projectName(repo.getProject().getProjectName())
                .owner(owner)
                .repoName(repoName)
                .description(repo.getDescription())
                .htmlUrl(GITHUB_BASE_URL + "/" + owner + "/" + repoName)
                .cloneUrl(GITHUB_BASE_URL + "/" + owner + "/" + repoName + ".git")
                .defaultBranch(repo.getDefaultBranch())
                .createdAt(repo.getCreatedAt())
                .build();
    }
}
