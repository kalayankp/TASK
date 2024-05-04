// Model
const tabsModel = {
    tabs: [],
    
    addTab: function(url = '') {
        this.tabs.push({
            title: 'New Tab',
            url: url || '',
        });
    },
    
    removeTab: function(index) {
        this.tabs.splice(index, 1);
    },
    
    updateTabUrl: function(index, url) {
        this.tabs[index].url = url;
    },
    
    updateTabTitle: function(index, title) {
        this.tabs[index].title = title;
    },
};

// View
const tabsView = {
    init: function() {
        this.tabList = $('.tabs');
        this.tabContent = $('.tab-content');
        this.addTabBtn = $('.add-tab-btn');
        this.bindEvents();
    },
    
    bindEvents: function() {
        const self = this;
        
        this.addTabBtn.on('click', function() {
            tabsController.addTab();
        });
        
        this.tabList.on('click', '.tab-close', function() {
            const index = $(this).closest('.tab').index();
            tabsController.removeTab(index);
        });
        
        this.tabList.on('click', '.tab', function() {
            const index = $(this).index();
            tabsController.switchTab(index);
        });
        
        this.tabContent.on('keyup', '.url-input', function(e) {
            if (e.keyCode === 13) {
                const index = $(this).closest('.tab-content').index();
                tabsController.updateTabUrl(index, $(this).val());
            }
        });
    },
    
    renderTabs: function() {
        this.tabList.empty();
        
        tabsModel.tabs.forEach((tab, index) => {
            const tabElement = $(`
                <li class="tab" data-index="${index}">
                    ${tab.url ? `<span>${tab.url}</span>` : '<input class="url-input" placeholder="Enter URL" />'}
                    <span class="tab-close">x</span>
                </li>
            `);
            
            if (index === tabsModel.tabs.length - 1) {
                tabElement.addClass('active');
            }
            
            this.tabList.append(tabElement);
        });
    },
};

// Controller
const tabsController = {
    init: function() {
        tabsView.init();
        tabsView.renderTabs();
    },
    
    addTab: function(url) {
        tabsModel.addTab(url);
        tabsView.renderTabs();
    },
    
    removeTab: function(index) {
        tabsModel.removeTab(index);
        tabsView.renderTabs();
    },
    
    switchTab: function(index) {
        $('.tab-content').removeClass('active');
        $('.tab').removeClass('active');
        $(`.tab:eq(${index})`).addClass('active');
        $(`.tab-content:eq(${index})`).addClass('active');
    },

    updateTabUrl: function(index, url) {
        tabsModel.updateTabUrl(index, url);
        tabsView.renderTabs();
    },

    updateTabTitle: function(index, title) {
        tabsModel.updateTabTitle(index, title);
        tabsView.renderTabs();
    }
};

// Initialize the app
tabsController.init();
