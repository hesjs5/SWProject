import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { boardsUrl } from "../../common/URL";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function BoardEditButton({ propsBoard }) {
  const navigate = useNavigate();
  const isLoggedInState = useSelector((state) => state.isLoggedIn);
  const loginMemberIDState = useSelector((state) => state.memberID);

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

  function goEditPage() {
    navigate(`${boardsUrl}/${board.id}/edit`, {
      state: {
        title: `${board.title}`,
        content: `${board.content}`,
      },
    });
  }

  const EditButtonComponent = () => {
    if (isLoggedInState && board.memberID === loginMemberIDState) {
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
