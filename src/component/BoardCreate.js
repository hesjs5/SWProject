import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {boardsDomain} from "./common";

export default function BoardCreate() {

    const navigate = useNavigate();

    async function create() {
        const postCreateRequest = {
            title: document.getElementById("title").value,
            content: document.getElementById("content").value
        };
        const token = localStorage.getItem("token");
        await fetch(`${boardsDomain}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer eyJyZWdEYXRlIjoxNzAxNjU5NTg3MDYyLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJOYW1lIjoiYiIsImV4cCI6MTcwNDI1MTU4NywibWVtYmVySUQiOiJiQGIuY29tIn0.b95p5hWUG7Ct-SkDlGIyAsLbjXTOMab0aLPOE2B6eVQ',
                'Authorization2': `Bearer ` + token,
            },
            body: JSON.stringify(postCreateRequest),
        })
            .then(response => {
                console.log("success");
                console.log(response);
                goBoards();
            })
            .catch(error => {
                console.log(error);
            });
    }


    function goBoards() {
        navigate("/boards");
    }

    return (
        <div className="container" style={{maxWidth: '560px'}}>
            <div className="py-5 text-center">
                <h2>글 등록</h2>
            </div>

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="title">제목</label>
                <div className="col-sm-10">
                    <input className="form-control" id="title" name="title" placeholder="제목을 입력해주세요."
                           type="text"></input>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="content">내용</label>
                <div className="col-sm-10">
                <textarea className="form-control" id="content" name="content" placeholder="내용을 입력해주세요."
                          rows="10"></textarea>
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