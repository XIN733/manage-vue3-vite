<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover" class="user-box">
        <div class="user">
          <img :src="getImageUrl('user.jpeg')" alt="" />
          <div class="user-info">
            <div class="name">Admin</div>
            <div class="access">超级管理员</div>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" class="tableData-box">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, index) in state.tableLabel"
            :key="index"
            :prop="index"
            :label="val"
          />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          shadow="hover"
          :body-style="{ padding: 0 }"
        >
          <div class="card-content">
            <div class="icon-box" :style="{ 'background-color': item.color }">
              <component :is="item.icon" class="icon"></component>
            </div>
            <div class="text-box">
              <div class="price">￥{{ item.value }}</div>
              <div class="label">￥{{ item.name }}</div>
            </div>
          </div>
        </el-card>
      </div>
      <el-card class="line-chart" shadow="hover" style="height: 280px">
        <!-- <div id="lineChart" ref="lineChart" style="height: 280px"></div> -->
        <echarts :isChart="1" :chartData="orderData" style="height: 280px"></echarts>
      </el-card>
      <div class="chart-wrap">
        <el-card class="chart bar-graph" shadow="hover" style="height: 280px">
          <!-- <div id="barGraph" ref="barGraph" style="height: 280px"></div> -->
          <echarts :isChart="2" :chartData="userData" style="height: 280px"></echarts>
        </el-card>
        <el-card class="chart pie-chart" shadow="hover" style="height: 280px">
          <!-- <div id="pieChart" ref="pieChart" style="height: 240px"></div> -->
          <echarts :isChart="3" :chartData="videoData" style="height: 240px"></echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent ,getCurrentInstance, onMounted, reactive, ref} from 'vue';
import Echarts from "@/components/Echarts.vue";
// import * as echarts from "echarts";

export default defineComponent({
  components: {
   Echarts
  },
   setup() {
    const { proxy } = getCurrentInstance();
    let state = {
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
    };
    let tableData = ref([]); //双向绑定
    let countData = ref([]);
    const getImageUrl = (name) => {
      return new URL(`../../assets/images/${name}`, import.meta.url).href;
    };
    const getTableList = async () => {
      //异步函数
      //本地mock模拟
      // await axios.get("/home/getTableData").then((res) => {
      //   let { code, data } = res.data;
      //   if (code == 200) {
      //     tableData.value = data.tableData;
      //   }
      // });

      // fastmock模拟
      // await axios.get("https://www.fastmock.site/mock/728b209192f8e866f14b968e8219e86d/api/home/getTableData").then((res) => {
      //       let { code, data } = res.data;
      //       if (code == 200) {
      //         tableData.value = data.tableData;
      //       }
      // });

      // axios封装后
      let res = await proxy.$api.getTableData();
      tableData.value = res;
    };
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      countData.value = res;
    };
    // 关于echarts 表格的渲染部分
    // let xOptions = reactive({
    //   legend: {
    //     textStyle: { color: "#333" },
    //   },
    //   grid: {
    //     left: "20%",
    //   },
    //   tooltip: {
    //     trigger: "axis",
    //   },
    //   xAxis: {
    //     type: "category",
    //     data: [],
    //     axisLine: {
    //       lineStyle: {
    //         color: "#17b3a3",
    //       },
    //     },
    //     axisLabel: {
    //       interval: 0,
    //       color: "#333",
    //     },
    //   },
    //   yAxis: [
    //     {
    //       type: "value",
    //       axisLine: {
    //         lineStyle: {
    //           color: "#17b3a3",
    //         },
    //       },
    //     },
    //   ],
    //   color: ["#2ec7c9", "#b6a2de", "#75B3EC", "#FBD0A9", "#CF8A92", "#B8A8E1"],
    //   series: [],
    // });
    // let pieOptions = reactive({
    //   tooltip: {
    //     trigger: "item",
    //   },
    //   color: [
    //     "#8f78f4",
    //     "#dd536b",
    //     "#9462e5",
    //     "#a6a6a6",
    //     "#e1bb22",
    //     "#39c362",
    //     "#3ed1cf",
    //   ],
    //   series: [],
    // });
    let orderData = reactive({
      xData: [],
      series: [],
    });
    let userData = reactive({
      xData: [],
      series: [],
    });
    let videoData = reactive({
      xData: null,
      series: [],
    });
    const getEchartsData = async () => {
      let res = await proxy.$api.getEchartsData();
      // 折线图
      orderData.xData = res.orderData.date;
      const keyArray = Object.keys(res.orderData.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: res.orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      orderData.series = series;
      // xOptions.xAxis.data = orderData.xData;
      // xOptions.series = orderData.series;
      // let lineChart = echarts.init(proxy.$refs["lineChart"]);
      // lineChart.setOption(xOptions);
      // 柱状图
      userData.xData = res.userData.map((item) => item.date);
      userData.series = [
        {
          name: "新增用户",
          data: res.userData.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: res.userData.map((item) => item.active),
          type: "bar",
        },
      ];
      // xOptions.xAxis.data = userData.xData;
      // xOptions.series = userData.series;
      // let barGraph = echarts.init(proxy.$refs["barGraph"]);
      // barGraph.setOption(xOptions);
      // 饼状图
      videoData.series = [
        {
          type: "pie",
          data: res.videoData,
        },
      ];
      // pieOptions.series = videoData.series;
      // let pieChart = echarts.init(proxy.$refs["pieChart"]);
      // pieChart.setOption(pieOptions);
    };
    onMounted(() => {
      getTableList();
      getCountData();
      getEchartsData();
    });
    return { getImageUrl, state, tableData, countData,orderData,userData,videoData };
  },
})
</script>


<style lang="less" scoped>
.home {
  .user-box {
    .user {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding-bottom: 15px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .user-info {
        margin-left: 30px;
        .name {
          font-size: 24px;
        }
        .access {
          font-size: 10px;
          color: #999;
        }
      }
    }
    .login-info {
      line-height: 25px;
      padding-top: 15px;
      p {
        font-size: 10px;
        color: #999;
        span {
          padding-left: 30px;
        }
      }
    }
  }
  .tableData-box {
    margin-top: 18px;
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    .el-card {
      width: calc((100% - 40px) / 3);
      margin: 0 20px 18px 0;
      border: 0;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      .card-content {
        display: flex;
        align-items: center;
        .icon-box {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon {
            width: 40%;
            color: #fff;
          }
        }
        .text-box {
          flex: 1;
          height: 60px;
          padding-left: 15px;
          border: 1px solid #e4e7ed;
          border-left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .price {
            font-size: 22px;
          }
          .label {
            font-size: 12px;
            color: #999;
            margin-top: 2px;
          }
        }
      }
    }
  }
  .line-chart{
    margin-bottom: 18px;
  }
  .chart-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .chart{
      width: calc((100% - 16px) / 2);
    }
  }
}
</style>