let url = "https://script.google.com/macros/s/AKfycbxa-opIfGUszxHf6VPlddFBGr05GthmGCJpi3JkRHg/dev" //google 專案網址
//更新社團列表
$.ajax({
	type: "post",
	data: {
		"method": "Societies_list_Get"
	},
	url: url, //填入網路應用程式網址
	success: function (e) {
		//刪除載入中訊息
		$('#Society_list > div > a').remove();
		//開始新增選項
		for (i in e) {
			if (e[i] != "") {
				var a = '<a class="dropdown-item" href="javascript:;" onclick = "Society_list_Selected(' + "'" + e[i] + "'" + ');">' + e[i] + '</a>';
				$('#Society_list > div').append(a);
			}
		}
	}
});

//更新選單位置
$('#Society_list').on('hide.bs.dropdown', (e) => {
	$('#Society_list').dropdown('update');
});

//社團選單選中項更新  
function Society_list_Selected(value) {
	$('#Society_list > button').text(value);
	data_resater(1);
	//更新可選教室清單
	$.ajax({
		type: "post",
		data: {
			"method": "class_list_Get",
			"society": value,
			"userID": 1081462014,
			"username": "于肇安"
		},
		url: url, //填入網路應用程式網址
		success: function (e) {

			//刪除載入中訊息
			$('#class_list > div > a').remove();
			//開始新增選項
			for (i in e) {
				if (e[i] != "") {
					var a = '<a class="dropdown-item" href="javascript:;" onclick = "class_list_Selected(' + "'" + e[i] + "'" + ');">' + e[i] + '</a>';
					$('#class_list > div').append(a);
				}
			}

		}
	});
}
function class_list_Selected(value) {
	$('#class_list > button').text(value);
	data_resater(2);
		//更新可選教室清單
		$.ajax({
			type: "post",
			data: {
				"method": "class_list_Get",
				"society": value,
				"userID": 1081462014,
				"username": "于肇安"
			},
			url: url, //填入網路應用程式網址
			success: function (e) {
	
				//刪除載入中訊息
				$('#class_list > div > a').remove();
				//開始新增選項
				for (i in e) {
					if (e[i] != "") {
						var a = '<a class="dropdown-item" href="javascript:;" onclick = "class_list_Selected(' + "'" + e[i] + "'" + ');">' + e[i] + '</a>';
						$('#class_list > div').append(a);
					}
				}
	
			}
		});
	
}

function data_resater(level) {
	switch (level) {
		case 1://社團重選
			$('#class_list > div > a').remove();
			$('#class_list > div').append('<a class="dropdown-item" href="javascript:;">教室列表載入中</a>');
			$('#class_list > button').text("點擊選擇教室");
			$('#time_list > button').text("請先選擇教室");
			break;
		case 2:
			$('#time_list > div > a').remove();
			$('#time_list > div').append('<a class="dropdown-item" href="javascript:;">時間列表載入中</a>');
			$('#time_list > button').text("點擊選擇時間");

			break;
	}
}
//<div class="dropdown-divider"></div>
//<a class="dropdown-item" href="#">社團三</a>



