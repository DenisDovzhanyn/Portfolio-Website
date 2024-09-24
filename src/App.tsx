import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './loading.css';
import { getReposFromS3 } from './repo.service';
import { Card } from './components/Card';
import {Repository} from './types/repository'

function App() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repositoryInfo = await getReposFromS3();
        setRepos(Object.values(repositoryInfo));
      } catch(error) {
        console.log('error loading');
      }
      finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);


  if (loading) {
    return (
      <div id='loading'>Loading...</div>
    )
  }

  return (
    <div className="App">
      {repos.map((repo) => (
       <Card repo = {repo}/>
      ))}
    </div>
  );

}

export default App;
