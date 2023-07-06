import Router from 'next/router';

import { useAuth } from '../contexts/AuthContext';

export function Protected({ children }) {
  const { user } = useAuth();

  if (!user) {
    return Router.push('/');
  }

  return children;
}
