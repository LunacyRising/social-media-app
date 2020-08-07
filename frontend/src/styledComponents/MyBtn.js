import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const NavBtn = styled(Button)({
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
    textTransform: "uppercase",
    transition: "0.3s ease-in-out",
    marginRight: 7,
    overflow: "hidden",
    "&::after": {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      opacity: 0, 
      transform: "translateX(-100%)",
      pointerEvents: "none",
      border: "2px solid currentColor",
      transition: "0.3s ease-in-out",
      content: '""',
    },
    "&:hover":{
      color: "#8b70d2",
      backgroundColor: "transparent",
      "&::after": {
        transform: "translateX(0%)",
        opacity: 1
    }
  }
});

