import React, { useEffect } from 'react';
import styles from './Alert.module.css';

const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearTimeout(timeout);
  }, [message]);

  if (!message) return null;  // 메시지가 없으면 아무것도 렌더링하지 않음

  const isSuccess = message === '지출 항목이 수정되었습니다.' || message === '지출 항목이 추가되었습니다.';
  
  return (
    <div className={`${styles.alert} ${isSuccess ? styles.success : styles.error}`}>
      {message}
    </div>
  );
};

export default Alert;