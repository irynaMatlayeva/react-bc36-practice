import { StyledButton } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({
  image,
  text,
  action,
  styles,
  type = 'button',
  ...restProps
}) => {
  return (
    <StyledButton
      className={styles}
      type={type}
      onClick={action}
      {...restProps}
    >
      {image && <img src={image} alt={text}></img>}
      {text}
    </StyledButton>
  );
};

export default Button;

Button.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
  styles: PropTypes.string,
  type: PropTypes.string,
  restProps: PropTypes.any,
};
