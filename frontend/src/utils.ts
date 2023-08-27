export type ApiError = {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
};
// api error message
export const getError = (error: ApiError) => {
  return error.message && error.response.data.message
    ? error.response.data.message
    : error.message;
};
