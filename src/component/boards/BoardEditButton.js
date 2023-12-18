import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { boardsUrl } from "../../common/URL";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { isOwner } from "../../common/utils";

export default function BoardEditButton({ propsBoard }) {
  const navigate = useNavigate();
  const isLoggedInState = useSelector((state) => state.isLoggedIn);
  const loginMemberIDState = useSelector((state) => state.memberID);
  const roleState = useSelector((state) => state.role);

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
    setBoard(propsBoard);
  }, [setBoard, propsBoard]);

  const goEditPage = () => {
    navigate(`${boardsUrl}/${board.id}/edit`, {
      state: {
        title: `${board.title}`,
        content: `${board.content}`,
      },
    });
  };

  const EditButtonComponent = () => {
    if (isOwner(board.memberID, loginMemberIDState)) {
      return (
        <Button
          className="btn-sm text-decoration-none text-success"
          variant="link"
          onClick={goEditPage}
        >
          수정
        </Button>
      );
    }
  };

  return <EditButtonComponent />;
}
