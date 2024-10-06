import users from  "./users.data.js"

const insert = (details) => {
    const newUser = { ...details, id: users.length + 1}
    users.push(newUser);

    return newUser;
}

const get = (userId) => {
    return users.find((user) => {
        if (user.id === userId) {
            return user;
        }
        return null
    })
}

const getAll = () => {
    return users
}

const update = (userId, newDetails) => {
    let existingUser = null;
    let userIndex;
    users.map((user, index) => {
        if (user.id === userId) {
            existingUser = user;
            userIndex = index;
        }
    });

    if (!existingUser) {
        return false;
    }

    const updatedUser = {
        ...existingUser,
        ...newDetails
    }

    users.splice(userIndex, 1, updatedUser)

    return updatedUser;

    }

const remove = (userId) => {
    return users.find((user, index) => {
        if (user.id === userId ) {
            users.splice(index, 1);
            return true;
        }
        return false;
    })
}

export default {
    insert,
    get,
    getAll,
    update,
    remove
}
