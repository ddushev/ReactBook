import { Link } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { useAuthContext } from "../../../contexts/AuthContext";
import { signFormFields } from "../../../utils/constants";
import { useEffect } from "react";


export const Login = () => {
    const { onLoginSubmit, authErrors, setAuthErrors } = useAuthContext();
    const { values, onChangeHandler, onSubmit } = useForm({
        [signFormFields.email]: '',
        [signFormFields.password]: '',
    }, onLoginSubmit);

    useEffect(() => {
        return () => {
            setAuthErrors([]);
        }
    }, [])
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 className="mb-5">
                        <span className="text-primary text-uppercase">Sign in</span>
                    </h1>
                    <h6 className="section-title text-center text-uppercase">
                        Don't have an account yet? <Link to="/sign-up">Sign up</Link>
                    </h6>
                </div>
                <div className="row g-4">
                    {authErrors.length == 0 ?
                        <div className="col-md-6 wow fadeInDown" data-wow-delay="0.1s">
                            <img
                                className="position-relative rounded w-100 h-100"
                                src="/img/about-2.jpg"
                                frameBorder={0}
                                style={{ minHeight: 350, border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex={0}
                            />
                        </div>
                        :
                        <div className="col-md-6 wow fadeInDown error-box">
                            <h4>Errors</h4>
                            {authErrors.map(error => <p key={error}>{error}</p>)}
                        </div>
                    }
                    <div className="col-md-6">
                        <div className="wow fadeInUp" data-wow-delay="0.2s">
                            <form onSubmit={onSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                placeholder="Email"
                                                name={signFormFields.email}
                                                value={values.email}
                                                onChange={onChangeHandler}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Password"
                                                name={signFormFields.password}
                                                value={values.password}
                                                onChange={onChangeHandler}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}