import { Col, Container, Row } from "react-bootstrap";
import TopNav from "../TopNav/TopNav";
import { Link } from "react-router-dom";

const Ranking = () => {
  return (
    <div className="ranking">
      <TopNav />
      <Container>
        <Row>
          <Col lg="9">
            <div className="page-box ranking-container mb-4">
              <div className="header">
                <div className="img-container">
                  <img
                    src="/assets/img/ledgers/ranking.png"
                    alt=""
                    className="icon"
                  />
                </div>
                Trading League Rank Badges
              </div>
              <div className="body">
                <div className="rank-container">
                  <img
                    src="../../assets/badge/Quant.svg"
                    className="rank-img quant"
                    alt=""
                  />

                  <h5 className="rank-title">
                    Quant
                    <span className="mmr">
                      <i className="fa-solid fa-circle"></i> 3000+
                    </span>
                  </h5>
                  <p className="rank-desc m-0">
                    If you reach this rank, Alameda Research will send you an
                    offer.
                  </p>
                </div>

                <div className="rank-container">
                  <img
                    src="../../assets/badge/Degen.svg"
                    className="rank-img degen"
                    alt=""
                  />

                  <h5 className="rank-title">
                    Degen
                    <span className="mmr">
                      <i className="fa-solid fa-circle"></i> 1800-2999+
                    </span>
                  </h5>
                  <p className="rank-desc m-0">
                    Welcome to the club, fellow degen! Degens are experts in any
                    market may it be Bull or Bear, NFTs or DeFi.
                  </p>
                </div>

                <div className="rank-container">
                  <img
                    src="../../assets/badge/Ape.svg"
                    className="rank-img ape"
                    alt=""
                  />

                  <h5 className="rank-title">
                    Ape
                    <span className="mmr">
                      <i className="fa-solid fa-circle"></i> 900-1799+
                    </span>
                  </h5>
                  <p className="rank-desc m-0">
                    Ape tier promotes you into an intermediate trader. Your
                    skill level makes you profitable in the market but still
                    lacks emotion management.
                  </p>
                </div>

                <div className="rank-container">
                  <img
                    src="../../assets/badge/Scalper.svg"
                    className="rank-img scalper"
                    alt=""
                  />

                  <h5 className="rank-title">
                    Scalper
                    <span className="mmr">
                      <i className="fa-solid fa-circle"></i> 350-899+
                    </span>
                  </h5>
                  <p className="rank-desc m-0">
                    The Scalper is the next division after Fomo. Scalper tier
                    users are knowledgeable enough to escape the elo hell and
                    are considered to be slightly consistent traders.
                  </p>
                </div>

                <div className="rank-container">
                  <img
                    src="../../assets/badge/Fomo.svg"
                    className="rank-img fomo"
                    alt=""
                  />

                  <h5 className="rank-title">
                    Fomo
                    <span className="mmr">
                      <i className="fa-solid fa-circle"></i> 0-349+
                    </span>
                  </h5>
                  <p className="rank-desc m-0">
                    Fomo tier marks the beginning of your trading journey in
                    MTL. It is colored in bronze that signifies novicity and
                    lack of experience in trading.
                  </p>
                </div>

                <p
                  className="text-center mt-5 mb-4"
                  // style={{ color: "#9b94c1" }}
                >
                  The starting point of every user is in the Fomo Division with
                  300 MMR.
                </p>
                <Link
                  to="/"
                  className="back-page-btn"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <i className="fa-solid fa-caret-left"></i> Game Lobby
                </Link>
              </div>
            </div>

            {/* {user && <GameModes />} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Ranking;
