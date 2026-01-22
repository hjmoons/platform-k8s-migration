package io.hjmoons.devops.jenkins.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JenkinsFolderRequest {

    @NotNull(message = "프로젝트 ID는 필수입니다.")
    private Long projectId;

    @NotBlank(message = "폴더명은 필수입니다.")
    private String folderName;
}
