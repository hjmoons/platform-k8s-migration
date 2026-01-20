package io.hjmoons.devops.todo.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoUpdateRequest {
    @NotBlank(message = "내용을 비워둘 수 없습니다.")
    @Size(max = 100, message = "100자 이하로 입력하세요.")
    private String title;
}
