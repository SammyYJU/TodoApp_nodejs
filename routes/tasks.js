const express = require("express");
//Routerクラスで、上位のapp(=router)同様に関数が使える
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks");

router.get("/",getAllTasks);
router.post("/",createTask);
router.get("/:id",getSingleTask);
router.patch("/:id",updateTask);
router.delete("/:id",deleteTask);

//routerを上位のapp.jsで使えるようExportする
//上位ではこのモジュールをrequireするだけで、routerを呼び出すのと同じ
module.exports = router;