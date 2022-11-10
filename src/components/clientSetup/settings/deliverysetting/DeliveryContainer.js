import React, { useEffect, useState } from 'react'
import './DeliveryContainer.css'
import RightSide from '../../Profile/RightSide'
import Sidebar from '../../sideBar/SideBar'
import DeliveryHeading from './DeliveryHeading'
import { useSelector } from 'react-redux'

const DeliveryContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);
  return (
    <div className="Delivery_Setting_Container">
    <div className="Delivery_Wrapper"
    style={{
      gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
    }}
    >
      <Sidebar />
      <DeliveryHeading/>
      <RightSide />
    </div>
  </div>
  )
}

export default DeliveryContainer
