package com.example.demo.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // ⚠️ 운영 환경에서는 외부 설정에서 key 가져오도록 분리하세요.
    private final String secret = "my-super-secure-secret-1234567890abcdef";
    private final Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    private final long expirationMillis = 1000 * 60 * 60; // 1시간

    /**
     * JWT 토큰 생성
     * @param username 사용자 이름 (또는 고유한 식별자)
     * @return JWT 문자열
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // 사용자 ID
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(key)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("토큰 만료됨");
        } catch (JwtException e) {
            System.out.println("토큰 유효하지 않음");
        }
        return false;
    }

    public String getUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * JWT 토큰 파싱 및 검증
     * @param token JWT 문자열
     * @return Claims (username 등 포함된 정보)
     */
    public Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 토큰이 만료되었는지 여부
     */
    public boolean isTokenExpired(String token) {
        try {
            Date expiration = Jwts.parserBuilder().setSigningKey(key).build()
                    .parseClaimsJws(token).getBody().getExpiration();
            return expiration.before(new Date());
        } catch (JwtException e) {
            return true;
        }
    }
}
