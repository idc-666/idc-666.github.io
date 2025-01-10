// 导航数据
const navData = [
    {
        title: "AI工具",
        items: [
            { name: "ChatGPT", url: "#", icon: "chatgpt-icon" },
            { name: "Midjourney", url: "#", icon: "midjourney-icon" },
            // 更多导航项...
        ]
    }
    // 更多分类...
];

// 初始化导航
function initializeNav() {
    const navGrid = document.querySelector('#navGrid');
    navData.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'nav-item';
        // 添加导航内容
        navGrid.appendChild(categoryElement);
    });
}

// 搜索功能
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // 实现搜索逻辑
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeNav();
    initializeSearch();
}); 