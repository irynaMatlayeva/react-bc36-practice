import PropTypes from 'prop-types';

const MenuItem = ({ name, link, image }) => (
  <li>
    <a href={link}>
      {image}
      {name}
    </a>
  </li>
);

export default MenuItem;

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
};
