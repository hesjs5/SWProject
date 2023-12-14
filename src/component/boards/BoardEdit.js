import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { customAuthAndContentAxios } from "../../common/CustomAxiosUtils";
import { boardsUrl } from "../../common/URL";

export default function BoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const boardInfo = { ...location.state };

  const [postEditRequest, setPostEditRequest] = useState({
    title: boardInfo?.title || "",
    content: boardInfo?.content || "",
  });

  const changePostEditRequest = (e) => {
    const { name, value } = e.target;
    setPostEditRequest({
      ...postEditRequest,
      [name]: value,
    });
  };

  const edit = async () => {
    await customAuthAndContentAxios
      .put(`${boardsUrl}/${id}`, postEditRequest)
      .then((response) => {
        console.log("board edit response = ", response);
        goBoard();
      })
      .catch((error) => {
        console.log("board edit error = ", error);
      });
  };

  const goBoard = () => {
    navigate(`${boardsUrl}/${id}`);
  };

  return (
    <div className="container" style={{ maxWidth: "560px" }}>
      <div className="py-5 text-center">
        <h2>글 수정</h2>
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
            type="text"
            value={postEditRequest.title}
            onChange={changePostEditRequest}
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
            value={postEditRequest.content}
            onChange={changePostEditRequest}
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
