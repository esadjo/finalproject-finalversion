import { html, render } from "lit-html";

function view() {
  return html`<h1>Lorem Ipsum</h1>
    <p>
      Dolor sit amet consectetur adipisicing elit. Maxime quis, iusto iste ea
      eaque rem obcaecati nemo tempore, quas quaerat, recusandae aut alias? Quo,
      <strong>fugiat</strong> consequatur explicabo minus nisi omnis saepe
      laboriosam, consectetur, aperiam impedit perferendis odio ea odit quod!
      Alias, quia! Ea porro recusandae <strong>excepturi</strong>, architecto
      odio?
    </p>
    <p>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Surprise me!</a>
    </p>`;
}

render(view(), document.body);
