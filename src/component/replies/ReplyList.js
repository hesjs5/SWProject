import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReplyCreate from "./ReplyCreate";
import ReplyDetail from "./ReplyDetail";
import Pagination from "react-js-pagination";
import { customAxios } from "../../common/CustomAxiosUtils";
import { boardsUrl } from "../../common/URL";

export default function ReplyList() {
  const { id } = useParams();
  const [replies, setReplies] = useState([]);
  const [paging, setPaging] = useState({
    totalPages: 0,
    totalElements: 0,
    pageNumber: 0,
    pageSize: 0,
  });

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  useEffect(() => {
    fetchAndSetReplies(page);
  }, [id]);

  const fetchAndSetReplies = useCallback(
    async (pageNumber) => {
      await customAxios
        .get(`${boardsUrl}/${id}/replies`, {
          params: {
            page: pageNumber - 1,
            size: size,
          },
        }) // JSON-Server 에게 students data 요청
        .then((response) => response.data)
        .then((data) => {
          console.log("fetch replies response = ", data);
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
    },
    [id],
  );

  const getRepliesByPaging = async (pageNumber) => {
    setPage(pageNumber);
    setSize(10);

    await fetchAndSetReplies(pageNumber);
  };

  const deleteReply = (replyId) => {
    const newReplies = replies.filter((reply) => reply.id !== replyId);
    setReplies(newReplies);
  };

  const createReply = (reply) => {
    const newReplies = replies.concat(reply);
    newReplies.sort((prev, current) => {
      return current.id - prev.id;
    });
    console.log("newReplies = ", newReplies);
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
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={paging.totalElements}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={getRepliesByPaging}
        />

        <ReplyCreate createReply={createReply} />
      </div>
    </div>
  );
}
