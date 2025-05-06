import renderApi from '@/lib/api/instance';

// 랜덤 포인트(1~3) 추가
export async function addRandomPoint() {
  try {
    const api = renderApi();
    const res = await api.post('/points/box');
    return res;
  } catch (error) {
    console.log('랜덤 포인트 추가 에러: ', error);
    throw error;
  }
}

// 랜덤 포인트 추가 API를 마지막으로 호출한 시간 차이
export async function getLastAddTime() {
  try {
    const api = renderApi();
    const res = await api.get('/points/last-box-time');
    return res;
  } catch (error) {
    console.log('마지막 호출 시간 가져오기 에러: ', error);
    throw error;
  }
}
