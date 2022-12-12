import { menuConfig } from '../../constants/menu.config';
import MenuItem from './MenuItem';

const Menu = () => (
  <nav>
    <ul>
      {menuConfig.map(({ name, link, image }) => (
        <MenuItem key={name} name={name} link={link} image={image} />
      ))}
    </ul>
  </nav>
);

export default Menu;
