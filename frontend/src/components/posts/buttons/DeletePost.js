import React  from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip, Box} from "@material-ui/core";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import DeletePostDialog from "../DeletePostDialog";


const DeletePost = ({ postId, title }) => {

    const useStyles = makeStyles(() => ({

      btn: {
        width: 30,
        height: 30,
        marginRight: 5
      }
    })); 
    
    const classes = useStyles();

    const { btn } = classes;

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (

        <Box>
            <Tooltip title="Delete!">
                <IconButton className={btn} onClick={() => handleClickOpen()}>
                  <DeleteTwoToneIcon/>
                </IconButton>
              </Tooltip>
              {<DeletePostDialog open={open} handleClose={handleClose} postId={postId} title={title}/>}
        </Box>
    );
};

export default DeletePost;
