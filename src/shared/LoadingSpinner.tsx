import { Loader } from "lucide-react"

export const LoadingSpinner = () => {
    return (
        <div className="loading">
            <div className="flex w-full h-42 justify-center items-center">
                <Loader className="animate-spin" />
            </div>
        </div>
    )
}
