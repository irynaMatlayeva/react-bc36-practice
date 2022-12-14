import css from './Paper.module.css';
import PropTypes from 'prop-types';

const Paper = ({ children, classes, ...otherProps }) => {
  return (
    <div className={`${css.paper} ${classes}`} {...otherProps}>
      {children}
    </div>
  );
};

export default Paper;

Paper.propTypes = {
  otherProps: PropTypes.any,
  classes: PropTypes.string,
  children: PropTypes.node.isRequired,
};
