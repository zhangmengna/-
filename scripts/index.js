window.onload = function(){
    // 用户登录菜单的显示与隐藏效果
    var user_login = document.getElementById('user_login');
    var user_downmenu = document.getElementById('user_downmenu');
    user_login.onmouseover = function(){
        // 将用户登录菜单显示
        user_downmenu.style.display = 'block';

        var user_downmenu_style = window.getComputedStyle(user_downmenu,null);
        var user_downmenu_height = parseInt(user_downmenu_style.height);
        var user_downmenu_padding = parseInt(user_downmenu_style.paddingTop);
        var ctrl_max_height = user_downmenu_height + user_downmenu_padding;
        var ctrl_height = 0;// 初始化值

        user_downmenu.style.height = ctrl_height + 'px';

        // 实现向下滑动的动画效果
        /*var t = setInterval(function(){
            if (ctrl_height >= ctrl_max_height){
                clearInterval(t);
            }
            ctrl_height += 2;
            user_downmenu.style.height = ctrl_height + 'px';
        },1);*/
        slideDown(user_downmenu,ctrl_height,ctrl_max_height);
    }
    user_login.onmouseout = function(){
        setTimeout(function(){
            // 将用户登录菜单隐藏
            user_downmenu.style.display = 'none';
        },500);
    }

    // 搜索框的动态提示列表效果
    var search_input = document.getElementById('search_input');
    search_input.oninput = function(){
        // 1. 获取提示列表的容器元素
        var search_menu = document.getElementById('search_menu');
        // 检测作为列表容器中是否已存在无序列表 -> 如果存在，先删除之前存在的无序列表
        var result = search_menu.getElementsByTagName('ul');
        if (result.length > 0){
            search_menu.removeChild(result[0]);
        }
        // 2. 构建JSON格式的数据内容
        var search_datas = [
            { "name" : "魅蓝 Note5", "num" : 6 },
            { "name" : "魅蓝 E2", "num" : 6 },
            { "name" : "魅蓝 Note6", "num" : 7 },
            { "name" : "魅蓝手机", "num" : 85 },
            { "name" : "魅蓝5", "num" : 78 },
            { "name" : "魅蓝X", "num" : 56 },
            { "name" : "魅蓝6", "num" : 64 }
        ];
        // 创建<ul>标签 -> <ul class="service-search-menu-list"></ul>
        var ul = document.createElement('ul');
        ul.setAttribute('class','service-search-menu-list');

        // 定义表示所有<li>标签高度的总和
        var sumHeight = 0;
        // 3. 解析JSON格式的数据内容，创建对应的无序列表
        for (var i=0;i<search_datas.length;i++){
            var search_data = search_datas[i];

            // 创建<li>标签 -> <li class="service-search-menu-item"></li>
            var li = document.createElement('li');
            li.setAttribute('class','service-search-menu-item');

            var search_name = search_data.name;
            // 创建<span>标签 -> <span class="service-search-menu-name">魅蓝 Note5</span>
            var span_name = document.createElement('span');
            span_name.setAttribute('class','service-search-menu-name');
            setText(span_name,search_name);
            li.appendChild(span_name);

            var search_num = search_data.num;
            // 创建<span>标签 -> <span class="service-search-menu-num">约 6 种</span>
            var span_num = document.createElement('span');
            span_num.setAttribute('class','service-search-menu-num');
            setText(span_num,'约 '+search_num+' 种');
            li.appendChild(span_num);

            // 将新创建的<li>标签添加到<ul>标签中
            ul.appendChild(li);
        }
        // 4. 将新创建的无序列表添加到列表容器中
        search_menu.appendChild(ul);

        // 获取<ul>标签上下外边距值
        var ul_style = getStyle(ul);
        var ul_margin_top = parseInt(ul_style.marginTop);
        var ul_margin_bottom = parseInt(ul_style.marginBottom);

        // 获取<li>标签的高度
        var newLi = firstElementChild(ul);
        var li_style = getStyle(newLi);
        var li_height = parseInt(li_style.height);
        sumHeight = li_height * search_datas.length;

        setTimeout(function(){
            var ul_max_height = ul_margin_top + sumHeight + ul_margin_bottom;
            var ul_height = 0;
            // 向下滑动的动画效果
            /*var t = setInterval(function(){
                if (ul_height >= ul_max_height){
                    clearInterval(t);
                }
                ul_height += 2;
                search_menu.style.height = ul_height + 'px';
            },1);*/
            slideDown(search_menu,ul_height,ul_max_height);
            // search_menu.style.height = ul_margin_top + sumHeight + ul_margin_bottom + 'px';
        },3000);
    }

    // 页面主轮播图的效果
    var slick_index= 0;
    // 1. 向左移动的按钮
    var slick_prev = document.getElementById('slick_prev');
    slick_prev.onclick = function(){
        var slider_list = document.getElementById('slider_list');
        var slider_list_style = getStyle(slider_list);
        var slider_list_left = parseInt(slider_list_style.left);
        console.log(slider_list_left);

        var slider_container = firstElementChild(slider_list);
        var slider_container_style = getStyle(slider_container);
        var slider_container_width = parseInt(slider_container_style.width);

        var slick_dots = document.getElementById('slick_dots');
        var slick_dots_list = slick_dots.children;
        for (var i=0;i<slick_dots_list.length;i++){
            var slick_dots_item = slick_dots_list[i];
            slick_dots_item.removeAttribute('class');
        }

        slider_list_left -= slider_container_width;

        slick_index++;

        if (slick_index === slick_dots_list.length){
            slick_index = 0;
        }
        console.log(slick_index);
        if (slider_list_left === -parseInt(slider_list_style.width)){
            slider_list_left = 0;
        }

        slider_list.style.left = slider_list_left + 'px';

        slick_dots_list[slick_index].setAttribute('class','slick-ative');
    }
    // 2. 向右移动的按钮
    var slick_next = document.getElementById('slick_next');
    slick_next.onclick = function(){
        var slider_list = document.getElementById('slider_list');
        var slider_list_style = getStyle(slider_list);
        var slider_list_left = parseInt(slider_list_style.left);
        console.log(slider_list_left);

        var slider_container = firstElementChild(slider_list);
        var slider_container_style = getStyle(slider_container);
        var slider_container_width = parseInt(slider_container_style.width);

        var slick_dots = document.getElementById('slick_dots');
        var slick_dots_list = slick_dots.children;
        for (var i=0;i<slick_dots_list.length;i++){
            var slick_dots_item = slick_dots_list[i];
            slick_dots_item.removeAttribute('class');
        }

        if (slider_list_left === 0){
            slider_list_left = -parseInt(slider_list_style.width);
        }

        slider_list_left += slider_container_width;

        if (slick_index === 0){
            slick_index = slick_dots_list.length;
        }

        slick_index--;

        slider_list.style.left = slider_list_left + 'px';
        console.log(slick_index);
        slick_dots_list[slick_index].setAttribute('class','slick-ative');
    }
    // 3. 图片的导航器
    var slick_dots = document.getElementById('slick_dots');
    var slick_dots_list = slick_dots.children;
    for (var i=0;i<slick_dots_list.length;i++){
        var slick_dots_item = slick_dots_list[i];

        var slick_dot = firstElementChild(slick_dots_item);
        slick_dot.onmouseover = function(event){
            // 当前触发事件的<div>元素 -> target
            var target = event.target || event.srcElement;
            var li = target.parentNode;

            for (var j=0;j<slick_dots_list.length;j++){
                var slick_dots_item = slick_dots_list[j];
                // 利用当前目标<li>元素 -> 依次与循环中每一个进行比较
                console.log(li == slick_dots_item);
                if (li == slick_dots_item){
                    slick_index = j;
                }
                slick_dots_item.removeAttribute('class');
            }

            li.setAttribute('class','slick-ative');
            // 切换图片到对应的位置
            var slider_list = document.getElementById('slider_list');

            var slider_container = firstElementChild(slider_list);
            var slider_container_style = getStyle(slider_container);
            var slider_container_width = parseInt(slider_container_style.width);

            slider_list.style.left = -(slick_index * slider_container_width) + 'px';
        }
    }
    // 自动轮播效果
    setInterval(function(){
        var slider_list = document.getElementById('slider_list');
        var slider_list_style = getStyle(slider_list);
        var slider_list_left = parseInt(slider_list_style.left);
        console.log(slider_list_left);

        var slider_container = firstElementChild(slider_list);
        var slider_container_style = getStyle(slider_container);
        var slider_container_width = parseInt(slider_container_style.width);

        var slick_dots = document.getElementById('slick_dots');
        var slick_dots_list = slick_dots.children;
        for (var i=0;i<slick_dots_list.length;i++){
            var slick_dots_item = slick_dots_list[i];
            slick_dots_item.removeAttribute('class');
        }

        slider_list_left -= slider_container_width;

        slick_index++;

        if (slick_index === slick_dots_list.length){
            slick_index = 0;
        }
        console.log(slick_index);
        if (slider_list_left === -parseInt(slider_list_style.width)){
            slider_list_left = 0;
        }

        slider_list.style.left = slider_list_left + 'px';

        slick_dots_list[slick_index].setAttribute('class','slick-ative');
    },4000);

    // 动态显示二级菜单
    var menu_datas = [
        {
            "title" : "魅族手机",
            "items" : [
                { "img" : "imgs/Cgbj0Fl4NtOAU4aRAAvVzqN22Ug687.png", "text" : "PRO 7" },
                { "img" : "imgs/Cgbj0Vl4OdOAGsDfAAuYs_pyDV0706.png", "text" : "PRO 7 Plus" },
                { "img" : "imgs/Cix_s1g-ZXuAYp1LABY2I5awJck337.png80x80.jpg", "text" : "PRO 6 Plus" },
                { "img" : "imgs/Cgbj0VjsfjmAJR0zAAqULbIBw-M571_180x180.png", "text" : "PRO 6s" }
            ]
        },
        {
            "title" : "魅蓝手机",
            "items" : [
                { "img" : "imgs/Cgbj0VnCGzWAWqh8AAwk2MA0gtk390.png", "text" : "魅蓝 6" },
                { "img" : "imgs/Cgbj0FmdIJmAeVGmAAxAuuJkLGk921.png@480x480.jpg", "text" : "魅蓝 Note6" },
                { "img" : "imgs/Cgbj0VkAUNmAeTU2AAklK6hJr4k492.png", "text" : "魅蓝 E2" },
                { "img" : "imgs/Cgbj0FjsfnCAcnAJAAndI9Fz2pU498_180x180.png", "text" : "魅蓝 5s" },
                { "img" : "imgs/Cix_s1hGE9KAJ1E-AAv78Kz1Hok651.png@240x240.jpg", "text" : "魅蓝 Note5" },
                { "img" : "imgs/Cgbj0VjsfqyAVtTeAAtHG2nRyAc269_180x180.png", "text" : "魅蓝 E" },
                { "img" : "imgs/CnQOjVg-ZwCAEthoAAj4ScedJ9k163.png@240x240.jpg", "text" : "魅蓝 X" },
                { "img" : "imgs/Cgbj0VlSHwiAe5UBAAZIlvIJX5w205.png@240x240.jpg", "text" : "魅蓝 A5" }
            ]
        }
    ]

    // 定义设置文本内容的浏览器兼容解决方案
    function setText(elem, value){
        if (elem.textContent){
            elem.textContent = value;
        } else {
            elem.innerText = value;
        }
    }
    // 定义获取当前有效样式的浏览器兼容解决方案
    function getStyle(elem){
        var result;
        if (window.getComputedStyle){
            result = window.getComputedStyle(elem,null);
        } else {
            result = elem.currentStyle;
        }
        return result;
    }
    // 定义获取第一个子元素的浏览器兼容解决方案
    function firstElementChild(elem){
        var result;
        if (elem.firstElementChild){
            result = elem.firstElementChild;
        } else {
            result = elem.children[0];
        }
        return result;
    }
    // 定义实现向下滑动的动画效果
    function slideDown(elem,height,max_height){
        var t = setInterval(function(){
            if (height >= max_height){
                clearInterval(t);
            }
            height += 2;
            elem.style.height = height + 'px';
        },1);
    }
}