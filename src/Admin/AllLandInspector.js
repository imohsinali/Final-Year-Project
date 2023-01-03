import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState ,useEffect} from "react";
import { TransactionContext } from "../StateMangement/Admin"
import data from "../Data/adminData";
import { useContext } from "react";
import { filter } from "@chakra-ui/react";
  // const [data,setData]=useState([])
export default function AllLandInspector() {
  const {  contract } = useContext(TransactionContext); 
  const [allInspector, setMemos] = useState([]);

  useEffect(() => {
    const viewInspector = async () => {
      const inspector = await contract.ReturnAllLandIncpectorList();
      const structuredTransactions = inspector.map((transaction) => ({
        _addr:transaction._addr,
        name: transaction.name,
        age: parseInt(transaction.age._hex),
        city: transaction.city,
      }));
      setMemos(structuredTransactions);
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
  const currentPosts = allInspector.slice(indexOfFirstPost, indexOfLastPost);

  const remove =async (id) => {
    // const filteredPeople = data.filter((item) => item.id !== id);
console.log(id)
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
             <tr key={data._addr} className="table-data" > 
              <td>
                {index}
              </td>
              <td>
                {data._addr}
              </td>
              <td>
                {data.city}
              </td>
              <td>
                {data.name}
              </td>
              <td>
              <button onClick={()=>remove(data._addr)}  className='btn remove-button'>remove</button>
                
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
