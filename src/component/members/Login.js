import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { CardBody, Col, Form, FormLabel, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { customAxios } from "../../common/CustomAxiosUtils";
import { myLogin, myLogout } from "../../modules/actions";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../common/Constant";
import axios from "axios";

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({
    memberID: "",
    memberPW: "",
  });
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
      console.log("allValidate = ", allValidate);
      return;
    }

    setAllValidate(false);
    console.log("allValidate = ", allValidate);
  });

  const login = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const loginRequest = new URLSearchParams();
    loginRequest.append("memberID", formValues.memberID);
    loginRequest.append("memberPW", formValues.memberPW);

    await customAxios
      .post(`/login`, loginRequest, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          // const token = res.headers["authorization"];
          // localStorage.setItem("token", String(token));
          // cookies.set("refresh-token", res.headers["refreshtoken"]);
          const accessToken = res.data.accessToken;
          localStorage.setItem(
            "accessToken",
            "Bearer ".concat(String(accessToken)),
          );

          const refreshToken = res.data.refreshToken;
          localStorage.setItem("refreshToken", String(refreshToken));

          return res;
        }
      })
      .then(async (res) => {
        await axios
          .get(`${baseURL}/token`, {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          })
          .then((response) => response.data)
          .then((data) => {
            setLogin(data.memberID, data.role);
            goHome();
          })
          .catch((error) => {
            console.log("token response error = ", error);
            alert(error.response.data.message);
            setLogout();
          });
      })
      .catch((error) => {
        console.log("login response error = ", error);
        alert(error.response.data.message);
      });
  };

  const navigate = useNavigate();
  const goHome = () => {
    navigate("/boards");
  };

  const dispatch = useDispatch();

  const setLogin = (memberID, role) => {
    dispatch(
      myLogin({
        isLoggedIn: true,
        memberID: memberID,
        role: role,
      }),
    );
  };

  const setLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
