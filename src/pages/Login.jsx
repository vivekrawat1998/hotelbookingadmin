import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { createLogin, resetState } from "../features/auth/authSlice";
import CustomInput from "../components/CustomInput";


let Schema = yup.object().shape({
  email: yup.string().email('Email should be valid').required('Email is Required'),
  password: yup.string().required('Password is Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      dispatch(createLogin(values))
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });

  const authState = useSelector((state) => state.auth);
  const { user, isSuccess, message } = authState;

  useEffect(() => {
    if (isSuccess && user) {
      toast.success("Login Successfully.");
      navigate('/admin');
    } else {
      //   toast.error("Credentials Wrong. Please re-enter!")
      //   navigate("");
    }
  }, [user, isSuccess, message]);

  return (
    <>
      <div className='py-5' style={{ background: "#1677FF", minHeight: "100vh" }}>
        <br />
        <br />
        <br />
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
          <h3 className='text-center'>Sign In</h3>
          <p className='text-center'>Login to your account to continue</p>
          <div className='error text-center'>
            {message.message == "Rejected" ? "Yor are not an Admin" : ""}
          </div>
          <form action='' onSubmit={formik.handleSubmit}>
            <CustomInput
              type='email'
              name='email'
              label="Email Address"
              id="email"
              val={formik.values.email}
              onCh={formik.handleChange('email')}
            />
            <div className='error'>
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null};
            </div>

            <CustomInput
              type='password'
              name='password'
              label="Password"
              id="pass"
              val={formik.values.password}
              onCh={formik.handleChange('password')}
            />
            <div className='error'>
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null};
            </div>
            <button
              className='border-0 px-3 mt-3 py-2 text-light fw-bold w-100 text-center text-decoration-none'
              style={{ background: "#1677FF" }} type='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
