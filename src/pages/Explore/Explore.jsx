import React from "react";
import useAuth from "../../hooks/useAuth";
/* eslint-disable no-console */

const Explore = () => {
  const { user } = useAuth();
  console.log(user);
  // contient userId (du back)

  return <div>Page explorer !</div>;
};

export default Explore;
