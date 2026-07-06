//import { useState } from 'react';
import { discord, email } from '../constants';
import '../css/Home.css';

export default function LoadingPage() {
  return (
    <>
      <section id="center">
        <img
          style={{ width: 256 }}
          src="/images/tree.png"
        />
        <div>
          <h1 style={{
            fontSize: 64,
          }}>Loading...</h1>
          <p>
            Loading too long?
            <br/>Contact me via <a href={`mailto:${email}`} target="_blank">email</a> or <a href={discord} target="_blank">Discord</a>!
          </p>
        </div>
      </section>
    </>
  );
}
