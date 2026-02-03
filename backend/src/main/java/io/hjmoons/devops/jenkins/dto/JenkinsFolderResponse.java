package io.hjmoons.devops.jenkins.dto;

import io.hjmoons.devops.jenkins.JenkinsFolder;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class JenkinsFolderResponse {

    private Long id;
    private Long projectId;
    private String projectName;
    private String folderName;
    private LocalDateTime createdAt;

    public static JenkinsFolderResponse from(JenkinsFolder folder) {
        return JenkinsFolderResponse.builder()
                .id(folder.getId())
                .projectId(folder.getProject().getId())
                .projectName(folder.getProject().getProjectName())
                .folderName(folder.getFolderName())
                .createdAt(folder.getCreatedAt())
                .build();
    }
}
