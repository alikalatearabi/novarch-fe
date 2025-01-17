import toast from "react-hot-toast";

export const successMessage = (msg: string) => {
  return toast.success(msg, {
    className: "bg-gray-700 text-white text-[13px]",
  });
};

export const errorMessage = (msg: string) => {
  return toast.error(msg, {
    className: "bg-gray-700 text-white text-[13px]",
  });
};