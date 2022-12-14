import PropTypes from 'prop-types';

const Main = ({ children }) => {
  return <main>{children}</main>;
};

export default Main;

Main.protoTypes = {
  children: PropTypes.node.isRequired,
};
