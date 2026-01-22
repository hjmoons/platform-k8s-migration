package io.hjmoons.devops.project;

import io.hjmoons.devops.project.dto.ProjectRequest;
import io.hjmoons.devops.project.dto.ProjectResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Transactional
    public ProjectResponse createProject(ProjectRequest request) {
        if (projectRepository.existsByProjectName(request.getProjectName())) {
            throw new IllegalArgumentException("Project name already exists: " + request.getProjectName());
        }

        Project project = Project.builder()
                .projectName(request.getProjectName())
                .description(request.getDescription())
                .build();

        Project savedProject = projectRepository.save(project);
        return ProjectResponse.from(savedProject);
    }

    public ProjectResponse getProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + id));
        return ProjectResponse.from(project);
    }

    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(ProjectResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + id));

        // 프로젝트명 변경 시 중복 체크
        if (!project.getProjectName().equals(request.getProjectName()) &&
                projectRepository.existsByProjectName(request.getProjectName())) {
            throw new IllegalArgumentException("Project name already exists: " + request.getProjectName());
        }

        project.setProjectName(request.getProjectName());
        project.setDescription(request.getDescription());

        return ProjectResponse.from(project);
    }

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new IllegalArgumentException("Project not found: " + id);
        }
        projectRepository.deleteById(id);
    }
}