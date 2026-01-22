package io.hjmoons.devops.jenkins;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "jenkins")
@Getter
@Setter
public class JenkinsProperties {

    private String url;
    private String username;
    private String token;
}
