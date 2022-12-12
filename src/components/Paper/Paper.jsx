import css from './Paper.module.css';

const Paper = ({ children, ...otherProps }) => {
  return (
    <div className={css.paper} {...otherProps}>
      {children}
    </div>
  );
};

export default Paper;
