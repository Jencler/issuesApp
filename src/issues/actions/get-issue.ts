import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers/sleep"
import { IssuesAPIResponse } from "../../interfaces/issues/issues.interface"

export const getIssue = async (issueNumber: number): Promise<IssuesAPIResponse> => {
    await sleep(1000)
    const { data } = await githubApi.get<IssuesAPIResponse>(`/issues/${issueNumber}`)
    return data
}