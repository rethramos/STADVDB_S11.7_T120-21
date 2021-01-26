import axios from 'axios';
import { Chart } from 'chart.js';

axios
  .get(`/api/transactions-per-quarter`)
  .then(response => {
    // console.log(response.data);
    const res = response.data;
    const colors = ['rgba(17, 69, 126, 0.5)', 'rgba(255, 193, 7, 0.5)'];
    const data = {
      labels: Array.from(new Set(res.map(d => d['District']))),
      datasets: Array.from(new Set(res.map(d => d['Transaction type']))).map(
        (transType, i) => {
          return {
            label: transType,
            data: res
              .filter(d => d['Transaction type'] === transType)
              .map(d => d['Transaction amount']),
            backgroundColor: colors[i],
          };
        },
      ),
    };

    const ctx = document.getElementById('transactions-per-quarter');

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }],
        },
      },
    });
    // myChart.data = data;
    // myChart.update();
    // console.log(myChart.data);
    // console.log(data);
  })
  .catch(err => console.log(err));


function updateData(chart, data) {
  chart.data = data;
  chart.update();
}