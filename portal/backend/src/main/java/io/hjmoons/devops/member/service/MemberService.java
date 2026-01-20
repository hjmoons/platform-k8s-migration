package io.hjmoons.devops.member.service;

import io.hjmoons.devops.exception.LoginFailedException;
import io.hjmoons.devops.exception.RegisterFailedException;
import io.hjmoons.devops.member.domain.dto.LoginRequest;
import io.hjmoons.devops.member.domain.dto.MemberUpdateRequest;
import io.hjmoons.devops.member.domain.dto.RegisterRequest;
import io.hjmoons.devops.member.domain.entity.Member;
import io.hjmoons.devops.member.repository.MemberRepository;
import io.hjmoons.devops.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private MemberRepository memberRepository;

    public Member register(RegisterRequest request) {
        if (memberRepository.existsByUsername(request.getUsername())) {
            throw new RegisterFailedException("이미 존재하는 사용자입니다.");
        }
        Member member = Member.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        return memberRepository.save(member);
    }

    public String login(LoginRequest request) {
        Member member = memberRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new LoginFailedException("등록된 ID가 없습니다.\n회원가입을 해주세요."));

        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new LoginFailedException("비밀번호가 틀렸습니다.");
        }

        return jwtUtil.generateToken(member.getUsername());
    }

    public Optional<Member> getMember(Long id) {
        return memberRepository.findById(id);
    }

    public List<Member> getMemberList() {
        return memberRepository.findAll();
    }

    public Member updateMember(Long id, MemberUpdateRequest request) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        member.setName(request.getName());
        member.setEmail(request.getEmail());

        return memberRepository.save(member);
    }
}