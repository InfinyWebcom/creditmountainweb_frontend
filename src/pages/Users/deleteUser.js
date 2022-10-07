import React,{useEffect, useState} from "react"
import {Modal,Label,Input,Row,Col} from "reactstrap"
import "../../assets/scss/manual/manual.scss";
import AppConfig from 'constants/config';
import axios from 'axios';

const DeleteUser = (prop) => {
    const {deleteOpen, toggleDelete, user, hitAxios} = prop;
    const handleDelete = () =>{
        let data = { Id: user._id}
        axios.post(`${AppConfig.baseUrl}users/deleteUser`, data, {
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          }
        }).then(result => {
          console.log('result', result,result.data.title)
            if (result.data.error) {
            //   addToast(result.data.title, { appearance: 'error', autoDismiss: true });
            } else {
                hitAxios();
            //   addToast(result.data.title, { appearance: 'success', autoDismiss: true });
            }
            toggleDelete()
        }).catch(error => {
        //   addToast('Something went wrong, Please try again', { appearance: 'error', autoDismiss: true });
        });
    }
    return (
        <Modal
            isOpen={deleteOpen}
            toggle={() => {
                toggleDelete();
            }}
            centered
        >
            <div className="modal-header">
                <h5 className="modal-title mt-0">Remove Access</h5>
                <button
                    type="button"
                    onClick={() => {
                        toggleDelete();
                    }}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        Are you sure you want to Remove Access for this user ?
                    </div>
                    <div className="modal-footer mt-3">
                        <button
                            type="button"
                            className="btn btn-cmtheme"
                            onClick={() =>
                                toggleDelete()
                            }
                        >
                            No
                        </button>
                        <button type="button" className="btn btn-cmtheme" onClick={handleDelete}>
                            Yes
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default DeleteUser