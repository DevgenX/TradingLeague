import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "./pending.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserImage from "../common/UserImage";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";

const Pending = () => {
  const { user, challenges, getAllChallenges } = useAppContext();

  useEffect(() => {
    getAllChallenges(user._id);
  }, [user]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8" className="mt-5 mb-1">
          <h1 className="pending-title">Pending Challengers</h1>
        </Col>
        <Col md="4"></Col>
      </Row>
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <Table
            hover
            bordered
            className="table table-hover table-bordered table-no-border"
          >
            <tbody>
              {challenges.length === 0 ? (
                <tr>
                  <td colSpan={4}>No pending challenges</td>
                </tr>
              ) : (
                challenges.map((challenge) => (
                  <tr key={challenge._id}>
                    <td>
                      <UserImage user={challenge.challenger} size="2x" />
                    </td>
                    <td>{challenge.challenger.name}</td>
                    <td>PvP</td>
                    <td>
                      <Button variant="success">Accept</Button>
                      <Button variant="danger">Decline</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
        <Col md="4"></Col>
      </Row>
    </div>
  );
};

export default Pending;
