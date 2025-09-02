'use client';

import React, { createContext, useContext, useCallback } from 'react';
import type { UmamiEventData, UmamiTrackFunction } from '@/types/umami';

interface UmamiContextType {
  track: UmamiTrackFunction;
}

const UmamiContext = createContext<UmamiContextType | undefined>(undefined);

export function UmamiProvider({ children }: { children: React.ReactNode }) {
  const track = useCallback((eventName: string, eventData?: UmamiEventData) => {
    if (typeof window !== 'undefined' && window.umami) {
      try {
        if (eventName.length > 50) {
          console.warn('Umami event name exceeds 50 character limit:', eventName);
          eventName = eventName.substring(0, 50);
        }
        
        if (eventData) {
          window.umami.track(eventName, eventData);
        } else {
          window.umami.track(eventName);
        }
      } catch (error) {
        console.error('Failed to track Umami event:', error);
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.log('Umami track:', eventName, eventData);
    }
  }, []);

  return (
    <UmamiContext.Provider value={{ track }}>
      {children}
    </UmamiContext.Provider>
  );
}

export function useUmami() {
  const context = useContext(UmamiContext);
  if (context === undefined) {
    throw new Error('useUmami must be used within a UmamiProvider');
  }
  return context;
}