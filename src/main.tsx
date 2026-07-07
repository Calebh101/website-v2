import { StrictMode, useState, type Dispatch, type SetStateAction } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import Page404 from './pages/404.tsx';
import { actions, routes } from './routes.tsx';
import LoadingPage from './pages/Loading.tsx';

const root = document.getElementById('root')!;
const Element = route();

createRoot(root).render(
  <StrictMode>
    <Element />
  </StrictMode>,
);

function route(): () => React.JSX.Element {
  const path = window.location.pathname;
  console.log("Loading route or action for path:", path);

  const route = path in routes ? routes[path] : undefined;
  const action = !route && path in actions ? actions[path] : undefined;

  if (action) {
    action(root);
    return LoadingPage;
  }

  return route || Page404;
}

export function state<S>(initialState: S): [S, S, Dispatch<SetStateAction<S>>] {
  const s = useState<S>(initialState);
  return [s[0], initialState, s[1]];
}

export function Page({children}: {children: React.ReactNode}): React.JSX.Element {
  return <>{children}</>;
}

export function lighten(hex: string, percent: number = 0.4): string {
  const hash = hex.startsWith("#");
  if (!hash) hex = "#" + hex;

  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.min(255, Math.round(r + (255 - r) * percent));
  g = Math.min(255, Math.round(g + (255 - g) * percent));
  b = Math.min(255, Math.round(b + (255 - b) * percent));

  return `${hash ? "#" : ""}${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

export function lightenIf(hex: string, percent: number = 0.4): string {
  const dark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return dark ? lighten(hex, percent) : hex;
}