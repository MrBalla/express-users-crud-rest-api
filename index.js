const express = require("express");
const app = express();
const port = 3000;
const db = require("./db/db.json")

app.use(express.json());

app.get("/users", (req, res) => {
  res.json(db.users)
});


app.get("/users/:id",(req,res)=>{
    const { id } = req.params
    const user = db.users.find((user) => user.id === parseInt(id))

    if(user){
        res.json(user)
    }

    res.status(404).json({message:"User Not Found !"})
})

app.post("/user",(req,res)=>{
    const newUser = {
        id: Date.now().toString(),
        name: req.body.name
    }

    db.users.push(newUser)

    res.status(201).json({message:"Created !"})
})

app.put("/users/:id",(req,res)=>{
    const { id } = req.params
    const user = db.users.find((user) => user.id === parseInt(id))

    if(user){
        user.name = req.body.name
        res.json(user)
    }

    res.status(404).json({message: "User Not Found !"})
})

app.delete("/users/:id",(req,res)=>{
    const { id } = req.params
    const userIndex = db.users.findIndex((user) => user.id === parseInt(id))

    if(userIndex !== -1){
        db.users.splice(userIndex,1)
        res.json({"message":"deleted !"})
    }

    res.status(404).json({message:"User Not Found !"})
})

app.listen(port, () => {
  console.log("Running !");
});
