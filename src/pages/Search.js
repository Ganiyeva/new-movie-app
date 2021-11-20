import styled from 'styled-components';
import Discovers from "../components/Discovers";

const PageContent = styled.section `
  min-height: 100vh;
  margin-top: 97px;
  padding: 70px 0;
`;

const Search = () => {
  return (
    <PageContent className="bg-img">
        <Discovers />
    </PageContent>
  );
};

export default Search;