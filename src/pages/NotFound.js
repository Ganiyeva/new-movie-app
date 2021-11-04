import styled from 'styled-components';

const Content = styled.div `
  height: 85vh;
  margin-top: 97px;
  background-color: #F7F7F7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img `
  height: 100%;
`;

const NotFound = () => {
  return (
    <Content>
      <Img src="img/error-404.svg" alt="404 error" />
    </Content>
  )
};

export default NotFound;