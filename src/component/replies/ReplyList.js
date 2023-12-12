import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ReplyCreate from "./ReplyCreate";
import { boardsURL } from "../../common/URL";
import ReplyDetail from "./ReplyDetail";
import Pagination from "react-js-pagination";
import axios from "axios";

export default function ReplyList() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    size: 10,
  });

  const { id } = useParams();
  const [replies, setReplies] = useState([]);
  const [paging, setPaging] = useState({
    totalPages: 0,
    totalElements: 0,
    pageNumber: 0,
    pageSize: 0,
  });

  useEffect(() => {
    setSearchParams(searchParams);

    fetchAndSetReplies();
  }, [id]);

  const fetchAndSetReplies = useCallback(async () => {
    await axios
      .get(`${boardsURL}/${id}/replies`, {
        params: {
          page: searchParams.get("page") - 1,
          size: searchParams.get("size"),
        },
      }) // JSON-Server 에게 students data 요청
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setReplies(data.repliesResponse);
        setPaging((prevState) => {
          return {
            ...prevState,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
          };
        });
      });
  }, [id, searchParams]);

  const getRepliesByPaging = async (pageNumber) => {
    searchParams.set("page", pageNumber);
    searchParams.set("size", 10);
    setSearchParams(searchParams);

    await fetchAndSetReplies();
  };

  const deleteReply = (replyId) => {
    const newReplies = replies.filter((reply) => reply.id !== replyId);
    setReplies(newReplies);
  };

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <div className="" id="replies">
        <div>
          {replies.map((reply) => (
            <ReplyDetail
              key={reply.id}
              reply={reply}
              deleteReply={deleteReply}
            />
          ))}
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

        <ReplyCreate />
      </div>
    </div>
  );
}
