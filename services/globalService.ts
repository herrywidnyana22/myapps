import { ResponseType } from "@/types";

export const onAction = async (
    action: () => Promise<ResponseType>,
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    onSuccess?: () => void, 
    onError?: (msg: string) => void,
) => {
    setIsLoading?.(true)
    const response = await action()
    setIsLoading?.(false)

    if (response.success) {
        onSuccess?.()
    } else {
        onError?.(response.msg ?? "Something went wrong.")
    }
};
