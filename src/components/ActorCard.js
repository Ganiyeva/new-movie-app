// import { prop } from 'dom7';
import styled from 'styled-components';
import { MdImageNotSupported } from "react-icons/all";
import {IMAGE_URL} from '../global';

const Actor = styled.div `
  width: 175px;
  padding: 0 0 15px 0;
  border: 1px solid #e3e3e3;
  border-radius: 7px;
  overflow: hidden;
  background-color: #FFF;
  box-shadow: inset 0 -7px 5px -7px #e3e3e3, inset -7px 0 5px -7px #e3e3e3, inset 5px 0 5px -7px #e3e3e3;
`;

const Card = styled.div `
  height: 255px;
`;

const Img = styled.img `
  width: 100%;
  height: 100%;
`;

const NoImg = styled.div `
  height: 100%;
  width: 100%;
  background-color: #FFC107;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Box = styled.div `
  padding: 0 10px;
`;

const Name = styled.h4 `
  max-width: 130px;
  font-size: 15px;
  font-weight: 700;
  color: #000;
  margin: 7px 0 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Character = styled.p `
  max-width: 100px;
  font-size: 14px;
  color: #000;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ActorCard = ({actorObj}) =>{
  return(
    <Actor>
      <Card>
        {actorObj.profile_path ? <Img src={IMAGE_URL + actorObj.profile_path} alt={actorObj.name} className="img" /> : <NoImg> <MdImageNotSupported className="not-img" /> </NoImg>}
      </Card>
      <Box>
        <Name> {actorObj.name} </Name>
        <Character> {actorObj.character} </Character>
      </Box>
    </Actor>
  );
};
  
  export default ActorCard;