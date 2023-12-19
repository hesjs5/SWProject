import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReplyCreate from "./ReplyCreate";
import ReplyDetail from "./ReplyDetail";
import { customAxios } from "../../common/CustomAxiosUtils";
import { boardsUrl } from "../../common/Constant";
import CustomPagination from "../common/CustomPagination";

export default function ReplyList() {
  const { id } = useParams();
  const [replies, setReplies] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchAndSetReplies = async () => {
      await customAxios
        .get(`${boardsUrl}/${id}/replies`, {
          params: {
            page: page - 1,
            size: size,
          },
        }) // JSON-Server 에게 students data 요청
        .then((response) => response.data)
        .then((data) => {
          console.log("fetch replies response = ", data);
          setReplies(data.repliesResponse);
          setTotalElements(data.totalElements);
        })
        .catch((error) => {
          console.log("fetch and set replies response error = ", error);
          alert(error.response.data.message);
        });
    };

    fetchAndSetReplies();
  }, [id, page, setPage]);

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

        <CustomPagination
          page={page}
          setPage={setPage}
          totalElements={totalElements}
          setReplies={setReplies}
          size={size}
          setSize={setSize}
        />

        <ReplyCreate createReply={createReply} />
      </div>
    </div>
  );
}
