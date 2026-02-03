import { IssuesAPIResponse } from '../../interfaces/issues/issues.interface';
import { IssueItem } from './IssueItem';
interface Prosp {
  issues: IssuesAPIResponse[]
}

export const IssueList = ({ issues }: Prosp) => {

  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4">
        <button className="btn active">All</button>
        <button className="btn">Open</button>
        <button className="btn">Closed</button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </>
  );
};
