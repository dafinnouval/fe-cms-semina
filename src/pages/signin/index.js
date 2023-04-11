import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import SForm from "./form";
import { postData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/actions";

const PageSignin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target.name, " => e.target.name");
    // console.log(e.target.value, " => e.target.value");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData(
        `/cms/auth/signin`,
        form
        // bisa langsung menggunakan objek {form}
        // "http://localhost:9000/api/v1/cms/auth/signin",form
        // {
        //   email: form.email,
        //   password: form.password,
        // }
      );
      dispatch(userLogin(res.data.data.token, res.data.data.role));
      setIsLoading(false);
      navigate("/");
      // console.log(res)
      // console.log(res.data.data.token);
    } catch (err) {
      // console.log(err.res.data.msg, "error handle submit");]
      setIsLoading(false);
      setAlert({
        status: true,
        message: err?.response?.data?.msg ?? "Internal Server error fetch",
        type: "danger",
      });
    }
  };

  return (
    <Container md={12} className="my-5">
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
      </div>
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Signin</Card.Title>
          <SForm form={form} handleChange={handleChange} isLoading={isLoading} handleSubmit={handleSubmit} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PageSignin;
