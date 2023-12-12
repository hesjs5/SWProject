import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { customAuthAndContentAxios } from "../../common/CustomAxiosUtils";

export default function DeleteComponent(props) {
  const deleteRequest = async () => {
    await customAuthAndContentAxios
      .delete(`${props.data.requestURL}`)
      .then((response) => {
        console.log("delete response = ", response);
        props.afterEach(props.data.id);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        closeModal();
      });
  };

  const [modalState, setModalState] = useState(false);
  const closeModal = () => setModalState(false);
  const showModal = () => setModalState(true);

  return (
    <div className="d-grid">
      <Button className="btn-sm" variant="danger" onClick={showModal}>
        삭제
      </Button>

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
