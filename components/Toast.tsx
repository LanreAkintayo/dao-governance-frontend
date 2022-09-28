import Image from "next/image";
import { toast } from "react-toastify";

export const ToastModal = ({
    closeToast,
    toastProps,
    status,
  }: {
    closeToast: any;
    toastProps: any;
    status: string;
  }) => {
    return (
      <div className="font-sans flex items-center">
        {status == "success" && <Image src="/success.png" width={34} height={34} objectFit="contain" />}
        {status == "failure" && <Image src="/close.png" width={34} height={34} objectFit="contain" />}
        <div className="ml-2">
          <p
            className={`text-base ${
              status == "success" ? "text-green-800" : "text-red-800"
            } font-sans`}
          >
            Transaction Notification
          </p>
          <p className="text-sm">
            Transaction {status == "success" ? "Successful" : "Failed"}
          </p>
        </div>
      </div>
    );
  };

export const displayToast = (status: string) => {
    toast(
      <ToastModal
        closeToast={undefined}
        toastProps={undefined}
        status={status}
      />,
      { autoClose: 3000, position: toast.POSITION.BOTTOM_LEFT }
    );
  };


