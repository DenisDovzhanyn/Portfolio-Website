import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import './App.css';
import './loading.css';
import { getReposFromS3 } from './repo.service';
import { Card } from './components/Card';
import {Repository} from './types/repository'
import { ImageLink } from './components/ImageWithText';
import gitHubIcon from './assets/Images/GitHub.svg';
import LinkedinIcon from './assets/Images/Linkedin.svg';
import EmailIcon from './assets/Images/Email.svg';
import ResumeIcon from './assets/Images/Resume.svg';

function App() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayedRepos, setDisplayedRepos] = useState<Repository[]>([]);
  const [enterDirection, setEnterDirection] = useState<'left' | 'right'>('left');

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
    setEnterDirection('left');
    // setTimeOut here to let the cards receive the Enterdirection update,
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
    setEnterDirection('right');
    
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
      <div className='head'>
        <ImageLink text='Github' src={gitHubIcon} link='https://github.com/DenisDovzhanyn' isDownload={false}/>
        <h1 id='name'>Denis Dovzhanyn</h1>
        <ImageLink text='Linkedin' src= {LinkedinIcon} link='https://www.linkedin.com/in/denis-dovzhanyn/' isDownload={false}/>
      </div>
      
      <div className='main'>
      
        <motion.button className ='previousCard' 
        onClick={previousCard}
        whileHover={{
          scale: 1.05,
          transition: {duration: 0.5}
        }}
        whileTap={{
          scale: 0.9,
          transition: {duration: 0.2}
        }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM116.7 244.7l112-112c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8l0 64 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 64c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5l-112-112c-6.2-6.2-6.2-16.4 0-22.6z"/>
          </svg>
        </motion.button>


        <div className='cardContainer'>
          {displayedRepos.map( (repo, index) => 
            <Card repo = {repo} key={repo.name} direction={enterDirection} index={index}/>
          )}
        </div>

        <motion.button className ='nextCard' 
        onClick={nextCard} 
        whileHover={{
          scale: 1.05,
          transition: {duration: 0.5}
        }}
        whileTap={{
          scale: 0.9,
          transition: {duration: 0.2}
        }}
        > 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm395.3 11.3l-112 112c-4.6 4.6-11.5 5.9-17.4 3.5s-9.9-8.3-9.9-14.8l0-64-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-64c0-6.5 3.9-12.3 9.9-14.8s12.9-1.1 17.4 3.5l112 112c6.2 6.2 6.2 16.4 0 22.6z"/>
          </svg>
        </motion.button>
      </div>
      <div className='footer'>
        <ImageLink text='Contact me' src={EmailIcon} link='mailto:denisdovzhanyn03@gmail.com' isDownload={false}/>
        <ImageLink text='Download my resume' src={ResumeIcon} link={require('./assets/Denis-Dovzhanyn-RESUME.pdf')} isDownload={true}/>
      </div>
    </div>
  );

}

export default App;
