import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";

import GameButtons from "../../components/Widgets/GameButtons";
import ChartWidget from "../../components/Widgets/ChartWidget";
import Positions from "../../components/Widgets/Positions";
import TopNav from "../../components/TopNav/TopNav";

const Game = () => {
  return (
    <>
      <TopNav />
      <Container>
        <ContainerDiv>
          <Row>
            <Col>
              <ChartWidget />
            </Col>
          </Row>
          <Row>
            <Col>
              <GameButtons />
            </Col>
            <Col>
              <Positions />
            </Col>
          </Row>
        </ContainerDiv>
      </Container>
    </>
  );
};

const ContainerDiv = styled.div`
  margin-bottom: 5rem;
`;

export default Game;
