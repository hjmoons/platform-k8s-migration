import { useState } from 'react';
import Button from '../common/Button';

const GitHubRepoCreateModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    repoName: '',
    description: '',
    isPrivate: false,
    autoInit: true,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.repoName.trim()) {
      newErrors.repoName = '저장소명을 입력해주세요';
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(formData.repoName)) {
      newErrors.repoName = '저장소명은 영문, 숫자, -, _, . 만 사용 가능합니다';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ repoName: '', description: '', isPrivate: false, autoInit: true });
      onClose();
    } catch (error) {
      setErrors({ submit: '저장소 생성에 실패했습니다' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ repoName: '', description: '', isPrivate: false, autoInit: true });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">GitHub 저장소 생성</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="repoName" className="block text-sm font-medium text-gray-700 mb-1">
              저장소명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="repoName"
              name="repoName"
              value={formData.repoName}
              onChange={handleChange}
              placeholder="my-repo"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.repoName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.repoName && (
              <p className="mt-1 text-sm text-red-500">{errors.repoName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              설명
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="저장소 설명"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">비공개 저장소</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="autoInit"
                checked={formData.autoInit}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">README 파일 자동 생성</span>
            </label>
          </div>

          {errors.submit && (
            <p className="mb-4 text-sm text-red-500">{errors.submit}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '생성 중...' : '생성'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GitHubRepoCreateModal;
