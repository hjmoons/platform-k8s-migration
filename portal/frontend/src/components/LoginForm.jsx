import React, { useState } from 'react';
import axios from '../axios';

function LoginForm({ onLoginSuccess, onGoToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', {
        username,
        password,
      });
      const token = res.data.token;
      localStorage.setItem('jwt', token);
      onLoginSuccess(); // 로그인 성공 시 호출
    } catch (err) {
      alert('로그인 실패: ' + (err.response?.data || '서버 오류'));
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">🔐 로그인</h2>
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          로그인
        </button>
        <button
          type="button"
          onClick={onGoToRegister}
          className="text-blue-500 hover:underline text-sm"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default LoginForm;