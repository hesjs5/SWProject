import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { boardsUrl } from "../../common/URL";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function BoardCreateButton() {
  const navigate = useNavigate();
  const goBoardCreate = () => {
    navigate(`${boardsUrl}/create`);
  };

  const goBoardChangeRole = () => {
    navigate(`${boardsUrl}/users/roles`);
  };

  return (
    <div className="row">
      <div className="col">
        <DropdownButton
          className="float-end"
          id="dropdown-basic-button"
          title="글 작성"
        >
          <Dropdown.Item onClick={goBoardCreate}>일반 글 작성</Dropdown.Item>
          <Dropdown.Item onClick={goBoardChangeRole}>
            권한 변경 글 작성
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}
