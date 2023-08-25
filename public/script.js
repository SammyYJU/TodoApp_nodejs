//console.log(axios); //for Debug
// DB(/api/v1/tasks） からタスクを読み込む
//親ドキュメントのdiv class="tasks"ClassのNOdeをDOMにセットする
const tasksDOM = document.querySelector(".tasks");
//親ドキュメントの class="task-form"　のボタンを含むClassのNodeをセットする
const formDOM = document.querySelector(".task-form");
//親ドキュメントの class="task-input"　ClassのNodeをセットする
const taskInputDOM = document.querySelector(".task-input");
//親ドキュメントの class="form-alert"　ClassのNodeをセットする
const formAlertDOM = document.querySelector(".form-alert");

// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
    try {
        //自作のAPIをコールする //DB構造の中から"data"に絞ってgetする
        const {data: tasks} = await axios.get("/api/v1/tasks");
//      const tasks = await axios.get("/api/v1/tasks");  //DB構造全てを取ってくる場合
//      console.log(tasks); //取得したTasksのDB中身をコンソールに表示させる
        //タスクが一つもない空の場合
        if(tasks.length < 1){
            tasksDOM.innerHTML = `<h5 class="empty-list">No Tasks exist in the DB. </h5>`;
            return;
        }
        //タスクを出力
        const allTasks = tasks.map((task) => { //一つずつ取り出す（Mapするモダン関数）
            const {completed, _id, name} = task; //DBからの分割代入法{}モダン
//          console.log(task.name); //task構造からname要素のみ取り出す方法(２)
            //${completed && "task-completed"}：completed が TrueならFontフォームを"task-completed"
            return `<div class="single-task ${completed && "task-completed"}">
            <h5>
                <span><i class="far fa-check-circle"></i></span>${name}
            </h5>
            <div class="task-links">
                <!--編集リンク-->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <!--ゴミ箱ボタン-->
                <button type="button" class="delete-btn" data-id="${_id}">
                     <i class="fas fa-trash"></i>
                </button>
            </div>
            </div>`;
        }).join(""); //配列区切りのカンマを除去する
        //console.log(allTasks);
        //親ドキュメントのdiv class="tasks"の下層Nodeに差し込む
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    } 
};

showTasks();

//タスクを新規作成する
formDOM.addEventListener("submit",async (event)=>{
    event.preventDefault(); //ボタンを押した時のリロードを阻止する
    const name = taskInputDOM.value;
    //console.log(name);
    //const name ="NodejsTest";
    try {
        await axios.post("/api/v1/tasks",{name: name}); //同じnameでも、最初はDBのSchema 次は読込値
        //taskInputDOM.value="";
        formAlertDOM.style.display = "block"; //表示有効化
        formAlertDOM.textContent = "Success to add the Task.";
        formAlertDOM.classList.add("text-success"); //defaultのフォント指定を変える
        showTasks();
    } catch(err) {
        console.log(err);
        formAlertDOM.style.display = "block"; //表示有効化
        formAlertDOM.innerHTML = "Invalid input. Please retry.";
        formAlertDOM.classList.remove("text-success"); //defaultのフォント指定に戻す
    }
    setTimeout(() => { //Alert表示のタイマー
        formAlertDOM.style.display = "none"; //一定時間後に表示無効化
    }, 5000); 
});

//タスクを削除する
tasksDOM.addEventListener("click",async (event) => {
    const element = event.target;
//    console.log(element.parentElement); //アイコンをクリックした時の要素をコンソール表示する
    if(element.parentElement.classList.contains("delete-btn")){
        const id = element.parentElement.dataset.id;
//        console.log(id);
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch(err)  {
            console.log(err);
        }
    };
});

