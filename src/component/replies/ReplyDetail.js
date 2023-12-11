import { useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { boardsURL } from "../../common/URL";
import DeleteComponent from "../common/DeleteComponent";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ReplyDetail(props) {
  const { id } = useParams();
  const isLoggedInState = useSelector((state) => state.isLoggedIn);
  const loginMemberNameState = useSelector((state) => state.memberName);

  const [reply] = useState({
    id: props.reply.id,
    content: props.reply.content,
    createDate: props.reply.createDate,
    boardId: props.reply.boardId,
    memberID: props.reply.memberID,
    memberName: props.reply.memberName,
  });

  const [replyContent, setReplyContent] = useState(reply.content);

  const [updateState, setUpdateState] = useState(false);

  const handleChange = (e) => {
    const { value } = { ...e.target };

    setReplyContent(value);
  };

  const update = async () => {
    if (updateState) {
      setUpdateState(false);
      await edit();
      return;
    }

    setUpdateState(true);
  };

  const edit = async () => {
    const postEditRequest = {
      content: replyContent,
    };
    const token = localStorage.getItem("token");
    const headersConfig = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    await axios
      .put(`${boardsURL}/${id}/replies/${reply.id}`, postEditRequest, {
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

  function EditAndDeleteButtonComponent() {
    if (isLoggedInState && loginMemberNameState === reply.memberName) {
      return (
        <div className="d-grid gap-2">
          <button
            className="btn btn-warning btn-sm"
            type="button"
            onClick={update}
          >
            수정
          </button>
          <DeleteComponent
            data={{
              requestURL: `${boardsURL}/${id}/replies/${reply.id}`,
              title: "댓글 삭제",
              id: reply.id,
            }}
            afterEach={props.deleteReply}
          />
        </div>
      );
    }
  }

  return (
    <div className="card card-body mb-2">
      <div className="card-title">
        <span>{reply.memberName}</span>
      </div>
      <div className="card-text">
        {updateState ? (
          <input
            type="text"
            value={replyContent}
            onChange={handleChange}
            className="comment-update-input"
          />
        ) : (
          <span>{replyContent}</span>
        )}
      </div>
      <div className="card-subtitle">
        <small className="text-muted">{reply.createDate}</small>
      </div>

      <EditAndDeleteButtonComponent />
    </div>
  );
}
