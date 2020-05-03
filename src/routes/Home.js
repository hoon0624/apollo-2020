import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIES = gql`
  {
    movies(rating: 8.6, limit: 40) {
      id
      medium_cover_image
      # need to tell graphql it is from frontend
      isLiked @client
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #0f2027, #203a43, #2c5364);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 80%;
  position: relative;
  top: -50px;
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  console.log(error);
  return (
    <Container>
      <Header>
        <Title>Apollo Movie App 2020</Title>
        <Subtitle>Learning GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      {!loading && data.movies && (
        <Movies>
          {data.movies.reverse().map((m) => (
            <Movie
              key={m.id}
              id={m.id}
              isLiked={m.isLiked}
              bg={m.medium_cover_image}
            />
          ))}
        </Movies>
      )}
    </Container>
  );
};
