import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import logo from './logo.svg';
import './App.css';
import './loading.css';
import { getReposFromS3 } from './repo.service';
import { Card } from './components/Card';
import {Repository} from './types/repository'
import { isVisible } from '@testing-library/user-event/dist/utils';

function App() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayedRepos, setDisplayedRepos] = useState<Repository[]>([]);

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

  useEffect(() => {
    if(!repos.length) return; 

    setDisplayedRepos(repos.slice(0,3));
  }, [repos])

  const nextCard = () => {
    setDisplayedRepos( currentDisplayed => {
      
      const originalRepoIndex: number = repos.findIndex(
        (repo: Repository) => currentDisplayed[2] === repo);

      const isOutOfBounds: boolean = (repos.length - 1 === originalRepoIndex)
 
      const temp = isOutOfBounds ? [...currentDisplayed.slice(1), repos[0]] : [...currentDisplayed.slice(1), repos[originalRepoIndex + 1]];
     
      return temp;
    })
  }


  const previousCard = () => {
    setDisplayedRepos( currentDisplayed => {

      const originalRepoIndex: number = repos.findIndex(
        (repo: Repository) => currentDisplayed[0] === repo);

      const isOutOfBounds: boolean = (originalRepoIndex === 0);
      
      return isOutOfBounds ? [repos[repos.length - 1], ...currentDisplayed.slice(0,2)] : [repos[originalRepoIndex - 1], ...currentDisplayed.slice(0,2)]
    })
  }

  if (loading) {
    return (

      <AnimatePresence>
        <motion.div id='loading'
          key = 'loadingg'
          initial = { {opacity: 0} }
          animate = { {opacity: 1} }
          exit={ {x: -300, opacity: 0} }
          transition={ {duration: 1} }>
          Welcome...
        </motion.div>
      </AnimatePresence>
    )
  }
  return (
    <div className="App" >
      {displayedRepos.map((repo) => (
        <Card repo = {repo} 
        key={repo.name}/>
      ))}

      <button onClick={nextCard}> CLICK ME PLEASE GOD</button>
      <button onClick={previousCard}> PLEASE DONT CLICK ME OH MY GOD</button>
    </div>
  );

}

export default App;
