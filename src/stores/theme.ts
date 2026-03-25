import { atom } from 'nanostores';

export type Theme = 'dark' | 'light' | 'system';
export const themeStore = atom<Theme>('dark');
