package io.hjmoons.devops.jenkins;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JenkinsFolderRepository extends JpaRepository<JenkinsFolder, Long> {

    Optional<JenkinsFolder> findByProjectId(Long projectId);

    boolean existsByFolderName(String folderName);

    boolean existsByProjectId(Long projectId);
}
