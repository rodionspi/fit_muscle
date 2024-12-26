import axios from 'axios';

const API_URL = "https://api-inference.huggingface.co/models/timpal0l/mdeberta-v3-base-squad2";
const API_TOKEN = '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'; // Замените на ваш токен

interface QAInput {
  question: string;
  context: string;
}

const queryModel = async (input: QAInput) => {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: input },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );
    console.log('Model response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.response?.data || error.message);
    } else {
      console.error('Error:', (error as Error).message);
    }
  }
};

export { queryModel };