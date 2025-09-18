import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { verifyAccount } from '../../services/auth.service';

const AccountVerification: React.FC = () => {
  const [status, setStatus] = useState<'success' | 'failed' | null>(null);
  const location = useLocation();

  const handleAccountVerification = async (code: string) => {
    try {
      const response = await verifyAccount(code);

      if (response.status === 200) {
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } catch (error) {
      console.error('Error verifying account:', error);
      setStatus('failed');
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    handleAccountVerification(queryParams.get('code') || '');
  }, [location]);

  return (
      <div style={styles.container}>
        {status === 'success' && (
            <div style={{ ...styles.messageBox, ...styles.success }}>
              <div style={styles.icon}>✅</div>
              <h1 style={styles.title}>Chúc mừng! Tài khoản đã được xác thực thành công.</h1>
              <Link to='/login' style={styles.link}>👉 Chuyển đến trang đăng nhập</Link>
            </div>
        )}

        {status === 'failed' && (
            <div style={{ ...styles.messageBox, ...styles.failed }}>
              <div style={styles.icon}>⚠️</div>
              <h1 style={styles.title}>Tài khoản đã được xác thực trước đó.</h1>
              <Link to='/' style={styles.link}>🏠 Quay về trang chủ</Link>
            </div>
        )}

        {!status && <p style={styles.loading}>⏳ Đang kiểm tra...</p>}
      </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  messageBox: {
    textAlign: 'center',
    borderRadius: '10px',
    padding: '40px',
    maxWidth: '500px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  success: {
    border: '2px solid #4CAF50',
    color: '#2e7d32',
  },
  failed: {
    border: '2px solid #f44336',
    color: '#c62828',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  link: {
    display: 'inline-block',
    marginTop: '10px',
    textDecoration: 'none',
    color: '#1976d2',
    fontWeight: 500,
  },
  loading: {
    fontSize: '20px',
    color: '#555',
  },
};

export default AccountVerification;
