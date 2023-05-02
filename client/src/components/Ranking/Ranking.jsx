import { Col, Row, Button } from "react-bootstrap";
import TopNav from "../TopNav/TopNav";
import { Link } from "react-router-dom";
import "./ranking.scss";

import RankingIcon from "../../assets/ledgers/ranking.png";
import ApeIcon from "../../assets/badge/Ape.svg";
import DegenIcon from "../../assets/badge/Degen.svg";
import QuantIcon from "../../assets/badge/Quant.svg";
import FomoIcon from "../../assets/badge/Fomo.svg";
import ScalperIcon from "../../assets/badge/Scalper.svg";

const Ranking = () => {
  return (
    <>
      <TopNav />
      <div className="ranking">
        <Row className="justify-content-center">
          <Col lg="8">
            <div className="page-box ranking-container mb-4">
              <div className="header">
                <div className="img-container">
                  <img src={RankingIcon} alt="" className="icon" />
                </div>
                <h1 className="rank-title">TradingLeague Rank Badges</h1>
              </div>

              <div className="body">
                <div className="rank-container fomo">
                  <img src={FomoIcon} className="rank-img" alt="" />
                  <div className="rank-info">
                    <h5 className="rank-title">
                      Fomo
                      <span className="mmr">0-349</span>
                    </h5>
                  </div>
                </div>
                <div className="rank-container scalper">
                  <img src={ScalperIcon} className="rank-img" alt="" />
                  <div className="rank-info">
                    <h5 className="rank-title">
                      Scalper
                      <span className="mmr">350-899</span>
                    </h5>
                  </div>
                </div>
                <div className="rank-container ape">
                  <img src={ApeIcon} className="rank-img" alt="" />
                  <div className="rank-info">
                    <h5 className="rank-title">
                      Ape
                      <span className="mmr">900-1799</span>
                    </h5>
                  </div>
                </div>
                <div className="rank-container degen">
                  <img src={DegenIcon} className="rank-img" alt="" />
                  <div className="rank-info">
                    <h5 className="rank-title">
                      Degen
                      <span className="mmr">1800-2999</span>
                    </h5>
                  </div>
                </div>
                <div className="rank-container quant">
                  <img src={QuantIcon} className="rank-img" alt="" />
                  <div className="rank-info">
                    <h5 className="rank-title">
                      Quant
                      <span className="mmr">3000+</span>
                    </h5>
                  </div>
                </div>
              </div>
              <Link to="/" className="back-btn">
                <Button>Game Lobby</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Ranking;
