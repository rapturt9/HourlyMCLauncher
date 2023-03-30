import './App.scss';
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useSelector } from 'react-redux';
import StatusContainer from './StatusContainer';
import FileSystem from './FileSystem';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
import { _getCurrentAccount } from '../../../../common/utils/selectors';

const apis = [
  ['https://25gpipzky9.execute-api.us-east-1.amazonaws.com/prod/', 'minecraft']
];

const username = 'rapturt9';
const statusMap = [
  'stopped',
  'launching',
  'started',
  'stopping',
  'creating',
  'deleting'
];

function App() {
  const currentAccount = useSelector(_getCurrentAccount);
  const { accessToken } = currentAccount;
  console.log(currentAccount);
  const auth = currentAccount.accessToken;
  const user = currentAccount.selectedProfile.id;
  const [obj, setObj] = useState({ domain: [], status: [] });
  const [folder, setFolder] = useState(null);
  useEffect(() => {
    const authToken = JSON.stringify({ auth, user });
    API.graphql({
      query: queries.getUser,
      variables: { user },
      authToken
    })
      .then(res => {
        console.log(res);
        if (res.data.getUser) {
          setObj(res.data.getUser);
        } else {
          API.graphql({
            query: mutations.createUser,
            variables: {
              input: {
                user,
                domain: [],
                status: [],
                credit: 0.0
              }
            },
            authToken
          }).then(res => {
            console.log(res);
            setObj(res.data.createUser);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    /* if (res.data.getUser === null) {
      API.graphql({
        query: mutations.createUser,
        variables: {
          input: {
            user,
            domain: [],
            status: [],
            credit: 0.0
          }
        }
      }).then(res => {
        setObj(res.data.getUser);
      });
    } */

    const subscription = API.graphql({
      query: subscriptions.onUpdateUser,
      variables: { user },
      authToken
    }).subscribe({
      next: ({ provider, value }) => {
        setObj(value.data.onUpdateUser);
      },
      error: error => console.warn(error)
    });
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div
      css={`
        padding: 10px;
      `}
    >
      {obj.domain.map((dmn, i) => (
        <StatusContainer
          key={dmn}
          openModal={() => {
            setFolder(dmn);
          }}
          accessToken={auth}
          server={dmn}
          user={user}
          sts={statusMap[obj.status[i]]}
        />
      ))}
      {folder !== null && (
        <FileSystem auth={auth} folder={folder} exit={() => setFolder(null)} />
      )}
    </div>
  );
}

export default App;
