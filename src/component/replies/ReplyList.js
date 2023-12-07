import {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import ReplyCreate from "./ReplyCreate";
import {boardsURL} from "../../common/URL";
import ReplyDetail from "./ReplyDetail";
import Pagination from "react-js-pagination";

export default function ReplyList() {
    const [searchParams, setSearchParams] = useSearchParams();

    const {id} = useParams();
    const [replies, setReplies] = useState([]);
    const [paging, setPaging] = useState({
        totalPages: 0,
        totalElements: 0,
        pageNumber: 0,
        pageSize: 0
    });

    useEffect(() => {
        if (searchParams.get("page") === null) {
            searchParams.set("page", "1");
            setSearchParams(searchParams);
        }
        if (searchParams.get("size") === null) {
            searchParams.set("size", "10");
            setSearchParams(searchParams);
        }

        fetch(`${boardsURL}/${id}/replies?page=${searchParams.get("page") - 1}&size=${searchParams.get("size")}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                setReplies(data.repliesResponse);
                setPaging((prevState) => {
                    return {
                        ...prevState,
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        pageNumber: data.pageNumber,
                        pageSize: data.pageSize
                    }
                });
            });
    }, [id]);

    function getRepliesByPaging(pageNumber) {
        searchParams.set("page", String(pageNumber));
        setSearchParams(searchParams);

        searchParams.set("size", "10");
        setSearchParams(searchParams);

        fetch(`${boardsURL}/${id}/replies?page=${searchParams.get("page") - 1}&size=${searchParams.get("size")}`)  // JSON-Server 에게 students data 요청
            .then(res => {
                return res.json();
            })
            .then(data => {
                    console.log(data);
                    setReplies(data.repliesResponse);
                    setPaging((prevState) => {
                        return {
                            ...prevState,
                            totalPages: data.totalPages,
                            totalElements: data.totalElements,
                            pageNumber: data.pageNumber,
                            pageSize: data.pageSize
                        }
                    });
                }
            );
    }

    const deleteReply = replyId => {
        const newReplies = replies.filter(reply => reply.id !== replyId);
        setReplies(newReplies);
    }

    return (
        <div className="container" style={{maxWidth: '1000px'}}>
            <div className="" id="replies">
                <div>
                    {
                        replies.map((reply) => (
                                <ReplyDetail key={reply.id} reply={reply} deleteReply={deleteReply}/>
                            )
                        )
                    }
                </div>

                <Pagination
                    activePage={parseInt(searchParams.get("page"))}
                    itemsCountPerPage={parseInt(searchParams.get("size"))}
                    totalItemsCount={paging.totalElements}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={getRepliesByPaging}
                />

                <ReplyCreate/>
            </div>
        </div>
    );
}