import css from './Paper.module.css';

const Paper = ({ children, classes, ...otherProps }) => {
  return (
    <div className={`${css.paper} ${classes}`} {...otherProps}>
      {children}
    </div>
  );
};

export default Paper;
