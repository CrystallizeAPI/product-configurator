import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useUrlState = <
  T extends Record<string, string | string[] | undefined>
>() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const state = Object.fromEntries(searchParams) as T;

  const setState = useCallback(
    (nextState: T) => {
      const sanitized = JSON.parse(JSON.stringify(nextState));
      const search = new URLSearchParams(sanitized).toString();

      router.push(`${pathname}${search ? `?${search}` : ""}`, {
        scroll: false,
      });
    },
    [pathname, router]
  );

  return [state, setState] as const;
};
