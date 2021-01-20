const router = require('express').Router()
const Folder = require('../models/todoFolder')
const auth = require('../middleware/auth')

router.post("/newFolder", async (req,res)=>{
    const folder = new Folder({
        folder: req.body.folderName,
        color: req.body.color,
        userId: req.body.userId
    })
    try {
        const savedFolder = await folder.save()
        res.json(savedFolder)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})
router.post("/folders", async (req,res)=>{
    try {
        const folders = await Folder.find({userId:req.body.userId})
        console.log(folders)
        res.json(folders)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})
router.post("/addTask",async(req,res)=>{
    try {
        const added = await  Folder.findByIdAndUpdate(req.body.folderId,
            {
                $push:{
                    does: {task: req.body.task,complited:req.body.complited}
                }
            })

            res.json(added)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})
router.post("/updateTask", async(req,res)=>{
    try {
        const updated = await Folder.findByIdAndUpdate(req.body.folderId,{
            folder:req.body.folder,
            color:req.body.color
        })
        res.json(updated)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})

router.post("/deleteTask", async(req,res)=>{
    console.log(req.body.folderId, req.body.taskId)
    const tasks = await Folder.findByIdAndUpdate(req.body.folderId,{
        $pull:{
            does:{
                _id: req.body.taskId
            }
        }
    })    
})
router.delete("/deleteFolder", async (req,res)=>{
    try {
        const deletedFolder = await Folder.findByIdAndDelete(req.body.folderId)
        res.json(deletedFolder)
      } catch (err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = router
