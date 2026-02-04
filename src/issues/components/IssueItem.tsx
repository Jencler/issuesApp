import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { IssuesAPIResponse, State } from '../../interfaces/issues/issues.interface';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue } from '../actions/get-issue';
import { getIssueComments } from '../actions/get-issue-comments';
import { timeSince } from '../../helpers/time-since';

interface Props {
  issue: IssuesAPIResponse
}

export const IssueItem = ({ issue }: Props) => {

  const { state, title, user, comments, number, created_at } = issue

  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ['issues', number],
      queryFn: () => getIssue(number),
      staleTime: 1000 * 60
    })

    queryClient.prefetchQuery({
      queryKey: ['issues', number, 'comments'],
      queryFn: () => getIssueComments(number),
      staleTime: 1000 * 60,
    })
  }

  /* const presetData = () => {
    queryClient.setQueryData(['issues', number], issue, {
      updatedAt: Date.now() + (1000 * 60)
    })
  } */


  return (
    <div onMouseEnter={prefetchData} className="flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800">
      {state === State.Open ?
        (<FiInfo size={30} color="red" className="min-w-10" />)
        :
        (<FiCheckCircle size={30} color="green" className="min-w-10" />)}
      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${number}`)}
          className="hover:underline"
        >
          {title}
        </a>
        <span className="text-gray-500">
          {/* TODO: days ago  */}

          #{number} opened {timeSince(created_at)} ago by{' '}
          <span className="font-bold">{user.login}</span>
        </span>
        <div className='flex flex-wrap'>
          {issue.labels.map(label => (
            <span className='px-2 py-1 text-xs text-white rounded-md' key={label.id}>{label.name}</span>
          ))}
        </div>
      </div>

      <img
        src={user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{comments}</span>
      </div>
    </div>
  );
};
