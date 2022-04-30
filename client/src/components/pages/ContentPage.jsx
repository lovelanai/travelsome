import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./ContentPage.css";
import { MdOutlineBeachAccess } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";

export default function Contentpage() {
  const [posts, setPosts] = useState([
    {
      title: "",
      description: "",
      postedBy: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    fetch("/posts")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setPosts(jsonRes));
  });

  return (
    <section className="contentContainer">
      <div>
        <h1 style={{ color: "#275193" }}>
          Recensioner <MdOutlineBeachAccess />
        </h1>
        <div className="contentBox">
          {posts.map((post) => (
            <div className="postContent" key={post._id}>
              <Card>
                <Card.Body
                  style={{
                    minWidth: "17rem",
                    maxWidth: "50rem",
                    padding: "0",
                  }}
                >
                  <h2 className="cardTitle">{post.title}</h2>

                  <div className="card-text" style={{ fontSize: "1.4rem" }}>
                    <p style={{ margin: "2rem" }}>Om {post.title}</p>
                    <p style={{ margin: "2rem", fontSize: "1rem" }}>
                      {post.description}
                    </p>
                  </div>

                  <p
                    style={{
                      fontSize: "1.5rem",
                      margin: "2rem",
                      marginBottom: "1rem",
                    }}
                    className="mb-2 text-muted"
                  ></p>
                  <hr />
                  <p
                    style={{
                      fontSize: "1.5rem",
                      margin: "2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    Skriven av: <MdAccountCircle /> {post.postedBy}
                  </p>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
