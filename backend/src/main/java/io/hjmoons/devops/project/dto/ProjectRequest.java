package io.hjmoons.devops.project.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Schema(description = "프로젝트 생성/수정 요청")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRequest {

    @Schema(description = "프로젝트명", example = "my-project", required = true)
    @NotBlank(message = "Project name is required")
    @Size(max = 100, message = "Project name must not exceed 100 characters")
    private String projectName;

    @Schema(description = "프로젝트 설명", example = "DevOps 플랫폼 프로젝트입니다.")
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
}