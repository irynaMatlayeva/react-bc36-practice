const MenuItem = ({ name, link, image }) => (
  <li>
    <a href={link}>
      {image}
      {name}
    </a>
  </li>
);

export default MenuItem;
