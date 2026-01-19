import React, { useState } from 'react';
import axios from '../axios';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if (!title.trim()) return;

    try {
      const response = await axios.post('/todos', { title: title.trim() });
      onAdd(response.data); // 새로 추가된 할 일 전달
      setTitle(''); // 입력창 초기화
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Spring에서 보내준 에러 메시지 사용
        alert(error.response.data);
      } else {
        alert('할 일 추가 중 오류가 발생했습니다.');
        console.error('추가 실패:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-6">
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        추가
      </button>
    </form>
  );
}

export default AddTodo;
