// 引入模板
var homeTpl = require('../tpl/home.string');

// 定义一个视图
SPA.defineView('home', {
  // 将模板写在body里
  html: homeTpl,

  plugins: [
    'delegated',
    {
      name: 'avalon',
      options: function (vm) {
        vm.homeList = [];
      }
    }
  ],

  // 给视图定义公共的属性和方法
  init: {
    formatArray: function (arr) {
      var newArr = [];
      for(var i = 0; i < Math.ceil(arr.length/2); i++){
        newArr[i] = [];
        newArr[i][0] = arr[2*i];
        newArr[i][1] = arr[2*i+1];
      }
      return newArr;
    },

    // 定义视图公共的home hot swiper对象
    myHomeHotSwiper: null,

    // 定义视图公共的home swiper对象
    myHomeSwiper: null
  },

  bindActions: {
    'tap.slide': function (e) {
      // 获得视图公共的home swiper, 跳转到某个slider
      this.myHomeSwiper.slideTo($(e.el).index());
    },
    'tap.hot.slide': function (e) {
      // 获得视图公共的home hot swiper, 跳转到某个slider
      this.myHomeHotSwiper.slideTo($(e.el).index());
    }
  },

  bindEvents: {
    beforeShow: function () {
      // 保存视图对象
      var that = this;

      // 获得avalon的vm
      var vm = that.getVM();

      // 渲染数据
      $.ajax({
        url: '/api/homeList.php',
        success: function (res) {
          vm.homeList = that.formatArray(res.data)
        }
      });

      // 定义home hot swiper，注意这里的that.mySwiper
      that.myHomeHotSwiper = new Swiper('#home-hot-swiper', {
        loop: false,
        onSlideChangeStart: function () {
          $('#home-hot-nav li').eq(that.myHomeHotSwiper.activeIndex).addClass('active').siblings().removeClass('active');
        }
      });

      // 定义home swiper，注意这里的that.mySwiper
      that.myHomeSwiper = new Swiper('#home-swiper', {
        loop: false
      });
    }
  }
});
