

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./card.styles.css";

export default function OutlinedCard({ projectId, taskId, name }) {
  const card = () => {
    return (
      <>
        <CardContent>
          <Typography className="name" variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <div className="button-container">
          <Button variant="contained" size="small">
              Mark Complete
            </Button>
            <Button variant="contained" size="small">
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
