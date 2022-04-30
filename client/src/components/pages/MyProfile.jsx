import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import "./MyProfile.css";

import { BsPencil } from "react-icons/bs";
import EditPost from "./editPost";
import { MdOutlineClose } from "react-icons/md";

export default function MyProfile() {
  const { login } = useUser();
  const [showUserPosts, setShowUserPosts] = useState(true);
  const [changePost, setChangePost] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // byta lösenord
  const changePasswordHandler = async (e) => {
    if (window.confirm("Bekräfta byte av lösenord")) {
      e.preventDefault();
      let result = await fetch("/user/login", {
        method: "PUT",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        result = await result.json();
        setPassword("");
        setUsername("");
        setShowUserPosts(true);
        return alert("Du har bytt lösenord!");
      }
      return alert("Du har angett fel användarnamn, Försök igen :)");
    }
  };

  // Logga ut knapp
  const LogoutHandler = async (e) => {
    if (window.confirm("Vill du logga ut?")) {
      let result = await fetch("/user/login", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        result = await result.json();
        login();
        return alert("Du är utloggad");
      }
      return alert("Utloggning misslyckades");
    }
  };

  const [posts, setPosts] = useState([
    {
      title: "",
      description: "",
      user: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    fetch("/posts/postedBy")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })

      .then((jsonRes) => setPosts(jsonRes));
  });

  //visar rendrerade posts från inloggad användare
  const showPosts = async () => {
    setShowUserPosts(true);
    setChangePost(false);
  };
  // visar ändra lösenord form och döljer posts
  const hidePosts = async () => {
    setShowUserPosts(false);
  };
  // Visar redigera post
  const showChangePost = async () => {
    setChangePost(true);
  };
  // Döljer redigera post
  const hideChangePost = async () => {
    setChangePost(false);
  };

  return (
    <div className="profileContainer">
      <h1>Min profil</h1>

      <div className="buttonContainer">
        <button
          onClick={showPosts}
          pe="submit"
          className="btn btn-primary customBtn"
        >
          Mina Recensioner
        </button>
        <button
          onClick={hidePosts}
          pe="submit"
          className="btn btn-secondary customBtn"
        >
          Ändra lösenord
        </button>
        <Link to="/">
          <button
            onClick={LogoutHandler}
            pe="submit"
            className="btn btn-danger customBtn"
          >
            Logga ut
          </button>
        </Link>
      </div>
      {/* Om changePost = true: rendrera redigera post. om false: rendrera ingenting */}
      {!changePost ? (
        <></>
      ) : (
        <div className="changePostContainer">
          <section>
            <button onClick={hideChangePost} className="leaveBtn cleanButton">
              <MdOutlineClose />
            </button>

            <EditPost />
          </section>
        </div>
      )}
      {/* Om setshowuserposts = true: rendrera posts. om false: rendrera form */}
      {!showUserPosts ? (
        <form id="loginform">
          <div className="form-group">
            <h1>Ändra lösenord</h1>
            <label>Användarnamn</label>
            <input
              type="text"
              className="form-control"
              id="userNameInput"
              name="userNameInput"
              aria-describedby="userNameHelp"
              placeholder="Ange användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <small id="userNameHelp" className="text-danger form-text"></small>
          </div>
          <div className="form-group">
            <label>Ange nytt lösenord</label>
            <input
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ange nytt lösenord"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small id="passworderror" className="text-danger form-text"></small>
          </div>
          <div className="login-buttons">
            <button
              onClick={changePasswordHandler}
              type="submit"
              className="btn btn-primary"
            >
              Ändra lösenord
            </button>
          </div>
        </form>
      ) : (
        <div style={{ paddingTop: "1rem" }}>
          <h1>Mina recensioner</h1>
          <div className="contentBox">
            {posts.map((post) => (
              <div className="postContent" key={post.title}>
                <Card
                  style={{
                    maxWidth: "40rem",
                    minWidth: "20rem",
                    padding: "2rem 2rem",
                  }}
                >
                  <div>
                    <div className="postIcons">
                      <Link to={`/posts/${post._id}`}>
                        <button
                          className="cleanButton"
                          onClick={showChangePost}
                        >
                          <BsPencil />
                        </button>
                      </Link>
                    </div>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Recension av: {post.postedBy}
                      </Card.Subtitle>
                      <Card.Text>{post.description}</Card.Text>
                    </Card.Body>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
