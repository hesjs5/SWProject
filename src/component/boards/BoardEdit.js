import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { boardsURL } from "../../common/URL";
import axios from "axios";

export default function BoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  let boardInfo = { ...location.state };

  const edit = async () => {
    const postEditRequest = {
      title: document.getElementById("editTitle").value,
      content: document.getElementById("editContent").value,
    };
    const token = localStorage.getItem("token");
    const headersConfig = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    await axios
      .put(`${boardsURL}/${id}`, postEditRequest, {
        headers: headersConfig,
      })
      .then((response) => {
        console.log("success");
        console.log(response);
        goBoard();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function goBoard() {
    navigate(`/boards/${id}`);
  }

  return (
    <div className="container" style={{ maxWidth: "560px" }}>
      <div className="py-5 text-center">
        <h2>글 수정</h2>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label" htmlFor="editTitle">
          제목
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="editTitle"
            name="editTitle"
            type="text"
            defaultValue={boardInfo?.title || ""}
          ></input>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label" htmlFor="editContent">
          내용
        </label>
        <div className="col-sm-10">
          <textarea
            className="form-control"
            id="editContent"
            name="editContent"
            defaultValue={boardInfo?.content || ""}
            rows="10"
          ></textarea>
        </div>
      </div>

      <div className="d-grid gap-2">
        <button className="btn btn-warning" onClick={edit}>
          수정
        </button>
        <button className="btn btn-dark" onClick={goBoard}>
          취소
        </button>
      </div>
    </div>
  );
}
