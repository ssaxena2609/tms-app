import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, REGISTER } from '../../graphql/queries';
import { LoginInput, RegisterInput } from '../../types/auth';
import { toast } from 'react-toastify';
import { FiUser, FiLock, FiMail } from 'react-icons/fi';
import './Auth.css';

interface AuthProps {
  onSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [login, { loading: loginLoading }] = useMutation(LOGIN);
  const [register, { loading: registerLoading }] = useMutation(REGISTER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const loginInput: LoginInput = {
          email: formData.email,
          password: formData.password,
        };

        const { data } = await login({ variables: { input: loginInput } });
        
        if (data?.login) {
          localStorage.setItem('token', data.login.token);
          localStorage.setItem('user', JSON.stringify(data.login.user));
          toast.success(`Welcome back, ${data.login.user.name}!`);
          onSuccess();
        }
      } else {
        const registerInput: RegisterInput = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        };

        const { data } = await register({ variables: { input: registerInput } });
        
        if (data?.register) {
          localStorage.setItem('token', data.register.token);
          localStorage.setItem('user', JSON.stringify(data.register.user));
          toast.success(`Welcome, ${data.register.user.name}!`);
          onSuccess();
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loading = loginLoading || registerLoading;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>TMS Pro</h1>
          <p>{isLogin ? 'Sign in to your account' : 'Create a new account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">
                <FiUser /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <FiMail /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FiLock /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ email: '', password: '', name: '' });
              }}
              className="switch-btn"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <div className="demo-credentials">
          <p className="demo-title">Demo Accounts:</p>
          <div className="demo-accounts">
            <div>
              <strong>Admin:</strong> admin@tms.com / admin123
            </div>
            <div>
              <strong>Employee:</strong> employee@tms.com / employee123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
