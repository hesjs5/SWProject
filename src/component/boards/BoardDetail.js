import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReplyList from "../replies/ReplyList";
import DeleteComponent from "../common/DeleteComponent";
import { useSelector } from "react-redux";
import { customAxios } from "../../common/CustomAxiosUtils";

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedInState = useSelector((state) => state.isLoggedIn);
  const loginMemberNameState = useSelector((state) => state.memberName);

  const [board, setBoard] = useState({
    // "board_no": 1,
    // "title": null,
    // "text": null,
    // "mem_id": null,
    // "count" :0
  });

  useEffect(() => {
    const fetchAndSetBoard = async () => {
      await customAxios
        .get(`/boards/${id}`)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setBoard(data);
        });
    };

    fetchAndSetBoard();
  }, [id]); // id가 바뀌면 실행

  function goEditPage() {
    navigate(`/boards/${id}/edit`, {
      state: {
        title: `${board.title}`,
        content: `${board.content}`,
      },
    });
  }

  function goBoards() {
    navigate(`/boards`);
  }

  function EditAndDeleteButtonComponent() {
    if (isLoggedInState && loginMemberNameState === board.memberName) {
      return (
        <div className="d-grid gap-2">
          <button
            className="btn btn-warning btn-sm"
            type="button"
            onClick={goEditPage}
          >
            수정
          </button>
          <DeleteComponent
            data={{
              requestURL: `/boards/${id}`,
              title: "글 삭제",
              id: board.id,
            }}
            afterEach={goBoards}
          />
        </div>
      );
    }
  }

  return (
    <div className="container" style={{ maxWidth: "560px" }}>
      <div className="card border-0">
        <div className="card-body">
          <div className="card-title mb-3">
            <h1 id="title">{board.title}</h1>
          </div>

          <div className="card-subtitle mb-2">
            <span className="me-4" id="boardTitle">
              {board.title}
            </span>
            <small className="text-muted" id="createDate">
              Create {board.createDate}
            </small>
            <small className="text-muted" id="modifyDate">
              Modify {board.modifyDate}
            </small>
          </div>

          <hr />

          <div>
            <p id="content">{board.content}</p>
          </div>

          <EditAndDeleteButtonComponent />

          <hr />

          <ReplyList></ReplyList>
        </div>
      </div>
    </div>
  );
}
