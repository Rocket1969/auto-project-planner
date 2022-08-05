import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./card.styles.css";
import { deleteProjectTask, toggleIsTaskComplete } from "../../utils/firebase/firebase.utils";

export default function OutlinedCard({ projectId, taskId, name, isComplete }) {
  const { currentUser } = useContext(UserContext)
  const card = () => {
    const handleTaskDelete = async () => {
      await deleteProjectTask(currentUser, projectId, taskId)
    }

    const handleIsCompleteToggle = async () => {
      console.log("called");
      await toggleIsTaskComplete(currentUser, projectId, taskId, isComplete);
    } 

    console.log(isComplete);

    return (
      <>
        <CardContent>
          <Typography className={isComplete ? "toggle-lineThrough" : null } variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <div className="button-container">
           {
            isComplete ? (
              <Button onClick={handleIsCompleteToggle} variant="contained" size="small">
              Mark Incomplete
            </Button>
            ) : (
               <Button onClick={handleIsCompleteToggle}  variant="contained" size="small">
              Mark Complete
            </Button>
            )
           }
         
            <Button onClick={handleTaskDelete} variant="contained" size="small">
              Delete Task
            </Button>
          </div>
        </CardActions>
      </>
    );
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card(taskId, name)}</Card>
    </Box>
  );
}
