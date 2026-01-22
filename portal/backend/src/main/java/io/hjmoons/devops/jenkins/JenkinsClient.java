package io.hjmoons.devops.jenkins;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Base64;

@Slf4j
@Component
public class JenkinsClient {

    private final RestClient restClient;
    private final JenkinsProperties properties;

    public JenkinsClient(JenkinsProperties properties) {
        this.properties = properties;
        this.restClient = RestClient.builder()
                .baseUrl(properties.getUrl())
                .defaultHeader("Authorization", createBasicAuth())
                .build();
    }

    private String createBasicAuth() {
        String credentials = properties.getUsername() + ":" + properties.getToken();
        return "Basic " + Base64.getEncoder().encodeToString(credentials.getBytes());
    }

    public void createFolder(String folderName) {
        String folderXml = """
                <?xml version='1.0' encoding='UTF-8'?>
                <com.cloudbees.hudson.plugins.folder.Folder>
                  <actions/>
                  <description></description>
                  <properties/>
                  <folderViews class="com.cloudbees.hudson.plugins.folder.views.DefaultFolderViewHolder">
                    <views>
                      <hudson.model.AllView>
                        <name>All</name>
                        <filterExecutors>false</filterExecutors>
                        <filterQueue>false</filterQueue>
                        <properties class="hudson.model.View$PropertyList"/>
                      </hudson.model.AllView>
                    </views>
                    <tabBar class="hudson.views.DefaultViewsTabBar"/>
                  </folderViews>
                  <healthMetrics/>
                </com.cloudbees.hudson.plugins.folder.Folder>
                """;

        restClient.post()
                .uri("/createItem?name={folderName}", folderName)
                .contentType(MediaType.APPLICATION_XML)
                .body(folderXml)
                .retrieve()
                .toBodilessEntity();

        log.info("Jenkins 폴더 생성 완료: {}", folderName);
    }
}
