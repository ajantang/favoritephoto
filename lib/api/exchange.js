import renderApi from '@/lib/api/instance';

// 포토카드 교환 승인
export async function acceptExchange({ exchangedId }) {
  try {
    const api = renderApi();
    const res = await api.post(`/exchange/${exchangedId}/accept`);
    return res;
  } catch (error) {
    console.log('교환 승인 에러 발생: ', error);

    throw error;
  }
}

// 포토카드 교환 거절
export async function refuseExchange({ exchangedId }) {
  try {
    const api = renderApi();
    const res = await api.post(`/exchange/${exchangedId}/refuse`);
    return res;
  } catch (error) {
    console.log('교환 거절 에러 발생: ', error);

    throw error;
  }
}

// 포토카드 교환 취소(삭제)
export async function deleteExchange({ exchangedId }) {
  try {
    const api = renderApi();
    const res = await api.delete(`/exchange/${exchangedId}`);
    return res;
  } catch (error) {
    console.log('교환 삭제 에러 발생: ', error);

    throw error;
  }
}
