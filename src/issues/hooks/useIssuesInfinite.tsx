import { useInfiniteQuery } from "@tanstack/react-query"
import { State } from "../../interfaces/issues/issues.interface"
import { getIssues } from "../actions/get-issues"
interface Props {
    state: State
    selectedLabels: string[]
}

export const useIssuesInfinite = ({ state, selectedLabels }: Props) => {

    const issuesQuery = useInfiniteQuery({
        queryKey: ['issues', 'infinite', { state, selectedLabels }],
        queryFn: ({ pageParam, queryKey }) => {

            const [, , args] = queryKey
            const { state, selectedLabels } = args as Props

            return getIssues({ state, selectedLabels, page: pageParam })
        },
        staleTime: 1000 * 60,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => lastPage.length > 0 ? pages.length + 1 : undefined


    })

    return {
        issuesQuery,
        //Acciones
    }
}