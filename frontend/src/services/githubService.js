import axios from '../axios';

/**
 * 프로젝트별 GitHub 저장소 목록 조회
 */
export const getReposByProject = async (projectId) => {
  const response = await axios.get(`/github/${projectId}/repos`);
  return response.data;
};

/**
 * GitHub 저장소 생성
 */
export const createRepo = async (projectId, repoData) => {
  const response = await axios.post(`/github/${projectId}/repos`, repoData);
  return response.data;
};

/**
 * GitHub 저장소 삭제
 */
export const deleteRepo = async (projectId, owner, repoName) => {
  await axios.delete(`/github/${projectId}/repos/${owner}/${repoName}`);
};
