var myToDoModule = (function(){
	// 定义变量
	var task_list = [];
	var $task_list,$content,$addTaskSubmit,$task_detail,$detail_content,$desc,$datetime,$detail_submit;
	var detailIndex,deleteIndex; // 定义点击详情和删除的时候记录的索引index

	// 初始化jquery对象
    var initJqVar = function(){
		$task_list = $('.task-list');
		$content = $('.content');
		$addTaskSubmit = $('.addTaskSubmit');
		$task_detail = $('.task-detail');
		$detail_content = $('.detail-content');
		$desc = $('.desc');
		$datetime = $('.datetime');
		$detail_submit = $('.detail-submit');
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
		// 不能在这里执行下面两条命令，否则弹窗就会弹出好几次
		/* listenDetail(); 
		listenDelete(); */
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
			listenDetail(); // 必须再次注册click事件
			listenDelete();
	}

	// 添加任务按钮监听事件
	var listenAddTaskItem = function(){
		$addTaskSubmit.click(function(){
			addTask()
		});
	}

	// 点击任务详情编辑任务明细
	var listenDetail = function(){
		$('.detail').click(function(){
			detailIndex = task_list.length - 1 - $(this).parent().parent().index();
			$task_detail.show();
			$detail_content.val(task_list[detailIndex].content);
			$desc.val(task_list[detailIndex].desc);
			$datetime.val(task_list[detailIndex].datetime);
		})
	}
	// 保存修改后的任务详情
	var listenDetailSave = function(){
		$detail_submit.click(function(){
			var dataTask = {};
			dataTask.content = $detail_content.val();
			dataTask.desc = $desc.val();
			dataTask.datetime = $datetime.val();
			// 修改后的对象和原来的对象合并 $.extend(jsonObj1,jsonObj2)
			// 相当于更新了对象
			task_list[detailIndex] = $.extend(task_list[detailIndex],dataTask)
			store.set('task_list',task_list)
			// 清空数据
			$detail_content.val('');
			$desc.val('');
			$datetime.val('');
			$task_detail.hide();
			// 重新渲染页面
			initRenderIndex();
			listenDetail(); // 必须再次注册click事件
			listenDelete();
		})
	}
	var listenDelete = function(){
		$('.delete').click(function(){
			deleteIndex = task_list.length - 1 - $(this).parent().parent().index();
			var result = confirm('你确定要删除吗？');
			if(result){
				// 第一个是索引，第二个是个数
				task_list.splice(deleteIndex,1);
				$(this).parent().parent().remove();
				store.set('task_list',task_list);
			}
		})
	}


    //页面初始化就要执行的方法放在initModule里面
    var initModule = function(){
		// store.set('task_list',task_list)
		initJqVar();
		initRenderIndex();
		listenAddTaskItem();
		listenDetail();
		$datetime.datetimepicker();
		listenDetailSave();
		listenDelete();
    }

	return {
		initModule : initModule
	}


})();

$(function(){
	myToDoModule.initModule();
})
