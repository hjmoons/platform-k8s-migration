package io.hjmoons.devops.jenkins.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JenkinsFolderRequest {

    @NotBlank(message = "폴더명은 필수입니다.")
    private String folderName;
}
