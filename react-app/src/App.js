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
function Article(props) {
  console.log("Article");
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
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
function App() {
  console.log("App");
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);

  let topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];
  function changeModeHandler(_mode, _id) {
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
    function createSubmitHandler(_title, _body) {
      alert("Hello, Create" + _title + " " + _body);
    }
    articleTag = <Create onSubmit={createSubmitHandler}></Create>;
  } else if (mode === "UPDATE") {
    articleTag = <Article title="Update" body="Hello, Update" />;
  }

  return (
    <>
      <Header title="WEB" onChangeMode={changeModeHandler} />
      <Nav data={topics} onChangeMode={changeModeHandler} />
      {articleTag}
      <Control onChangeMode={changeModeHandler} />
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
    props.onChangeMode("UPDATE");
  }
  return (
    <ul>
      <li>
        <a href="/create" onClick={ClickHandler}>
          create
        </a>
      </li>
      <li>
        <a href="/update" onClick={ClickUpdateHandler}>
          update
        </a>
      </li>
    </ul>
  );
}
export default App;
