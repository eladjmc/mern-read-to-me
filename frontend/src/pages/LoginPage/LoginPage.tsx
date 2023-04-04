import RTMLoginForm from "../../components/RTMLoginForm/RTMLoginForm";
import './LoginPage.scss'
const LoginPage = () => {
  return (
    <section className="login-page">
      <div className="form-container">
        <RTMLoginForm></RTMLoginForm>
      </div>
      <div className="image-container">

      </div>
    </section>
  );
};

export default LoginPage;
