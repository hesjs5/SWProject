import { useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButtonComponent from "../common/DeleteButtonComponent";
import { useSelector } from "react-redux";
import { customAuthAndContentAxios } from "../../common/CustomAxiosUtils";
import { boardsUrl } from "../../common/Constant";
import { Button, Card, Stack } from "react-bootstrap";
import { isAdmin, isOwner } from "../../common/utils";

export default function ReplyDetail(props) {
  const { id } = useParams();
  const isLoggedInState = useSelector((state) => state.isLoggedIn);
  const loginMemberIDState = useSelector((state) => state.memberID);
  const roleState = useSelector((state) => state.role);

  const [reply] = useState({
    id: props.reply.id,
    content: props.reply.content,
    createDate: new Date(props.reply.createDate).toLocaleDateString(),
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
        console.log("reply edit response error = ", error);
        alert(error.response.data.message);
      });
  };

  const EditButton = () => {
    if (isOwner(loginMemberIDState, reply.memberID)) {
      if (updateState) {
        return (
          <Button
            className="btn-sm text-decoration-none text-success"
            variant="link"
            onClick={update}
            disabled={replyContent.length <= 0}
          >
            수정하기
          </Button>
        );
      }
      return (
        <Button
          className="btn-sm text-decoration-none text-success"
          variant="link"
          onClick={setUpdateStateToTrue}
        >
          수정
        </Button>
      );
    }
  };

  const DeleteButton = () => {
    if (isOwner(loginMemberIDState, reply.memberID) || isAdmin(roleState)) {
      if (updateState) {
        return (
          <Button
            className="btn-sm text-decoration-none text-secondary"
            variant="link"
            onClick={setUpdateStateToFalse}
          >
            취소
          </Button>
        );
      }
      return (
        <DeleteButtonComponent
          data={{
            requestURL: `${boardsUrl}/${id}/replies/${reply.id}`,
            title: "댓글 삭제",
            id: reply.id,
            memberID: reply.memberID,
          }}
          afterEach={props.deleteReply}
        />
      );
    }
  };

  return (
    <Card className="mb-2 text-start">
      <Card.Body>
        <Stack className="mb-3" direction="horizontal">
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
        <Card.Subtitle className="mb-3">
          <small className="text-secondary">{reply.createDate}</small>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
