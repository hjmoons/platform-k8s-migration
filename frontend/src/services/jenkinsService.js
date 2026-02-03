import axios from '../axios';

/**
 * 프로젝트별 Jenkins 폴더 조회
 */
export const getFolderByProject = async (projectId) => {
  const response = await axios.get(`/jenkins/${projectId}/folders`);
  return response.data;
};

/**
 * Jenkins 폴더 생성
 */
export const createFolder = async (projectId, folderData) => {
  const response = await axios.post(`/jenkins/${projectId}/folders`, folderData);
  return response.data;
};
