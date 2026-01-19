package com.example.demo.member.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberCreateRequest {
    private String name;
    private String email;
}