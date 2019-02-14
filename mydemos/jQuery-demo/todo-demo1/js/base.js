var myToDoModule = (function(){
	// 定义变量
	var task_list = [];
	var $task_list,$content,$addTaskSubmit;

	// 初始化jquery对象
    var initJqVar = function(){
		$task_list = $('.task-list');
		$content = $('.content');
		$addTaskSubmit = $('.addTaskSubmit');
	}
	// 页面初始化的时候，从store中取出item，并渲染
	var initRenderIndex = function(){
		$task_list.html('');
		task_list = store.get('task_list') || [];
		var taskHtmlStr = '';
		for (var i = task_list.length-1; i >= 0; i--) {
			var oneItem = '<li class="task-item">'+
						'<span><input type="checkbox"></span>'+
						'<span class="item-content">'+ task_list[i].content +'</span>'+
						'<span class="fr">'+
						'	<span class="action detail">详情</span>'+
						'	<span class="action delete">删除</span>'+
						'</span>'+
					'</li>';
			taskHtmlStr += oneItem;
		}
		// 把最后的结果添加到$task_list节点的里面
		// 方法1.append 方法2.appendTo
		$(taskHtmlStr).appendTo($task_list)
	}

	// 添加 task-item 的方法
	var addTask = function(){
		var new_task = {};
		// 获取输入框的内容
		new_task.content = $content.val();
		// 更新数组操作
		task_list.push(new_task);
		store.set('task_list',task_list);
		// 渲染新添加的数据
		renderOneItem(new_task);
	}

	// 向html列表中新添加一条记录
	var renderOneItem = function(new_task){
		var oneItem = '<li class="task-item">'+
				'<span><input type="checkbox"></span>'+
				'<span class="item-content">'+ new_task.content +'</span>'+
				'<span class="fr">'+
				'	<span class="action detail">详情</span>'+
				'	<span class="action delete">删除</span>'+
				'</span>'+
			'</li>';
			$(oneItem).prependTo($task_list);
			// 渲染完成之后，清空输入框的内容
			$content.val('');
	}

	// 添加任务按钮监听事件
	var listenAddTaskItem = function(){
		$addTaskSubmit.click(function(){
			addTask()
		});
	}

    //页面初始化就要执行的方法放在initModule里面
    var initModule = function(){
		// store.set('task_list',task_list)
		initJqVar();
		initRenderIndex();
		listenAddTaskItem();
    }

	return {
		initModule : initModule
	}


})();

$(function(){
	myToDoModule.initModule();
})
