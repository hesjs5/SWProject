import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {boardsURL} from "../../common/URL";

export default function StudentsList() {
    const [boards, setBoards] = useState([]);
    const [paging, setPaging] = useState({
        totalPages: 0,
        totalElements: 0,
        pageNumber: 0,
        pageSize: 0
    });
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        //  `${dataDomain}/boards` 로 비동기 요청
        fetch(`${boardsURL}`)  // JSON-Server 에게 students data 요청
            .then(res => {
                return res.json();
            })
            .then(data => {
                    console.log(data);
                    setBoards(data.postsResponse);
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
    }, []);  // 처음 한번만 실행 됨

    const pageNumbers = [];
    for (let i = 0; i < paging.totalPages; i++) {
        pageNumbers.push(i);
    }

    function getBoardsByPaging(pageNumber) {
        setCurrentPage(pageNumber);

        fetch(`${boardsURL}?page=${pageNumber}`)  // JSON-Server 에게 students data 요청
            .then(res => {
                return res.json();
            })
            .then(data => {
                    console.log(data);
                    setBoards(data.postsResponse);
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

    const navigate = useNavigate();
    function goBoardCreate() {
        navigate("/boards/create");
    }

    return (
        <div className="container" style={{maxWidth: '1000px'}}>
            <div className="py-5 text-center">
                <h2>글 목록</h2>
            </div>

            <div className="row">
                <div className="col">
                    <button className="btn btn-primary float-end" onClick={goBoardCreate}>
                        글 등록
                    </button>
                </div>
            </div>

            <hr className="my-4"/>

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
                    {
                        boards.map((board) => (
                                <tr key={board.id}>
                                    <td>{board.id} </td>
                                    <td><Link to={"/boards/" + board.id}>{board.title}</Link></td>
                                    <td>{board.createDate} </td>
                                    <td>{board.modifyDate} </td>
                                    <td>{board.memberName} </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
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
                                <li className={`page-item ${number === currentPage ? 'active' : ''}`} key={number}>
                                    <button className="page-link" onClick={() => getBoardsByPaging(number)}>
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
        </div>
    );
}