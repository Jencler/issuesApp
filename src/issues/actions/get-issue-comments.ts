import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers/sleep"
import { CommetsAPIResponse } from "../../interfaces/comments/comments.interface"

export const getIssueComments = async (issueNumber: number): Promise<CommetsAPIResponse[]> => {
    await sleep(1000)
    const { data } = await githubApi.get<CommetsAPIResponse[]>(`/issues/${issueNumber}/comments`)
    return data
}