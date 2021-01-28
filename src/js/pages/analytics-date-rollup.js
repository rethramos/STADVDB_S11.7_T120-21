import axios from 'axios';
import { Chart } from 'chart.js';

const dailyRollupForm = document.getElementById('form-rollup-daily');
const dailyRollupText = document.getElementById('daily-text');
const monthlyRollupForm = document.getElementById('form-rollup-monthly');
const monthlyRollupText = document.getElementById('monthly-text');
const dailyStatusText = document.getElementById('daily-status-text');
const monthlyStatusText = document.getElementById('monthly-status-text');
const dailyCtx = document.getElementById('date-rollup');
const monthlyCtx = document.getElementById('month-rollup');

const dailyChart = new Chart(dailyCtx, {
  type: 'bar',
  data: {},
  options: {
    legend: { display: false },
    tooltips: {},
    scales: {
      xAxes: [
        {
          stacked: false,
          scaleLabel: { display: true, labelString: 'Day' },
        },
      ],
      yAxes: [
        {
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: 'Total Transaction Amount',
          },
        },
      ],
    },
  },
});

const monthlyChart = new Chart(monthlyCtx, {
  type: 'bar',
  data: {},
  options: {
    legend: { display: false },
    tooltips: {},
    scales: {
      xAxes: [
        {
          stacked: false,
          scaleLabel: { display: true, labelString: 'Month' },
        },
      ],
      yAxes: [
        {
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: 'Total Transaction Amount',
          },
        },
      ],
    },
  },
});

let finished;
let responseData;
setFinished(dailyStatusText, dailyCtx, false);
setFinished(monthlyStatusText, monthlyCtx, false);
setDisabled(dailyRollupForm, false);
setDisabled(monthlyRollupForm, false);

axios
  .get(`/api/date-rollup`)
  .then(response => {
    responseData = response.data;

    handleDailyRollupForm({
      month: document.getElementById('daily-month').value,
      year: document.getElementById('daily-year').value,
    });
    setFinished(dailyStatusText, dailyCtx, true);
    setDisabled(dailyRollupForm, true);

    handleMonthlyRollupForm({
      year: document.getElementById('monthly-year').value,
    });
    setFinished(monthlyStatusText, monthlyCtx, true);
    setDisabled(monthlyRollupForm, true);
  })
  .catch(err => {
    console.log(err);
    setFinished(dailyStatusText, dailyCtx, false);
    setFinished(monthlyStatusText, monthlyCtx, false);
    dailyStatusText.innerText = err;
    monthlyStatusText.innerText = err;
  });

dailyRollupForm.onsubmit = e => {
  e.preventDefault();
};

dailyRollupForm.onchange = e => {
  setFinished(dailyStatusText, dailyCtx, false);
  setDisabled(dailyRollupForm, false);
  handleDailyRollupForm({
    month: document.getElementById('daily-month').value,
    year: document.getElementById('daily-year').value,
  });
  setFinished(dailyStatusText, dailyCtx, true);
  setDisabled(dailyRollupForm, true);
};

// MONTHLY ------------------------------------------------
monthlyRollupForm.onsubmit = e => {
  e.preventDefault();
};

monthlyRollupForm.onchange = e => {
  setFinished(monthlyStatusText, monthlyCtx, false);
  setDisabled(monthlyRollupForm, false);
  handleMonthlyRollupForm({
    year: document.getElementById('monthly-year').value,
  });
  setFinished(monthlyStatusText, monthlyCtx, true);
  setDisabled(monthlyRollupForm, true);
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

function updateDailyData(chart, data, labelsKey, dataKey) {
  const [r, g, b] = [17, 69, 126];
  const [rC, gC, bC] = [255 - r, 255 - g, 255 - b];
  const colors = [
    `rgba(${r}, ${g}, ${b}, 0.5)`,
    `rgba(${rC}, ${gC}, ${bC}, 0.5)`,
  ];
  const dataUpdate = {
    labels: getUniqueValues(data, labelsKey),
    datasets: [
      {
        label: 'test',
        data: data.map(d => d[dataKey]),
        backgroundColor: colors[0],
      },
    ],
  };
  const averages = data.map(d => d['Average Transaction Amount']);
  const counts = data.map(d => d['Transaction Quantity']);
  const tooltipUpdate = {
    callbacks: {
      label: (tooltipItem, chartData) => {
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
  chart.data = dataUpdate;
  chart.options.tooltips = tooltipUpdate;
  chart.update();
}

function setFinished(statusText, ctx, boolean) {
  // finished = boolean;
  statusText.classList.toggle('d-none', boolean); // hide the status text if rendering is finished
  ctx.classList.toggle('d-none', !boolean); // hide the chart if rendering is not finished
}

function setDisabled(formElement, bool) {
  const elements = formElement.elements;
  for (let i = 0; i < elements.length; i++) {
    if (!bool) elements[i].setAttribute('disabled', '');
    else elements[i].removeAttribute('disabled');
  }
}

function handleDailyRollupForm(filters) {
  const filtered = responseData.filter(row => {
    return (
      row['Year'] == filters.year &&
      row['Month'] == filters.month &&
      row['Day'] !== null
    );
  });

  dailyRollupText.innerText = `(${filters.month} ${filters.year})`;
  updateDailyData(dailyChart, filtered, 'Day', 'Total Transaction');
}

function handleMonthlyRollupForm(filters) {
  const filtered = responseData.filter(row => {
    return (
      row['Year'] == filters.year &&
      row['Month'] !== null &&
      row['Day'] === null
    );
  });
  monthlyRollupText.innerText = `(${filters.year})`;
  updateDailyData(monthlyChart, filtered, 'Month', 'Total Transaction');
}
