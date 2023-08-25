const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM  = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
//HOWTO: Consoleに”window.location”パラメータを一度出力し、必要な因子が”search”である事を知る
console.log(window.location);
const params = window.location.search; //URL含むwindowの表示情報
const id = new URLSearchParams(params).get("id"); //URLからパラメータを抽出するクラス


//一つの特定タスクを取得する
const showTask = async () => {
    try {
        const { data: task} = await axios.get(`/api/v1/tasks/${id}`)
        const { _id, completed, name } = task;
        taskIDDOM.textContent = _id;
        taskNameDOM.value = name;
        if(completed){
            taskCompletedDOM.checked = true;
        }
    } catch (err) {
        console.log(err);
    }
};
showTask();

//タスクの編集
editFormDOM.addEventListener("submit",async (e) => {
    e.preventDefault(); //リロードしない
    try {
        const taskName = taskNameDOM.value;
        taskCompleted = taskCompletedDOM.checked;
        const {data: task} = await axios.patch(`/api/v1/tasks/${id}`,{
            name: taskName,
            completed: taskCompleted,
        })
        //Editの成功アラート表示
        formAlertDOM.style.display = "block"; //表示有効化
        formAlertDOM.textContent = "Edit is done.";
        formAlertDOM.classList.add("text-success"); //フォント指定に戻す
    } catch (err) {
        console.log(err);
    }
    setTimeout(() => { //Alert表示のタイマー
        formAlertDOM.style.display = "none"; //一定時間後に表示無効化
    }, 3000); 
});

