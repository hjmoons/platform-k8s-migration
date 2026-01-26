package io.hjmoons.devops.github;

import io.hjmoons.devops.github.dto.GitHubRepoCreateRequest;
import io.hjmoons.devops.github.dto.GitHubRepoInfo;
import io.hjmoons.devops.github.dto.GitHubRepoRequest;
import io.hjmoons.devops.github.dto.GitHubRepoResponse;
import io.hjmoons.devops.project.Project;
import io.hjmoons.devops.project.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GitHubService {

    private final GitHubClient gitHubClient;
    private final GitHubRepoRepository gitHubRepoRepository;
    private final ProjectRepository projectRepository;

    @Transactional
    public GitHubRepoResponse createRepository(Long projectId, GitHubRepoRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다: " + projectId));

        GitHubRepoCreateRequest createRequest = GitHubRepoCreateRequest.builder()
                .name(request.getRepoName())
                .description(request.getDescription())
                .isPrivate(request.isPrivate())
                .autoInit(request.isAutoInit())
                .build();

        GitHubRepoInfo created = gitHubClient.createRepository(createRequest);

        String owner = created.fullName().split("/")[0];

        if (gitHubRepoRepository.existsByOwnerAndRepoName(owner, created.name())) {
            throw new IllegalStateException("이미 등록된 GitHub 저장소입니다: " + created.fullName());
        }

        GitHubRepo repo = GitHubRepo.builder()
                .project(project)
                .owner(owner)
                .repoName(created.name())
                .description(created.description())
                .defaultBranch(created.defaultBranch())
                .build();

        GitHubRepo saved = gitHubRepoRepository.save(repo);
        return GitHubRepoResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public List<GitHubRepoResponse> getReposByProjectId(Long projectId) {
        return gitHubRepoRepository.findByProjectId(projectId).stream()
                .map(GitHubRepoResponse::from)
                .toList();
    }

    @Transactional
    public void deleteRepository(Long projectId, String owner, String repoName) {
        GitHubRepo repo = gitHubRepoRepository.findByProjectIdAndOwnerAndRepoName(projectId, owner, repoName)
                .orElseThrow(() -> new IllegalArgumentException("GitHub 저장소를 찾을 수 없습니다: " + owner + "/" + repoName));

        gitHubClient.deleteRepository(owner, repoName);
        gitHubRepoRepository.delete(repo);
    }
}
