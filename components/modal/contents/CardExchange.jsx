import Button from '@/components/buttons/Button';
import Card from '@/components/cards/Card';
import Input from '@/components/inputs/Input';
import styles from '@/components/modal/contents/CardExchange.module.css';

export default function CardExchange({ onClick }) {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['card-exchange']}>포토카드 교환하기</div>
        <div className={styles['title']}>데이터 제목</div>
        <div className={styles['exchange-container']}>
          <Card />
          <div className={styles['exchange-description']}>
            <div className={styles['exchange-description-title']}>
              교환 제시 내용
            </div>
            <Input
              style={'textarea-440px'}
              placeholder={'내용을 입력해 주세요'}
              option={'textarea'}
            />
            <div className={styles['button-container']}>
              <Button
                style={'thin-black-210px'}
                children={'취소하기'}
                onClick={onClick}
              />
              <Button style={'thin-main-210px'} children={'교환하기'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
