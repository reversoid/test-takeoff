export function handleAuthError(
  dispatch: (action: () => any) => any,
  action: () => any
) {
  return function (error: { message: string }) {
    if (error.message === "401") {
      dispatch(action());
    }
  };
}
