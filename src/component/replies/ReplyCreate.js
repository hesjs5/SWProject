import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import ReplyCreateForm from "./ReplyCreateForm";
import { useNavigate } from "react-router-dom";

export default function ReplyCreate() {
  const navigate = useNavigate();
  const isLoggedInState = useSelector((state) => state.isLoggedIn);

  function goLogin() {
    console.log("goLogin");
    navigate("/login");
  }

  function ReplyForm() {
    if (isLoggedInState) {
      return <ReplyCreateForm />;
    }

    return (
      <div>
        <textarea
          className="form-control"
          rows="3"
          id="content"
          name="content"
          defaultValue="댓글을 작성하려면 로그인 해주세요"
          disabled
          onClick={goLogin}
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <div className="text-start fw-bold">
        <small>댓글 작성</small>
      </div>

      <hr />

      <ReplyForm />
    </div>
  );
}
