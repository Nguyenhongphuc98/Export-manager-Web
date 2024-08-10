import { useSearchParams } from "next/navigation";

export function useParamsValue(...args: string[]) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
  
    return args.reduce((pre: any, currKey: string) => {
        const currValue = params.get(currKey) || "";
        pre[currKey] = currValue;
        return pre;
    }, {});
}