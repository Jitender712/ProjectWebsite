import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RightSide from '../Profile/RightSide'
import Sidebar from '../sideBar/SideBar'
import Product from './Product/Product'
import "./ProductContainer.css"

const ProductContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);
  return (
    <div className='ContainerProduct'>
        <div className="WrapperProduct"
          style={{
            gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
          }}>
            <Sidebar />
            <Product/>
            <RightSide/>
        </div>
      
    </div>
  )
}

export default ProductContainer
