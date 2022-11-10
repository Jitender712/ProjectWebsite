import React from "react";
import logo from "../../components/Image/Logo.png"

const HeaderForOnboarding = () => {
  return (
    <div className="LogoContainers">
      <div className="Logo_imgs" style={{
        marginTop : "25px",
        marginLeft: "25px"
      }}>
        <img src={logo} alt="logo" />
      </div>
      <div className="Microdemand">
        <span>MICRO</span>
        <br />
        <span>
          <b>DEMAND</b>
        </span>
      </div>
    </div>
  );
};

export default HeaderForOnboarding;
