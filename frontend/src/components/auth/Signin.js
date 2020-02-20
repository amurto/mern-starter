import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Formik } from 'formik';

import { useHttpClient } from '../hooks/http-hook';
import { AuthContext } from '../context/auth-context';

import LoadingSpinner from '../utils/LoadingSpinner';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  let history = useHistory();

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <div style={{ marginBottom: "20px" }}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
          </div>
          {isLoading && (
            <LoadingSpinner />
          )}
          <div style={{ marginTop: "20p", marginBottom: "20px" }}>
            {error && (
              <Alert onClose={clearError} severity="error">
                  {error}
              </Alert>
            )}
          </div>
          <Formik
                initialValues={{ 
                    email: '',
                    password: ''
            }}
                validate={values => {
                    const errors = {};
                    
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
                    } else if (values.password.length < 6) {
                        errors.password = 'Password should have atleast 6 characters'
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const submitFormHandler = async values => {
                      console.log(process.env.REACT_APP_BACKEND_URL);
                        try {
                            const responseData = await sendRequest(
                                process.env.REACT_APP_BACKEND_URL + '/api/users/login',
                                'POST',
                                JSON.stringify({
                                    email: values.email,
                                    password: values.password
                                }),
                                {
                                    'Content-Type': 'application/json'
                                }
                            );
                            auth.login(responseData.userId, responseData.token);
                            history.push("/");
                            
                        } catch(err) {
                          setSubmitting(false);
                          console.log(err);
                        }
                    }
                    submitFormHandler(values);
                }}
            >{({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue
            }) => (
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            autoComplete="email"
                        />
                        <div style={{ margin: "10px", color: "red" }}>
                            {errors.email && touched.email && errors.email}
                        </div>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <div style={{ margin: "10px", color: "red" }}>
                            {errors.password && touched.password && errors.password}
                        </div>
                        </Grid>
                    </Grid>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isSubmitting} 
                    >
                        Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs>
                      <Link style={{ color: "#3f51b5", textDecoration: "none" }} to="/" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link style={{ color: "#3f51b5", textDecoration: "none" }} to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
            )}
            </Formik>
        </div>
      </Grid>
    </Grid>
  );
}

export default Signin;