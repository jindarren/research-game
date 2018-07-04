var numOfPlayersCh1 = 0,
      numOfPlayersCh2 = 0,
      numOfPlayersCh3 = 0;
var dataScale = [
      "0 - 50",
      "50 - 100",
      "100 - 200",
      "200 - 300",
      "300 - 400",
      "400 - 450",
      "450 - 500",
      "500 - 550",
      "550 - 600",
      "600 - 700",
      "700 - 800",
      "800 - 900",
      "900 - 1200",
      "1200 - 1500",
      "> 1500",
]
var timeScale = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
]

var deviceScale = [
      "Apple",
      "Huawei",
      "ZUK",
      "MOTO",
      "Lenovo",
      "Nubia",
      "Meizu",
      "LePhone",
      "LG",
      "SAMSUNG",
      "Xiaomi",
      "OPPO",
      "ONEPLUS",
      "VIVO",
      "Smartisan(锤子)",
      "SHARP",
      "Meitu",
      "Google",
      "HTC",
      "Laaboo(蓝博兴)",
      "TCL",
      "GIONEE(金立)",
      "SONY",
      "ASUS",
      "360",
      "Coolpad",
      "AGM",
      "DOOV(朵唯)",
      "Other"
]

var scoreDataCh1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var scoreDataCh2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var scoreDataCh3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var networkDataCh1 = [0, 0, 0, 0, 0]
var networkDataCh2 = [0, 0, 0, 0, 0]
var networkDataCh3 = [0, 0, 0, 0, 0]

var deviceDataCh1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var deviceDataCh2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var deviceDataCh3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]


var hourDataCh1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var hourDataCh2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var hourDataCh3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var startTime, endTime;
var scoreListCh1=[], scoreListCh2=[], scoreListCh3=[];

