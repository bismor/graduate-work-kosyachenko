import './Main.css';
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab"
import Techs from '../Techs/Techs';
import AboutProject from '../AboutProject/AboutProject';
import Footer from '../Footer/Footer';


export default function Main({loggedIn, isHamburger, setIsHamburger, onHandleHamburger}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isHamburger={isHamburger}
        setIsHamburger={setIsHamburger}
        onHandleHamburger={onHandleHamburger}
      />
      <main className='main'>
        <Promo/>
        <NavTab/>
        <Techs/>
        <AboutProject/>
        <Footer/>
      </main>
    </>
  );
}