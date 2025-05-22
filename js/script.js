// 页面初始化和动画效果
document.addEventListener('DOMContentLoaded', function() {
    // 初始化星空背景
    createStars();
    
    // 初始化浮动元素
    createFloatingElements();
    
    // 初始化日期选择器
    initDatePicker();
    
    // 初始化算命按钮事件
    initFortuneButton();
    
    // 隐藏加载动画和结果区域
    document.getElementById('loading-animation').style.display = 'none';
    document.getElementById('fortune-result').style.display = 'none';
});

// 创建星空背景
function createStars() {
    const starsContainer = document.getElementById('stars-bg');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // 随机大小
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 随机动画延迟
        star.style.animationDelay = `${Math.random() * 4}s`;
        
        starsContainer.appendChild(star);
    }
}

// 创建浮动元素
function createFloatingElements() {
    const elementsContainer = document.getElementById('floating-elements');
    const symbols = ['✨', '🔮', '⭐', '🌙', '☄️', '⚡'];
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // 随机符号
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        element.textContent = symbol;
        
        // 随机大小
        const size = 20 + Math.random() * 30;
        element.style.fontSize = `${size}px`;
        
        // 随机位置
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${100 + Math.random() * 100}%`;
        
        // 随机动画时长和延迟
        const duration = 15 + Math.random() * 20;
        const delay = Math.random() * 10;
        element.style.animation = `float ${duration}s ${delay}s infinite linear`;
        
        elementsContainer.appendChild(element);
    }
}

// 初始化日期选择器
function initDatePicker() {
    const birthdayInput = document.getElementById('birthday-input');
    const datePickerPopup = document.getElementById('date-picker-popup');
    const cancelBtn = document.getElementById('date-picker-cancel');
    const confirmBtn = document.getElementById('date-picker-confirm');
    
    // 年份选择器
    const yearPicker = document.getElementById('year-picker');
    const monthPicker = document.getElementById('month-picker');
    const dayPicker = document.getElementById('day-picker');
    
    // 当前选中的日期
    let selectedYear = new Date().getFullYear();
    let selectedMonth = new Date().getMonth() + 1;
    let selectedDay = new Date().getDate();
    
    // 生成年份选项 (1900-当前年)
    const currentYear = new Date().getFullYear();
    for (let year = 1900; year <= currentYear; year++) {
        const yearItem = document.createElement('div');
        yearItem.classList.add('date-picker-item');
        yearItem.textContent = year;
        yearItem.dataset.value = year;
        yearPicker.appendChild(yearItem);
    }
    
    // 生成月份选项 (1-12)
    for (let month = 1; month <= 12; month++) {
        const monthItem = document.createElement('div');
        monthItem.classList.add('date-picker-item');
        monthItem.textContent = month + '月';
        monthItem.dataset.value = month;
        monthPicker.appendChild(monthItem);
    }
    
    // 更新日期选项
    function updateDayOptions() {
        // 清空现有选项
        dayPicker.innerHTML = '';
        
        // 获取当月天数
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        
        // 生成日期选项
        for (let day = 1; day <= daysInMonth; day++) {
            const dayItem = document.createElement('div');
            dayItem.classList.add('date-picker-item');
            dayItem.textContent = day + '日';
            dayItem.dataset.value = day;
            dayPicker.appendChild(dayItem);
        }
        
        // 如果选中日超过当月天数，调整为当月最后一天
        if (selectedDay > daysInMonth) {
            selectedDay = daysInMonth;
        }
    }
    
    // 初始化日期选项
    updateDayOptions();
    
    // 添加选择器指示器
    const yearIndicator = document.createElement('div');
    yearIndicator.classList.add('date-picker-indicator');
    yearPicker.appendChild(yearIndicator);
    
    const monthIndicator = document.createElement('div');
    monthIndicator.classList.add('date-picker-indicator');
    monthPicker.appendChild(monthIndicator);
    
    const dayIndicator = document.createElement('div');
    dayIndicator.classList.add('date-picker-indicator');
    dayPicker.appendChild(dayIndicator);
    
    // 点击输入框显示日期选择器
    birthdayInput.addEventListener('click', function() {
        datePickerPopup.classList.add('active');
        
        // 滚动到当前选中的年月日
        setTimeout(() => {
            scrollToSelected(yearPicker, selectedYear);
            scrollToSelected(monthPicker, selectedMonth);
            scrollToSelected(dayPicker, selectedDay);
        }, 100);
    });
    
    // 取消按钮
    cancelBtn.addEventListener('click', function() {
        datePickerPopup.classList.remove('active');
    });
    
    // 确认按钮
    confirmBtn.addEventListener('click', function() {
        // 更新输入框显示
        birthdayInput.value = `${selectedYear}年${selectedMonth}月${selectedDay}日`;
        datePickerPopup.classList.remove('active');
    });
    
    // 年份选择器滚动事件
    yearPicker.addEventListener('scroll', function() {
        debounce(function() {
            const selected = findSelectedItem(yearPicker);
            if (selected) {
                selectedYear = parseInt(selected.dataset.value);
                updateDayOptions();
            }
        }, 100)();
    });
    
    // 月份选择器滚动事件
    monthPicker.addEventListener('scroll', function() {
        debounce(function() {
            const selected = findSelectedItem(monthPicker);
            if (selected) {
                selectedMonth = parseInt(selected.dataset.value);
                updateDayOptions();
            }
        }, 100)();
    });
    
    // 日期选择器滚动事件
    dayPicker.addEventListener('scroll', function() {
        debounce(function() {
            const selected = findSelectedItem(dayPicker);
            if (selected) {
                selectedDay = parseInt(selected.dataset.value);
            }
        }, 100)();
    });
    
    // 滚动到选中项
    function scrollToSelected(picker, value) {
        const items = picker.querySelectorAll('.date-picker-item');
        for (let i = 0; i < items.length; i++) {
            if (parseInt(items[i].dataset.value) === value) {
                // 计算滚动位置，使选中项居中
                const containerHeight = picker.clientHeight;
                const itemHeight = items[i].clientHeight;
                const scrollTop = items[i].offsetTop - (containerHeight / 2) + (itemHeight / 2);
                
                picker.scrollTop = scrollTop;
                break;
            }
        }
    }
    
    // 查找当前选中项
    function findSelectedItem(picker) {
        const containerHeight = picker.clientHeight;
        const items = picker.querySelectorAll('.date-picker-item');
        
        // 清除所有选中状态
        items.forEach(item => item.classList.remove('selected'));
        
        // 找到中间位置的项
        const middlePosition = picker.scrollTop + containerHeight / 2;
        
        let closestItem = null;
        let minDistance = Infinity;
        
        items.forEach(item => {
            const itemMiddle = item.offsetTop + item.clientHeight / 2;
            const distance = Math.abs(itemMiddle - middlePosition);
            
            if (distance < minDistance) {
                minDistance = distance;
                closestItem = item;
            }
        });
        
        if (closestItem) {
            closestItem.classList.add('selected');
        }
        
        return closestItem;
    }
    
    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
}

// 初始化算命按钮
function initFortuneButton() {
    const fortuneBtn = document.getElementById('fortune-btn');
    const birthdayInput = document.getElementById('birthday-input');
    const loadingAnimation = document.getElementById('loading-animation');
    const fortuneResult = document.getElementById('fortune-result');
    const fortuneContent = document.getElementById('fortune-content');
    
    fortuneBtn.addEventListener('click', async function() {
        // 检查是否选择了生日
        if (!birthdayInput.value) {
            alert('请先选择您的生日');
            return;
        }
        
        // 显示加载动画
        loadingAnimation.style.display = 'flex';
        fortuneBtn.disabled = true;
        fortuneResult.style.display = 'none';
        
        try {
            // 使用AIModelService获取命运预测
            const result = await AIModelService.getFortune(birthdayInput.value);
            
            // 隐藏加载动画
            loadingAnimation.style.display = 'none';
            fortuneBtn.disabled = false;
            
            // 显示结果
            displayFortuneResult(result);
        } catch (error) {
            console.error('获取命运预测失败:', error);
            alert('命运之门暂时关闭，请稍后再试');
            
            // 隐藏加载动画
            loadingAnimation.style.display = 'none';
            fortuneBtn.disabled = false;
        }
    });
    
    // 显示命运结果
    function displayFortuneResult(result) {
        // 清空现有内容
        fortuneContent.innerHTML = '';
        
        // 将结果分段并添加到内容区
        const paragraphs = result.split('\n\n');
        
        // 先显示结果区域但内容为空
        fortuneResult.style.display = 'block';
        
        // 使用打字机效果逐段显示内容
        let paragraphIndex = 0;
        
        function showNextParagraph() {
            if (paragraphIndex < paragraphs.length) {
                const paragraph = paragraphs[paragraphIndex];
                if (paragraph.trim() === '') {
                    paragraphIndex++;
                    showNextParagraph();
                    return;
                }
                
                const p = document.createElement('p');
                
                // 高亮关键词
                let formattedText = paragraph;
                const keywords = ['财运', '事业', '感情', '健康', '学业', '人际关系', '近期运势', '宜：', '忌：'];
                
                keywords.forEach(keyword => {
                    if (paragraph.includes(keyword)) {
                        formattedText = formattedText.replace(
                            new RegExp(`${keyword}`, 'g'), 
                            `<span class="keyword">${keyword}</span>`
                        );
                    }
                });
                
                // 添加特殊样式
                if (paragraph.includes('近期运势') || paragraph.includes('宜：') || paragraph.includes('忌：')) {
                    p.classList.add('fortune-highlight');
                }
                
                // 添加打字机效果的容器
                const typewriterSpan = document.createElement('span');
                typewriterSpan.classList.add('typewriter');
                typewriterSpan.innerHTML = formattedText;
                p.appendChild(typewriterSpan);
                
                fortuneContent.appendChild(p);
                
                // 滚动到结果区域
                fortuneResult.scrollIntoView({ behavior: 'smooth' });
                
                // 打字机效果完成后显示下一段
                setTimeout(() => {
                    // 移除打字机效果，保留文本
                    p.innerHTML = formattedText;
                    
                    paragraphIndex++;
                    showNextParagraph();
                }, 2000); // 根据文本长度调整时间
            }
        }
        
        // 开始显示第一段
        showNextParagraph();
    }
}
