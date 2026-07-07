import { useEffect } from 'react';
import '../css/Projects.css';
import { lightenIf, Page, state } from "../main";

const cacheDuration = 3 * 60 * 60 * 1000; // 3 hours

type Language = 'services' | 'dart' | 'swift' | 'ts' | 'cpp';
type ProjectState = {index: number, language: Language | undefined, title: string, color: string};
type ShadowSize = [number, number];

interface ProjectStats {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  language: string;
}

interface ProjectData {
  id: string;
  name: string;
  mainLanguage: string;
  repo?: string | undefined;
  homepage?: string | undefined;
  description: string;
  icon?: string | undefined;
}

export const projects: Record<Language, ProjectData[]> = {
  "services": [
    {
      id: "clinks",
      name: "CLinks",
      repo: "Calebh101/links_manager",
      mainLanguage: "Dart + TypeScript",
      homepage: "https://clinks.calebh101.net",
      icon: "https://raw.githubusercontent.com/Calebh101/links_manager/main/favicon.png",

      description: "A service for redirect URLs with advanced logic.",
    },
  ],
  "dart": [
    {
      id: "clinks",
      name: "CLinks Client",
      repo: "Calebh101/links_manager",
      mainLanguage: "Dart",
      homepage: "https://clinks.calebh101.net",
      icon: "https://raw.githubusercontent.com/Calebh101/links_manager/main/favicon.png",

      description: "The web client for creating and managing CLinks is written in Flutter!",
    },
    {
      id: "account-manager",
      name: "Account Manager",
      repo: "Calebh101/account-manager",
      mainLanguage: "Dart",
      homepage: "https://account.calebh101.net",

      description: "The web client for managing your account for my server is written in Flutter!",
    },
    {
      id: "dexcom",
      name: "dexcom",
      repo: "Calebh101/dexcom",
      mainLanguage: "Dart",

      description: "Some documentation and a Dart package on the Dexcom Share API.",
    },
  ],
  "swift": [
    {
      id: "magnificationscaler",
      name: "MagnificationScaler",
      repo: "Calebh101/MagnificationScaler",
      mainLanguage: "Swift",
      icon: "https://raw.githubusercontent.com/Calebh101/MagnificationScaler/main/assets/images/icon.png",

      description: "A small macOS app to make the dock magnification scale with its size.",
    }
  ],
  "ts": [
    {
      id: "server",
      name: "My Server",
      mainLanguage: "TypeScript",
      description: "The server running all my apps, like CLinks, is written in TypeScript!",
    },
    {
      id: "this-website",
      name: "This Website",
      mainLanguage: "TypeScript + React",
      description: "This website you're using right here is built using React w/ Vite!"
    }
  ],
  "cpp": [
    {
      id: "itlwmcli",
      name: "ItlwmCLI",
      repo: "Calebh101/ItlwmCLI",
      mainLanguage: "C++",

      description: "A C++ app for communicating with Itlwm through the terminal.",
    },
  ],
};

const servicesProjectState: ProjectState = {index: 5, language: 'services', title: "Services", color: "#005C9C"};
const dartProjectState: ProjectState = {index: 1, language: "dart", title: "Flutter/Dart", color: "#00B4AB"};
const swiftProjectState: ProjectState = {index: 2, language: "swift", title: "Swift/SwiftUI", color: "#F05138"};
const tsProjectState: ProjectState = {index: 3, language: "ts", title: "TypeScript", color: "#3178c6"};
const cppProjectState: ProjectState = {index: 4, language: "cpp", title: "C++", color: "#f34b7d"};

const allStates: Record<Language, ProjectState> = {
  "services" : servicesProjectState,
  "dart": dartProjectState,
  "swift": swiftProjectState,
  "ts": tsProjectState,
  "cpp": cppProjectState,
};

function allProjects(): [Language, ProjectData][] {
  const results: [Language, ProjectData][] = [];
  const ids: string[] = [];

  for (const list of Object.entries(projects)) {
    for (const project of list[1]) {
      if (ids.includes(project.id)) continue;
      ids.push(project.id);
      results.push([list[0] as Language, project]);
    }
  }

  return results;
}

function getCache(repo: string): ProjectStats | undefined {
  try {
    const raw = localStorage.getItem(`repo-cache:${repo}`);
    if (!raw) return undefined;

    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > cacheDuration) {
      localStorage.removeItem(`repo-cache:${repo}`);
      return undefined;
    }

    return data;
  } catch {
    return undefined;
  }
}