function countAppearance(data) {

      function getDevice(deviceString){
            var deviceStrArr = deviceString.split("/")[1].split(";");
            return deviceStrArr[deviceStrArr.length-1]
      }

      if (data.path == "/ch1") {
            count(scoreDataCh1, networkDataCh1, deviceDataCh1, hourDataCh1)
            numOfPlayersCh1++
            scoreListCh1.push(data.score)
      } else if (data.path == "/ch2") {
            count(scoreDataCh2, networkDataCh2, deviceDataCh2, hourDataCh2)
            numOfPlayersCh2++
            scoreListCh2.push(data.score)
      } else{
            count(scoreDataCh3, networkDataCh3, deviceDataCh3, hourDataCh3)
            numOfPlayersCh3++
            scoreListCh3.push(data.score)
      }

      function count(scoreData, networkData, deviceData, hourData) {
            if (data.score >= 0 && data.score <= 50) {
                  scoreData[0]++
            } else if (data.score > 50 && data.score <= 100) {
                  scoreData[1]++
            } else if (data.score > 100 && data.score <= 200) {
                  scoreData[2]++
            } else if (data.score > 200 && data.score <= 300) {
                  scoreData[3]++
            } else if (data.score > 300 && data.score <= 400) {
                  scoreData[4]++
            } else if (data.score > 400 && data.score <= 450) {
                  scoreData[5]++
            } else if (data.score > 450 && data.score <= 500) {
                  scoreData[6]++
            } else if (data.score > 500 && data.score <= 550) {
                  scoreData[7]++
            } else if (data.score > 550 && data.score <= 600) {
                  scoreData[8]++
            } else if (data.score > 600 && data.score <= 700) {
                  scoreData[9]++
            } else if (data.score > 700 && data.score <= 800) {
                  scoreData[10]++
            } else if (data.score > 800 && data.score <= 900) {
                  scoreData[11]++
            } else if (data.score > 900 && data.score <= 1200) {
                  scoreData[12]++
            } else if (data.score > 1200 && data.score <= 1500) {
                  scoreData[13]++
            } else if (data.score > 1500) {
                  scoreData[14]++
            }


            if (data.network == "wifi") {
                  networkData[0]++
            } else if (data.network == "4g") {
                  networkData[1]++
            } else if (data.network == "3g+") {
                  networkData[2]++
            } else if (data.network == "2g") {
                  networkData[3]++
            } else if (data.network == "unknown") {
                  networkData[4]++
            }


            if(data.device.indexOf("Windows")<0 && data.device.indexOf("iPad")<0 && data.device.indexOf("Macintosh")<0){ //exclude all PCs and iPad
                  if(getDevice(data.device).indexOf("iPhone")>-1){ //iPhone
                        deviceData[0]++
                  }
                  else{ // Android phones
                        var deviceInfo = getDevice(data.device)
                        console.log(deviceInfo)
                        if (deviceInfo.match(/huawei/i) != null || deviceInfo.match(/AL/i) != null || deviceInfo.match(/DL/i) != null || deviceInfo.match(/UL/i) != null 
                        || deviceInfo.match(/CL/i) != null || deviceInfo.match(/TL/i) != null || deviceInfo.match(/H60/i) != null || deviceInfo.match(/VTR/i) != null
                        || deviceInfo.match(/VIE/i) != null || deviceInfo.match(/LX/i) != null) { //Huawei
                              deviceData[1]++
                        } else if (deviceInfo.match(/ZUK/i) !=null) { //ZUK
                              deviceData[2]++
                        } else if (deviceInfo.match(/XT/i) !=null || deviceInfo.match(/moto/i) !=null) { //Moto
                              deviceData[3]++
                        } else if (deviceInfo.match(/Lenovo/i) !=null) { //Lenovo
                              deviceData[4]++
                        } else if (deviceInfo.match(/NX/i) !=null) { //nubia
                              deviceData[5]++
                        } else if (deviceInfo.match(/MX/i) !=null || deviceInfo.match(/m3/i) != null || deviceInfo.match(/m2/i) != null || deviceInfo.match(/m1/i) != null 
                        || deviceInfo.match(/PRO/i) != null || deviceInfo.match(/U20/i) != null || deviceInfo.match(/M570/i) != null || deviceInfo.match(/M621/i) != null) { //Meizu
                              deviceData[6]++
                        } else if (deviceInfo.match(/Le/i) !=null || deviceInfo.match(/X600/i) !=null || deviceInfo.match(/X900/i) !=null) { //LePhone
                              deviceData[7]++
                        } else if (deviceInfo.match(/LG/i) !=null) { //LG
                              deviceData[8]++
                        } else if (deviceInfo.match(/SM/i) !=null) { //Samsung
                              deviceData[9]++
                        } else if (deviceInfo.match(/Redmi/i) !=null || deviceInfo.match(/HM/i) != null || deviceInfo.match(/MIX/i) !=null || deviceInfo.match(/2014/i) !=null
                        || deviceInfo.match(/chiron/i) !=null || deviceInfo.match(/mi/i) !=null) { //Xiaomi
                              deviceData[10]++
                        } else if (deviceInfo.match(/A1601/i) !=null || deviceInfo.match(/OPPO/i) !=null || deviceInfo.match(/R8107/i) !=null || deviceInfo.match(/N5117/i) !=null 
                        || deviceInfo.match(/X90/i) !=null || deviceInfo.match(/CPH1611/i) !=null || deviceInfo.match(/R7/i) !=null) { //OPPO
                              deviceData[11]++
                        } else if (deviceInfo.match(/ONEPLUS/i) !=null || deviceInfo.match(/ONE/i) !=null || deviceInfo.match(/a0001/i) !=null) { //ONEPLUS
                              deviceData[12]++
                        } else if (deviceInfo.match(/VIVO/i) !=null) { //VIVO
                              deviceData[13]++
                        } else if (deviceInfo.match(/OD/i) !=null || deviceInfo.match(/YQ/i) !=null) { //锤子
                              deviceData[14]++
                        } else if (deviceInfo.match(/FS/i) !=null) { //Sharp
                              deviceData[15]++
                        } else if (deviceInfo.match(/MP/i) !=null || deviceInfo.match(/MEITU/i) !=null) { //Meitu
                              deviceData[16]++
                        } else if (deviceInfo.match(/Pixel/i) !=null || deviceInfo.match(/NEXUS/i) !=null) { //Google
                              deviceData[17]++
                        } else if (deviceInfo.match(/htc/i) !=null) { //HTC
                              deviceData[18]++
                        } else if (deviceInfo.match(/Laaboo/i) !=null) { //Laaboo
                              deviceData[19]++
                        } else if (deviceInfo.match(/TCL/i) !=null) { //TCL
                              deviceData[20]++
                        } else if (deviceInfo.match(/GIONEE/i) !=null || deviceInfo.match(/GN/i) !=null) { //GIONEE
                              deviceData[21]++
                        } else if (deviceInfo.match(/E5553/i) !=null || deviceInfo.match(/f8332/i) !=null) { //SONY
                              deviceData[22]++
                        } else if (deviceInfo.match(/ASUS/i) !=null) { //ASUS
                              deviceData[23]++
                        } else if (deviceInfo.match(/160/i) !=null || deviceInfo.match(/150/i) !=null) { //360
                              deviceData[24]++
                        } else if (deviceInfo.match(/C1/i) !=null) { //COOLPAD
                              deviceData[25]++
                        } else if (deviceInfo.match(/AGM/i) !=null) { //AGM
                              deviceData[26]++
                        } else if (deviceInfo.match(/DOOV/i) !=null) { //DOOV
                              deviceData[27]++
                        } else {
                              deviceData[28]++ //Other
                        } 

                  }




            }

            if (data.hour == 0) {
                  hourData[0]++
            } else if (data.hour == 1) {
                  hourData[1]++
            } else if (data.hour == 2) {
                  hourData[2]++
            } else if (data.hour == 3) {
                  hourData[3]++
            } else if (data.hour == 4) {
                  hourData[4]++
            } else if (data.hour == 5) {
                  hourData[5]++
            } else if (data.hour == 6) {
                  hourData[6]++
            } else if (data.hour == 7) {
                  hourData[7]++
            } else if (data.hour == 8) {
                  hourData[8]++
            } else if (data.hour == 9) {
                  hourData[9]++
            } else if (data.hour == 10) {
                  hourData[10]++
            } else if (data.hour == 11) {
                  hourData[11]++
            } else if (data.hour == 12) {
                  hourData[12]++
            } else if (data.hour == 13) {
                  hourData[13]++
            } else if (data.hour == 14) {
                  hourData[14]++
            } else if (data.hour == 15) {
                  hourData[15]++
            } else if (data.hour == 16) {
                  hourData[16]++
            } else if (data.hour == 17) {
                  hourData[17]++
            } else if (data.hour == 18) {
                  hourData[18]++
            } else if (data.hour == 19) {
                  hourData[19]++
            } else if (data.hour == 20) {
                  hourData[20]++
            } else if (data.hour == 21) {
                  hourData[21]++
            } else if (data.hour == 22) {
                  hourData[22]++
            } else if (data.hour == 23) {
                  hourData[23]++
            }

      }
}

