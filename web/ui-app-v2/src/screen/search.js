import React from "react";
import renderGroups from "./render-groups";

const Search = ({ groups }) => {
  return (
    <div className="row">
      {renderGroups(groups)}
      <button>Search</button>
    </div>
  );
};

export default Search;
