<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 顶部dashboard -->
      <div class="dashheader">
        <div class="dashtotal">
          <h4>总销售额</h4>
          <div class="dashcontent">￥ 8,888</div>
          <div class="dashfooter">
            今日销售额：￥666.00
          </div>
        </div>
        <div class="dashtotal">
          <h4>待发货</h4>
          <div class="dashcontent">10</div>
          <div class="dashfooter">今日新增：10</div>
        </div>
        <div class="dashtotal">
          <h4>购物车收藏数</h4>
          <div class="dashcontent">12</div>
          <div class="dashfooter">用户数量：{{ userNum }}</div>
        </div>
        <div class="dashtotal">
          <h4>成交笔数</h4>
          <div class="dashcontent">10</div>
          <div class="dashfooter">今日新增：10</div>
        </div>
      </div>
      <!-- 中间内容区域 -->
      <div class="charts">
        <div id="main"></div>
        <div class="clientcharts">123</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      userNum: 0,
      option: {
        backgroundColor: '#2c343c',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        label: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        // visualMap: {
        //   // 不显示 visualMap 组件，只用于明暗度的映射
        //   show: false,
        //   // 映射的最小值为 80
        //   min: 80,
        //   // 映射的最大值为 600
        //   max: 600,
        //   inRange: {
        //     // 明暗度的范围是 0 到 1
        //     colorLightness: [0, 1]
        //   }
        // },
        title: {
          text: '订单情况概要',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series : [
        {
          name: '统计情况',
          type: 'pie',
          radius: '55%',
          data:[
              {value:250, name:'待发货'},
              {value:300, name:'交易成功'},
              {value:50, name:'退款中'},
              {value:270, name:'配送中'}
            ]
          }
        ],
        roseType: 'angle',
        itemStyle: {
          // 阴影的大小
          shadowBlur: 200,
          // 阴影水平方向上的偏移
          shadowOffsetX: 0,
          // 阴影垂直方向上的偏移
          shadowOffsetY: 0,
          // 阴影颜色
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          emphasis: {
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['待发货', '交易成功', '退款中', '配送中'],
          textStyle: {
            color: '#fff'
          }
        },
      },
      clientOption: {
        backgroundColor: '#2c343c',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        label: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        visualMap: {
          // 不显示 visualMap 组件，只用于明暗度的映射
          show: false,
          // 映射的最小值为 80
          min: 80,
          // 映射的最大值为 600
          max: 600,
          inRange: {
            // 明暗度的范围是 0 到 1
            colorLightness: [0, 1]
          }
        },
        title: {
          text: '客户收藏转化率',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series : [
        {
          name: '统计情况',
          type: 'pie',
          radius: '55%',
          data:[
              {value:250, name:'收藏购物车'},
              {value:300, name:'已完成订单'}
            ]
          }
        ],
        // roseType: 'angle',
        itemStyle: {
          // 阴影的大小
          shadowBlur: 200,
          // 阴影水平方向上的偏移
          shadowOffsetX: 0,
          // 阴影垂直方向上的偏移
          shadowOffsetY: 0,
          // 阴影颜色
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          emphasis: {
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['收藏购物车', '已完成订单'],
          textStyle: {
            color: '#fff'
          }
        },
      }
    }
  },
  created() {
    this.getUserNum()
  },
  mounted() {
    const myChart = echarts.init(document.getElementById('main'))
    myChart.setOption(this.option)
    const clientChart = echarts.init(document.querySelector('.clientcharts'))
    clientChart.setOption(this.clientOption)
  },
  methods: {
    async getUserNum() {
      const {data: res} = await this.$http.post('api/queryuser')
      if (res.err_code !== 0) {
        return this.$message.warning('服务器繁忙，请稍后重试！')
      }
      this.userNum = res.total
    }
  }
}
</script>

<style lang="less" scoped>
h4{
  margin: 0;
  font-size: 14px;
}
.dashheader{
  display: flex;
  justify-content: space-between;
}
.dashtotal{
  box-sizing: border-box;
  width: 270px;
  height: 160px;
  padding: 20px;
  border: 1px #eee solid;
  box-shadow: 0 0 3px #ccc;
}
.dashcontent{
  font-size: 24px;
  font-weight: 700;
  padding: 20px 0;
  border-bottom: 1px #ddd solid;
}
.dashfooter{
  font-size: 14px;
  font-weight: 500;
  padding: 10px 0;
}
.charts{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
#main{
  width: 598px;
  height: 340px;
  margin: 20px 0 0;
  padding: 10px 0;
  border: 1px #eee solid;
  box-shadow: 0 0 3px #ccc;
  background-color: #2c343c;
}
.clientcharts{
  width: 598px;
  height: 340px;
  margin: 20px 0 0;
  padding: 10px 0;
  border: 1px #eee solid;
  box-shadow: 0 0 3px #ccc;
  background-color: #2c343c;
}
</style>