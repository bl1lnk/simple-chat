const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')

dotenv.config();
connectDB();
const app = express()

if(process.env.NODE_ENV == 'developement'){
    app.use(morgan("dev"))
}

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("API is running ...")
})


app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// erros middleware
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port : ${PORT}`))
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
io.sockets.on("connection", socket=>{


    socket.join('some room');
    socket.on("setup",userData => {
      
        socket.emit("connected");
    })
  

    socket.on('pong', function(data) {
        console.log('Received Pong: ', data);
      });

    socket.on("send message",()=>{
        console.log('send message')
        io.sockets.emit("receive message", "msg")
    })

})