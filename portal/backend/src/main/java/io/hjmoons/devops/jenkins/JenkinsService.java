package io.hjmoons.devops.jenkins;

import io.hjmoons.devops.jenkins.dto.JenkinsFolderRequest;
import io.hjmoons.devops.jenkins.dto.JenkinsFolderResponse;
import io.hjmoons.devops.project.Project;
import io.hjmoons.devops.project.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JenkinsService {

    private final JenkinsClient jenkinsClient;
    private final JenkinsFolderRepository jenkinsFolderRepository;
    private final ProjectRepository projectRepository;

    @Transactional
    public JenkinsFolderResponse createFolder(JenkinsFolderRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다: " + request.getProjectId()));

        if (jenkinsFolderRepository.existsByProjectId(request.getProjectId())) {
            throw new IllegalStateException("이미 Jenkins 폴더가 연결된 프로젝트입니다.");
        }

        if (jenkinsFolderRepository.existsByFolderName(request.getFolderName())) {
            throw new IllegalStateException("이미 존재하는 폴더명입니다: " + request.getFolderName());
        }

        jenkinsClient.createFolder(request.getFolderName());

        JenkinsFolder folder = JenkinsFolder.builder()
                .project(project)
                .folderName(request.getFolderName())
                .build();

        JenkinsFolder saved = jenkinsFolderRepository.save(folder);
        return JenkinsFolderResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public JenkinsFolderResponse getFolderByProjectId(Long projectId) {
        JenkinsFolder folder = jenkinsFolderRepository.findByProjectId(projectId)
                .orElseThrow(() -> new IllegalArgumentException("해당 프로젝트의 Jenkins 폴더를 찾을 수 없습니다."));
        return JenkinsFolderResponse.from(folder);
    }

    @Transactional(readOnly = true)
    public List<JenkinsFolderResponse> getAllFolders() {
        return jenkinsFolderRepository.findAll().stream()
                .map(JenkinsFolderResponse::from)
                .toList();
    }
}
