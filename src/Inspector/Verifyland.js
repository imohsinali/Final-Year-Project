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
      const iland = await contract.lands(3);
      console.log(iland);
      const users = await Promise.all(
        allLand.map(async (landid) => {
          const {
            ownerAddress,
            landAddress,
            physicalSurveyNumber,
            document,
            isLandVerified,
            id,
            landPrice,
          } = await contract.lands(landid);
          return {
            ownerAddress,
            landAddress,
            physicalSurveyNumber,
            document,
            isLandVerified,
            landId: parseInt(id._hex),
            landPrice: parseInt(landPrice._hex),
          };
        })
      );

      setUsers(users);
    };

    contract && Lands();
  }, [contract]);
  console.log(users);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const VerifyLand = async (id) => {
    const transaction = await contract.verifyLand(id, {
      gasLimit: 40000,
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
            <th>Price</th>
            <th>ServyNo</th>
            <th>Document</th>
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
                <td>{data.landPrice}</td>

                <td>{data.physicalSurveyNumber}</td>
                <td>
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${data.document.substring(
                      6
                    )}`}
                  >
                    Veiw Documnet
                  </a>
                </td>
                <td>
                  {data.isLandVerified ? (
                    <button disabled className={"sucess-btn btn"}>
                      Verified{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => VerifyLand(data.id)}
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
