import '../css/Home.css';
import { state } from '../main';

export default function Home() {
  const [shadowSize, defaultShadowSize, setShadowSize] = state<[number, number, boolean]>([250, 20, false]);

  return (
    <>
      <section id="center">
        <div
          style={{
            height: 250,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            id="main-icon"
            src="https://raw.githubusercontent.com/Calebh101/Calebh101/main/assets/icon-round.png"
            style={{
              width: 175,
              borderRadius: '50%',
              boxShadow: `0 0 ${shadowSize[0]}px ${shadowSize[1]}px rgba(45, 60, 220, 0.6)`,
              transition: "box-shadow 0.5s ease, width 0.4s ease",
            }}
            onClick={() => {
              if (shadowSize[2]) {
                setShadowSize(defaultShadowSize);
              } else {
                setShadowSize([500, 200, true]);
              }
            }}
          />
        </div>
        <div>
          <h1>Calebh101</h1>
          <p>
            Blah blah blah mention Dart/Flutter, Swift, and TypeScript
          </p>
        </div>
      </section>
    </>
  );
}
