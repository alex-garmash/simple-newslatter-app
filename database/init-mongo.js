db.create({
    user: "root",
    pwd: "rootpassword",
    roles: [
        {
            role: "readWrite",
            db: "subscribe"
        }
    ]
});