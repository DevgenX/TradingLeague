import { Row, Col, Table, Button } from "react-bootstrap";
import "./pending.scss";

import UserImage from "../common/UserImage";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";

const Pending = () => {
  const { acceptPvp, declinePvp, user, challenges, getAllChallenges } =
    useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    getAllChallenges(user?._id);
  }, [user]);

  const handleAccept = (to_challenge) => {
    acceptPvp(
      {
        ...to_challenge.challenger,
        gain_loss: to_challenge.gain_loss,
        profit: to_challenge.profit,
      },
      to_challenge
    );
    navigate("/game/pvp/challenger");
  };

  const handleDecline = (id, history_id) => {
    // update history status when the invitation was declined
    declinePvp(id, history_id);
  };

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
                      <Button variant="success" onClick={handleAccept}>
                        Accept
                      </Button>
                      <Button variant="danger" onClick={handleDecline}>
                        Decline
                      </Button>
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
