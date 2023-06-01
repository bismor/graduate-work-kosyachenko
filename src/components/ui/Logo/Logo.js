import './Logo.css'
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png"

export default function Logo() {
  return (
    <>
      <Link to='/' className='logo'>
        <img src={logo} alt='Логотип'/>
      </Link>
    </>
  )
}