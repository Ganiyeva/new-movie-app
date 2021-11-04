import styled from 'styled-components';
import { useParams } from "react-router-dom";
import GenreList from "../components/Genreslist";
import MoviesGrid from "../components/MoviesGrid";

const PageContent = styled.section `
  margin-top: 97px;
  padding: 70px 0;
`;

const Wrapper = styled.div `
  background-color: #16151A;
  display: flex;
  justify-content: space-between;
`;

const Catalog = () => {

  const {genreid} = useParams();

  return (
    <PageContent className="bg-img">
      <div className="container">
        <Wrapper>
          <GenreList />
          <MoviesGrid genre={genreid} />
        </Wrapper>
      </div>
    </PageContent>
  );
};

export default Catalog;