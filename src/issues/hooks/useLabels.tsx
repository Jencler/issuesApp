import { useQuery } from "@tanstack/react-query"
import { getLabels } from "../actions/get-label"

export const useLabels = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        staleTime: 1000 * 60 * 60 // 1 hora
    })

    return {
        data,
        isLoading
    }
}
