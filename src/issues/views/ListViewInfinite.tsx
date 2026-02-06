import { useState } from 'react';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../../interfaces/issues/issues.interface';
import { useIssuesInfinite } from '../hooks/useIssuesInfinite';

export const ListViewInfinite = () => {

  const [state, setState] = useState<State>(State.All)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const { issuesQuery } = useIssuesInfinite({ state, selectedLabels })

  const issues = issuesQuery.data?.pages.flat() ?? []

  const onLabelSelected = (currentLabel: string) => {
    if (selectedLabels.includes(currentLabel)) {
      setSelectedLabels(selectedLabels.filter(label => label.toLowerCase() !== currentLabel.toLowerCase()))
      return
    }
    setSelectedLabels([...selectedLabels, currentLabel])
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading
          ? <LoadingSpinner />
          :
          <div>
            <IssueList issues={issues} onStateChange={setState} state={state} />
            <div className='flex justify-center items-center flex-col'>
              {issuesQuery.isFetchingNextPage ? <LoadingSpinner /> : ""}
              <button disabled={issuesQuery.isFetchingNextPage} onClick={() => issuesQuery.fetchNextPage()} className='mt-3 p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>Cargar màs...</button>
            </div>
          </div>
        }
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker selectedLabels={selectedLabels} onLabelSelected={onLabelSelected} />
      </div>
    </div>
  );
};
