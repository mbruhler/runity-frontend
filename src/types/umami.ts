export interface UmamiEventData {
  [key: string]: string | number | boolean;
}

export interface UmamiTrackFunction {
  (eventName: string, eventData?: UmamiEventData): void;
}

export interface UmamiGlobal {
  track: UmamiTrackFunction;
}

declare global {
  interface Window {
    umami?: UmamiGlobal;
  }
}

export interface TrackableElement extends HTMLElement {
  'data-umami-event': string;
  [key: `data-umami-event-${string}`]: string;
}