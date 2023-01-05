import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState ,useEffect} from "react";
import { TransactionContext } from "../StateMangement/Admin"
import { useContext } from "react";
export default function AllLandInspector() {
  const {  contract } = useContext(TransactionContext); 
  const [inspectors, setInspectors] = useState([]);



  useEffect(() => {
    const viewInspector = async () => {
      const inspectorAddresses = await contract.ReturnAllLandIncpectorList();
      const inpsectors = await Promise.all(
        inspectorAddresses.map(async (address) => {
          const {name,city,age,designation} = await contract.InspectorMapping(address)
          return { address, name,city,age:parseInt(age._hex),designation
          };
        })
      );

      setInspectors(inpsectors);
    };
    contract && viewInspector();
  }, [contract])


  const handleChange = (event, value) => {
    setCurrentPage(value);
  
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = inspectors.slice(indexOfFirstPost, indexOfLastPost);
  const remove =async (id) => {
const transaction = await contract.removeLandInspector(id, { gasLimit: 10000000 });
    await transaction.wait();

    console.log("done");
  };

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
             <tr key={index} className="table-data" > 
              <td>
                {
                 index
                }
              </td>
              <td>
                {data.address}
              </td>
              <td>
              {data.name}

              </td>
              <td>
              {data.city}

              </td>
              <td>
              <button onClick={()=>remove(data.address)}  className='btn remove-button'>remove</button>
                
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
