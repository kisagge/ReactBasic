import "./App.css";
import { useState } from "react";

//Header
function Header(props) {
  const { title, onChangeMode } = props;

  function onClickHandler(evt) {
    evt.preventDefault();
    onChangeMode("WELCOME");
  }

  return (
    <header>
      <h1>
        <a href="index.html" onClick={onClickHandler}>
          {title}
        </a>
      </h1>
    </header>
  );
}

//Nav
function Nav(props) {
  const { data, onChangeMode } = props;

  function onClickHandler(evt) {
    evt.preventDefault();
    onChangeMode("READ");
  }

  let lis = data.map((el) => (
    <li key={el.id}>
      <a href={"/read/" + el.id} onClick={onClickHandler}>
        {el.title}
      </a>
    </li>
  ));

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

//Article
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  let [mode, setMode] = useState("WELCOME");

  let topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];

  function onChangeModeHandler(_mode) {
    setMode(_mode);
  }

  let articleTag;
  if (mode === "WELCOME") {
    articleTag = <Article title="Welcome" body="Hello, React!" />;
  } else if (mode === "READ") {
    articleTag = <Article title="Read" body="Hello, READ!" />;
  }

  return (
    <>
      <Header title="REACT" onChangeMode={onChangeModeHandler} />
      <Nav data={topics} onChangeMode={onChangeModeHandler} />
      {articleTag}
    </>
  );
}

export default App;
