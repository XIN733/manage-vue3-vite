<template>
  <div ref="echart"></div>
</template>

<script>
import {
  reactive,
  getCurrentInstance,
  watch,
  defineComponent
} from "vue";
import * as echarts from "echarts";

export default defineComponent({
  props: {
    isChart: {
      //判断是哪个类型的图表,1折线图  2柱状图  3饼图
      type: Number,
      value: 0,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    let lineOptions = reactive({
      legend: {
        textStyle: { color: "#333" },
      },
      grid: {
        left: "20%",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#75B3EC", "#FBD0A9", "#CF8A92", "#B8A8E1"],
      series: [],
    });
    let barOptions = reactive({
      legend: {
        textStyle: { color: "#333" },
      },
      grid: {
        left: "20%",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de"],
      series: [],
    });
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: [
        "#8f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    });
    let options = reactive({});
    const initChart = () => {
      initChartData();
      let echart = echarts.init(proxy.$refs["echart"]);
      echart.setOption(options);
    };
    const initChartData = () => {
      if (props.isChart == 1) {
        lineOptions.xAxis.data = props.chartData.xData;
        lineOptions.series = props.chartData.series;
        options = lineOptions;
      } else if (props.isChart == 2) {
        barOptions.xAxis.data = props.chartData.xData;
        barOptions.series = props.chartData.series;
        options = barOptions
      } else if (props.isChart == 3) {
        pieOptions.series = props.chartData.series;
        options = pieOptions
      }
    };
    // /注意这里是箭头函数，加了deep为true，对象里的子属性孙属性都会监听到
    watch(()=>props.chartData,()=>{
       initChart();
    },{deep:true},{immediate:true});
    return {};
  },
});
</script>