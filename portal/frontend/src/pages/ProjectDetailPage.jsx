import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import GitHubRepoCreateModal from '../components/github/GitHubRepoCreateModal';
import JenkinsFolderCreateModal from '../components/jenkins/JenkinsFolderCreateModal';
import { getProject } from '../services/projectService';
import { getReposByProject, createRepo } from '../services/githubService';
import { getFolderByProject, createFolder } from '../services/jenkinsService';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [repos, setRepos] = useState([]);
  const [jenkinsFolder, setJenkinsFolder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isJenkinsModalOpen, setIsJenkinsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [projectData, reposData] = await Promise.all([
        getProject(projectId),
        getReposByProject(projectId),
      ]);
      setProject(projectData);
      setRepos(reposData);

      try {
        const folderData = await getFolderByProject(projectId);
        setJenkinsFolder(folderData);
      } catch {
        setJenkinsFolder(null);
      }
    } catch (error) {
      console.error('데이터 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const handleCreateRepo = async (formData) => {
    await createRepo(projectId, formData);
    const reposData = await getReposByProject(projectId);
    setRepos(reposData);
  };

  const handleCreateFolder = async (formData) => {
    await createFolder(projectId, formData);
    const folderData = await getFolderByProject(projectId);
    setJenkinsFolder(folderData);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center py-12">
          <p className="text-gray-500">프로젝트를 찾을 수 없습니다</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            대시보드로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          대시보드로 돌아가기
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{project.projectName}</h1>
        {project.description && (
          <p className="text-sm sm:text-base text-gray-600 mt-2">{project.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GitHub Section */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">GitHub 저장소</h2>
            </div>
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="px-3 py-1.5 text-xs sm:text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              + 저장소 추가
            </button>
          </div>

          {repos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <p className="text-sm sm:text-base">연결된 저장소가 없습니다</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">저장소를 추가해주세요</p>
            </div>
          ) : (
            <div className="space-y-3">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <div>
                        <span className="text-sm font-medium text-blue-600">
                          {repo.owner}/{repo.repoName}
                        </span>
                        {repo.description && (
                          <p className="text-xs text-gray-500 mt-0.5">{repo.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {repo.defaultBranch || 'main'}
                      </span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </Card>

        {/* Jenkins Section */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src="https://www.jenkins.io/images/logos/jenkins/jenkins.svg" alt="Jenkins" className="w-6 h-6" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Jenkins 폴더</h2>
            </div>
            {!jenkinsFolder && (
              <button
                onClick={() => setIsJenkinsModalOpen(true)}
                className="px-3 py-1.5 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                + 폴더 생성
              </button>
            )}
          </div>

          {!jenkinsFolder ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <p className="text-sm sm:text-base">연결된 Jenkins 폴더가 없습니다</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">폴더를 생성해주세요</p>
            </div>
          ) : (
            <a
              href={`${import.meta.env.VITE_JENKINS_URL || 'http://localhost:8080'}/job/${jenkinsFolder.folderName}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 border border-gray-200 rounded-lg bg-green-50 hover:bg-green-100 hover:border-green-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="text-sm font-medium text-gray-800">{jenkinsFolder.folderName}</span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      생성일: {new Date(jenkinsFolder.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          )}
        </Card>
      </div>

      {/* Modals */}
      <GitHubRepoCreateModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        onSubmit={handleCreateRepo}
      />
      <JenkinsFolderCreateModal
        isOpen={isJenkinsModalOpen}
        onClose={() => setIsJenkinsModalOpen(false)}
        onSubmit={handleCreateFolder}
      />
    </div>
  );
};

export default ProjectDetailPage;
