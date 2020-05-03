import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  # this first line is for apollo not the server
  # when the query has a parameter (args) you need to specify the name of the query for apollo
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_full
      isLiked @client
    }
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #0f2027, #203a43, #2c5364);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-botton: 10px;
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 28px;
`;

const Suggestions = styled.p`
  margin-top: 100px;
  fonrt-szie: 15px;
  list-style: none;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

export default () => {
  let { id } = useParams();
  id = parseInt(id);

  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });
  console.log(data);

  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading..."
            : `${data.movie.title} ${data.movie.isLiked ? "❤️" : ""}`}
        </Title>
        {!loading && data.movie && (
          <>
            <Subtitle>
              {data.movie.language}﹒{data.movie.rating}{" "}
            </Subtitle>
            <Description>{data.movie.description_full}</Description>
            <Suggestions>
              <p style={{ marginBottom: "10px" }}>Other Suggested Movies: </p>
              {data.suggestions.map((m) => (
                <li style={{ marginBottom: "5px" }}>{m.title}</li>
              ))}
            </Suggestions>
          </>
        )}
      </Column>
      <Poster
        bg={data && data.movie ? data.movie.medium_cover_image : ""}
      ></Poster>
    </Container>
  );
};
