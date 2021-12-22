import React from "react";
import Container from "../../components/Home/Container.js";

function HomeScreen({ movies }) {
  return (
    <div>
      <Container movies={movies} />
    </div>
  );
}

export default HomeScreen;
