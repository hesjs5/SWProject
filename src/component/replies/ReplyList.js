import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ReplyCreate from "./ReplyCreate";
import {boardsURL} from "../../common/URL";
import ReplyDetail from "./ReplyDetail";

export default function ReplyList() {

    const {id} = useParams();
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

    useEffect(() => {
        fetch(`${boardsURL}/${id}/replies`)
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

        fetch(`${boardsURL}/${id}/replies?page=${pageNumber}&size=10`)  // JSON-Server 에게 students data 요청
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

    return (
        <div className="container" style={{maxWidth: '1000px'}}>
            <div className="" id="replies">
                <div>
                    {
                        replies.map((reply) => (
                                <ReplyDetail key={reply.id} reply={reply}/>
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

                <ReplyCreate/>
            </div>
        </div>
    );
}