import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import {useDispatch,useSelector} from "react-redux"
import { Actionpage } from '../../redux/PaginationAction/PaginationAction';
const Paginations = ({pageData}:any) => {
  
   
      interface IRootState {
        paginate: {
            paginate:number
        };
      } 

  const {pageNumbers}:any=useSelector<IRootState>(state=>state.paginate)

  const dispatch=useDispatch()

  return (
    <div className="App">
    <Pagination
      currentPage={pageNumbers}
      itemsPerPage={10}
      onPageChange={(pageNumber) =>dispatch(Actionpage(pageNumber)) }
      totalItems={pageData}
      pageNeighbours={2}
    />
  </div>
  )
}

export default Paginations