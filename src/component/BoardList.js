import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import {boardsDomain} from "./common";

export default function StudentsList() {
    const [boards, setBoards] = useState([]); 
 
     useEffect( ()=>  {  
        //  `${dataDomain}/boards` 로 비동기 요청  
         fetch(`${boardsDomain}`)  // JSON-Server 에게 students data 요청
             .then(res => {
                 return res.json();
             })
             .then(data => {
                     console.log(data);
                     setBoards(data.postsResponse);
                 }
             );
    }, []) ;  // 처음 한번만 실행 됨    

    return (
        <div className="container" style={{maxWidth: '1000px'}}>
            <div className="py-5 text-center">
                <h2>글 목록</h2>
            </div>

            <div className="row">
                <div className="col">
                    <button className="btn btn-primary float-end">
                        <Link to="/boards/create"  style={{textDecoration: "none", color: "white"}}>
                            글 등록
                        </Link>
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
        </div>
    );
}