import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { customAuthAndContentAxios } from "../../common/CustomAxiosUtils";

export default function ReplyCreateForm() {
  const { id } = useParams();

  const [replyCreateRequest, setReplyCreateRequest] = useState({
    content: "",
  });

  const changeReplyCreateRequest = (e) => {
    const { name, value } = e.target;
    setReplyCreateRequest({
      ...replyCreateRequest,
      [name]: value,
    });
  };

  // todo replyList에 생성된 값 추가하기
  const createReply = async () => {
    await customAuthAndContentAxios
      .post(`/boards/${id}/replies`, replyCreateRequest)
      .then((response) => {
        console.log("createReply response = ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <textarea
        className="form-control"
        id="content"
        name="content"
        value={replyCreateRequest.content}
        onChange={changeReplyCreateRequest}
        rows="3"
      />

      <button className="btn btn-primary" onClick={createReply}>
        댓글
      </button>
    </div>
  );
}
