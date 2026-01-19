import React, { useState } from 'react';
import axios from '../axios';

function RegisterForm({ onGoToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', {
        username,
        password,
      });
      alert('회원가입 성공!');
      onGoToLogin(); // 로그인 화면으로 이동
    } catch (err) {
      alert('회원가입 실패: ' + (err.response?.data || '서버 오류'));
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">👤 회원가입</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
      />
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          가입하기
        </button>
        <button
          type="button"
          onClick={onGoToLogin}
          className="text-gray-500 hover:underline text-sm"
        >
          로그인으로 돌아가기
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
