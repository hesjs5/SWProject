import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReplyList from "../replies/ReplyList";
import DeleteButtonComponent from "../common/DeleteButtonComponent";
import { customAxios } from "../../common/CustomAxiosUtils";
import { boardsUrl } from "../../common/URL";
import { Card, Container, Stack } from "react-bootstrap";
import BoardEditButton from "./BoardEditButton";

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    id: 1,
    title: "",
    content: "",
    memberName: "",
    memberID: "",
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
          // setBoard(data);
          setBoard(() => {
            return {
              id: data.id,
              title: data.title,
              content: data.content,
              memberName: data.memberName,
              memberID: data.memberID,
              createDate: new Date(data.createDate).toLocaleDateString(),
              modifyDate: new Date(data.modifyDate).toLocaleDateString(),
            };
          });
        });
    };

    fetchAndSetBoard();
  }, [id]); // id가 바뀌면 실행

  const goBoards = () => {
    navigate(`${boardsUrl}`);
  };

  return (
    <Container style={{ maxWidth: "560px" }}>
      <Card className="border-0">
        <Card.Body>
          <Card.Title className="mb-3">
            <h1 id="title">{board.title}</h1>
          </Card.Title>

          <Card.Subtitle className="mb-2 text-start">
            <span className="me-3" id="memberName">
              {board.memberName}
            </span>
            <small className="me-3 text-muted" id="createDate">
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

          <Stack direction="horizontal">
            <BoardEditButton propsBoard={board} />
            <DeleteButtonComponent
              data={{
                requestURL: `${boardsUrl}/${board.id}`,
                title: "글 삭제",
                id: board.id,
                memberID: board.memberID,
              }}
              afterEach={goBoards}
            />
          </Stack>

          <hr />

          <ReplyList />
        </Card.Body>
      </Card>
    </Container>
  );
}
