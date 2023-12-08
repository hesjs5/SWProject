import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {CardBody, Col, Form, FormLabel, Row} from "react-bootstrap";
import axios from "axios";
import {baseURL} from "../../common/URL";

export default function Signup() {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [initialValues , setInitialValues ] = useState({
        memberID: "",
        memberPW: "",
        memberPWCheck: "",
        memberName: "",
        memberNickname: "",
    });
    const [formValues, setFormValues] = useState(initialValues);
    const [allValidate, setAllValidate] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }

    useEffect(() => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regTest = regex.test(formValues.memberID);
        const pwCheck = formValues.memberPW === formValues.memberPWCheck;
        const memberNameCheck = formValues.memberName.length > 0;
        const memberNicknameCheck = formValues.memberNickname.length > 0;

        const isFormAllValidate = regTest && pwCheck && memberNameCheck && memberNicknameCheck;
        if (isFormAllValidate) {
            setAllValidate(true);
            console.log(allValidate);
            return;
        }

        setAllValidate(false);
        console.log(allValidate);
    });

    const create = async (event) => {
        const data = new FormData();
        data.append("memberID", formValues.memberID)
        data.append("memberPW", formValues.memberPW)
        data.append("memberName", formValues.memberName)
        data.append("memberNickname", formValues.memberNickname)

        console.log(data);

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        event.preventDefault();
        event.stopPropagation();
        setValidated(true);

        await axios.post(`${baseURL}/join`, {
            body: data,
        })
            .then((res) => res.data)
            .then(data => {
                console.log("success");
                console.log(data);
                goHome();
            })
            .catch(error => {
                console.log(error);
            });
    }

    function goHome() {
        navigate("/boards");
    }

    return (
        <div className="container" style={{maxWidth: '560px'}}>
            <div className="pb-5 text-center">
                <h2>회원가입</h2>
            </div>

            <Form className="card" validated={validated} noValidate>
                <CardBody>
                    <Row className="mb-3">
                        <FormLabel className="col-sm-2 col-form-label" htmlFor="memberID">이메일</FormLabel>
                        <Col className="col-sm-10">
                            <Form.Control id="memberID" name="memberID" placeholder="이메일을 입력해주세요." type="email" required
                                          value={formValues.memberID} onChange={handleChange}/>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel className="col-sm-2 col-form-label" htmlFor="memberPW">비밀번호</FormLabel>
                        <Col className="col-sm-10">
                            <Form.Control id="memberPW" name="memberPW" placeholder="비밀번호를 입력해주세요." type="password"
                                          required value={formValues.memberPW} onChange={handleChange}/>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel className="col-sm-2 col-form-label" htmlFor="memberPWCheck">비밀번호 확인</FormLabel>
                        <Col className="col-sm-10">
                            <Form.Control id="memberPWCheck" name="memberPWCheck" placeholder="비밀번호 확인을 입력해주세요."
                                          type="password" required value={formValues.memberPWCheck}
                                          onChange={handleChange}/>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel className="col-sm-2 col-form-label" htmlFor="memberName">이름</FormLabel>
                        <Col className="col-sm-10">
                            <Form.Control id="memberName" name="memberName" placeholder="이름을 입력해주세요."
                                          type="text" required value={formValues.memberName} onChange={handleChange}/>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel className="col-sm-2 col-form-label" htmlFor="memberNickname">닉네임</FormLabel>
                        <Col className="col-sm-10">
                            <Form.Control id="memberNickname" name="memberNickname" placeholder="닉네임을 입력해주세요."
                                          type="text" required value={formValues.memberNickname}
                                          onChange={handleChange}/>
                        </Col>
                    </Row>

                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" onClick={create} disabled={!allValidate}>
                            회원가입
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