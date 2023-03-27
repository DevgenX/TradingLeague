import React from "react";
import { Form } from "react-bootstrap";

const Leverage = ({ leverage, setLeverage, withPosition }) => {
  return (
    <div className="leverage-container d-flex">
      <small className="me-1" style={{ color: "#fff" }}>
        Leverage:
      </small>

      <Form.Select
        aria-label="leverage"
        value={leverage}
        disabled={withPosition.status}
        onChange={(e) => setLeverage(e.target.value)}
      >
        <option value={1}>x1</option>
        <option value={2}>x2</option>
        <option value={5}>x5</option>
        <option value={10}>x10</option>
      </Form.Select>
    </div>
  );
};

export default Leverage;
