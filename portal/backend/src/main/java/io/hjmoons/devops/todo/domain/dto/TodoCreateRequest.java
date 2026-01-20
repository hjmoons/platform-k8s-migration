package io.hjmoons.devops.todo.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoCreateRequest {
    @NotBlank(message = "할 일 제목은 필수입니다.")
    @Size(max = 100, message = "할 일 제목은 최대 100자까지 가능합니다.")
    private String title;
}
