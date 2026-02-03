package io.hjmoons.devops.github;

import io.hjmoons.devops.github.dto.GitHubRepoRequest;
import io.hjmoons.devops.github.dto.GitHubRepoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "GitHub", description = "GitHub 연동 API")
@RestController
@RequestMapping("/github/{projectId}")
@RequiredArgsConstructor
public class GitHubController {

    private final GitHubService gitHubService;

    @Operation(summary = "GitHub 저장소 생성", description = "새로운 GitHub 저장소를 생성하고 프로젝트에 연결합니다.")
    @PostMapping("/repos")
    public ResponseEntity<GitHubRepoResponse> createRepository(
            @PathVariable Long projectId,
            @Valid @RequestBody GitHubRepoRequest request) {
        GitHubRepoResponse response = gitHubService.createRepository(projectId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "프로젝트별 GitHub 저장소 조회", description = "프로젝트에 연결된 GitHub 저장소 목록을 조회합니다.")
    @GetMapping("/repos")
    public ResponseEntity<List<GitHubRepoResponse>> getReposByProjectId(@PathVariable Long projectId) {
        List<GitHubRepoResponse> responses = gitHubService.getReposByProjectId(projectId);
        return ResponseEntity.ok(responses);
    }

    @Operation(summary = "GitHub 저장소 삭제", description = "GitHub 저장소를 삭제하고 프로젝트 연결을 해제합니다.")
    @DeleteMapping("/repos/{owner}/{repoName}")
    public ResponseEntity<Void> deleteRepository(
            @PathVariable Long projectId,
            @PathVariable String owner,
            @PathVariable String repoName) {
        gitHubService.deleteRepository(projectId, owner, repoName);
        return ResponseEntity.noContent().build();
    }
}
