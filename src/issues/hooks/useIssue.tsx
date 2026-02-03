import { useQuery } from "@tanstack/react-query"
import { getIssue } from "../actions/get-issue"
import { getIssueComments } from "../actions/get-issue-comments"

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60
    })

    const commentsQuery = useQuery({
        queryKey: ['issue', issueNumber, 'comments'],
        queryFn: () => getIssueComments(issueNumber),
        staleTime: 1000 * 60,
        enabled: issueQuery.data !== undefined
    })
    return {
        issueQuery,
        commentsQuery
    }
}
