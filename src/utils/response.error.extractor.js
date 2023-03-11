export default function errorExtractor (err) {
  let error = err.response.data.errors.error;
  let fullError = error.fullError;
  let message = error.message;
  return {
    fullError,
    message,
  };
}

