import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../StateMangement/Context";

export default function MyRequest() {
  const { contract, currentAccount } = useContext(TransactionContext);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

useEffect(() => {
  const Lands = async () => {
    const allLand = await contract.mySentLandRequests();
    const landid = await contract.LandRequestMapping(1);
    console.log('jaskjas', landid)
    const myrequest = await contract.lands(2);
    console.log('ali',myrequest);
    const users = await Promise.all(
      allLand.map(async (id) => {
        const {
          sellerId,
          buyerId,
          landId,
          reqId,
          requestStatus,
          isPaymentDone,
        } = await contract.LandRequestMapping(id);
        return {
          sellerId,
          buyerId,
          landId: parseInt(landId._hex),
          reqId: parseInt(reqId._hex),
          requestStatus,
          isPaymentDone,
          // id:parseInt(id._hex),
          //   isPaymentDone,
          // age: parseInt(age._hex),
        };
      })
    );

    setUsers(users);
  };

  contract && Lands();
}, []);

 console.log(users)
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  

  return (
    <div className="table">
      <table>
        <thead>
          <tr className="table-heading">
            <th>#</th>
            <th>Land Id</th>
            <th>Land Owner Address</th>
            <th>Status</th>
            <th>Price</th>
            <th>Make a Payment</th>
          </tr>
        </thead>
        {currentPosts.map((data, index) => {
          return (
            <tbody>
              <tr key={data.id} className="table-data">
                <td>{index}</td>
                <td>{data.id}</td>
                <td>{data.ownerAddress}</td>
                <td></td>
                <td>{data.landPrice}</td>
                <td></td>
              </tr>
            </tbody>
          );
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
