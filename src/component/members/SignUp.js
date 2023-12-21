import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  CardBody,
  Col,
  Form,
  FormLabel,
  InputGroup,
  Row,
} from "react-bootstrap";
import { customAxios } from "../../common/CustomAxiosUtils";

export default function Signup() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [initialValues, setInitialValues] = useState({
    memberID: "",
    memberPW: "",
    memberPWCheck: "",
    memberName: "",
    memberNickname: "",
  });
  const [formValues, setFormValues] = useState(initialValues);
  const [allValidate, setAllValidate] = useState(false);
  const [memberIDStatus, setMemberIDStatus] = useState(false);
  const [getAuthCodeStatus, setGetAuthCodeStatus] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [authValidate, setAuthValidate] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleMemberIDChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    if (emailRegEx.test(value)) {
      setMemberIDStatus(true);
    } else {
      setMemberIDStatus(false);
    }
  };

  const handleAuthCodeChange = (e) => {
    const { value } = e.target;
    setAuthCode(value);

    if (value.length >= 6) {
      setGetAuthCodeStatus(true);
    } else {
      setGetAuthCodeStatus(false);
    }
  };

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regTest = regex.test(formValues.memberID);
    const pwCheck = formValues.memberPW === formValues.memberPWCheck;
    const memberNameCheck = formValues.memberName.length > 0;
    const memberNicknameCheck = formValues.memberNickname.length > 0;

    const isFormAllValidate =
      regTest && pwCheck && memberNameCheck && memberNicknameCheck;
    if (isFormAllValidate && authValidate) {
      setAllValidate(true);
      console.log(allValidate);
      return;
    }

    setAllValidate(false);
    console.log(allValidate);
  });

  const create = async (event) => {
    const signUpRequest = new FormData();
    signUpRequest.append("memberID", formValues.memberID);
    signUpRequest.append("memberPW", formValues.memberPW);
    signUpRequest.append("memberName", formValues.memberName);
    signUpRequest.append("memberNickname", formValues.memberNickname);

    console.log("signUpRequest = ", signUpRequest);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    await customAxios
      .post(`/join`, signUpRequest)
      .then((res) => res.data)
      .then((data) => {
        console.log("success");
        console.log(data);
        goLogin();
      })
      .catch((error) => {
        console.log("SignUp error = ", error);
        alert(error.response.data.message);
      });
  };

  function goLogin() {
    navigate("/login");
  }

  const getEmailAuthCode = async () => {
    await customAxios
      .post(
        `/emails/verification-requests`,
        {},
        {
          params: {
            memberID: formValues.memberID,
          },
        },
      )
      .catch((error) => {
        console.log("get emailAuthCode error = ", error);
        alert("인증번호 받기 실패");
      });
  };

  const validateEmailAuthCode = async () => {
    console.log(authCode);
    await customAxios
      .post(
        `/emails/verifications`,
        {},
        {
          params: {
            memberID: formValues.memberID,
            authCode: authCode,
          },
        },
      )
      .then((response) => {
        setAuthValidate(true);
        alert(response.data);
      })
      .catch((error) => {
        setAuthValidate(false);
        console.log("get emailAuthCode error = ", error);
        alert("인증 오류");
      });
  };

  return (
    <div className="container" style={{ maxWidth: "560px" }}>
      <div className="pb-5 text-center">
        <h2>회원가입</h2>
      </div>

      <Form className="card" validated={validated} noValidate>
        <CardBody>
          <Row className="mb-3">
            <FormLabel className="col-sm-2 col-form-label" htmlFor="memberID">
              이메일
            </FormLabel>
            <Col className="col-sm-10">
              <InputGroup>
                <Form.Control
                  id="memberID"
                  name="memberID"
                  placeholder="이메일을 입력해주세요."
                  type="email"
                  required
                  value={formValues.memberID}
                  onChange={handleMemberIDChange}
                />
                <Button
                  variant="success"
                  onClick={getEmailAuthCode}
                  disabled={memberIDStatus === false}
                >
                  인증번호 받기
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mb-3">
            <FormLabel className="col-sm-2 col-form-label" htmlFor="memberPW">
              이메일 인증번호
            </FormLabel>
            <Col className="col-sm-10">
              <InputGroup>
                <Form.Control
                  id="authCode"
                  name="authCode"
                  placeholder="인증번호를 입력해주세요."
                  type="password"
                  required
                  value={authCode}
                  onChange={handleAuthCodeChange}
                />
                <Button
                  variant="success"
                  onClick={validateEmailAuthCode}
                  disabled={getAuthCodeStatus === false}
                >
                  인증 확인
                </Button>
              </InputGroup>
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
          <Row className="mb-3">
            <FormLabel
              className="col-sm-2 col-form-label"
              htmlFor="memberPWCheck"
            >
              비밀번호 확인
            </FormLabel>
            <Col className="col-sm-10">
              <Form.Control
                id="memberPWCheck"
                name="memberPWCheck"
                placeholder="비밀번호 확인을 입력해주세요."
                type="password"
                required
                value={formValues.memberPWCheck}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <FormLabel className="col-sm-2 col-form-label" htmlFor="memberName">
              이름
            </FormLabel>
            <Col className="col-sm-10">
              <Form.Control
                id="memberName"
                name="memberName"
                placeholder="이름을 입력해주세요."
                type="text"
                required
                value={formValues.memberName}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <FormLabel
              className="col-sm-2 col-form-label"
              htmlFor="memberNickname"
            >
              닉네임
            </FormLabel>
            <Col className="col-sm-10">
              <Form.Control
                id="memberNickname"
                name="memberNickname"
                placeholder="닉네임을 입력해주세요."
                type="text"
                required
                value={formValues.memberNickname}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              onClick={create}
              disabled={!allValidate}
            >
              회원가입
            </button>
            <button className="btn btn-dark" onClick={goLogin}>
              취소
            </button>
          </div>
        </CardBody>
      </Form>
    </div>
  );
}
