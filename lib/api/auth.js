import renderApi from '@/lib/api/instance';

export async function postSignin({ email, password }) {
  try {
    const api = renderApi();
    const response = await api.post('/auth/sign-in', {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function postSignup({ email, password, nickname }) {
  try {
    const api = renderApi();
    const response = await api.post('/auth/sign-up', {
      email,
      password,
      nickname,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function postSignout() {
  try {
    const api = renderApi();
    const response = await api.post('/auth/sign-out');
    return response;
  } catch (error) {
    throw error;
  }
}
