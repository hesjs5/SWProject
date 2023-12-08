import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../App";
import { boardsURL } from "../../common/URL";
import axios from "axios";

export default function ReplyCreate() {
  const { id } = useParams();
  const contextValue = useContext(LoginContext);

  const createReply = async () => {
    const replyCreateRequest = {
      content: document.getElementById("replyContent").value,
    };
    console.log(replyCreateRequest);
    console.log(document.getElementById("replyContent"));
    const token = "Bearer ".concat(localStorage.getItem("token"));
    const headersConfig = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiQGIuY29tIiwiZXhwIjoxNzAyMDA1MDcxLCJpZCI6ImJAYi5jb20iLCJ1c2VybmFtZSI6ImIifQ.gAB05Ljc4Vk6zkDsueKSnWzqs4sX8R18Rt53vWlM2qKmUASimNtBp_CYG5RFbvcTketqldBsfDa8GQbCwvkgdA",
      Authorization2: token,
    };
    await axios
      .post(`${boardsURL}/${id}/replies`, replyCreateRequest, {
        headers: headersConfig,
      })
      .then((response) => {
        console.log("success");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function isNotLoggedIn() {
    return !contextValue.isLoggedIn;
  }

  function goLogin() {
    console.log("goLogin");
  }

  function Item() {
    if (isNotLoggedIn()) {
      return (
        <div>
          <textarea
            className="form-control"
            rows="3"
            id="replyContent"
            defaultValue="댓글을 작성하려면 로그인 해주세요"
            disabled
            onClick={goLogin}
          />
        </div>
      );
    }

    return (
      <div>
        <textarea className="form-control" id="replyContent" rows="3" />

        <button className="btn btn-primary" onClick={createReply}>
          댓글
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <label htmlFor="replyContent">댓글 작성</label>
      <Item />
    </div>
  );
}
