import styled from 'styled-components';
import Movielist from "../components/Movielist";
import Slider from '../components/Slider';

const PageContent = styled.section `
  min-height: 100vh;
  margin-top: 97px;
  padding: 0 0 100px 0;
`;

const Wrapper = styled.div `
  background-color: #16151A;
`;


const Home = () => {

  return (
    <PageContent className="bg-img">
      <Slider />
      <div className="container">
        <Wrapper>
          <Movielist type='popular' title='Popular' />
          {/* <Movielist type='trending' title='Trending' /> */}
          <Movielist type='top_rated' title='Top reading' />
          <Movielist type='upcoming' title='Upcoming' />
        </Wrapper>
      </div>
    </PageContent>
    );
}

export default Home;