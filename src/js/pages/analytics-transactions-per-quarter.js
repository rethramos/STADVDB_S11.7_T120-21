import axios from 'axios';
import { Chart } from 'chart.js';

const sliceForm = document.getElementById('form-slice');
const quarterSelect = document.getElementById('quarter');
const quarterText = document.getElementById('quarter-text');
const statusText = document.getElementById('status-text');
const ctx = document.getElementById('transactions-per-quarter');

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {},
  options: {
    tooltips: {},
    scales: {
      xAxes: [
        {
          stacked: true,
          scaleLabel: { display: true, labelString: 'District' },
        },
      ],
      yAxes: [
        {
          stacked: true,
          scaleLabel: { display: true, labelString: 'Total Transactions' },
        },
      ],
    },
  },
});

let finished;
setFinished(false);

axios
  .get(`/api/transactions-per-quarter`)
  .then(response => {
    const res = response.data;
    quarterText.innerHTML = res[0]['Quarter'];
    updateData(myChart, res);

    setFinished(true);
  })
  .catch(err => {
    console.log(err);
    setFinished(false);
    statusText.innerText = err;
  });

sliceForm.onsubmit = e => {
  e.preventDefault();
};

sliceForm.onchange = e => {
  setFinished(false);
  handleSliceForm({ quarter: quarterSelect.value });
};

/**
 * Iterates over each object in `data` to look for all unique values of `property`.
 * @param data an array of objects with the same properties
 * @param property the property in the objects of `data` which will be looked up
 * @returns an array of unique values derived from all the values of `property`
 */
function getUniqueValues(data, property) {
  return Array.from(new Set(data.map(d => d[property])));
}

function updateData(chart, data) {
  const update = {
    labels: getUniqueValues(data, 'District'),
    datasets: getUniqueValues(data, 'Transaction type').map(transType => {
      return {
        label: transType,
        data: data
          .filter(d => d['Transaction type'] === transType)
          .map(d => d['Transaction amount']),
        backgroundColor: `rgba(${random(255)}, ${random(255)}, ${random(
          255,
        )}, 0.5)`,
      };
    }),
  };

  const averages = data.map(d => d['Average Transaction']);
  const counts = data.map(d => d['Transaction Count']);
  const tooltipUpdate = {
    callbacks: {
      label: (tooltipItem, chartData) => {
        console.log(tooltipItem, chartData);
        return `Total: ${tooltipItem.value} | Average: ${
          averages[
            tooltipItem.index * chartData.datasets.length +
              tooltipItem.datasetIndex
          ]
        } | Count: ${
          counts[
            tooltipItem.index * chartData.datasets.length +
              tooltipItem.datasetIndex
          ]
        }`;
      },
    },
  };
  chart.data = update;
  chart.options.tooltips = tooltipUpdate;
  chart.update();
}

/**
 * Returns a random value between 0 to `high` (inclusive)
 * @param high The maximum value to be obtained, inclusive
 * @returns The random value
 */
function random(high) {
  return Math.floor(Math.random() * (high + 1));
}

function setFinished(boolean) {
  finished = boolean;
  statusText.classList.toggle('d-none', finished); // hide the status text if rendering is finished
  ctx.classList.toggle('d-none', !finished); // hide the chart if rendering is not finished
}

function handleSliceForm(queryParams) {
  axios
    .get(`/api/transactions-per-quarter`, {
      params: queryParams,
    })
    .then(response => {
      const res = response.data;
      quarterText.innerHTML = res[0]['Quarter'];
      updateData(myChart, res);

      setFinished(true);
    })
    .catch(err => {
      console.log(err);
      setFinished(false);
      statusText.innerText = err;
    });
}
