import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../StateMangement/Context";

export default function MyRequest() {
  const { contract, currentAccount } = useContext(TransactionContext);
  const [users, setUsers] = useState([]);
  const [status,setStatus]=useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

useEffect(() => {
  const Lands = async () => {
    const allLand = await contract.mySentLandRequests();
    const users = await Promise.all(
      allLand.map(async (id) => {
        const {
          sellerId,
          buyerId,
          landId,
          reqId,
          requestStatus,
          isPaymentDone,
          landPrice,
        } = await contract.LandRequestMapping(id);
        return {
          sellerId,
          buyerId,
          landId: parseInt(landId._hex),
          reqId: parseInt(reqId._hex),
          requestStatus,
          isPaymentDone,
        };
      })
    );

    const getStatus = async (landId) => {
      const status = await contract.requesteStatus(landId);
      return status;
    };

    const usersWithStatus = await Promise.all(
      users.map(async (user) => {
        const status = await getStatus(user.landId);
        return {
          ...user,
          status,
        };
      })
    );

    setUsers(usersWithStatus);
  };

  contract && Lands();
}, []);

 console.log(users)
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  
const requeststatus = {
  0: "pending",
  1: "accepted",
  2: "rejected",
  3: "paymentdone",
  4: "completed",
};
const MakeAPayment=async(id)=>{
    await contract.makePayment(id);

}
  return (
    <div className="table">
      <table>
        <thead>
          <tr className="table-heading">
            <th>#</th>
            <th>Land Id</th>
            <th>Land Owner Address</th>
            <th>Status</th>
            <th>Make a Payment</th>
          </tr>
        </thead>
        {currentPosts.map((data, index) => {
          return (
            <tbody>
              <tr key={data.id} className="table-data">
                <td>{index}</td>
                <td>{data.landId}</td>
                <td>{data.sellerId}</td>
                <td>{requeststatus[data.requestStatus]}</td>
                <td>
                  <Button
                    variant="contained"
                    color="success"
                    fontSize={"10px"}
                    disabled={
                      data.requestStatus !== 1 
                    }
                    onClick={() => MakeAPayment(data.reqId)}
                  >
                    Make a Payment
                  </Button>
                </td>
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
