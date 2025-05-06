import styles from '@/components/inputs/Input.module.css';
import classNames from 'classnames';
import Image from 'next/image';

/**
 * @param option
 * 1. default
 * 2. password
 * 3. search
 * 4. textarea
 * 5. price
 * @param style
 * 1. default
 * 2. password
 * 3. search / search-modal
 * 4. textarea-width(440px, 920px)
 * 5. price
 * @param visibility
 * password visibility(value : Boolean)
 * @param onClick
 * password togle event handler
 * @param error
 * react-hook-form errors
 */
export default function Input({
  visibility,
  option,
  onClick,
  style,
  error,
  ...props
}) {
  const inputClass = classNames({
    [styles[style]]: style,
    [styles['error']]: error,
  });

  const containerClass = classNames({
    [styles[`container-${style}`]]: style,
  });

  const inputs = {
    default: <input className={inputClass} {...props} />,
    password: (
      <div className={containerClass}>
        <input
          className={inputClass}
          type={visibility ? 'text' : 'password'}
          {...props}
        />
        {visibility ? (
          <div className={styles['visibility-on']} onClick={onClick}>
            <Image src={'/visibility-on.svg'} fill alt="visibility-on" />
          </div>
        ) : (
          <div className={styles['visibility-off']} onClick={onClick}>
            <Image src={'/visibility-off.svg'} fill alt="visibility-off" />
          </div>
        )}
      </div>
    ),
    search: (
      <div className={containerClass}>
        <input className={inputClass} {...props} />
        <div className={styles['vector']} onClick={onClick}>
          <Image src="/vector.svg" fill alt="vector" />
        </div>
      </div>
    ),
    textarea: <textarea className={inputClass} {...props} />,
    price: (
      <div className={containerClass}>
        <input className={inputClass} {...props} />P
      </div>
    ),
  };

  const input = inputs[option];

  return <div className={styles['input-container']}>{input}</div>;
}
