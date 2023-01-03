import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/onBoarding/Login_SingUp/SignIn";
import SignUp from "./components/onBoarding/Login_SingUp/SignUp";
import DashBoardContainer from "./components/clientSetup/dashBoard/DashBoardContainer";
import ProductContainer from "./components/clientSetup/product/ProductContainer";
import SettingContainer from "./components/clientSetup/settings/SettingContainer/SettingContainer";
import RestaurantContainer from "./components/clientSetup/settings/Restaurantsetting/RestaurantContainer";
import VerifyOtp from "./components/onBoarding/verifyOtp/VerifyOtp";
import OrderContainer from "./components/clientSetup/settings/OrderSetting/OrderContainer";
import CustomerListContainer from "./components/clientSetup/settings/customerList/CustomerListContainer";
import NotificationContainer from "./components/clientSetup/settings/notifictaionSetting/NotificationContainer";
import PaymentContainer from "./components/clientSetup/settings/paymentSetting/PaymentContainer";
import DeliveryContainer from "./components/clientSetup/settings/deliverysetting/DeliveryContainer";
import ChooseTheme from "./components/clientSetup/addBussinessDetails/ChooseTheme";
import Marketing from "./components/clientSetup/marketing/marketingPage/Marketing";
import AddBannerContainer from "./components/clientSetup/marketing/ad_Banners/AddBannerContainer";
import PromoCodeContainer from "./components/clientSetup/marketing/promoCode/PromoCodeContainer";
import DiscountContainer from "./components/clientSetup/marketing/discountPage/DiscountContainer";
import ForgetPassword from "./components/onBoarding/ForgetPassword/ForgetPassword";
import EmailVerify from "./components/onBoarding/verifyEmailAfterSignup/EmailVerify";
import ResetPassword from "./components/onBoarding/ResetPassword/ResetPassword";
import SetupDomain from "./components/clientSetup/addBussinessDetails/SetupDomain";
import BusinessDetails from "./components/clientSetup/addBussinessDetails/BusinessDetails";
import BillingDetails from "./components/clientSetup/addBussinessDetails/BillingDetails";
import ResendOTP from "./components/onBoarding/resendOTP/ResendOTP";
import ResendOtpFP from "./components/onBoarding/resendOtpFp/resendOtpForgotPassword";
import { LandingPage } from "./Test";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<SignIn />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/DashBoard" element={<DashBoardContainer />} />
          <Route path="/Product" element={<ProductContainer />} />
          <Route path="/Settings" element={<SettingContainer />} />
          <Route path="/CustomerList" element={<CustomerListContainer />} />
          <Route path="/Notification" element={<NotificationContainer />} />
          <Route path="/Payment" element={<PaymentContainer />} />
          <Route path="/Delivery" element={<DeliveryContainer />} />
          <Route path="/EmailVerify" element={<EmailVerify />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/OtpVerify" element={<VerifyOtp />} />
          <Route path="/Marketing" element={<Marketing />} />
          <Route path="/AddBanner" element={<AddBannerContainer />} />
          <Route path="/PromoCode" element={<PromoCodeContainer />} />
          <Route path="/Discount" element={<DiscountContainer />} />
          <Route path="/ChooseTheme" element={<ChooseTheme />} />
          <Route path="/Restaurant" element={<RestaurantContainer />} />
          <Route path="/Order" element={<OrderContainer />} />
          <Route path="/SetupDomain" element={<SetupDomain />} />
          <Route path="/BusinessDetails" element={<BusinessDetails />} />
          <Route path="/BillingDetails" element={<BillingDetails />} />
          <Route path="/ResendOTP" element={<ResendOTP />} />
          <Route path="/ResendOtpFP" element={<ResendOtpFP />} />
          <Route path="/test" element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
