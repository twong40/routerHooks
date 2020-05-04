import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Table, Form, Button, Alert, Nav, Navbar } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

const Home = () => (
  <div>
    <h2>notes app</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum,
      urna ac faucibus facilisis, nibh metus luctus ligula, quis placerat orci
      dolor ut nibh. Pellentesque et mauris nec dui elementum volutpat in in
      leo. Vestibulum in commodo sem, in ultricies orci. Maecenas ac egestas
      nulla. Integer vestibulum est tristique, eleifend augue vel, aliquam leo.
      Vivamus gravida dolor sed nisl viverra iaculis. Duis tincidunt, lectus sit
      amet dapibus dapibus, libero augue porttitor magna, vel pulvinar lorem
      diam rutrum ipsum. Suspendisse vel sapien ac quam ultricies varius. Nunc
      luctus neque a tortor scelerisque, ut laoreet lectus aliquet. Duis a
      placerat lacus. Cras sed augue viverra odio molestie ultrices ut at quam.
      Suspendisse potenti. Aenean semper magna et quam luctus rutrum. Morbi
      malesuada odio nibh, ut dignissim quam interdum eu. Sed quis velit
      molestie, auctor nisl eu, tempor sem. Etiam ac felis rutrum, viverra est
      quis, molestie lorem. Etiam luctus elit vel nunc convallis, ac ultrices
      odio efficitur. Nam quam massa, accumsan ac elit vel, aliquam gravida dui.
      Fusce facilisis, dolor ac consequat lacinia, augue massa consectetur arcu,
      vitae volutpat libero lacus eu arcu. Duis sit amet egestas magna. Ut
      sagittis eu enim sit amet venenatis. Mauris at augue finibus, tempus leo
      vel, volutpat sapien. Interdum et malesuada fames ac ante ipsum primis in
      faucibus. Vestibulum consequat fringilla mauris viverra aliquet. Nulla
      malesuada mattis ex non dignissim. Curabitur ex erat, consequat ut nunc
      feugiat, consectetur rutrum sapien. Etiam gravida leo eu nisl suscipit
      elementum.
    </p>
  </div>
);

const Note = ({ notes }) => {
  const id = useParams().id;
  const note = notes.find((n) => n.id === Number(id));
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? "important" : ""}</strong>
      </div>
    </div>
  );
};

const Notes = (props) => (
  <div>
    <h2>Notes</h2>
    <Table striped>
      {" "}
      <tbody>
        {props.notes.map((note) => (
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </td>
            <td>{note.user}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

const Users = () => (
  <div>
    <h2>notes app</h2>
    <ul>
      <li>bob</li>
      <li>tom</li>
      <li>User 3</li>
    </ul>
  </div>
);

const Login = (props) => {
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin("test");
    history.push("/");
  };

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" />
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "bob",
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      important: false,
      user: "bob",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "tom",
    },
  ]);

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  };

  const padding = {
    padding: 5,
  };
  const match = useRouteMatch("/notes/:id");
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;
  return (
    <div className="container">
      {message && <Alert variant="success"> {message} </Alert>}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">
                notes
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? (
                <em>{user} logged in</em>
              ) : (
                <Link to="/login">login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/notes/:id">
          <Note note={note} />
        </Route>
        <Route path="/notes">
          <Notes notes={notes} />
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
