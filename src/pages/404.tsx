//import { useState } from 'react';
import { discord, email } from '../constants';
import '../css/Home.css';

export default function Page404() {
  return (
    <>
      <section id="center">
        <img
          style={{ width: 256 }}
          src="/images/tree.png"
        />
        <div>
          <h1 style={{
            fontSize: 90,
          }}>404</h1>
          <h2>Page Not Found</h2>
          <p>
            <br/>You've wandered off into the wilderness.
            <br/><a href="/">Go Home</a><br/><br/>

            Did a link of mine send you to this page?
            <br/>Contact me via <a href={`mailto:${email}`} target="_blank">email</a> or <a href={discord} target="_blank">Discord</a>!
          </p>
        </div>
      </section>
    </>
  );
}
