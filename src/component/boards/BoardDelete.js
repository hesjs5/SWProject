import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, useParams} from "react-router-dom";
import {DELETE} from "../../common/HttpMethod";
import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {boardsURL} from "../../common/URL";

export default function BoardDelete() {

    const {id} = useParams();
    const navigate = useNavigate();

    async function deleteBoard() {
        const token = localStorage.getItem("token");
        await fetch(`${boardsURL}/${id}`, {
            method: DELETE,
            headers: {
                AUTHORIZATION: 'Bearer eyJyZWdEYXRlIjoxNzAxNjU5NTg3MDYyLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJOYW1lIjoiYiIsImV4cCI6MTcwNDI1MTU4NywibWVtYmVySUQiOiJiQGIuY29tIn0.b95p5hWUG7Ct-SkDlGIyAsLbjXTOMab0aLPOE2B6eVQ',
                'Authorization2': `Bearer ` + token,
            },
        })
            .then(response => {
                console.log("success");
                console.log(response);
                goBoards();
            })
            .catch(error => {
                console.log(error);
            });
        closeModal();
    }

    function goBoards() {
        navigate(`/boards`);
    }

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
                     <Modal.Title>글 삭제</Modal.Title>
                 </Modal.Header>
                <Modal.Body>
                    Woo-hoo, you're reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        취소
                    </Button>
                    <Button variant="danger" onClick={deleteBoard}>
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}