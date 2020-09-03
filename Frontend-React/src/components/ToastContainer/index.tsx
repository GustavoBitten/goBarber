import React from 'react';

import { Conteiner } from './styles';
import { ToastMessage } from '../../hooks/toast';
import { Toast } from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Conteiner>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Conteiner>
  );
};

export default ToastContainer;
