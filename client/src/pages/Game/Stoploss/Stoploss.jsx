import { Form } from "react-bootstrap";

const Stoploss = ({ stopLoss, setStoploss, withPosition }) => {
  return (
    <div className="leverage-container stoploss">
      <small className="me-1">Stoploss:</small>

      <Form.Select
        aria-label="leverage"
        value={stopLoss}
        disabled={withPosition.status}
        onChange={(e) => setStoploss(e.target.value)}
      >
        <option value={0}>None</option>
        <option value={1}>1%</option>
        <option value={2}>2%</option>
        <option value={3}>3%</option>
        <option value={4}>4%</option>
        <option value={5}>5%</option>
        <option value={6}>6%</option>
        <option value={7}>7%</option>
        <option value={8}>8%</option>
        <option value={9}>9%</option>
        <option value={10}>10%</option>
      </Form.Select>
    </div>
  );
};

export default Stoploss;
