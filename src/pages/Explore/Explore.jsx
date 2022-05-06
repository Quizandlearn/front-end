import React from "react";
import useAuth from "../../hooks/useAuth";

const Explore = () => {
  const { user } = useAuth();
  console.log(user);
  // contient userId (du back)

  return <div>Page explorer !</div>;
};

export default Explore;
