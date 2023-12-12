import { useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteComponent from "../common/DeleteComponent";
import { useSelector } from "react-redux";
import { customAuthAndContentAxios } from "../../common/CustomAxiosUtils";
import { boardsUrl } from "../../common/URL";
import { Card, Stack } from "react-bootstrap";
import button from "bootstrap/js/src/button";

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

  const setUpdateStateToTrue = () => {
    setUpdateState(true);
  };

  const setUpdateStateToFalse = () => {
    setUpdateState(false);
  };

  const edit = async () => {
    const replyEditRequest = {
      content: replyContent,
    };
    await customAuthAndContentAxios
      .put(`${boardsUrl}/${id}/replies/${reply.id}`, replyEditRequest)
      .then((response) => {
        console.log("reply edit response = ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditButton = () => {
    if (isLoggedInState && loginMemberNameState === reply.memberName) {
      if (updateState) {
        return (
          <button className="btn btn-warning btn-sm" onClick={update}>
            수정하기
          </button>
        );
      }
      return (
        <button
          className="btn btn-warning btn-sm"
          onClick={setUpdateStateToTrue}
        >
          수정
        </button>
      );
    }
  };

  const DeleteButton = () => {
    if (isLoggedInState && loginMemberNameState === reply.memberName) {
      if (updateState) {
        return (
          <button
            className="btn btn-dark btn-sm"
            onClick={setUpdateStateToFalse}
          >
            취소
          </button>
        );
      }
      return (
        <DeleteComponent
          data={{
            requestURL: `${boardsUrl}/${id}/replies/${reply.id}`,
            title: "댓글 삭제",
            id: reply.id,
          }}
          afterEach={props.deleteReply}
        />
      );
    }
  };

  return (
    <Card className="mb-2 text-start">
      <Card.Body>
        <Stack className="mb-3" direction="horizontal" gap={3}>
          <div>
            <span className="fw-semibold">{reply.memberName}</span>
          </div>
          <div className="ms-auto">
            <EditButton />
          </div>
          <div>
            <DeleteButton />
          </div>
        </Stack>
        <Card.Subtitle className="mb-1">
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
        </Card.Subtitle>
        <Card.Subtitle className="mb-3 text-muted">
          <small>{reply.createDate}</small>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
