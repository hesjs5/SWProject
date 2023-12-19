import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { customAuthAndContentAxios } from "../../common/CustomAxiosUtils";
import { useSelector } from "react-redux";
import { isAdmin, isOwner } from "../../common/utils";

export default function DeleteButtonComponent(props) {
  const isLoggedInState = useSelector((state) => state.isLoggedIn);
  const loginMemberIDState = useSelector((state) => state.memberID);
  const roleState = useSelector((state) => state.role);

  const deleteRequest = async () => {
    await customAuthAndContentAxios
      .delete(`${props.data.requestURL}`)
      .then((response) => {
        console.log("delete response = ", response);
        props.afterEach(props.data.id);
      })
      .catch((error) => {
        console.log("delete response error = ", error);
        alert(error.response.data.message);
      })
      .finally(() => {
        closeModal();
      });
  };

  const [modalState, setModalState] = useState(false);
  const closeModal = () => setModalState(false);
  const showModal = () => setModalState(true);

  const ButtonComponent = () => {
    if (
      isOwner(loginMemberIDState, props.data.memberID) ||
      isAdmin(roleState)
    ) {
      return (
        <Button
          className="btn-sm text-decoration-none text-danger"
          variant="link"
          onClick={showModal}
        >
          삭제
        </Button>
      );
    }
  };

  return (
    <div>
      <ButtonComponent />

      <Modal show={modalState} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woo-hoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            취소
          </Button>
          <Button variant="danger" onClick={deleteRequest}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
