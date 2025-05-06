import styles from '@/components/buttons/Button.module.css';
import classNames from 'classnames';

/**
 * @param text - button text
 * @param count - option : count
 * @param style - thick-color-width-(option : height)-(컴포넌트별 스타일링: sell-modal)
 * 1. thick(main) : thick-main-width(343px 345px 440px)
 * 2. thin(main) : thin-main-width(72px 141px 165px 170px 210px 272px 345px [**440px(height : 55px,60px)**] 520px)
 * 3. thick(black) : thick-black-width(343px 345px 440px)
 * 4. thin(black) : thin-black-width(72px 141px 170px 210px 345px [**440px(height : 60px,80px)**] 520px)
 * 5. thin(gray) : thin-gray-width(170px 360px)
 */
export default function Button({ text, style, count, ...props }) {
  const buttonClass = classNames({
    [styles[style]]: style,
    [styles['disabled']]: props.disabled,
  });
  return (
    <>
      <button className={buttonClass} {...props}>
        {count ? `${count}개 포토보기` : text}
      </button>
    </>
  );
}
