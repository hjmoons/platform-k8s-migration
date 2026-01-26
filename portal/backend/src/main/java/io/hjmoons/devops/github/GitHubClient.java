package io.hjmoons.devops.github;

import io.hjmoons.devops.github.dto.GitHubRepoCreateRequest;
import io.hjmoons.devops.github.dto.GitHubRepoInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Slf4j
@Component
public class GitHubClient {

    private final RestClient restClient;

    public GitHubClient(GitHubProperties properties) {
        this.restClient = RestClient.builder()
                .baseUrl(properties.getUrl())
                .defaultHeader("Authorization", "Bearer " + properties.getToken())
                .defaultHeader("Accept", "application/vnd.github+json")
                .defaultHeader("X-GitHub-Api-Version", "2022-11-28")
                .build();
    }

    public GitHubRepoInfo createRepository(GitHubRepoCreateRequest request) {
        GitHubRepoInfo created = restClient.post()
                .uri("/user/repos")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(GitHubRepoInfo.class);

        log.info("GitHub 저장소 생성 완료: {}", created != null ? created.fullName() : "unknown");
        return created;
    }

    public void deleteRepository(String owner, String repoName) {
        restClient.delete()
                .uri("/repos/{owner}/{repo}", owner, repoName)
                .retrieve()
                .toBodilessEntity();

        log.info("GitHub 저장소 삭제 완료: {}/{}", owner, repoName);
    }
}
