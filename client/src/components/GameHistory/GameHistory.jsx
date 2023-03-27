import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./gamehistory.scss";
import TopNav from "../TopNav/TopNav";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const GameHistoryTable = () => {
  const { history, getAllHistory } = useAppContext();

  useEffect(() => {
    getAllHistory();
  }, []);

  const getRank = (mmr) => {
    if (mmr > 2999) return "Quant";
    else if (mmr > 1799 && mmr < 3000) return "Degen";
    else if (mmr > 899 && mmr < 1800) return "Ape";
    else if (mmr > 349 && mmr < 900) return "Scalper";
    else return "Fomo";
  };

  // GET RESULT IF WIN OR LOSE
  const getResult = (user_profit, challenger_profit) => {
    if (user_profit > challenger_profit) return "Win";
    else if (user_profit < challenger_profit) return "Lose";
  };

  return (
    <>
      <TopNav />
      <div className="game-history-container">
        <div className="game-history-table">
          <Row>
            <Col md="12">
              <h1 className="match-title">Match History</h1>
            </Col>
            <Col md="4"></Col>
          </Row>
          <Row className="justify-content-around">
            <Col md={8}>
              <Table
                hover
                bordered
                className="table table-hover table-bordered table-no-border"
              >
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Opponent</th>
                    <th>Match</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan={4}>No data available</td>
                    </tr>
                  ) : (
                    history.map((game, index) => (
                      <tr key={index}>
                        <td>{game.user_2?.mmr && getRank(game.user_2?.mmr)}</td>
                        <td>{game.user_2?.name || "Unnamed"}</td>
                        <td>{game.game_mode === "casual" && "PvP"}</td>
                        <td>
                          {game.status === "done"
                            ? getResult(
                                game.profit,
                                game.user_2?.profit || null
                              )
                            : game.status === "declined"
                            ? "Declined"
                            : "Pending"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
        <Link to="/" className="back-btn">
          <Button>Game Lobby</Button>
        </Link>
      </div>
    </>
  );
};

export default GameHistoryTable;
