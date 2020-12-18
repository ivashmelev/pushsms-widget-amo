const pathname = location.pathname.split('/');

export const getEntity = () => {
    const entities = ['leads'];

    if (entities.includes(pathname[1])) {
        return pathname[1];
    }
}

export const getIdEntity = () => {
    const entity = getEntity()
    const id = Number(pathname[3]);

    if (entity && pathname[2] === 'detail' && !isNaN(id)) {
        return id;
    }
} 