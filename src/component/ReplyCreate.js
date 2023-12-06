import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {LoginContext} from "../App";
import {boardsDomain} from "./common";

export default function ReplyCreate() {

    const {id} = useParams();
    const contextValue = useContext(LoginContext);

    async function createReply() {
        const replyCreateRequest = {
            content: document.getElementById("replyContent").value,
        };
        console.log(replyCreateRequest);
        console.log(document.getElementById("replyContent"))
        const token = localStorage.getItem("token");
        await fetch(`${boardsDomain}/${id}/replies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer eyJyZWdEYXRlIjoxNzAxODQ3ODgxOTA3LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJOYW1lIjoiYiIsImV4cCI6MTcwNDQzOTg4MSwibWVtYmVySUQiOiJiQGIuY29tIn0.PQD-3fOC6g9uk6SEWAZnl9_JcV4oK0jswvnl1jwg1SY',
                'Authorization2': `Bearer ` + token,
            },
            body: JSON.stringify(replyCreateRequest),
        })
            .then(response => {
                console.log("success");
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function isNotLoggedIn() {
        return !contextValue.isLoggedIn;
    }

    function goLogin() {
        console.log("goLogin");
    }

    function Item() {
        if (isNotLoggedIn()) {
            return (
                <div>
                    <textarea className="form-control" rows="3" defaultValue="댓글을 작성하려면 로그인 해주세요" disabled
                              onClick={goLogin}/>
                </div>
            );
        }

        return (
            <div>
                <textarea className="form-control" id="replyContent" rows="3"/>

                <button className="btn btn-primary" onClick={createReply}>
                    댓글
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{maxWidth: '1000px'}}>
            <label htmlFor="replyContent">댓글 작성</label>
            <Item/>
        </div>
    );
}