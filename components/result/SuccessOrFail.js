import classNames from 'classnames';
import Button from '../buttons/Button';
import styles from './SuccessOrFail.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * 
 * @param task
 * @param style
 * @param button
 * @param grade
 * @param name
 * @param quantity
 * 
 * ex)
    <SuccessOrFail
      task={"판매 등록"}  ("판매 등록", "구매", "교환 제시", "포토카드 생성" 등)
      style={"success"}   (성공일 경우 "success", 실패일 경우 "fail")
      button={"나의 판매 포토카드에서 확인하기"}  (button에 들어갈 text 입력)
      grade={"RARE"}      (여기부터는 필요한 부분만 입력하면 된다. grade, name, quantity)
      name={"우리집 앞마당"}
      quantity={2}
    />

    grade, name, quantity는 데이터에 맞게 수정될 수도 있음
    toPath() 주소는 수정될 수 있음
 */

export default function SuccessOrFail({
  style,
  task,
  grade,
  name,
  quantity,
  button,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743); // 모바일 뷰 기준 너비 743px 이하일 때 true
    };
    handleResize(); // 컴포넌트가 마운트될 때 한 번 실행
    window.addEventListener('resize', handleResize); // 창 크기 변경시 실행

    return () => {
      window.removeEventListener('resize', handleResize); // 이벤트 리스너 해제
    };
  }, []);

  const resultClass = classNames({
    [styles[style]]: style,
  });

  const resultKorean = style === 'success' ? '성공' : '실패';

  const resultSetence = style === 'success' ? '했습니다!' : '했습니다.';

  const toPath = () => {
    if (button === '나의 판매 포토카드에서 확인하기') {
      return '/mysales';
    } else if (button === '마켓플레이스로 돌아가기') {
      return '/market';
    } else if (
      button === '마이갤러리에서 확인하기' ||
      button === '마이갤러리로 돌아가기'
    ) {
      return '/mygallery';
    } else {
      return '/';
    }
  };

  return (
    <div className={styles['center']}>
      <div className={styles['container']}>
        <div className={styles['title']}>
          {task} <span className={resultClass}>{resultKorean}</span>
        </div>
        <div className={styles['content']}>
          {grade && `[${grade} | ${name}]`} {quantity && `${quantity}장`}{' '}
          {isMobile && <br />}
          {task}에 {resultKorean}
          {resultSetence}
        </div>
        <Link href={toPath()}>
          <Button text={button} style={'thin-black-440px-60px'} />
        </Link>
      </div>
    </div>
  );
}
