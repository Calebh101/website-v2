import { contacts } from "./constants";

function PageNavbar() {
  return (
    <></>
  );
}

export default function Page({footer = true, children}: {footer?: boolean, children: React.ReactNode}): React.JSX.Element {
  return (<>
    <div style={{}}>
      <PageNavbar></PageNavbar>
    </div>
    <div style={{
      minHeight: "calc(100vh - 56px)",
      display: "flex",
      flexDirection: "column",
    }}>
      <div id="content" style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        marginTop: 50,
      }}>
        {children}
      </div>
      {footer ? <div id="footer" style={{
        backgroundColor: "black",
        borderRadius: 16,
        width: "95vw",
        height: 100,
        marginBottom: 20,
        alignSelf: "center",
        zIndex: 999,
        color: "white",
        fontSize: 14,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        lineHeight: 1.6,
      }}>
        <div>
          Copyright (C) 2026 Calebh101. All rights reserved.
          <br/><div style={{
            display: "flex",
            gap: 10,
            textAlign: "center",
            justifyContent: "center",
          }}>
            <a href="/">Home</a>
            {Object.entries(contacts).map(contact => {
              const [name, [link, url]] = contact;
              return <a target="_blank" href={url} title={link}>{name}</a>;
          })}
        </div>
      </div>
    </div> : <></>}
    </div>
  </>);
}