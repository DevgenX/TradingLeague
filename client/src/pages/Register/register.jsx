import { Logo, FormRow, Alert } from "../../components";
import styled from "styled-components";
import { useState } from "react";
import { useAppContext } from "../../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isUser: true,
  showAlert: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const { isLoading, showAlert, displayAlert } = useAppContext();

  const toggleUser = () => {
    setValues({ ...values, isUser: !values.isUser });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, password, isUser } = values;

    if (!email || !password || (!isUser && !name)) {
      displayAlert();
      return;
    }

    console.log(values);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isUser ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isUser && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          {values.isUser ? "Don't have an account?" : "Have an account?"}
          <button type="button" onClick={toggleUser} className="user-btn">
            {values.isUser ? " Register" : " Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* background: url("../assets/login-bg.png"); */
  background: linear-gradient(326.9deg, #13132b 5.79%, #135e87 283.21%);
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
    height: 100px;
  }

  .form {
    max-width: 400px;
    border-top: 5px solid #135e87;
    background: linear-gradient(180deg, #02a3fe 0%, #7d40ff 100%);

    box-shadow: 18px 4px 35px rgba(0, 0, 0, 0.02);
    color: white;
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    background: linear-gradient(180deg, #02a3fe 0%, #7d40ff 100%);
    margin-top: 1rem;
  }
  .user-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Register;
