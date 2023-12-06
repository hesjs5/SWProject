import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {boardsDomain} from "./common";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BoardDetail( ) {
    const [board, setBoard] = useState({
        // "board_no": 1,
        // "title": null,
        // "text": null,
        // "mem_id": null,
        // "count" :0
    });

    const [replies, setReplies] = useState([]);
    const [paging, setPaging] = useState({
        totalPages: 0,
        totalElements: 0,
        pageNumber: 0,
        pageSize: 0
    });
    const [currentPage, setCurrentPage] = useState(0);
    const pageNumbers = [];
    for (let i = 0; i < paging.totalPages; i++) {
        pageNumbers.push(i);
    }

    const {id} = useParams();

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

    useEffect(() => {
        fetch(`${boardsDomain}/${id}/replies`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                setReplies(data.repliesResponse);
                setPaging((prevState) => {
                    return {...prevState,
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        pageNumber: data.pageNumber,
                        pageSize: data.pageSize
                    }
                });
            })
    }, [id]);

    function getRepliesByPaging(pageNumber) {
        setCurrentPage(pageNumber);

        fetch(`${boardsDomain}/${id}/replies?page=${pageNumber}&size=10`)  // JSON-Server 에게 students data 요청
            .then(res => {
                return res.json();
            })
            .then(data => {
                    console.log(data);
                    setReplies(data.repliesResponse);
                    setPaging((prevState) => {
                        return {...prevState,
                            totalPages: data.totalPages,
                            totalElements: data.totalElements,
                            pageNumber: data.pageNumber,
                            pageSize: data.pageSize
                        }
                    });
                }
            );
    }

    function goLogin() {
        console.log("goLogin");
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
                        <span className="me-4" id="memberName">{board.title}</span>
                        <small className="text-muted" id="createDate">Create {board.createDate}</small>
                        <small className="text-muted" id="modifyDate">Modify {board.modifyDate}</small>
                        <div className="float-end">
                            <button className="btn btn-warning btn-sm" type="button">수정</button>
                            <button className="btn btn-danger btn-sm" type="button">삭제</button>
                        </div>
                    </div>

                    <hr/>

                    <div>
                        <p id="content">{board.content}</p>
                    </div>

                    <hr/>

                    <div>
                        <p className="d-inline-flex gap-1">
                            <button aria-controls="replies" aria-expanded="false" className="btn btn-primary"
                                    data-bs-target="#replies" data-bs-toggle="collapse" type="button">
                                댓글
                            </button>
                        </p>
                        <div className="" id="replies">
                            <div >
                                {
                                    replies.map((reply) => (
                                            <div className="card card-body mb-2" key={reply.id}>
                                                <div className="card-title">
                                                    <span>{reply.memberName}</span>
                                                </div>
                                                <div className="card-text">
                                                    <span>{reply.content}</span>
                                                </div>
                                                <div className="card-subtitle">
                                                    <small className="text-muted">{reply.createDate}</small>
                                                </div>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                            <div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <button className="page-link" aria-label="Previous">
                                                <span aria-hidden="true">
                                                    &laquo;
                                                </span>
                                            </button>
                                        </li>

                                        {
                                            pageNumbers.map((number) => (
                                                <li className={`page-item ${number === currentPage ? 'active' : ''}`}
                                                    key={number}>
                                                    <button className="page-link"
                                                            onClick={() => getRepliesByPaging(number)}>
                                                        {number + 1}
                                                    </button>
                                                </li>
                                            ))
                                        }

                                        <li className="page-item">
                                            <button className="page-link" aria-label="Next">
                                                <span aria-hidden="true">
                                                    &raquo;
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div>
                                <label htmlFor="createReply">댓글 쓰기</label>
                                <div>
                                    <textarea className="form-control" id="createReply" rows="3"></textarea>
                                </div>
                                <div>
                                    <textarea className="form-control haveToLogin" rows="3"
                                              defaultValue="댓글을 작성하려면 로그인 해주세요" readOnly onClick={goLogin}>

                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}