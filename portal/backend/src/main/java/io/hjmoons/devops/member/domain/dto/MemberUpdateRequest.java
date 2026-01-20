package io.hjmoons.devops.member.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberUpdateRequest {
    private String name;
    private String email;
}