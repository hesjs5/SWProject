import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

export default function DeleteComponent(props) {
  const deleteRequest = async () => {
    const token = localStorage.getItem("token");
    const headersConfig = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    await axios
      .delete(`${props.data.requestURL}`, {
        headers: headersConfig,
      })
      .then((response) => {
        console.log("success");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    props.afterEach(props.data.id);
    closeModal();
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
