const useToken = (): string | null => {
  return localStorage.getItem('token');
};
export default useToken;
