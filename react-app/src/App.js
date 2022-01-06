import "./App.css";
import { useState } from "react";

function Header(props) {
  console.log("Header");
  function onClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("WELCOME");
  }
  return (
    <header>
      <h1>
        <a href="index.html" onClick={onClickHandler}>
          {props.title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  let lis = [];
  function clickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("READ", Number(evt.target.dataset.id));
  }
  for (let i = 0; i < props.data.length; i = i + 1) {
    let d = props.data[i];
    lis.push(
      <li key={d.id}>
        <a href={"/read/" + d.id} data-id={d.id} onClick={clickHandler}>
          {d.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}
function Article({ title, body }) {
  console.log("Article");
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
}
function Create(props) {
  function submitHandler(evt) {
    evt.preventDefault();
    let title = evt.target.title.value;
    let body = evt.target.body.value;
    props.onSubmit(title, body);
    console.log(title);
  }
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={submitHandler}>
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="create" />
        </p>
      </form>
    </article>
  );
}
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  function submitHandler(evt) {
    evt.preventDefault();
    let title = evt.target.title.value;
    let body = evt.target.body.value;
    props.onSubmit(title, body);
    console.log(title);
  }
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={submitHandler}>
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(evt) => setBody(evt.target.value)}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="update" />
        </p>
      </form>
    </article>
  );
}
function App() {
  console.log("App");
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  console.log("id", id);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ]);
  function changeModeHandler(_mode, _id) {
    if (_mode === "DELETE") {
      let newTopics = [];
      for (let i = 0; i < topics.length; i++) {
        if (topics[i].id !== id) {
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode("WELCOME");
      return;
    }
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
      }
    }
    articleTag = <Article title={title} body={body} />;
  } else if (mode === "CREATE") {
    articleTag = (
      <Create
        onSubmit={(_title, _body) => {
          let newTopic = { id: nextId, title: _title, body: _body };
          let newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title = null;
    let body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    console.log("title", title);
    articleTag = (
      <Update
        title={title}
        body={body}
        onSubmit={(title, body) => {
          let newTopics = [...topics];
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              newTopics[i].title = title;
              newTopics[i].body = body;
            }
          }
          setTopics(newTopics);
          setMode("READ");
        }}
      ></Update>
    );
  }

  return (
    <>
      <Header title="WEB" onChangeMode={changeModeHandler} />
      <Nav data={topics} onChangeMode={changeModeHandler} />
      {articleTag}
      <Control onChangeMode={changeModeHandler} selectedId={id} />
    </>
  );
}
function Control(props) {
  function ClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("CREATE");
  }
  function ClickUpdateHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("UPDATE", props.selectedId);
  }
  let contextUI = null;
  if (props.selectedId > 0) {
    contextUI = (
      <>
        <li>
          <a href={"/update/" + props.selectedId} onClick={ClickUpdateHandler}>
            update
          </a>
        </li>
        <li>
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              props.onChangeMode("DELETE");
            }}
          >
            <input type="submit" value="delete" />
          </form>
        </li>
      </>
    );
  }
  return (
    <ul>
      <li>
        <a href="/create" onClick={ClickHandler}>
          create
        </a>
      </li>
      {contextUI}
    </ul>
  );
}
export default App;
