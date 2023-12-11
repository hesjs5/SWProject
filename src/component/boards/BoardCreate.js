import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { boardsURL } from "../../common/URL";
import axios from "axios";

export default function BoardCreate() {
  const navigate = useNavigate();

  const create = async () => {
    const postCreateRequest = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
    };
    const token = localStorage.getItem("token");
    const headerConfig = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: token,
    };
    await axios
      .post(`${boardsURL}`, postCreateRequest, {
        headers: headerConfig,
      })
      .then((response) => {
        console.log("success");
        console.log(response);
        goBoards();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function goBoards() {
    navigate("/boards");
  }

  return (
    <div className="container" style={{ maxWidth: "560px" }}>
      <div className="py-5 text-center">
        <h2>글 등록</h2>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label" htmlFor="title">
          제목
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="title"
            name="title"
            placeholder="제목을 입력해주세요."
            type="text"
          ></input>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label" htmlFor="content">
          내용
        </label>
        <div className="col-sm-10">
          <textarea
            className="form-control"
            id="content"
            name="content"
            placeholder="내용을 입력해주세요."
            rows="10"
          ></textarea>
        </div>
      </div>

      <div className="d-grid gap-2">
        <button className="btn btn-primary" onClick={create}>
          등록
        </button>
        <button className="btn btn-dark" onClick={goBoards}>
          취소
        </button>
      </div>
    </div>
  );
}
