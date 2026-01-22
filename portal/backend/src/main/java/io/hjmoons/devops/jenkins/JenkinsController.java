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

import java.util.List;

@Tag(name = "Jenkins", description = "Jenkins 연동 API")
@RestController
@RequestMapping("/jenkins")
@RequiredArgsConstructor
public class JenkinsController {

    private final JenkinsService jenkinsService;

    @Operation(summary = "Jenkins 폴더 생성", description = "프로젝트에 연결된 Jenkins 폴더를 생성합니다.")
    @PostMapping("/folders")
    public ResponseEntity<JenkinsFolderResponse> createFolder(@Valid @RequestBody JenkinsFolderRequest request) {
        JenkinsFolderResponse response = jenkinsService.createFolder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "프로젝트별 Jenkins 폴더 조회", description = "프로젝트 ID로 Jenkins 폴더를 조회합니다.")
    @GetMapping("/folders/project/{projectId}")
    public ResponseEntity<JenkinsFolderResponse> getFolderByProjectId(@PathVariable Long projectId) {
        JenkinsFolderResponse response = jenkinsService.getFolderByProjectId(projectId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "전체 Jenkins 폴더 조회", description = "모든 Jenkins 폴더 목록을 조회합니다.")
    @GetMapping("/folders")
    public ResponseEntity<List<JenkinsFolderResponse>> getAllFolders() {
        List<JenkinsFolderResponse> responses = jenkinsService.getAllFolders();
        return ResponseEntity.ok(responses);
    }
}
