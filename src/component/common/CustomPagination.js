import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
import "../../css/Paging.css";

export default function CustomPagination(props) {
  const clickPage = async (pageNumber) => {
    props.setPage(pageNumber);
    props.setSize(10);
  };

  return (
    <Pagination
      activePage={parseInt(props.page)}
      itemsCountPerPage={parseInt(props.size)}
      totalItemsCount={parseInt(props.totalElements)}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={(number) => clickPage(number)}
    />
  );
}
