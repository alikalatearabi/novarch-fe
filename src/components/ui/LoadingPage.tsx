import { Spinner } from "@radix-ui/themes";

export default function LoadingPage() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex flex-row justify-center items-center w-full h-full min-h-56 min-w-40">
            <Spinner size="3" />
        </div>
    )
  }