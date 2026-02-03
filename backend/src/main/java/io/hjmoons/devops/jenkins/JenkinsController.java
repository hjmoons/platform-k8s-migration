package io.hjmoons.devops.jenkins;

import io.hjmoons.devops.jenkins.dto.JenkinsFolderRequest;
import io.hjmoons.devops.jenkins.dto.JenkinsFolderResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Jenkins", description = "Jenkins 연동 API")
@RestController
@RequestMapping("/jenkins/{projectId}")
@RequiredArgsConstructor
public class JenkinsController {

    private final JenkinsService jenkinsService;

    @Operation(summary = "Jenkins 폴더 생성", description = "프로젝트에 연결된 Jenkins 폴더를 생성합니다.")
    @PostMapping("/folders")
    public ResponseEntity<JenkinsFolderResponse> createFolder(
            @PathVariable Long projectId,
            @Valid @RequestBody JenkinsFolderRequest request) {
        JenkinsFolderResponse response = jenkinsService.createFolder(projectId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "프로젝트별 Jenkins 폴더 조회", description = "프로젝트에 연결된 Jenkins 폴더를 조회합니다.")
    @GetMapping("/folders")
    public ResponseEntity<JenkinsFolderResponse> getFolderByProjectId(@PathVariable Long projectId) {
        JenkinsFolderResponse response = jenkinsService.getFolderByProjectId(projectId);
        return ResponseEntity.ok(response);
    }
}
