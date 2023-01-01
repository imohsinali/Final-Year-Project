import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AllLandInspector() {
  const {basket} = useSelector((state) => state.adminData);
  console.log(basket)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = basket.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const dispatch=useDispatch()
  const handleChange = (event, value) => {
    setCurrentPage(value);
  
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", id: id });
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
          <th>Inspector Address</th>
          <th>Name</th>
          <th>City</th>
          <th>Remove</th>

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
                {data['Inspector Address']}
              </td>
              <td>
                {data.city}
              </td>
              <td>
                {data.name}
              </td>
              <td>
              <button onClick={()=>remove(data.id)}  className='btn remove-button'>remove</button>
                
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
