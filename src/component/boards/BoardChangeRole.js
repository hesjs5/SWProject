import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { boardsUrl } from "../../common/URL";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { customAuthAndContentAxios } from "../../common/CustomAxiosUtils";

export default function BoardChangeRole() {
  const roleState = useSelector((state) => state.role);
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");

  const [postRoleChangeRequest, setPostRoleChangeRequest] = useState({
    changeRole: "",
  });

  const changePostRoleChangeRequest = (e) => {
    const { value, name } = e.target;
    setPostRoleChangeRequest({
      ...postRoleChangeRequest,
      [name]: value,
    });
  };

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoleName(roleState);

    const newRoles = ["USER", "MANAGER", "ADMIN"].filter(
      (role) => role !== roleState,
    );
    console.log("newRoles = ", newRoles);
    setRoles(newRoles);

    setPostRoleChangeRequest({ changeRole: newRoles[0] });
  }, [roleState]);

  const create = async () => {
    await customAuthAndContentAxios
      .post(`${boardsUrl}/users/roles`, postRoleChangeRequest)
      .then((response) => {
        console.log("change role response = ", response);
        goBoards();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function goBoards() {
    navigate(`${boardsUrl}`);
  }

  return (
    <div className="container" style={{ maxWidth: "560px" }}>
      <div className="py-5 text-center">
        <h2>권한 변경 글 등록</h2>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label" htmlFor="changeRole">
          변경할 권한
        </label>
        <div className="col-sm-10">
          <Form.Select
            name="changeRole"
            id="changeRole"
            onChange={changePostRoleChangeRequest}
          >
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      <div className="d-grid gap-2">
        <button className="btn btn-primary" onClick={create}>
          등록
        </button>
        <button className="btn btn-dark" onClick={goBoards}>
          취소
        </button>
      </div>
    </div>
  );
}
