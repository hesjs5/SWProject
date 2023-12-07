import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {boardsDomain} from "./common";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReplyList from "./ReplyList";
import {LoginContext} from "../App";
import BoardDelete from "./BoardDelete";

export default function BoardDetail( ) {
    const {id} = useParams();
    const navigate = useNavigate();
    const contextValue = useContext(LoginContext);

    const [board, setBoard] = useState({
        // "board_no": 1,
        // "title": null,
        // "text": null,
        // "mem_id": null,
        // "count" :0
    });

    useEffect(() => {
        //GET Method (default) //http://..:3000/boards?board_no=1
        fetch(`${boardsDomain}/${id}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                setBoard(data);
            });
    }, [id]);   // id가 바뀌면 실행

    function goEditPage() {
        navigate(`/boards/${id}/edit`, {
            state: {
                title: `${board.title}`,
                content: `${board.content}`,
            },
        })
    }

    function EditAndDeleteButtonComponent() {
        if (contextValue.isLoggedIn && contextValue.memberName === board.memberName) {
            return (
                <div className="d-grid gap-2">
                    <button className="btn btn-warning btn-sm" type="button" onClick={goEditPage}>수정</button>
                    <BoardDelete/>
                </div>
            );
        }
    }

    return (
        <div className="container" style={{maxWidth: '560px'}}>
            <div className="py-5 text-center">
                <h2>글 상세</h2>
            </div>

            <div className="card border-0">
                <div className="card-body">
                    <div className="card-title mb-3">
                        <h1 id="title">{board.title}</h1>
                    </div>

                    <div className="card-subtitle mb-2">
                        <span className="me-4" id="boardTitle">{board.title}</span>
                        <small className="text-muted" id="createDate">Create {board.createDate}</small>
                        <small className="text-muted" id="modifyDate">Modify {board.modifyDate}</small>
                    </div>

                    <hr/>

                    <div>
                        <p id="content">{board.content}</p>
                    </div>

                    <EditAndDeleteButtonComponent/>

                    <hr/>

                    <ReplyList></ReplyList>
                </div>
            </div>
        </div>
    );
}