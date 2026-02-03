import axios from '../axios';

/**
 * 프로젝트 목록 조회
 */
export const getProjects = async () => {
  try {
    const response = await axios.get('/projects');
    return response.data;
  } catch (error) {
    console.error('프로젝트 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 프로젝트 상세 조회
 */
export const getProject = async (id) => {
  try {
    const response = await axios.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('프로젝트 조회 실패:', error);
    throw error;
  }
};

/**
 * 프로젝트 생성
 */
export const createProject = async (projectData) => {
  try {
    const response = await axios.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('프로젝트 생성 실패:', error);
    throw error;
  }
};

/**
 * 프로젝트 수정
 */
export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error('프로젝트 수정 실패:', error);
    throw error;
  }
};

/**
 * 프로젝트 삭제
 */
export const deleteProject = async (id) => {
  try {
    await axios.delete(`/projects/${id}`);
  } catch (error) {
    console.error('프로젝트 삭제 실패:', error);
    throw error;
  }
};