$.getJSON('db.js', function(data) {
      if (data) {
            startTime = data[0].time
            endTime = data[data.length - 1].time
            document.getElementById('start').innerHTML = startTime;
            document.getElementById('end').innerHTML = endTime;
      }

      for (index in data) {
            countAppearance(data[index])
      }

      function getPercentage(array){
            var sum = 0;
            for(index in array){
                  sum+= array[index]
            } 
            for(index in array){
                  array[index] = (array[index]/sum*100).toFixed(2)
            }
      }

      document.getElementById('num-total').innerHTML = numOfPlayersCh1+numOfPlayersCh2+numOfPlayersCh3;
      document.getElementById('num-designer').innerHTML = numOfPlayersCh1;
      document.getElementById('num-nondesigner').innerHTML = numOfPlayersCh2;
      document.getElementById('num-other').innerHTML = numOfPlayersCh3;

      getPercentage(scoreDataCh1);
      getPercentage(scoreDataCh2);
      getPercentage(scoreDataCh3);
      getPercentage(hourDataCh1);
      getPercentage(hourDataCh2);
      getPercentage(hourDataCh3);
      getPercentage(networkDataCh1);
      getPercentage(networkDataCh2);
      getPercentage(networkDataCh3);
      getPercentage(deviceDataCh1);
      getPercentage(deviceDataCh2);
      getPercentage(deviceDataCh3);


      function calMean(array){
            var sum=0
            for(index in array){
                  sum+=array[index]
            }
            return (sum/array.length).toFixed(2)
      }

      function calSD(array){
            var mean = calMean(array)
            var sum = 0
            
            for(index in array){
                  sum += Math.pow((array[index]-mean),2)
            }
            return Math.sqrt(sum/array.length).toFixed(2)
      }


      //statistics for score
      scoreListCh1.sort(function(a,b){
            return a-b
      })
      scoreListCh2.sort(function(a,b){
            return a-b
      })
      scoreListCh3.sort(function(a,b){
            return a-b
      })
      $("#score-design>td:nth-child(2)").text(scoreListCh1[scoreListCh1.length-1])
      $("#score-design>td:nth-child(3)").text(calMean(scoreListCh1))
      $("#score-design>td:nth-child(4)").text(scoreListCh1[Math.floor(scoreListCh1.length/2)])
      $("#score-design>td:nth-child(5)").text(calSD(scoreListCh1))

      $("#score-nondesign>td:nth-child(2)").text(scoreListCh2[scoreListCh2.length-1])
      $("#score-nondesign>td:nth-child(3)").text(calMean(scoreListCh2))
      $("#score-nondesign>td:nth-child(4)").text(scoreListCh2[Math.floor(scoreListCh2.length/2)])
      $("#score-nondesign>td:nth-child(5)").text(calSD(scoreListCh2))

      $("#score-others>td:nth-child(2)").text(scoreListCh3[scoreListCh3.length-1])
      $("#score-others>td:nth-child(3)").text(calMean(scoreListCh3))
      $("#score-others>td:nth-child(4)").text(scoreListCh3[Math.floor(scoreListCh3.length/2)])
      $("#score-others>td:nth-child(5)").text(calSD(scoreListCh3))

      var ctx = document.getElementById('score-chart').getContext('2d');
      /*
      visualization for score
      */
      var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                  labels: dataScale,
                  datasets: [{
                        label:  "设计师",
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        borderColor: 'rgba(255, 99, 132, 0.7)',
                        data: scoreDataCh1,
                  },
                  {
                        label: "非设计师",
                        backgroundColor: 'rgba(60, 153, 227, 0.7)',
                        borderColor: 'rgba(60, 153, 227，0.7)',
                        data: scoreDataCh2,
                  },
                  {
                        label: "其他玩家",
                        backgroundColor: 'rgba(227, 185, 74, 0.7)',
                        borderColor: 'rgba(227, 185, 74, 0.7)',
                        data: scoreDataCh3,
                  }]
            },
            options: {
                  title: {
                        display: true,
                        text: '不同分数段玩家占比'
                  }
            }
      });

      
      /*
      visualization for timeline
      */
      var ctx4 = document.getElementById('time-chart').getContext('2d');
      var hourVisData = {
            datasets: [{
                  label: "设计师",
                  data: hourDataCh1,
                  backgroundColor: "rgb(255, 99, 132)"
            },
            {
                  label: "非设计师",
                  data: hourDataCh2,
                  backgroundColor: "rgb(60, 153, 227)"
            },
            {
                  label: "其他玩家",
                  data: hourDataCh3,
                  backgroundColor: "rgb(227, 185, 74)"
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: timeScale
      };
      var myBarChart = new Chart(ctx4, {
            type: 'bar',
            data: hourVisData,
            options: {
                  title: {
                        display: true,
                        text: '不同时段游戏玩家数量占比'
                  }
            }
      });

      /*
      visualization for networktype
      */
      var netScale = [
            "wifi",
            "4g",
            "3g",
            "2g",
            "unknown"
      ]
      var ctx3 = document.getElementById('network-chart-ch1').getContext('2d');
      var ctx4 = document.getElementById('network-chart-ch2').getContext('2d');
      var ctx5 = document.getElementById('network-chart-ch3').getContext('2d');

      var networkVisDataCh1 = {
            datasets: [{
                  data: networkDataCh1,
                  backgroundColor: [
                        "#17B680",
                        "#1399B3",
                        "#0C66B3",
                        "#0F00B3",
                        "#9899A1"
                  ]
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: netScale
      };

      var networkVisDataCh2 = {
            datasets: [{
                  data: networkDataCh2,
                  backgroundColor: [
                        "#17B680",
                        "#1399B3",
                        "#0C66B3",
                        "#0F00B3",
                        "#9899A1"
                  ]
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: netScale
      };

      var networkVisDataCh3 = {
            datasets: [{
                  data: networkDataCh3,
                  backgroundColor: [
                        "#17B680",
                        "#1399B3",
                        "#0C66B3",
                        "#0F00B3",
                        "#9899A1"
                  ]
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: netScale
      };

      var myDoughnutChartCh1 = new Chart(ctx3, {
            type: 'doughnut',
            data: networkVisDataCh1,
            options: {
                  title: {
                        display: true,
                        text: '网络类型占比 - 设计师'
                  }
            }
      });

      var myDoughnutChartCh2 = new Chart(ctx4, {
            type: 'doughnut',
            data: networkVisDataCh2,
            options: {
                  title: {
                        display: true,
                        text: '网络类型占比 - 非设计师'
                  }
            }
      });

      var myDoughnutChart = new Chart(ctx5, {
            type: 'doughnut',
            data: networkVisDataCh3,
            options: {
                  title: {
                        display: true,
                        text: '网络类型占比 - 其他玩家'
                  }
            }
      });

      /*
      visualization for device
      */

      var ctx6 = document.getElementById('device-chart').getContext('2d');

      var deviceVisData = {
            datasets: [{
                  label: "设计师",
                  data: deviceDataCh1,
                  backgroundColor: "rgb(255, 99, 132)"
            },
            {
                  label: "非设计师",
                  data: deviceDataCh2,
                  backgroundColor: "rgb(60, 153, 227)"
            },
            {
                  label: "其他玩家",
                  data: deviceDataCh3,
                  backgroundColor: "rgb(227, 185, 74)"
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: deviceScale
      };
      var myBarChart = new Chart(ctx6, {
            type: 'horizontalBar',
            data: deviceVisData,
            options: {
                  title: {
                        display: true,
                        text: '玩家使用手机品牌的占比'
                  }
            }
      });
})