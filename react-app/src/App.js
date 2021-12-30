import "./App.css";

//Header
function Header(props) {
  const { title, onChangeMode } = props;
  function onClickHandler(evt) {
    evt.preventDefault();
    onChangeMode();
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
    onChangeMode();
  }
  let lis = [];
  for (let i = 0; i < props.data.length; i = i + 1) {
    let d = data[i];
    lis.push(
      <li key={d.id}>
        <a href={"/read/" + d.id} onClick={onClickHandler}>
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
  let topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];

  function onChangeModeHandler() {
    alert("change!");
  }

  function onChangeNavModeHandler() {
    alert("change!");
  }

  return (
    <>
      <Header title="REACT" onChangeMode={onChangeModeHandler} />
      <Nav data={topics} onChangeMode={onChangeNavModeHandler} />
      <Article title="Welcome" body="Hello, React!" />
    </>
  );
}

export default App;
