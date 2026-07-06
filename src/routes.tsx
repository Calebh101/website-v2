import Home from "./pages/Home";
import Projects from "./pages/Projects";

/**
 * All routes go here, for simple pages.
 *
 * If the route is not in here or in `actions`, a 404 page is returned.
 */
export const routes: Record<string, () => React.JSX.Element> = {
    "/": Home,
    "/projects": Projects,
};

/**
 * If the route needs advanced loading logic, is redirecting, or something else, put it here.
 *
 * The callback associated with the route will be called immediately upon load, and will not be awaited.
 *
 * In place of a regular page, a loading page will be returned.
 *
 * If the route is not in here or in `routes`, a 404 page is returned.
 */
export const actions: Record<string, (root: HTMLElement) => void> = {};