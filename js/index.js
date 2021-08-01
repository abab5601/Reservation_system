let url = "https://script.google.com/macros/s/AKfycbwxTFCvuz-IRTbd66MtONwpuoixStw_TzH8pLqNCasscTgKN9Kv6sk9ljPSHfS-lz_7/exec" //google 專案網址
//更新社團列表
$.ajax({
	type: "post",
	data: {
		"method": "Societies_list_Get"
	},
	url: url, //填入網路應用程式網址
	success: function (e) {
		$('#Society_list > button').text("點擊選擇社團");
		$('#Society_list > button').removeAttr('disabled');
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


//社團選單選中項更新  
function Society_list_Selected(value) {
	$('#Society_list > div > a').attr("class", "dropdown-item");
	$('#Society_list > div > a:contains("' + value + '")').attr("class", "dropdown-item active");
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
			$('#class_list > button').text("點擊選擇教室");
			$('#class_list > button').removeAttr('disabled');
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
function isWeekday(date) {
	return date.getDay() % 6 !== 0;//計算工作日
}
var class_time = null;
function class_list_Selected(value) {
	$('#class_list > div > a').attr("class", "dropdown-item");
	$('#class_list > div > a:contains("' + value + '")').attr("class", "dropdown-item active");
	$('#class_list > button').text(value);
	$('#time_list > button').text("可選擇時間載入中");
	$.ajax({
		type: "post",
		data: {
			"method": "Optional_day_query",
			"class_": value,
		},
		url: url, //填入網路應用程式網址
		success: function (e) {
			class_time = e;
			$('#time_list > button').text("點擊選擇時間");
			$('#time_list > button').removeAttr('disabled');
			$('#time_list > div > a').remove();
			for (i in class_time) {
				e = class_time[i];
				if (e.Enable) {
					var a =
						'<a class="dropdown-item" href="javascript:;" onclick = "time_list_Selected('
						+ e.demand_date.Year + ',' + e.demand_date.Month + ',' + e.demand_date.Date + ');">'
						+ e.demand_date.Year + '年' + e.demand_date.Month + '月' + e.demand_date.Date + '日</a>';
					$('#time_list > div').append(a);
				}
			}//開始新增選項

		}
	});

}



function time_list_Selected(year, month, date) {
	$('#time_list > div > a').attr("class", "dropdown-item");
	$('#time_list > div > a:contains("' + year + '年' + month + '月' + date + '日")').attr("class", "dropdown-item active");
	$('#time_list > button').text(year + '年' + month + '月' + date + "日");

}
function data_resater(level) {
	switch (level) {
		case 1://社團重選
			$('#class_list > div > a').remove();
			$('#class_list > button').attr("disabled");
		case 2:
			$('#time_list > div > a').remove();
			$('#time_list > button').attr("disabled");
			break;
	}
	switch (level) {
		case 1:
			$('#class_list > button').text("請先選擇教室");
			$('#time_list > button').text("請先選擇教室");
			break;
		case 2:
			$('#time_list > button').text("時間資料載入中");
			break;
	}

	$('#class_list > div').append('<a class="dropdown-item" href="javascript:;">教室列表載入中</a>');

}
//<div class="dropdown-divider"></div>
//<a class="dropdown-item" href="#">社團三</a>



