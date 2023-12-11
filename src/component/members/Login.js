import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardBody, Col, Form, FormLabel, Row } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../common/URL";
import { myLogin, myLogout } from "../../App";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [initialValues, setInitialValues] = useState({
    memberID: "",
    memberPW: "",
  });
  const [formValues, setFormValues] = useState(initialValues);
  const [allValidate, setAllValidate] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regTest = regex.test(formValues.memberID);
    const memberPWCheck = formValues.memberPW.length > 0;

    const isFormAllValidate = regTest && memberPWCheck;
    if (isFormAllValidate) {
      setAllValidate(true);
      console.log(allValidate);
      return;
    }

    setAllValidate(false);
    console.log(allValidate);
  });

  const login = async (event) => {
    const data = new FormData();
    data.append("memberID", formValues.memberID);
    data.append("memberPW", formValues.memberPW);

    console.log(data);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const params = new URLSearchParams();
    params.append("memberID", formValues.memberID);
    params.append("memberPW", formValues.memberPW);

    await axios
      .post(`${baseURL}/login`, params)
      .then((res) => {
        if (res.status === 200) {
          const token = res.headers["authorization"];
          localStorage.setItem("token", String(token));
          axios.defaults.headers.common["Authorization"] = token;
          setLogin(token, formValues.memberID);
        }
      })
      .catch((error) => console.log(error));
  };

  function goHome() {
    navigate("/boards");
  }

  const dispatch = useDispatch();

  const setLogin = (token, memberName) => {
    dispatch(
      myLogin({
        token: token,
        isLoggedIn: true,
        memberName: memberName,
      }),
    );
  };

  const setLogout = () => {
    dispatch(myLogout());
  };

  return (
    <div className="container" style={{ maxWidth: "560px" }}>
      <div className="pb-5 text-center">
        <h2>로그인</h2>
      </div>

      <Form className="card" validated={validated} noValidate>
        <CardBody>
          <Row className="mb-3">
            <FormLabel className="col-sm-2 col-form-label" htmlFor="memberID">
              이메일
            </FormLabel>
            <Col className="col-sm-10">
              <Form.Control
                id="memberID"
                name="memberID"
                placeholder="이메일을 입력해주세요."
                type="email"
                required
                value={formValues.memberID}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <FormLabel className="col-sm-2 col-form-label" htmlFor="memberPW">
              비밀번호
            </FormLabel>
            <Col className="col-sm-10">
              <Form.Control
                id="memberPW"
                name="memberPW"
                placeholder="비밀번호를 입력해주세요."
                type="password"
                required
                value={formValues.memberPW}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <div className="d-grid gap-2">
            <button
              className="btn btn-success"
              onClick={login}
              disabled={!allValidate}
            >
              로그인
            </button>
            <button className="btn btn-dark" onClick={goHome}>
              취소
            </button>
          </div>
        </CardBody>
      </Form>
    </div>
  );
}