import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { deleteProject } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./card.styles.css"



export default function OutlinedCard({ id, name }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext)

  const routeToProject = () => {
    navigate(`/project/${id}`);
  };
  
  const handleProjectDelete = async() => {
    await deleteProject(currentUser, id)
  }

  const card = () => {
    return (
      <>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <div className="button-container">
           <Button onClick={routeToProject} variant="contained" size="small">
              View Tasks
            </Button> 
            <Button onClick={handleProjectDelete} variant="contained" size="small">
              Delete Project
            </Button>
            
          </div>
        </CardActions>
      </>
    );
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card(id, name)}</Card>
    </Box>
  );
}
