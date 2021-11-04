import styled from 'styled-components';
import Discovers from "../components/Discovers";

const PageContent = styled.section `
  height: 100vh;
  margin-top: 97px;
  padding: 100px 0;
`;

const Search = () => {
  return (
    <PageContent className="bg-img">
        <Discovers />
    </PageContent>
  );
};

export default Search;