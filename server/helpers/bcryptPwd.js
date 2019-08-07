import bcrypt from 'bcrypt';

const hashThePassword = (password) => {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
};

const checkThepassword = (hashPassword, password) => {
    return bcrypt.compareSync(password, hashPassword);
}

export default { hashThePassword, checkThepassword }