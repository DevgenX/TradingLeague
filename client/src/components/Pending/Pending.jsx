import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "./pending.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Pending = () => {
  const data = [
    { username: "John Doe" },
    { username: "Mike Smith" },
    { username: "George Clooney" },
  ];

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
              {data.map((user) => (
                <tr key={user.username}>
                  <td>
                    <FontAwesomeIcon icon={faUser} size="2x" />
                  </td>
                  <td>{user.username}</td>
                  <td>PvP</td>
                  <td>
                    <Button variant="success">Accept</Button>
                    <Button variant="danger">Decline</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md="4"></Col>
      </Row>
    </div>
  );
};

export default Pending;
