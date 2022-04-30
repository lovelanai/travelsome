import { Routes, Route } from "react-router-dom";
import ContentPage from "./pages/ContentPage";
import CreateContent from "./pages/CreateContent";
import Login from "./pages/Login";
import "./Main.css";
import SignOrLog from "./pages/SignOrLog";
import CreateUser from "./pages/CreateUser";
import MyProfile from "./pages/MyProfile";
import NotLoggedIn from "./pages/NotLoggedIn";
import EditPost from "./pages/editPost";
import PostById from "./pages/PostById";

export default function Main() {
  return (
    <div className="mainContainer">
      <Routes>
        <Route path="/" element={<ContentPage />} />
        <Route path="/SignOrLog" element={<SignOrLog />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/NotLoggedIn" element={<NotLoggedIn />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/CreateContent" element={<CreateContent />} />

        <Route path="/posts/:posts" element={<PostById />} />
        <Route path="/posts/edit" element={<EditPost />} />
      </Routes>
    </div>
  );
}
