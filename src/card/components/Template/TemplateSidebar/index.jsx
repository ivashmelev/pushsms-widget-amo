import { Button } from 'antd';
import React from 'react'
import styles from './TemplateSidebar.module.scss'

const Sidebar = ({ state, setState, templates }) => {

    const onShow = (id) => () => {
        const index = templates.findIndex(el => el.id === id)

        setState({ ...state, ...templates[index], currentId: id })
    }



    return (

        <div className={ styles.wrapper }>
            <span className={ styles.title }>Шаблоны СМС</span>
            {templates.length > 0 ?
                templates.map(({ id, name, text }) => {
                    return (
                        <div className={ `${styles.element} ${state.currentId === id ? styles.active : ''}` }
                            key={ id }
                            onClick={ onShow(id) }
                        >
                            { name }
                        </div>
                    )
                })
                :
                <div className={ styles.element }>
                    <span className={ styles.grey }>Нет шаблонов</span>
                </div>
            }
        </div>
    )
}

export default Sidebar
