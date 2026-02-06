import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers/sleep"
import { IssuesAPIResponse, State } from '../../interfaces/issues/issues.interface';

interface Props {
    state: State,
    selectedLabels: string[],
    page: number
}

export const getIssues = async ({ page, selectedLabels, state }: Props): Promise<IssuesAPIResponse[]> => {
    await sleep(1000)

    const params = new URLSearchParams()

    if (state !== State.All) {
        params.append('state', state)
    }

    if (selectedLabels.length > 0) {
        params.append('labels', selectedLabels.join(','))
    }

    params.append('page', `${page}`)

    params.append('per_page', `5`)

    const { data } = await githubApi.get<IssuesAPIResponse[]>('/issues', {
        params: params
    })
    return data

}