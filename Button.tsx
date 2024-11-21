import { ReactNode } from 'react';
import './button.css';

type ButtonVariant = 'primary' | 'neutral' | 'subtle';
type ButtonSize = 'small' | 'medium';

// Interface for properties common to both anchor and button elements.
interface CommonButtonProps {
  ariaLabel?: string;
  disabled?: boolean;
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

//  this interface is based on other types but adds or overrides specific properties.
interface AnchorButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonButtonProps>, CommonButtonProps {
  href: string;
  as: 'a';
}

interface NativeButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonButtonProps>, CommonButtonProps {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
}

// Union type for all possible props
type ButtonProps = AnchorButtonProps | NativeButtonProps;



export const Button = ({
  ariaLabel,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  iconLeft,
  iconRight,
  children,
  as = 'button',
  ...restProps
}: ButtonProps) => {
    // Initialize the class name array with the base button class and size/variant modifiers
  const className = [
    'btn',
    `btn-size-${size}`,
    `btn-variant-${variant}`,
  ];

  if (iconLeft) {
    className.push('btn-with-icon-left');
  }

  if (iconRight) {
    className.push('btn-with-icon-right');
  }

  // Initialize the contents array to hold the button's children and icons
  const contents: ReactNode[] = [];

  if (iconLeft) {
    contents.push(
      <span className='btn-icon-left'>
        {typeof iconLeft === 'string' ? <img src={iconLeft} alt='' /> : iconLeft}
      </span>
    );
  }

  contents.push(<span className='btn-text'>{children}</span>);

  if (iconRight) {
    contents.push(
      <span className='btn-icon-right'>
        {typeof iconRight === 'string' ? <img src={iconRight} alt='' /> : iconRight}
      </span>
    );
  }

  if (as === 'a') {
    const { href, onClick, ...anchorProps } = restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    if (disabled) {
      className.push('btn-disabled');
    }
    return (
      <a
        aria-label={ariaLabel}
        className={className.join(' ')}
        href={href}
        onClick={onClick}
        {...anchorProps}
      >
        {contents}
      </a>
    );
  } else {
    const { type = 'button', onClick, ...buttonProps } = restProps as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        aria-label={ariaLabel}
        className={className.join(' ')}
        disabled={disabled}
        onClick={onClick}
        type={type}
        {...buttonProps}
      >
        {contents}
      </button>
    );
  }
};
