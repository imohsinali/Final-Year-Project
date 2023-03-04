import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../StateMangement/Context";

export default function RecivedRequest() {
  const { contract, currentAccount } = useContext(TransactionContext);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    const Lands = async () => {
      const allLand = await contract.myReceivedLandRequests();
      const myrequest = await contract.LandRequestMapping(2);
      console.log("ali", myrequest);

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

  console.log(users);
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
  const Accepted = async (id) => {
    console.log(id);
    await contract.acceptRequest(id, {
      gasLimit: 100000,
    });
  };

  const Rejected = async (id) => {
    console.log(id);
    await contract.rejectRequest(id, {
      gasLimit: 100000,
    });
  };
  return (
    <div className="table">
      <table>
        <thead>
          <tr className="table-heading">
            <th>#</th>
            <th>Land Id</th>
            <th>Buyer Address</th>
            <th>Status</th>
            <th>Payment Done</th>
            <th>Reject</th>
            <th>Accept</th>
          </tr>
        </thead>
        {currentPosts.map((data, index) => {
          return (
            <tbody>
              <tr key={data.id} className="table-data">
                <td>{index}</td>
                <td>{data.landId}</td>
                <td>{data.buyerId}</td>
                <td>{requeststatus[data.requestStatus]}</td>
                <td>{data.isPaymentDone ? "Paid" : "Not Paid"}</td>
                <td>
                  <Button
                    variant="outlined"
                    color="error"
                    fontSize={"10px"}
                    disabled={
                      data.requestStatus !== 0

                    }
                    onClick={() => Rejected(data.reqId)}
                  >
                    Reject
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outlined"
                    color="success"
                    fontSize={"10px"}
                    disabled={
                      data.requestStatus !== 0
                    }
                    onClick={() => Accepted(data.reqId)}
                  >
                    Accept
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
