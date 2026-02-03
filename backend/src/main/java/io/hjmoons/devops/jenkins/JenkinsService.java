package io.hjmoons.devops.jenkins;

import io.hjmoons.devops.jenkins.dto.JenkinsFolderRequest;
import io.hjmoons.devops.jenkins.dto.JenkinsFolderResponse;
import io.hjmoons.devops.project.Project;
import io.hjmoons.devops.project.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JenkinsService {

    private final JenkinsClient jenkinsClient;
    private final JenkinsRepository jenkinsRepository;
    private final ProjectRepository projectRepository;

    @Transactional
    public JenkinsFolderResponse createFolder(Long projectId, JenkinsFolderRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다: " + projectId));

        if (jenkinsRepository.existsByProjectId(projectId)) {
            throw new IllegalStateException("이미 Jenkins 폴더가 연결된 프로젝트입니다.");
        }

        if (jenkinsRepository.existsByFolderName(request.getFolderName())) {
            throw new IllegalStateException("이미 존재하는 폴더명입니다: " + request.getFolderName());
        }

        jenkinsClient.createFolder(request.getFolderName());

        JenkinsFolder folder = JenkinsFolder.builder()
                .project(project)
                .folderName(request.getFolderName())
                .build();

        JenkinsFolder saved = jenkinsRepository.save(folder);
        return JenkinsFolderResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public JenkinsFolderResponse getFolderByProjectId(Long projectId) {
        JenkinsFolder folder = jenkinsRepository.findByProjectId(projectId)
                .orElseThrow(() -> new IllegalArgumentException("해당 프로젝트의 Jenkins 폴더를 찾을 수 없습니다."));
        return JenkinsFolderResponse.from(folder);
    }
}
