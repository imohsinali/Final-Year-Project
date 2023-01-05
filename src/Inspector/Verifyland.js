import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import data2 from './data2'
export default function Verifyland() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data2.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  // const dispatch=useDispatch()
  const handleChange = (event, value) => {
    setCurrentPage(value);
  
  };

  const remove = (id) => {
    // dispatch({ type: "REMOVE", id: id });
    // const filteredPeople = data2.filter((item) => item.id !== id);

    // setPosts(filteredPeople)
  };

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
                {data['Owner Address']}
              </td>
              <td>
                {data.cnic}
              </td>
              <td>
                {data.area}
              </td>
              <td>
                {data.document}
              </td>
              <td>
              <button onClick={()=>remove(data.id)}  className='btn verify-button'>verify</button>
                
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