function setCache(repo: string, data: ProjectStats) {
  try {
    localStorage.setItem(`repo-cache:${repo}`, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}
}

export default function Projects() {
  const dark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const defaultShadowSize: ShadowSize = [500, 40];
  const smallShadowSize: ShadowSize = [100, 10];

  const [shadowSize, , setShadowSize] = state<ShadowSize>(smallShadowSize);
  const [currentState, allProjectsState, setProjectState] = state<ProjectState>({index: 0, language: undefined, title: "All", color: dark ? '#333' : '#888'});
  const {color} = currentState;

  const [selected, , select] = state(allProjectsState.index);
  const [animating, , animate] = state(false);

  function TabButton({state}: {state: ProjectState}) {
    const {index, title, color} = state;
    const active = selected === index;

    return (
      <>
        <button
          className="tabbutton"

          onMouseDown={() => {}}

          onMouseUp={() => {
            if (animating) return;
            animate(true);

            if (selected !== index) {
              select(index);
              setProjectState(allProjectsState);
              setShadowSize([100, 10]);

              setTimeout(() => setProjectState(state), 400);
              setTimeout(() => setShadowSize(defaultShadowSize), 500);
              setTimeout(() => animate(false), 500);
            } else {
              select(index);
              setProjectState(state);
              setShadowSize(defaultShadowSize);
              animate(false);
            }
          }}

          style={{
            cursor: "pointer",
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: active ? color : (dark ? undefined : "#CCC"),
            color: !dark && !active ? "black" : "white",
            fontWeight: 600,
            fontSize: 14,
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            zIndex: 1,
          }}
        >
          {title}
        </button>
      </>
    );
  }

  return (
    <Page>
      <div style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "60vw",
        height: 100,
        boxShadow: `0 0 ${shadowSize[0]}px ${shadowSize[1]}px ${color}`,
        transition: "box-shadow 0.5s ease",
        zIndex: 0,
      }}></div>
      <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "safe center",
            backgroundColor: "var(--bg)",
            gap: 10,
            borderRadius: 24,
            zIndex: 3,
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            padding: "0 20px",
          }}
        >
          <TabButton state={allProjectsState}></TabButton>
          <TabButton state={servicesProjectState}></TabButton>
          <TabButton state={dartProjectState}></TabButton>
          <TabButton state={swiftProjectState}></TabButton>
          <TabButton state={tsProjectState}></TabButton>
          <TabButton state={cppProjectState}></TabButton>
        </div>

        <ProjectContent animating={animating} state={currentState}></ProjectContent>
    </Page>
  );
}

function ProjectContent(options: {state: ProjectState, animating: boolean}): React.JSX.Element {
  const {language} = options.state;
  const small = screen.width <= 1200;
  const items: [Language, ProjectData][] | undefined = language ? projects[language].map(x => [language, x]) : (options.animating ? undefined : allProjects());

  return (
    <>
      <div
        id="projects-content"
        style={{
          display: "grid",
          gridTemplateColumns: small ? "1fr" : "1fr 1fr",
          justifyItems: "center",
          gap: 40,
          paddingTop: 150,
          paddingBottom: 100,
        }}
      >
        {items?.map(project => <Project current={options.state} key={`${project[1].id}-${project[1].description}`} language={project[0]} project={project[1]} />)}
      </div>
    </>
  );
}

function Project(options: {current: ProjectState, language: Language, project: ProjectData}): React.JSX.Element {
  const {project, current, language} = options;
  const {name, repo, description, icon, homepage, mainLanguage} = project;
  const [stats, , setStats] = state<ProjectStats | undefined>(undefined);
  const color = allStates[language].color;
  const small = screen.width <= 500;

  useEffect(() => {
    let cancelled = false;
    if (!repo) return;

    const url = `https://api.github.com/repos/${repo}`;
    const cached = getCache(repo);
    console.log("Fetching repo URL:", url, typeof cached);

    if (cached) {
      setStats(cached);
      return;
    }

    fetch(url)
      .then(async res => {
        if (res.ok) {
          return res.json();
        } else {
          console.warn("Got bad response:", res.status, await res.json());
          return undefined;
        }
      })
      .then((data: ProjectStats | undefined) => {
        if (!data) return;
        if (cancelled) return;

        setCache(repo, data);
        setStats(data);
      })
      .catch(e => console.error(e));

    return () => { cancelled = true; };
  }, [repo]);

  function Content(): React.JSX.Element {
    return (
      <>
        <div>
          <h2 style={{
            textAlign: "left",
          }}>{homepage ? <a target="_blank" href={homepage}>{name}</a> : name}</h2>
          <p style={{
            fontSize: 14,
            textAlign: "left",
          }}>
            {repo ? <><a target="_blank" href={`https://github.com/${repo}`}>{repo}</a><br/></> : ""}
            <span style={{
              color: lightenIf(color),
            }}>{mainLanguage}</span><br/>
            {stats ? [`${stats.stargazers_count} stars`, `${stats.forks_count} forks`, `${stats.open_issues_count} issues`].join(" - ") : (repo ? "Loading..." : "")}</p><br/>
            <p style={{
              fontSize: 14,
              textAlign: "left",
              lineHeight: 1.6,
            }}>{description}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className='project-card'
        style={{
          width: small ? 300 : 500,
          minHeight: 200,
          alignItems: "center",
          display: "flex",
          //border: "2px solid #666",
          borderRadius: 12,
          boxSizing: "border-box",
          backgroundColor: "var(--bg)",
          zIndex: 1,
          boxShadow: current.index === 0 ? `0 0 60px 10px ${color}33, 0 0 120px 40px ${color}1a` : undefined,
        }}
      >
        {
          icon ?
            <div style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}>
              <img style={{
                width: small ? 50 : 100,
                padding: 15,
                height: small ? 50 : 100,
                flex: "0 0 auto",
                objectFit: "contain",
                marginLeft: 15,
              }} src={icon} />
              <div style={{
                flex: 3,
                padding: 15,
              }}>
                <Content></Content>
              </div>
            </div>
          : <div style={{
            padding: 15,
          }}>
            <Content></Content>
          </div>
        }
      </div>
    </>
  );
}