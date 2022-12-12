const MenuItem = ({ name, link, image }) => (
  <li>
    <a href={link}>
      <img src={image} alt={name} />
      {name}
    </a>
  </li>
);

export default MenuItem;
