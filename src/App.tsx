import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { getReposFromS3 } from './repo.service';
import { Card } from './components/Card';
import {Repository} from './types/repository'
function App() {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const repositoryInfo = await getReposFromS3();
      setRepos(Object.values(repositoryInfo));
    }
    fetchRepos();
  }, []);

  
  return (
    <div className="App">
      {repos.map((repo) => (
       <Card url={repo.url} name={repo.name} readMe={repo.readMe} />
      ))}
    </div>
  );
}

export default App;
