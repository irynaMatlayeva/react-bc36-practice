import Menu from 'components/Menu/Menu';
import UserImg from '../../assets/images/mock-user-ava.svg';

const Sidebar = () => (
  <aside>
    <div>Logo</div>
    <Menu />

    <div>
      <img src={UserImg} alt="foto" />
      <span>Bill Gates</span>
    </div>
  </aside>
);

export default Sidebar;
