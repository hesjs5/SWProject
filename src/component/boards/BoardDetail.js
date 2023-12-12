import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReplyList from "../replies/ReplyList";
import DeleteComponent from "../common/DeleteComponent";
import { useSelector } from "react-redux";
import { customAxios } from "../../common/CustomAxiosUtils";
import { boardsUrl } from "../../common/URL";
import { Card, Container, Stack } from "react-bootstrap";
import BoardEditButton from "./BoardEditButton";

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedInState = useSelector((state) => state.isLoggedIn);
  const loginMemberNameState = useSelector((state) => state.memberName);

  const [board, setBoard] = useState({
    id: 1,
    title: "",
    content: "",
    memberName: "",
    createDate: "",
    modifyDate: "",
  });

  useEffect(() => {
    const fetchAndSetBoard = async () => {
      await customAxios
        .get(`${boardsUrl}/${id}`)
        .then((response) => response.data)
        .then((data) => {
          console.log("response data = ", data);
          setBoard(data);
        });
    };

    fetchAndSetBoard();
  }, [id]); // id가 바뀌면 실행

  const goBoards = () => {
    navigate(`${boardsUrl}`);
  };

  const EditButton = () => {
    if (isLoggedInState && loginMemberNameState === board.memberName) {
      return <BoardEditButton propsBoard={board} />;
    }
  };

  const DeleteButton = () => {
    if (isLoggedInState && loginMemberNameState === board.memberName) {
      return (
        <DeleteComponent
          data={{
            requestURL: `${boardsUrl}/${board.id}`,
            title: "글 삭제",
            id: board.id,
          }}
          afterEach={goBoards}
        />
      );
    }
  };

  return (
    <Container style={{ maxWidth: "560px" }}>
      <Card className="border-0">
        <Card.Body>
          <Card.Title className="mb-3">
            <h1 id="title">{board.title}</h1>
          </Card.Title>

          <Card.Subtitle className="mb-2">
            <span className="me-4" id="memberName">
              {board.memberName}
            </span>
            <small className="text-muted" id="createDate">
              Create {board.createDate}
            </small>
            <small className="text-muted" id="modifyDate">
              Modify {board.modifyDate}
            </small>
          </Card.Subtitle>

          <hr />

          <div>
            <p id="content">{board.content}</p>
          </div>

          <Stack direction="horizontal" gap={3}>
            <EditButton />
            <DeleteButton />
          </Stack>

          <hr />

          <ReplyList />
        </Card.Body>
      </Card>
    </Container>
  );
}
