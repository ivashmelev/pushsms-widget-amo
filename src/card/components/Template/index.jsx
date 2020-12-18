import React, { useRef } from 'react';
import { Button, Modal } from 'antd';
import styles from './Template.module.scss'
import TemplateSidebar from './TemplateSidebar';
import TemplateDetails from './TemplateDetails';
import { useState } from 'react';

const Template = ({
    isVisible,
    templates,
    create,
    update,
    remove,
    close,
}) => {

    const wrapperElement = useRef();

    const [state, setState] = useState({
        name: '',
        text: '',
        currentId: null
    })

    const onCreate = () => {
        create(state)

        setState({ ...state, name: '', text: '', currentId: null })

    }

    const onDelete = () => {
        if (state.currentId) {
            remove(state.currentId)

            setState({ ...state, name: '', text: '', currentId: null })
        }
    }

    const onUpdate = () => {
        if (state.currentId) {
            update(state.currentId, state)

            setState({ ...state, name: '', text: '', currentId: null })
        }
    }

    const createNewTemplate = () => {
        setState({ ...state, name: 'Новый шаблон', text: '', currentId: null })
    }

    return (
        <div ref={ wrapperElement }>
            <Modal
                centered
                visible={ isVisible }
                footer={ null }
                getContainer={ () => wrapperElement.current }
                width={ 600 }
                onCancel={ close }
            >
                <div className={ styles.wrapper }>
                    <TemplateSidebar state={ state } setState={ setState } templates={ templates } />
                    <TemplateDetails state={ state } setState={ setState } />
                </div>
                <div className={ styles.footer }>
                    <div>
                        { templates.length > 0 &&
                            <Button
                                type='dashed'
                                onClick={ createNewTemplate }
                            >
                                { !state.currentId && state.name || 'Создать шаблон' }
                            </Button>
                        }
                    </div>
                    <div>
                        <Button
                            className={ styles.button }
                            type='primary'
                            danger
                            disabled={ !state.currentId }
                            onClick={ onDelete }
                        >
                            Удалить
                        </Button>
                        <Button
                            className={ styles.button }
                            type='primary'
                            onClick={ state.currentId ? onUpdate : onCreate }
                        >
                            { state.currentId ? 'Сохранить' : 'Создать' }
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Template;
