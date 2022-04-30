import Form from "react-bootstrap/Form";
import "./CreateContent.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateContent() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let result = await fetch("/posts", {
      method: "post",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      alert("Ny recension skapad");
      settitle("");
      setdescription("");
      navigate("/MyProfile");
    }
  };
  return (
    <div>
      <div className="content-form">
        <h1>Skriv en recension</h1>
        <Form style={{ width: "120%" }} action="">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              placeholder="Resemål/Aktivitet/Restaurang"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
          ></Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Beskriving</Form.Label>
            <Form.Control
              onChange={(e) => setdescription(e.target.value)}
              value={description}
              as="textarea"
              rows={7}
            />
          </Form.Group>
          <button
            onClick={handleOnSubmit}
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Skapa recension
          </button>
        </Form>
      </div>
    </div>
  );
}

export default CreateContent;
