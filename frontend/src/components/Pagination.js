import React from "react";
import { Button } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useSelector } from "react-redux";

const Pagination = ({ setCurrentUser, usersPerPage, currentUser }) => {
  const { users } = useSelector(state => state.fetchUsersReducer);
  const userNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    userNumbers.push(i);
  }

  const paginate = userNumbers => {
    setCurrentUser(userNumbers);
  };

  const next = () => {
    return currentUser < userNumbers.length && setCurrentUser(currentUser + 1);
  };

  const prev = () => {
    return currentUser > 1 && setCurrentUser(currentUser - 1);
  };

  /////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="pagination">
        <Button
          className={currentUser === 1 && "disabled"}
          onClick={() => prev()}
        >
          <NavigateBeforeIcon />
        </Button>
        {userNumbers.map(number => (
          <Button
            key={number}
            className={currentUser === number && "active"}
            onClick={() => paginate(number)}
          >
            {number}
          </Button>
        ))}
        <Button
          className={currentUser === userNumbers.length && "disabled"}
          onClick={() => next()}
        >
          <NavigateNextIcon />
        </Button>
      </div>
    </>
  );
};

export default Pagination;
