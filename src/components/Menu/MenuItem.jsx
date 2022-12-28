import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ name, link, image }) => (
  <li>
    <NavLink to={link}>
      {image}
      {name}
    </NavLink>
  </li>
);

export default MenuItem;

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
};
