import React, { useState } from 'react';

const Signup = ({ onSignup, goToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Signup failed');
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError('Network error');
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-6">Sign Up Successful!</h2>
          <p className="mb-6 text-green-700">Your account has been created. You can now log in.</p>
          <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 font-semibold" onClick={goToLogin}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
        </div>
        <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 font-semibold mb-4">Sign Up</button>
        <div className="text-center">
          <span className="text-gray-600 text-sm">Already have an account? </span>
          <button type="button" className="text-blue-600 hover:underline text-sm" onClick={goToLogin}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Signup; 