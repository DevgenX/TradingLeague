import React, { useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./leaderboards.scss";
import UserImage from "../common/UserImage";
// import UserImage from "../common/UserImage";

import { useAppContext } from "../../context/appContext";

const Leaderboard = () => {
  const { getUsers, user, users } = useAppContext();

  useEffect(() => {
    getUsers();
  }, [user]);

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
              {users
                .sort((a, b) => b.mmr - a.mmr)
                .map((user, index) => (
                  <tr key={index}>
                    <td>
                      <UserImage user={user} size="2x" />
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
