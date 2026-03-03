import db from "../db/db.js";
import bcrypt from "bcrypt";



export const findUserByUsername = async (username) => {
    const [results] = await db.query(
        "SELECT userId, username, password, role FROM users WHERE username = ? LIMIT 1",
        [username]
    );
    return results[0];
};

export const createUser = async (username, Plainpassword, role = "user") => {

    if(!username) throw new Error("Username is required");
    if(!Plainpassword) throw new Error("Password is required");  
    if(role !== "user" && role !== "admin") throw new Error("Invalid role");

    const psswordHash = await hashPassword(Plainpassword);


    const [result] = await db.execute(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, psswordHash, role]
    );

    return {
        userId: result.insertId,
        username,
        role
    };
};

export const hashPassword = async (password) => {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);             
}


export const validatePassword = async (Plainpassword, storedHash) => {
    return await bcrypt.compare(Plainpassword, storedHash);
}