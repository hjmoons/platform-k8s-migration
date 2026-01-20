package io.hjmoons.devops.member.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    @NotBlank(message = "ID는 필수입니다.")
    @Size(max = 20, message = "ID는 최대 20자까지 가능합니다.")
    private String username;

    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(max = 100, message = "비밀번호는 최대 100자까지 가능합니다.")
    private String password;
}