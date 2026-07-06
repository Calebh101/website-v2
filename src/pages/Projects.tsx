import '../css/Projects.css';
import { state } from "../main";

type ProjectState = [string, number, string];
type ShadowSize = [number, number];

export default function Projects() {
  const defaultShadowSize: ShadowSize = [500, 40];
  const smallShadowSize: ShadowSize = [100, 10];

  const [shadowSize, , setShadowSize] = state<ShadowSize>(smallShadowSize);
  const [[, , color], noProjectState, setProjectState] = state<ProjectState>(["0", 0, "#444"]);
  const [selected, , select] = state(noProjectState[1]);
  const [animating, , animate] = state(false);

  const dartProjectState: ProjectState = ["Dart", 3, "#00B4AB"];
  const swiftProjectState: ProjectState = ["Swift", 1, "#F05138"];
  const tsProjectState: ProjectState = ["TypeScript", 2, "#3178c6"];

  function TabButton({state}: {state: ProjectState}) {
    const active = selected === state[1];

    return (
      <>
        <button
          onMouseDown={() => {
          }}

          onMouseUp={() => {
            if (animating) return;
            animate(true);

            if (selected !== noProjectState[1]) {
              select(state[1]);
              setProjectState(noProjectState);
              setShadowSize([100, 10]);

              setTimeout(() => setProjectState(state), 400);
              setTimeout(() => setShadowSize(defaultShadowSize), 500);
              setTimeout(() => animate(false), 500);
            } else {
              select(state[1]);
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
            background: active ? state[2] : undefined,
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          }}

          onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          {state[0]}
        </button>
      </>
    );
  }

  return (
    <>
      <div
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--bg)",
            gap: 10,
            borderRadius: 16,
            boxShadow: `0 0 ${shadowSize[0]}px ${shadowSize[1]}px ${color}`,
            transition: "box-shadow 0.5s ease, width 0.4s ease",
          }}
        >
          <TabButton state={dartProjectState}></TabButton>
          <TabButton state={swiftProjectState}></TabButton>
          <TabButton state={tsProjectState}></TabButton>
        </div>
    </>
  );
}

//export function Project(options: {}) {}