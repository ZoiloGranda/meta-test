export const getPhotoItemClasses = (isLoading: boolean) => {
  return isLoading
    ? {
        loaderClasses: "loader justify-items-center object-cover w-32 h-32",
        imgClasses: "justify-items-center object-cover hidden",
      }
    : {
        loaderClasses: "hidden",
        imgClasses:
          "justify-items-center border-2 border-solid border-indigo-600 object-cover hover:border-4 cursor-pointer hover:border-indigo-800",
      };
};
