const Task = require("../models/Tasks"); //DBのデータ構造スキーマの取得
//エンドポイント処理アルゴリズム
const getAllTasks = async (req,res) => {
    try{
        const allTask = await Task.find({});
        res.status(200).json(allTask);
    } catch(err) {
        res.status(500).json(err);
    }    
};
const createTask = async (req,res) => {
    try{
        //postmanやAPITesterのBodyから取得
        const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    } catch(err) {
        res.status(500).json(err);
    }
};
const getSingleTask = async (req,res) => {
    try{
        //router.get("/:id",)のreqで、:idから取得し、全てのidに照らして対象を見つける
        const SingleTask = await Task.findOne({_id: req.params.id });
        if(!SingleTask) {
            return res.status(404).json(`_id:${req.params.id} does not exist!`);
        }
        res.status(200).json(SingleTask);
    } catch(err) {
        res.status(500).json(err);
    }
};
const updateTask = async (req,res) => {
    //res.send("Specified task is updated.");
    try{
        const updateTask = await Task.findOneAndUpdate(
            {_id: req.params.id }, //router.get("/:id",)のreqの:idで対象絞込み
            req.body, //postmanやAPITesterのBodyで更新
            {
                new: true, //更新した内容で返す
            }
        );
        if(!updateTask) {
            return res.status(404).json(`_id:${req.params.id} does not exist!`);
        }
        res.status(200).json(updateTask);
    } catch(err) {
        res.status(500).json(err);
    }
};
const deleteTask = async (req,res) => {
    //res.send("Specified task is deleted.");
    try{
        //router.get("/:id",)のreqで、:idから取得し、全てのidに照らして対象を見つける
        const deleteTask = await Task.findOneAndDelete({_id: req.params.id });
        if(!deleteTask) {
            return res.status(404).json(`_id:${req.params.id} does not exist!`);
        }
        res.status(200).json(deleteTask);
    } catch(err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
};