import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditPost() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const location = useLocation();
  const id = location.pathname;
  const navigate = useNavigate();

  const savePostEdit = async (e) => {
    e.preventDefault();
    if (window.confirm("Vill du ändra ditt inlägg?")) {
      let result = await fetch(`${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      if (result) {
        alert("Din recension är ändrad!");
        settitle("");
        setdescription("");
        navigate("/MyProfile");
      }
    }
  };

  return (
    <div>
      <div>
        <div className="content-form">
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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Beskriving</Form.Label>
              <Form.Control
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                as="textarea"
                rows={7}
              />
            </Form.Group>
            <button
              onClick={savePostEdit}
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Ändra recension
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
