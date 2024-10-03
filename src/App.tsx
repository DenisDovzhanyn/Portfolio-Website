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
  const [exitDirection, setExitDirection] = useState('');

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
    setExitDirection('left');
    // setTimeOut here to let the cards receive the exitdirection update,
    // otherwise it can cause the cards to leave in the wrong direction
    setTimeout( () => {
      setDisplayedRepos( currentDisplayed => {
        const originalRepoIndex: number = repos.findIndex(
          (repo: Repository) => currentDisplayed[2] === repo);

        const isOutOfBounds: boolean = (repos.length - 1 === originalRepoIndex)
  
        const temp = isOutOfBounds 
        ? [...currentDisplayed.slice(1), repos[0]] 
        : [...currentDisplayed.slice(1), repos[originalRepoIndex + 1]];
      
        return temp;
      })
    }, 1)
  }


  const previousCard = () => {
    setExitDirection('right');
    
    setTimeout( () => {
      setDisplayedRepos( currentDisplayed => {
        const originalRepoIndex: number = repos.findIndex(
          (repo: Repository) => currentDisplayed[0] === repo);

        const isOutOfBounds: boolean = (originalRepoIndex === 0);
        
        return isOutOfBounds 
        ? [repos[repos.length - 1], ...currentDisplayed.slice(0,2)] 
        : [repos[originalRepoIndex - 1], ...currentDisplayed.slice(0,2)]
      })
    }, 1)
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
      <div className ='cardContainer'>
        {displayedRepos.map( (repo) => 
          <Card repo = {repo} key={repo.name} direction={exitDirection}/>
        )}
      </div>
      <div className='buttonContainer'>
        <button className ='previousCard' onClick={previousCard}>
          <svg xmlns="http://www.w3.org/2000/svg" height='80' width='80' viewBox="0 0 512 512">
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/> 
          </svg>
        </button>
        <button className ='nextCard' onClick={nextCard}> 
          <svg xmlns="http://www.w3.org/2000/svg" height="80" width="80" viewBox="0 0 512 512">
            <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
          </svg> 
        </button>
      </div>
    </div>
  );

}

export default App;
