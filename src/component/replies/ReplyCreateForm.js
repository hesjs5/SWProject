import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { boardsURL } from "../../common/URL";
import axios from "axios";
import { useState } from "react";

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

  const createReply = async () => {
    const token = localStorage.getItem("token");
    const headersConfig = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    await axios
      .post(`${boardsURL}/${id}/replies`, replyCreateRequest, {
        headers: headersConfig,
      })
      .then((response) => {
        console.log("success");
        console.log(response);
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
