import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
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
      <AnimatePresence>
        <motion.div id='loading'
          animate = { {opacity: 1}}
          exit={ {opacity: 0} }
          transition={ {duration: 1} }>
            Welcome...
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <motion.div className="App" 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}>
      {repos.map((repo) => (
        <Card repo = {repo}/>
      ))}
    </motion.div>
  );

}

export default App;
