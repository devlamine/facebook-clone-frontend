import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";
import RegisterForm from "../forms/RegisterForm";

const RegisterModal = ({ isVisible, setIsVisible, setSuccessInfo }) => {
  const handleCancle = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <Modal
        footer={null}
        centered={true}
        visible={isVisible}
        onCancel={handleCancle}
      >
        <RegisterForm
          setIsVisible={setIsVisible}
          setSuccessInfo={setSuccessInfo}
        />
      </Modal>
    </div>
  );
};

export default RegisterModal;
