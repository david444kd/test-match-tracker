"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium ${
        isPending ? "opacity-70 cursor-wait" : ""
      } flex items-center`}
    >
      {isPending ? (
        <>
          <p>Обновить</p>
          <svg
            className="ml-2 w-5 h-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </>
      ) : (
        "Обновить"
      )}
    </button>
  );
}
