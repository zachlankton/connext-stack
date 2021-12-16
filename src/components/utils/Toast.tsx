import { useRef } from "react";
import tStyle from "./Toast.module.css";

export default function Toast() {
  const suc = useRef<HTMLDivElement>(null);
  const err = useRef<HTMLDivElement>(null);

  const toast = (status: string) => {
    if (status === "success") {
      suc.current!.classList.toggle(tStyle.show);
      setTimeout(() => suc.current!.classList.toggle(tStyle.show), 2000);
    }
    if (status === "error") {
      err.current!.classList.toggle(tStyle.show);
      setTimeout(() => err.current!.classList.toggle(tStyle.show), 2000);
    }
  };

  const Toast = () => (
    <>
      <div className={tStyle.success} ref={suc}>
        Saved !!!
      </div>
      <div className={tStyle.error} ref={err}>
        Error Saving!
      </div>
    </>
  );

  return { toast, Toast };
}
