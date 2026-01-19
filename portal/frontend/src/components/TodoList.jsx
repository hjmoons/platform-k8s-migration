import React, { useState } from 'react';
import axios from '../axios';

function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  
  /**
   * Todo 체크박스 설정 및 해제 기능
   * @param {*} id 
   */
  const handleToggle = async (id) => {
    try {
      const response = await axios.patch(`/todos/${id}/toggle`);
      onToggle(response.data); // 업데이트된 todo 전달
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  /**
   * Todo 삭제 기능
   * @param {*} id 
   */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      onDelete(id); // id만 넘겨서 상태 업데이트
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`/todos/${id}`, {
        title: editText,
      });
      onUpdate(response.data); // 업데이트된 todo 전달
      setEditingId(null);
    } catch (error) {
      alert('수정 실패: ' + error.response?.data || '오류 발생');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">📋 Todo List</h3>
      {todos.length === 0 ? (
        <p className="text-gray-500">할 일이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              {editingId === todo.id ? (
                <div className="flex w-full gap-2 items-center">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleUpdate(todo.id);
                      else if (e.key === 'Escape') handleCancel();
                    }}
                    className="flex-1 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 text-gray-600 hover:underline"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <>
                  <label className="flex-1 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                      className="w-4 h-4"
                    />
                    <span
                      className={`${
                        todo.completed ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {todo.title}
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(todo)}
                      className="text-blue-500 hover:underline"
                    >
                      ✏ 수정
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="text-red-500 hover:underline"
                    >
                      🗑 삭제
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
