import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState,useEffect,useContext } from "react";
import { TransactionContext } from "../StateMangement/Context"
import data from './data'

export default function VerifyUser() {
  const {  contract } = useContext(TransactionContext); 
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);
  
    
  
  
  
    useEffect(() => {
      const viewAllUser = async () => {
        const userAddresses = await contract.ReturnAllUserList();
        const users = await Promise.all(
          userAddresses.map(async (address) => {
            const {name,city,age,isUserVerified,cinc} = await contract.UserMapping(address)
            return { address, name,city,age:parseInt(age._hex),isUserVerified,cinc
            };
          })
        );
  
        setUsers(users);
      };
      contract && viewAllUser();
    }, [])
    console.log(users)
  
  const handleChange = (event, value) => {
    setCurrentPage(value);
  
  };
  const verify  = async (address) => {

    console.log(address)
    const transaction = await contract.verifyUser(address, { gasLimit: 1000000 });
    await transaction.wait();

    console.log("Transaction is done");

    }
  

  return (
    <div className="table">
      <table>
        <thead>
        <tr className="table-heading">
          <th>#</th>
          <th>Owner address</th>
          <th>Cnic</th>
          <th>Name</th>
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
                {data.address}
              </td>
              <td>
                {data.cinc}
              </td>
              <td>
                {data.name}
              </td>
              <td>
                {data.document}
              </td>
              <td>
                 {
                  data.isUserVerified?
                  (<button disabled  className={"sucess-btn btn"}>Verified </button>):
                  (
                    <button  onClick={()=>verify(data.address)} className={'btn verify-button'}>verify </button>

                  )

                 } 
          
                
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
