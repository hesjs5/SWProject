import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

export default function BoardCreate( ) {

    async function create() {
        const postCreateRequest = {
            title: document.getElementById("title").value,
            content: document.getElementById("content").value
        };
        const token = localStorage.getItem("token");
        await fetch("http://localhost:8080/boards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiQGIuY29tIiwiZXhwIjoxNzAwNzI4NjAzLCJpZCI6ImJAYi5jb20iLCJ1c2VybmFtZSI6ImIifQ.BUHnkr0ZkjcJzZnLy_CDaW6R9CfyOMA1lJgf5XeUrMg826ex52pYxr7W7AasuUf0frNVlLfMJX7MCAV8Rrz8gw',
                'Authorization2': `Bearer ` + token,
            },
            body: JSON.stringify(postCreateRequest),
        })
            .then(response => {
                console.log("success");
                alert("생성됐습니다.");
                // location.replace('/boards');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="container" style={{maxWidth: '560px'}}>
            <div className="py-5 text-center">
                <h2>글 생성</h2>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label" htmlFor="title">제목</label>
                <div className="col-sm-10">
                    <input className="form-control" id="title" name="title" placeholder="제목을 입력해주세요."
                           type="text"></input>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label" htmlFor="content">내용</label>
                <div className="col-sm-10">
                    <textarea className="form-control" id="content" name="content" placeholder="내용을 입력해주세요."
                              rows="10"></textarea>
                </div>
            </div>

            <button className="btn btn-primary" onClick={create}>생성</button>
            <button className="btn btn-dark">
                <Link to="/boards" style={{textDecoration: "none", color: "white"}}>
                    취소
                </Link>
            </button>
        </div>
    );
}