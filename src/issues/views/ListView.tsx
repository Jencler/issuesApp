import { useState } from 'react';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { State } from '../../interfaces/issues/issues.interface';

export const ListView = () => {

  const [state, setState] = useState<State>(State.All)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const { issuesQuery, page, nextPage, prevPage } = useIssues({ state, selectedLabels })

  const issues = issuesQuery.data ?? []

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
          <>
            <IssueList issues={issues} onStateChange={setState} state={state} />
            <div className='flex justify-between items-center'>
              <button onClick={prevPage} className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>Anterior</button>
              <span>{page}</span>
              <button onClick={nextPage} className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>Siguiente</button>
            </div>
          </>
        }
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker selectedLabels={selectedLabels} onLabelSelected={onLabelSelected} />
      </div>
    </div>
  );
};
