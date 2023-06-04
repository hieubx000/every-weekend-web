// interface IHandleError {
//     isIgnoredMessage?: boolean
//     showNotFoundMessage?: boolean
//     callback?: () => void
//   }

// export const handleError = (error, options: IHandleError = {}): void => {
//     if (typeof error === "string") {
//       message.error(error);
//       return;
//     }

//     const errorDetail: ErrorResponseApi = error.response?.data || {};

//     // if (process.env.NODE_ENV === configConstant.environment.development) {
//     //   console.error(error);
//     // }
//     // push message error to sentry
//     // if (errorDetail.errorCode !== errorCodeConstant.errorNoData) {
//     //   Sentry.captureMessage(errorDetail.message, { level: Sentry.Severity.Error });
//     // }

//     // if (error.response.data.errorCode === 9000) {
//     //   // return console.error((error as ErrorMsg).response.data.message)
//     //   return alert("ádasdas")
//     // }

//     if (
//       (!options?.isIgnoredMessage && errorDetail.errorCode !== errorCodeConstant.errorNoData)
//       || (options?.showNotFoundMessage && errorDetail.errorCode === errorCodeConstant.errorNoData)
//     ) {
//       message.error(getErrorText(error))
//       return;
//     }
//     if (options?.callback) {
//       options.callback()
//     }
//   }

export const getTokenUser = () => {
  let token;
  // try {
  //   const encodedAccessToken = getAccessTokenCookieCSR()
  //   if (encodedAccessToken) {
  //     token = Base64.decode(encodedAccessToken)
  //   }
  // } catch (e) {
  //   return null
  // }
  return token;
};

export const matchYoutubeUrl = (url:any) => {
  const p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)[1];
  }
  return false;
};

export const getEmbedLinkYoutube = (youtubeLink: string) => {
  const tempArraySearch = youtubeLink?.split("?");
  const urlSearchParams = new URLSearchParams(`?${tempArraySearch[1]}`);
  const params = Object.fromEntries(urlSearchParams.entries());
  return `https://www.youtube.com/embed/${params.v}`;
};
