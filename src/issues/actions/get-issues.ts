import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers/sleep"
import { IssuesAPIResponse, State } from '../../interfaces/issues/issues.interface';

export const getIssues = async (state: State, selectedLabels: string[]): Promise<IssuesAPIResponse[]> => {
    await sleep(1000)

    const params = new URLSearchParams()

    if (state !== State.All) {
        params.append('state', state)
    }

    if (selectedLabels.length > 0) {
        params.append('labels', selectedLabels.join(','))
    }

    const { data } = await githubApi.get<IssuesAPIResponse[]>('/issues', {
        params: params
    })
    return data

}