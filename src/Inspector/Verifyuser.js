import { DataTable } from "mantine-datatable";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function VerifyUser() {
  const dispatch=useDispatch()

  const data = useSelector((state) => state.userReducer.userProfile);
  const verified = useSelector((state) => state.userReducer.isVerified);

console.warn(verified)
  const data2=[data]
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data2.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handleChange = (event, value) => {
    setCurrentPage(value);
  
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", id: id });
    // const filteredPeople = data2.filter((item) => item.id !== id);

    // setPosts(filteredPeople)
  };

  const verify=()=>{
    dispatch(
      {
        type:"Verify"

      }
    )
  }

  // const totalPage = Math.ceil(data2.length / 10);
  return (
    <div className="table">
      <table>
        <thead>
        <tr className="table-heading">
          <th>#</th>
          <th>Owner address</th>
          <th>Cnic</th>
          <th>Area</th>
          <th>Documents</th>
          <th>Verify</th>


        </tr>
        </thead>
        {currentPosts.map((data,index)=>{
          return (
            <tbody >
             <tr key={data.id} className="table-data" > 
              <td>
                {index}
              </td>
              <td>
                {data.walletAdress}
              </td>
              <td>
                {data.cnic}
              </td>
              <td>
                {data.address}
              </td>
              <td>
                <input type={'file'}/>
              </td>
              <td>
              <button onClick={verify}   className={verified? "sucess-btn btn":'btn verify-button'}>{verified?'Verified':"verify"} </button>
                
              </td>
            </tr> 
            
            </tbody>
          )
        })}
       
      </table>

      <Stack spacing={2} className="Pagination">
        <Pagination
          count={1200}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
