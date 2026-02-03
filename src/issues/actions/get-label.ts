import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers/sleep"
import { ApiLabelsResponse } from "../../interfaces/labels/label.interface"

export const getLabels = async (): Promise<ApiLabelsResponse[]> => {
    await sleep(1000)
    const { data: labels } = await githubApi.get<ApiLabelsResponse[]>('/labels')
    return labels
}