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
      const allLand = await contract.ReturnAllLandList();
      const myrequest = await contract.LandRequestMapping(10);
      const allLandm = await contract.landsCount();
      console.log("ali 23", allLandm);

      const users = await Promise.all(
        [1,2,3,4,5,6,7,8,9,11,12].map(async (id) => {
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
     const documnt=async(landId)=>{
      const doc=await contract.lands(landId)
      return doc
     }
      const usersWithStatus = await Promise.all(
        users.map(async (user) => {
          const status = await getStatus(user.landId);
          const { document } = await documnt(user.landId);
          return {
            ...user,
            status,
            document,
          };
        })
      );
      console.log(usersWithStatus);
const filteredLands = usersWithStatus.filter(
  (land) => land.requestStatus === 3 || land.requestStatus===4
);


      setUsers(filteredLands);
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


  const TransferOwner = async (id,url) => {
    console.log(id);
    await contract.transferOwnership(id,url, {
      gasLimit: 200000,
    });
  };
  return (
    <div className="table">
      <table>
        <thead>
          <tr className="table-heading">
            <th>#</th>
            <th>Land Id</th>
            <th>Seller Address</th>
            <th>Buyer Address</th>
            <th>Status</th>
            <th>Tranfer</th>
          </tr>
        </thead>
        {currentPosts.map((data, index) => {
          return (
            <tbody>
              <tr key={data.id} className="table-data">
                <td>{index}</td>
                <td>{data.landId}</td>
                <td>{data.sellerId}</td>

                <td>{data.buyerId}</td>
                <td>{requeststatus[data.requestStatus]}</td>
                <td>
                  <Button
                    variant="outlined"
                    color="error"
                    fontSize={"10px"}
                    disabled={
                      data.requestStatus === 4
                    }
                    onClick={() => TransferOwner(data.reqId,'mohsin')}
                  >
                    Tranfer
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
