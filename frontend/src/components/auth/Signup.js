import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Formik } from 'formik';

import { useHttpClient } from '../hooks/http-hook';
import { AuthContext } from '../context/auth-context';

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

const Signup = () => {
    const auth = useContext(AuthContext);

    // eslint-disable-next-line
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
                    Sign up
                </Typography>
            </div>
            
            <Formik
                    initialValues={{ 
                        fname: '',
                        lname: '',  
                        email: '',
                        password: ''
                }}
                    validate={values => {
                        const errors = {};
                        if (!values.fname) {
                            errors.fname = 'Required';
                        }
                        if (!values.lname) {
                            errors.lname = 'Required';
                        }
                        
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
                            let fullname;
                            fullname = values.fname + " " + values.lname
                            try {
                                const responseData = await sendRequest(
                                    'http://localhost:5000/api/users/signup',
                                    'POST',
                                    JSON.stringify({
                                        name: fullname,
                                        email: values.email,
                                        password: values.password
                                    }),
                                    {
                                        'Content-Type': 'application/json'
                                    }
                                );
                                console.log(responseData);
                                auth.login(responseData.userId, responseData.token);
                                history.push("/");
                            } catch(err) {
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
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="fname"
                                variant="outlined"
                                fullWidth
                                label="First Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fname}
                                autoFocus
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.fname && touched.fname && errors.fname}
                            </div>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Last Name"
                                name="lname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lname}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.lname && touched.lname && errors.lname}
                            </div>
                            </Grid>
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
                            <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isSubmitting} 
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link to="/signin">
                                Already have an account? Sign in
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

export default Signup;