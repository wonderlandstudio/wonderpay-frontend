import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';
import React from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}