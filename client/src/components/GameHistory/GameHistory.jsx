import React from "react";
import Table from "react-bootstrap/Table";
import "./gamehistory.scss";
import TopNav from "../TopNav/TopNav";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const GameHistoryTable = () => {
  const gameHistoryData = [
    { rank: "Ape", opponent: "Player 1", match: "PvP", result: "Win" },
    { rank: "Degen", opponent: "Player 2", match: "PvP", result: "Lose" },
    { rank: "Quant", opponent: "Player 3", match: "PvP", result: "Win" },
  ];

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
                  {gameHistoryData.map((game, index) => (
                    <tr key={index}>
                      <td>{game.rank}</td>
                      <td>{game.opponent}</td>
                      <td>{game.match}</td>
                      <td>{game.result}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          {gameHistoryData.length === 0 && (
            <div className="empty-data">No game history data found.</div>
          )}
        </div>
        <Link to="/" className="back-btn">
          <Button>Game Lobby</Button>
        </Link>
      </div>
    </>
  );
};

export default GameHistoryTable;
