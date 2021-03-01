import React, {useState} from "react";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {TextField} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const Body = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [openModal, setOpenModal] = useState(false);
    // errors
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [nameErrorMsg, setNameErrorMsg] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const [loader,setLoader] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setGlobalError(false);
    };

    const onHandleName = e => {
        setName(e.target.value);
        const isValidName = validateFullName(e.target.value);
        setValidName(!isValidName);
        setNameErrorMsg(isValidName ? "" : "FullName not valid");
    }
    const onHandleEmail = e => {
        setEmail(e.target.value);
        const isValidEmail = validateEmail(e.target.value);
        setValidEmail(!isValidEmail);
        setEmailErrorMsg(isValidEmail ? "" : "Email not valid");
    }
    const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateFullName = fullName => {
        const re = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/;
        return re.test(String(fullName).toLowerCase());
    }

    const checkValidation = () => {
        const isValidName = validateFullName(name);
        setValidName(!isValidName);
        setNameErrorMsg(isValidName ? "" : "FullName not valid");
        const isValidEmail = validateEmail(email);
        setValidEmail(!isValidEmail);
        setEmailErrorMsg(isValidEmail ? "" : "Email not valid");

        return isValidName && isValidEmail;
    }

    const onSubmit = async () => {
        if (checkValidation()) {
            setLoader(true);
           const result = await sendRequestToAPI();
            if (!result || result.error || !result.data) {
                setEmail('');
                setName('');
                setGlobalError(true);
                handleOpenModal();
            }
            setLoader(false);
        }
    }

    const sendRequestToAPI = async () => {
        try {
            const data = {name: name, email: email};
            const url = `${window.location.origin}/api/v1/subscribe`;

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
        <Page1BodyStyle>
            <div className="body">
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
                                <div>There was problem to send your data,</div>
                                <div> please try later.</div>
                            </>
                            }
                            {!globalError &&
                            <>
                                <div>Now you subscribed to our newsletters</div>
                            </>
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
                {!openModal &&
                <div className="container">
                    <div className="card">
                        <div className="title">Subscribe for news</div>
                        {loader && <CircularProgress className="loader"/>}
                        {!loader &&
                            <>
                        <div className="input-name">
                            <TextField
                                required
                                label="Your FullName"
                                variant="outlined"
                                error={validName}
                                value={name}
                                onChange={onHandleName}
                                helperText={nameErrorMsg}
                            />
                        </div>
                        <div className="input-email">
                            <TextField
                                required
                                label="Your Email"
                                variant="outlined"
                                error={validEmail}
                                value={email}
                                onChange={onHandleEmail}
                                helperText={emailErrorMsg}
                            />
                        </div>
                        <Button className="btn-submit"
                                variant="contained"
                                color="primary"
                                onClick={onSubmit}
                        >Submit
                        </Button>
                            </>
                        }
                    </div>

                </div>
                }
            </div>

        </Page1BodyStyle>
    );
};

const Page1BodyStyle = styled.div`
  background-image: url("./static/img/newsletter.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  //height: 700px;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;

    .loader{
        top: 50px;
    }
  .modal-container {
    height: 300px;
    width: 300px;
    position: absolute;
    margin: 50%;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  }

  .container {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
    width: 400px;
    height: 350px;
    background-color: white;
    opacity: 0.9;
    border-radius: 10px;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
  }

  .btn-submit:hover {
    background-color: green;
  }

  .title {
    font-size: 24px;
    font-weight: 600;
  }
`;


export default Body;