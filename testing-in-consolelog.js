const CLI = (function(){
    const mainLoop = () => {
        while(true) {
            console.log(`Instructions: \n \
                         Choose one of the option: \n \
                         To add a task: 'addTask title project details urgency' \n \ 
                         To edit a task: 'adjust index property value' \n \
                         To get a task: 'get index' \n \
                         To get all tasks: 'getallTasks' \n \
                         To delete a task: 'deleteTask index' \n \
                         To get amount of tasks: 'length' \n \
                         To get all tasks in a project: 'project index' \n \
                         To get all projects: 'getallProjects' \n \
                         To add a project: 'addProject title' \n \
                         To delete a project: 'deleteProject index' \n \ 
                         To list categories: 'listCategories' \n \
                         To view a category: 'category index' \n \
                         To reset local storage: 'reset'`);

            let input = prompt('Enter here', '').split(' ');

            switch(input[0]) {
                case 'addTask': 
                    TaskManager.addTask(input[1], input[2], input[3], new Date(), input[4]);
                    break;

                case 'adjust': 
                    editTask(parseInt(input[1]), input[2], input[3]);
                    break;
                
                case 'get':
                    getTask(parseInt(input[1]));
                    break;

                case 'getallTasks':
                    getAllTasks();
                    break;

                case 'deleteTask':
                    removeTask(parseInt(input[1]));
                    break;

                case 'length':
                    taskLength();
                    break;

                case 'project':
                    console.log(TaskParser.parseByProject(ProjectManager.getAllProjects()[parseInt(input[1])].title));
                    break;

                case 'getallProjects':
                    console.log(ProjectManager.getAllProjects());
                    break;

                case 'addProject':
                    ProjectManager.addProject(input[1]);
                    break;

                case 'deleteProject':
                    removeProject(parseInt(input[1]));
                    break;

                case 'listCategories':
                    console.log(`
                        0: Home \n \
                        1: Today \n \
                        2: Tomorrow \n \
                        3: This Week \n \
                        4: This Month`);
                    break;

                case 'category':
                    switch(parseInt(input[1])) {
                        case 0:
                            console.log(TaskManager.getAllTasks());
                            break;
                        
                        case 1:
                            console.log(TaskParser.parseByTime(isToday));
                            break;

                        case 2:
                            console.log(TaskParser.parseByTime(isTomorrow));
                            break;

                        case 3:
                            console.log(TaskParser.parseByTime(isThisWeek));
                            break;

                        case 4:
                            console.log(TaskParser.parseByTime(isThisMonth));
                            break;
                    }
                    break;
                
                case 'reset':
                    localStorage.clear();
                    break;
            }
        }
    };

    const editTask = (index, property, value) => {
        TaskManager.getAllTasks()[index].editProperty(property, value);
    };

    const removeTask = (index) => {
        TaskManager.deleteTask(TaskManager.getAllTasks()[index].title);
    };

    const removeProject = (index) => {
        ProjectManager.deleteProject(ProjectManager.getAllProjects()[index].title);
    };

    const taskLength = () => {
        console.log('task length: ' + TaskManager.getLength());
    };

    const getTask = (index) => {
        console.log('your task: ');
        console.log(TaskManager.getAllTasks()[index]);
    };

    const getAllTasks = () => {
        console.log('all tasks: ');
        console.log(TaskManager.getAllTasks());
    };

    return {
        mainLoop,
        editTask,
        removeTask,
        taskLength,
        getTask,
        getAllTasks
    }
})();


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};