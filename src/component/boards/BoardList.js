import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { boardsURL } from "../../common/URL";
import Pagination from "react-js-pagination";
import "../../css/Paging.css";
import axios from "axios";

export default function BoardList() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    size: 10,
  });

  const [boards, setBoards] = useState([]);
  const [paging, setPaging] = useState({
    totalPages: 0,
    totalElements: 0,
    pageNumber: 0,
    pageSize: 0,
  });

  useEffect(() => {
    setSearchParams(searchParams);

    //  `${dataDomain}/boards` 로 비동기 요청
    fetchAndSetBoards();
  }, []); // 처음 한번만 실행 됨

  const fetchAndSetBoards = useCallback(async () => {
    await axios
      .get(`${boardsURL}`, {
        params: {
          page: searchParams.get("page") - 1,
          size: searchParams.get("size"),
        },
      }) // JSON-Server 에게 students data 요청
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setBoards(data.postsResponse);
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
  }, [searchParams]);

  const getBoardsByPaging = async (pageNumber) => {
    searchParams.set("page", pageNumber);
    searchParams.set("size", 10);
    setSearchParams(searchParams);

    await fetchAndSetBoards();
  };

  const navigate = useNavigate();

  function goBoardCreate() {
    navigate("/boards/create");
  }

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

      <Pagination
        activePage={parseInt(searchParams.get("page"))}
        itemsCountPerPage={parseInt(searchParams.get("size"))}
        totalItemsCount={paging.totalElements}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={getBoardsByPaging}
      />
    </div>
  );
}
