import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { boardsUrl } from "../../common/URL";
import { Button } from "react-bootstrap";

export default function BoardEditButton({ propsBoard }) {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    id: 1,
    title: "",
    content: "",
    memberName: "",
    createDate: "",
    modifyDate: "",
  });

  useEffect(() => {
    setBoard(propsBoard);
  }, []);

  function goEditPage() {
    navigate(`${boardsUrl}/${board.id}/edit`, {
      state: {
        title: `${board.title}`,
        content: `${board.content}`,
      },
    });
  }

  const EditButtonComponent = () => {
    return (
      <Button className="btn-sm" variant="warning" onClick={goEditPage}>
        수정
      </Button>
    );
  };

  return <EditButtonComponent />;
}
