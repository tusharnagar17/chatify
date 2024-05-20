import { io } from ".";

const onlineUsers = new Map(); // Use a Map to track users

io.on("connection", (socket) => {
    socket.on("add-user", (userId)=> {
        console.log("userId socket-backend", userId)
        onlineUsers.set(userId, socket.id)
    } )

    socket.on("online-users", onlineUsers)

    socket.on("send-msg", (data)=> {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive", data.msg)
        }
    })
    // Handle disconnection
  socket.on("disconnect", () => {
    users.delete(userID);
    console.log(`User disconnected: ${username} (${userID})`);
    console.log(Array.from(users.values())); // Log remaining users
  });
});
