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