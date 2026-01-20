package io.hjmoons.devops.member.controller;

import io.hjmoons.devops.member.domain.dto.MemberCreateRequest;
import io.hjmoons.devops.member.domain.dto.MemberUpdateRequest;
import io.hjmoons.devops.member.service.MemberService;
import io.hjmoons.devops.member.domain.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/{id}")
    public ResponseEntity<Member> get(@PathVariable Long id) {
        return memberService.getMember(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Member>> getList() {
        return ResponseEntity.ok(memberService.getMemberList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Member> update(@PathVariable Long id, @RequestBody MemberUpdateRequest request) {
        Member updated = memberService.updateMember(id, request);
        return ResponseEntity.ok(updated);
    }
}