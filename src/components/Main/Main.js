import './Main.css';
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab"
import Techs from '../Techs/Techs';
import AboutProject from '../AboutProject/AboutProject';


export default function Main() {
  return (
    <>
      <Header/>
      <Promo/>
      <NavTab/>
      <Techs/>
      <AboutProject/>
    </>
  );
}