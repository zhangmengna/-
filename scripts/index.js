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
        // 将用户登录菜单隐藏
        user_downmenu.style.display = 'none';
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