import Navbar from "../../components/Navbar/Navbar";
import styled from "styled-components";
import PvP from "../../assets/game_modes/casual.png";
import Practice from "../../assets/game_modes/practice.png";
import Ranked from "../../assets/game_modes/rank.png";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header>
        <div className="header">
          <h3>Game Modes</h3>
          <small>Select mode to play</small>
        </div>
      </Header>
      <BoxDiv>
        <div className="box">
          <div className="box1">
            <img src={Practice} alt="Practice mode" />
            <h4>Practice</h4>
          </div>
          <div className="box2">
            <img src={PvP} alt="PvP mode" />
            <h4>PvP</h4>
          </div>
          <div className="box3">
            <img src={Ranked} alt="Ranked mode" />
            <h4>Ranked Game</h4>
          </div>
        </div>
      </BoxDiv>
    </div>
  );
};

export default Home;

const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  margin: auto;
  margin-top: 40px;
  padding: 10px;
  background: linear-gradient(326.9deg, #13132b 5.79%, #135e87 283.21%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  color: white;

  small {
    display: flex;
    justify-content: center;
  }
`;

const BoxDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  padding: 10px;
  margin: auto;
  background: linear-gradient(326.9deg, #13132b 5.79%, #135e87 283.21%);

  .box {
    padding: 20px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;
    margin: 10px;

    img {
      border-radius: 10px;
      width: 40%;
      margin-bottom: 10px;
      background: #fff;
    }

    h4 {
      color: #fff;
    }

    .box1 {
      margin: 10px;
      display: block;
      justify-content: center;
      align-items: center;
      background: linear-gradient(180deg, #991bf9 0%, #6400b0 100%);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 18px;

      img {
        width: 40%;
        padding: 10px;
        margin: 15px;
      }
    }

    .box2 {
      margin: 10px;
      display: block;
      justify-content: center;
      align-items: center;
      background: linear-gradient(180deg, #56ccf2 0%, #0081ab 100%);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 18px;

      img {
        width: 40%;
        padding: 10px;
        margin: 15px;
      }
    }

    .box3 {
      margin: 10px;
      display: block;
      justify-content: center;
      align-items: center;
      background: linear-gradient(180deg, #ff2d2e 0%, #8f0001 100%);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 18px;

      img {
        width: 40%;
        padding: 10px;
        margin: 15px;
      }
    }
  }
`;
