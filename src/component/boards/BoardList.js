import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../../css/Paging.css";
import { customAxios } from "../../common/CustomAxiosUtils";
import { boardsUrl } from "../../common/URL";
import Pagination from "react-bootstrap/Pagination";

export default function BoardList() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    size: 10,
  });
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(searchParams.get("page"));
  const [pages, setPages] = useState([]);

  // todo 뒤로가기 감지하기

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
          setBoards(data.postsResponse);

          let tempPages = [];
          for (let i = 1; i <= data.totalPages; i++) {
            tempPages.push(i);
          }
          setPages(tempPages);
        });
    };

    fetchAndSetBoards();
  }, [page, setPage]); // 처음 한번만 실행 됨

  const navigate = useNavigate();
  const goBoardCreate = () => {
    navigate(`${boardsUrl}/create`);
  };

  const editPage = (pageNumber) => {
    console.log("pageNumber = ", pageNumber);
    setPage(pageNumber);

    searchParams.set("page", pageNumber);
    searchParams.set("size", 10);
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    if (page === 1) {
      return;
    }
    console.log("page = ", page);
    setPage((prevState) => prevState - 1);
  };

  const nextPage = () => {
    if (page === pages.length) {
      return;
    }
    console.log("page = ", page);
    setPage((prevState) => prevState + 1);
  };

  const firstPage = () => {
    console.log("page = ", page);
    setPage(1);
  };

  const lastPage = () => {
    console.log("page = ", page);
    setPage(pages.length);
  };

  const getActive = (number) => {
    return number === Number(page);
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

      <div>{page}</div>

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

      <Pagination className="justify-content-center">
        <Pagination.First onClick={firstPage} />
        <Pagination.Prev onClick={prevPage} />
        {pages.map((number) => (
          <Pagination.Item
            key={number}
            active={getActive(number)}
            onClick={() => editPage(number)}
          >
            {number}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={nextPage} />
        <Pagination.Last onClick={lastPage} />
      </Pagination>
    </div>
  );
}
