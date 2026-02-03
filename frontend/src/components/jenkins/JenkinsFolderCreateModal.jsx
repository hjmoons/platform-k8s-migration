import { useState } from 'react';
import Button from '../common/Button';

const JenkinsFolderCreateModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    folderName: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.folderName.trim()) {
      newErrors.folderName = '폴더명을 입력해주세요';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.folderName)) {
      newErrors.folderName = '폴더명은 영문, 숫자, -, _ 만 사용 가능합니다';
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
      setFormData({ folderName: '' });
      onClose();
    } catch (error) {
      setErrors({ submit: '폴더 생성에 실패했습니다' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ folderName: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Jenkins 폴더 생성</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="folderName" className="block text-sm font-medium text-gray-700 mb-1">
              폴더명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="folderName"
              name="folderName"
              value={formData.folderName}
              onChange={handleChange}
              placeholder="my-jenkins-folder"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.folderName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.folderName && (
              <p className="mt-1 text-sm text-red-500">{errors.folderName}</p>
            )}
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

export default JenkinsFolderCreateModal;
