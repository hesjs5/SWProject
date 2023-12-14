import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Paging.css";
import { customAxios } from "../../common/CustomAxiosUtils";
import { boardsUrl } from "../../common/URL";

export default function BoardList() {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAndSetBoards = async () => {
      await customAxios
        .get(boardsUrl, {
          params: {
            page: page - 1,
            size: 10,
          },
        }) // JSON-Server 에게 students data 요청
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setBoards((prevState) => {
            return prevState.concat(data.postsResponse);
          });
        });
    };

    fetchAndSetBoards();
  }, [page, setPage]); // 처음 한번만 실행 됨

  const navigate = useNavigate();
  const goBoardCreate = () => {
    navigate(`${boardsUrl}/create`);
  };

  const loadMore = async () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary float-end" onClick={goBoardCreate}>
            글 등록
          </button>
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>생성일</th>
              <th>수정일</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board) => (
              <tr key={board.id}>
                <td>{board.id} </td>
                <td>
                  <Link to={"/boards/" + board.id}>{board.title}</Link>
                </td>
                <td>{board.createDate} </td>
                <td>{board.modifyDate} </td>
                <td>{board.memberName} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn btn-dark mb-3" onClick={loadMore}>
        LOAD MORE
      </button>
    </div>
  );
}
