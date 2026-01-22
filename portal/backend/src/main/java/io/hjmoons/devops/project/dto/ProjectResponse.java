package io.hjmoons.devops.project.dto;

import io.hjmoons.devops.project.Project;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Schema(description = "프로젝트 응답")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectResponse {

    @Schema(description = "프로젝트 ID", example = "1")
    private Long id;

    @Schema(description = "프로젝트명", example = "my-project")
    private String projectName;

    @Schema(description = "프로젝트 설명", example = "DevOps 플랫폼 프로젝트입니다.")
    private String description;

    @Schema(description = "생성일시", example = "2024-01-01T00:00:00")
    private LocalDateTime createdAt;

    @Schema(description = "수정일시", example = "2024-01-01T00:00:00")
    private LocalDateTime updatedAt;

    public static ProjectResponse from(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .projectName(project.getProjectName())
                .description(project.getDescription())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}