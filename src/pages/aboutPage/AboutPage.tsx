import React from 'react';
import s from './aboutPage.module.css';
import {Link} from "react-router-dom";
import {useNewsStore} from "../../store/newsStore";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PersonIcon from '@mui/icons-material/Person';
import {useCommentsStore} from "../../store/commentsStore";
import CachedIcon from '@mui/icons-material/Cached';


function AboutPage() {
    const currentNew = useNewsStore((state) => state.currentNew)
    const comments = useCommentsStore((state) => state.comments)
    const getComments = useCommentsStore((state) => state.getComments)
    const clearComments = useCommentsStore((state) => state.clearComments)
    const kids = useCommentsStore((state) => state.kids)
    const getKids = useCommentsStore((state) => state.getKids)
    const clearKids = useCommentsStore((state) => state.clearKids)

    const getData = (unix) => {
        let a = new Date(unix * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let normalTime = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return normalTime;
    }

    function paintComms(ids) {
        return (
            ids?.map(async (id) => {
                    const resultKids = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                    const obj = await resultKids.json()
                    return (
                        <div
                            onClick={() => {
                                if ('kids' in obj) {
                                    paintComms(obj?.kids)
                                } else return null
                            }}
                        >
                            <div className={s.commentBy}>
                                <div className={s.userIcon}>
                                    <PersonIcon/>
                                </div>
                                {obj.by}
                            </div>
                            <div>{obj.text}</div>
                        </div>
                    )
                }
            )
        )
    }
    const [kid, setKid] = React.useState('')
    const [kidId, setKidId] = React.useState(0)
    const [commentsCount, setCommentsCount] = React.useState(currentNew.descendants)

    return (
        <div className={s.wrapper}>
            <Link to='/' className={s.back}><KeyboardBackspaceIcon/></Link>
            <h1 className={s.title}><a href={currentNew.url} className={s.url}>{currentNew.title}</a></h1>
            <div className={s.time}>{getData(currentNew.time)}</div>

            <div className={s.by}>by: {currentNew.by}</div>
            <a href={currentNew.url} className={s.url}>ссылка на статью</a>
            <div className={s.comments}> {commentsCount} commentaries <div onClick={() => {
                clearComments()
                getComments(currentNew.id)
                setCommentsCount(currentNew.descendants)
            }} className={s.reloadIcon}><CachedIcon/></div></div>
            <hr></hr>
            {comments?.map((comment) => (
                <>
                    <div
                        className={s.comment}
                        onClick={() => {
                            if ('kids' in comment) {
                                paintComms(comment?.kids)?.[0].then((data) => {
                                    console.log(data.props)
                                    setKid(data.props.children)
                                    console.log(comment?.id)
                                    setKidId(comment?.id)
                                })
                            }
                        }}
                    >
                        <div className={s.commentBy}>
                            <div className={s.userIcon}>
                                <PersonIcon/>
                            </div>
                            {comment.by}
                        </div>
                        <div className={s.text}>{comment.text}</div>
                        { (kidId == comment.id) ? <div className={s.kidText}>{kid}</div> : null }

                    </div>
                </>
            ))}
        </div>
    );
}

export default AboutPage;
