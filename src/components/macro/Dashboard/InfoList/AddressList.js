import React, { useState } from "react";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import useRegisterFormat from '../../../../hooks/useRegisterFormat'
import useLogin from "../../../../hooks/useLogin";
import InfoList from "./InfoList";
import RegisterAddressForm from '../../Forms/Register/RegisterAddressForm'


function AddressList(props) {
    const { token, userId } = useLogin()
    const addURL = `http://localhost:8080/customers/addAddress/${userId}`

    const [showAddress, setShowAddress] = useState(false);
    const handleShowAddress = () => setShowAddress(true);
    const handleCloseAddress = () => setShowAddress(false);
    const { handleAddressCreation } = useRegisterFormat()

    const refreshPage = () => {
        window.location.reload();
    }

    const cancelAddressRegister = () => {
        handleCloseAddress()
    }

    const handleAddress = async (inputAddress) => {
        let isValid = false
        const formatedAddress = await handleAddressCreation(inputAddress)

        console.log(formatedAddress)
        await axios.put(addURL, formatedAddress, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            handleCloseAddress()
            isValid = true
        }).catch(error => {
            alert(error)
        })
        if(isValid){
            refreshPage()
        }
        return isValid
        
    }

    return (
        <>
            <div className="col-12 d-flex justify-content-between mb-4">
                <h3>Meus Endereços</h3>
                <button class="btn-custom-default btn-principal" onClick={handleShowAddress}> Adicionar Endereço</button>
            </div>
            <Modal show={showAddress} onHide={handleCloseAddress} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Cadastrar endereço
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterAddressForm save={handleAddress} />
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button className="btn-custom-default btn-cancelar2" onClick={cancelAddressRegister}>Cancelar cadastro</button>
                </Modal.Footer>
            </Modal>
            <InfoList type="endereço" userData={props.userData} isLoading={props.isLoading} />
        </>
    )
}

export default AddressList