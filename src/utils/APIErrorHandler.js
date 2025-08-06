export const handleApiError = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.msg ||
    error?.message ||
    'An error occurred'
  );
};