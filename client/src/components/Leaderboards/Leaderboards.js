import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./leaderboards.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../context/appContext";

const Leaderboard = () => {
  const { users } = useAppContext();

  console.log(users);

  return (
    <div>
      <Row>
        <Col>
          <h1 className="title">Leaderboards</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Username</th>
                <th>MMR</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <FontAwesomeIcon icon={faUser} size="2x" />
                  </td>
                  <td>{user.name}</td>
                  <td className="mmr">
                    <span className="gold">{user.mmr}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Leaderboard;
