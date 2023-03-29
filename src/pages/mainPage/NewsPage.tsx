//@ts-ignore
import React, {useEffect} from 'react';
import s from './newsPage.module.css';
import {Link} from "react-router-dom";
import {useNewsStore} from '../../store/newsStore'
import { shallow } from 'zustand/shallow'
import logo from '../../assets/images/logo.jpg'
import CachedIcon from '@mui/icons-material/Cached';
import {useCommentsStore} from "../../store/commentsStore";
import {useInView} from "react-intersection-observer";
import StarIcon from '@mui/icons-material/Star';

function NewsPage() {

    useEffect(() => {
        console.log('kldl')
         !reload && !newsArray.length && setNews()
    }, [])


    const [reload, setReload] = React.useState(false)
    const setNews = useNewsStore((state) => state.setNews)
    const clearNews = useNewsStore((state) => state.clearNews)
    const newsArray = useNewsStore((state) => state.news, shallow)
    // const pending = useNewsStore((state) => state.pending)
    const setCurrentNew = useNewsStore((state) => state.setCurrentNew)
    const getComments = useCommentsStore((state) => state.getComments)
    const clearComments = useCommentsStore((state) => state.clearComments)
    const {ref, inView} = useInView({
        threshold: 0.5,
    })
    useEffect(() => {
        if (reload) {
            clearNews()
            setNews()
            setReload(false)
        }
    }, [reload])

    const [rep, setRep] = React.useState(false);

    useEffect(() => {

        //Implementing the setInterval method
        const interval = setInterval(() => {
            clearNews()
            setNews()
            setRep(!rep);
        }, 60000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [rep]);

    console.log('render')

    const getData = (unix) => {
        let a = new Date(unix * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let normalTime = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return normalTime;
    }
    // console.log(inView)

    return (
        <div className={s.wrapper}>
            <img className={s.logo} src={logo}></img>
            <button className={s.reload} onClick={() => setReload(true)}><CachedIcon/></button>
            <div className={s.List}>
                {newsArray.map((newStory, i) => (
                    <Link to={`/new/${newStory?.id}`} key={i}>
                        <div  className={s.item} onClick={() => {
                            setCurrentNew(newStory)
                            clearComments()
                            getComments(newStory.id)
                        }}>
                            <div className={s.title}>{newStory?.title}</div>
                            <div className={s.itemInfo}>
                                <span className={s.scoreBy}>{newStory?.score} <div className={s.starIcon}><StarIcon/></div> By: {newStory?.by}</span>
                                <span className={s.time}>{getData(newStory?.time)}</span>
                            </div>
                        </div>
                    </Link> ))
                }
            </div>
        </div>
    );
}

export default NewsPage;
