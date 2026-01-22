package io.hjmoons.devops.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("DevOps Platform API")
                        .description("DevOps 플랫폼 미니 버전 백엔드 API")
                        .version("v1.0.0"))
                .servers(List.of(
                        new Server().url("/api").description("Default Server")
                ));
    }
}