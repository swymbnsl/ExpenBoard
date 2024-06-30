import toast from "react-hot-toast";

const styles = {
  background: "#37393e",
  color: "white",
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    style: styles,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    style: styles,
  });
};
