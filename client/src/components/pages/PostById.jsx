import "./MyProfile.css";
import EditPost from "./editPost";
import DeletePost from "./DeletePost";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function PostById() {
  return (
    <div className="postByIdContainer">
      <h1>Ändra eller ta bort recension</h1>
      <div className="leftArrow">
        <Link to="/MyProfile">
          <AiOutlineArrowLeft />
        </Link>
      </div>

      <div>
        <EditPost />
        <hr />
        <DeletePost />
      </div>
    </div>
  );
}
