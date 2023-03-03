import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../StateMangement/Context";

export default function Verifyland() {
  const { contract } = useContext(TransactionContext);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const Lands = async () => {
        const allLand = await contract.ReturnAllLandList();
        console.log(allLand);
                const users = await Promise.all(
                  allLand.slice(1).map(async (landId) => {
                    const {
                      ownerAddress,
                      landAddress,
                      physicalSurveyNumber,
                      document,
                      isLandVerified,
                    } = await contract.lands(landId);
                    return {
                      ownerAddress,
                      landAddress,
                      physicalSurveyNumber,
                      document,
                      isLandVerified,
                      // age: parseInt(age._hex),
                    };
                  })
                );


                
                 setUsers(users);

      };


    contract && Lands();
  }, []);
  console.log(users);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const verify = async (id) => {
     const allLand = await contract.ReturnAllLandList();
     console.log(id,allLand)

    const transaction = await contract.verifyLand(id, {
      gasLimit: 20000,
    });
    await transaction.wait();

    console.log("Transaction is done");
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr className="table-heading">
            <th>#</th>
            <th>Owner address</th>
            <th>Area</th>
            <th>ServyNo</th>
            <th>Documents</th>
            <th>Verify</th>
          </tr>
        </thead>
        {currentPosts.map((data, index) => {
          return (
            <tbody>
              <tr key={data.id} className="table-data">
                <td>{index}</td>
                <td>{data.ownerAddress}</td>
                <td>{data.landAddress}</td>
                <td>{data.physicalSurveyNumber}</td>
                <td>
                  <button>
                    <a
                      href={`https://gateway.pinata.cloud/ipfs/${data.document.substring(
                        6
                      )}`}
                    >
                    view Document</a>
                  </button>
                </td>
                <td>
                  {data.isLandVerified ? (
                    <button disabled className={"sucess-btn btn"}>
                      Verified{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => verify(index + 1)}
                      className={"btn verify-button"}
                    >
                      verify{" "}
                    </button>
                  )}
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
