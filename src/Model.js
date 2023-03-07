import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MetaMask from './MetaMask'
import { useContext } from "react";
import { TransactionContext } from "./StateMangement/Context";

export default function Model({path}) {

const { isModalVisible, setIsModalVisible } = useContext(TransactionContext);

  return (
    <Dialog open={isModalVisible} onClose={() => setIsModalVisible(false)}>
      <DialogContent>
        <MetaMask path={path}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
