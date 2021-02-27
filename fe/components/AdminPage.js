import React, {useState} from 'react';
import styled from 'styled-components';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const AdminPage = () => {
    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [loader,setLoader] = useState(false);
    const [globalError, setGlobalError] = useState(false);
    const [data,setData] = useState(null);
    const [validEmail, setValidEmail] = useState(false);
    const [validPwd, setValidPwd] = useState(true);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [pwdErrorMsg, setPwdErrorMsg] = useState("");

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setGlobalError(false);
    };

    const checkValidation = () => {
        const isValidPwd = pwd !== "";
        setValidPwd(isValidPwd);
        setPwdErrorMsg(isValidPwd ? "" : "Password not valid");
        const isValidEmail = validateEmail(email);
        setValidEmail(!isValidEmail);
        setEmailErrorMsg(isValidEmail ? "" : "Email not valid");

        return isValidPwd && isValidEmail;
    }
    const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const onHandleEmail = e => {
        setEmail(e.target.value);
        const isValidEmail = validateEmail(e.target.value);
        setValidEmail(!isValidEmail);
        setEmailErrorMsg(isValidEmail ? "" : "Email not valid");
    }
    const onHandlePwd = e => {
        setPwd(e.target.value);
        setValidPwd(e.target.value !== '');
        setPwdErrorMsg(e.target.value !== '' ? "" : "Password not valid");
    }
    const onSubmit = async () => {
        if (checkValidation()) {
            setLoader(true);
            const result = await sendRequestToAPI();
            if (!result || result.error || !result.data) {
                setEmail('');
                setPwd('');
                setGlobalError(true);
                handleOpenModal();
            }
            setData(result.data);
            setLoader(false);
        }
    }

    const sendRequestToAPI = async () => {
        try {
            const data = {email: email, password:pwd};
            const url = `${window.location.origin}/api/v1/admin`;

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
            const result = await(await fetch(url, options)).json();
            return result;

        } catch (error) {
            console.log('error.message', error.message);
        }
    }
    return (
        <AdminPageStyle>
            {data &&
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">#</TableCell>
                            <TableCell align="right">FullName</TableCell>
                            <TableCell align="right">Email)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="right">{index+1}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            {!data &&
            <div className="card">
                {openModal &&
                <Dialog
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>{globalError ? "We so sorry" : "Congratulations"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {globalError &&
                            <>
                                <div>There was problem to verify,</div>
                                <div> please try later.</div>
                            </>
                            }
                            {
                                //TODO: show data from API
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                }
                <h2 className="header secondary">Login</h2>
                {loader && <CircularProgress className="loader"/>}
                {!loader &&
                <>
                    <TextField
                        label="Email"
                        className="input"
                        fullWidth
                        error={validEmail}
                        value={email}
                        onChange={onHandleEmail}
                        helperText={emailErrorMsg}
                    />
                    <TextField
                        label="Password"
                        className="input"
                        fullWidth
                        error={!validPwd}
                        value={pwd}
                        helperText={pwdErrorMsg}
                        type="password"
                        onChange={onHandlePwd}
                    />
                    <Button className="btn-submit"
                            variant="contained"
                            color="primary"
                            onClick={onSubmit} autoFocus>
                        Login
                    </Button>
                </>
                }
            </div>
            }
        </AdminPageStyle>

    );

};


const AdminPageStyle = styled.div`
  
  .loader{
    display: flex;
    justify-content: center;
  }
  
  *, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    background-color: #efefef;
    background-color: #fff;
  }

  .card {
    background-color: #fff;
    width: 70%;
    max-width: 400px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 5px 10px;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 2.5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
  }

  .card {
    h2 {
      margin-top: 10px;
    }
  }

  .header {
    color: #555;
    padding: 0 10px;
    font-family: Montserrat;
  }

  // Fonts Classes
  .primary {
    font-family: Lato;
    font-weight: 500;
  }

  .secondary {
    font-family: Montserrat;
    font-weight: 500;
  }

  // Input Class Styling
  .input {
    position: relative;
    padding: 5px;
    margin-bottom: 7.5px;

    input {
      border: none;
      // border-bottom: 1px solid #ccc;
      margin: 5px 0;
      padding: 10px;
      width: 100%;
      transition: 0.2s ease;
    }

    label {
      position: absolute;
      bottom: 20px;
      left: 15px;
      transition: 0.2s ease;
    }
  }

  .custom-input {
    input{
      outline: none;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, $multiplierGreen 4%);
      background-position: -400px 0;
      background-size: 400px 100%;
      background-repeat: no-repeat;
      // border: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      // border-radius: 2.5px;

      &:focus {
        background-position: 0 0;
      }
    }
    label {
      color: #aaa;
      -webkit-transition: 0.25s ease;
      -moz-transition: 0.25s ease;
      -o-transition: 0.25s ease;
      transition: 0.25s ease;
    }

    input:focus + label {
      font-weight: bold;
      font-size: 12.5px;
      top: -10px;
      left: 7.5px;
    }
  }


  /* Media Queries */
  @media only screen and (max-width: 480px) {
    .card {
      width: 95%;
    }
  }
`;


export default AdminPage;