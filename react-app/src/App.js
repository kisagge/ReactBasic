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
    onChangeMode("READ", Number(evt.target.dataset.id));
  }

  let lis = data.map((el) => (
    <li key={el.id}>
      <a href={"/read/" + el.id} data-id={el.id} onClick={onClickHandler}>
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
  const [id, setId] = useState(null);

  let topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];

  function onChangeModeHandler(_mode, _id) {
    setMode(_mode);
    setId(_id);
  }

  let articleTag;
  if (mode === "WELCOME") {
    articleTag = <Article title="Welcome" body="Hello, React!" />;
  } else if (mode === "READ") {
    let title = null;
    let body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        articleTag = <Article title={title} body={body} />;
      }
    }
  } else if (mode === "CREATE") {
    articleTag = <Article title="Create" body="Hello, Create" />;
  } else if (mode === "UPDATE") {
    articleTag = <Article title="Update" body="Hello, Update" />;
  }

  return (
    <>
      <Header title="REACT" onChangeMode={onChangeModeHandler} />
      <Nav data={topics} onChangeMode={onChangeModeHandler} />
      {articleTag}
      <Control onChangeMode={onChangeModeHandler} />
    </>
  );
}

function Control(props) {
  const { onChangeMode } = props;

  function onClickHandler(_mode, e) {
    e.preventDefault();
    onChangeMode(_mode);
  }
  return (
    <ul>
      <li>
        <a href="/create" onClick={(e) => onClickHandler("CREATE", e)}>
          create
        </a>
      </li>
      <li>
        <a href="/update" onClick={(e) => onClickHandler("UPDATE", e)}>
          update
        </a>
      </li>
    </ul>
  );
}
export default App;
