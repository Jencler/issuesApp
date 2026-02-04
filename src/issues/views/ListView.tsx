import { useState } from 'react';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { State } from '../../interfaces/issues/issues.interface';

export const ListView = () => {

  const [state, setState] = useState<State>(State.All)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const { issuesQuery } = useIssues({ state, selectedLabels })

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
          <IssueList issues={issues} onStateChange={setState} state={state} />
        }
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker selectedLabels={selectedLabels} onLabelSelected={onLabelSelected} />
      </div>
    </div>
  );
};
