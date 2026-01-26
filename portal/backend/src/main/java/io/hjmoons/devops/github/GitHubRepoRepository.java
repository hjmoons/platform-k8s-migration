package io.hjmoons.devops.github;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GitHubRepoRepository extends JpaRepository<GitHubRepo, Long> {

    List<GitHubRepo> findByProjectId(Long projectId);

    Optional<GitHubRepo> findByProjectIdAndOwnerAndRepoName(Long projectId, String owner, String repoName);

    boolean existsByOwnerAndRepoName(String owner, String repoName);
}
