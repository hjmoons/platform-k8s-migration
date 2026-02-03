package io.hjmoons.devops.github.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Schema(description = "GitHub 저장소 생성 요청")
@Getter
@Setter
public class GitHubRepoRequest {

    @Schema(description = "저장소명", example = "my-repo", required = true)
    @NotBlank(message = "저장소명은 필수입니다.")
    private String repoName;

    @Schema(description = "저장소 설명", example = "My awesome repository")
    private String description;

    @Schema(description = "비공개 여부", example = "false")
    private boolean isPrivate = false;

    @Schema(description = "README 자동 생성 여부", example = "true")
    private boolean autoInit = true;
}
