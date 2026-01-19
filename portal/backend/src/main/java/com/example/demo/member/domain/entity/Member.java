package com.example.demo.member.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String username;
    private String password;

    private String name;
    private String email;
}
