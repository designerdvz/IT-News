import React from 'react';
import s from './newsList.module.css';
import {Link} from "react-router-dom";

function NewsList() {
    const newsArray = [
        {
            id: 4,
            by: 'Mandy',
            time: '23/11/03',
            score: 3,
            title: 'Этот текст вообще не выдуманный. Реально говорю'
        },
        {
            id: 5,
            by: 'Andy',
            time: '22/10/05',
            score: 3,
            title: 'hello everyBody'
        },
        {
            id: 6,
            by: 'Alex',
            time: '20/13/06',
            score: 3,
            title: 'Седалищные бугры. Или седалищное Мурино........'
        },
    ]
    return (
        <div className={s.wrapper}>
            <button className={s.reload}>reload</button>
            <div className={s.List}>
                {newsArray.map((newStory) => (
                    <Link to={`/new/${newStory.id}`}>
                        <div className={s.item}>
                            <div className={s.title}>{newStory.title}</div>
                            <div className={s.itemInfo}>
                                <span className={s.scoreBy}>{newStory.score}/10. By: {newStory.by}</span>
                                <span className={s.time}>{newStory.time}</span>
                            </div>
                        </div>
                    </Link>
                    )
                )}
            </div>
        </div>
    );
}

export default NewsList;
