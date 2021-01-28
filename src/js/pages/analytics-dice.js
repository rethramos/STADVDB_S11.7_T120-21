import axios from 'axios';
import { Chart } from 'chart.js';
import { getUniqueValues } from '../helpers/chart-helper';

const ctx = document.getElementById('transactions-dice');
const diceChart = new Chart(ctx, {
  type: 'bar',
  data: {},
  options: {
    tooltips: {},
    scales: {
      xAxes: [
        {
          stacked: true,
          scaleLabel: { display: true, labelString: 'Quarter' },
        },
      ],
      yAxes: [
        {
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Total Transaction Amount',
          },
        },
      ],
    },
  },
});

const diceText = document.getElementById('dice-text');
const statusText = document.getElementById('status-text');
const diceForm = document.getElementById('form-dice');
const quarterCheckboxes = document.querySelectorAll(
  'input[type="checkbox"][name="quarter"]',
);
const districtSelect = document.getElementById('district');

axios.get('/api/districts').then(response => {
  districtSelect.innerHTML = '';

  response.data.forEach(d => {
    let option = document.createElement('option');
    let text = document.createTextNode(d);
    option.value = d;

    option.appendChild(text);
    districtSelect.appendChild(option);
  });
});

diceForm.onsubmit = e => {
  e.preventDefault();
};

diceForm.onchange = e => {
  handleDiceFormSubmit({
    district: districtSelect.value,
    quarter: Array.from(quarterCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value),
  });
};

// Initial form submit when the page loads
handleDiceFormSubmit({
  district: 'Benesov',
  quarter: Array.from(quarterCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value),
});

function handleDiceFormSubmit(queryParams) {
  statusText.classList.toggle('d-none', false);
  ctx.classList.toggle('d-none', true);
  axios
    .get('/api/transactions-per-multiple-quarters-per-district', {
      params: queryParams,
    })
    .then(response => {
      updateData(diceChart, response.data);
      statusText.classList.toggle('d-none', true);
      ctx.classList.toggle('d-none', false);
      diceText.innerText = queryParams.district;
    });
}

function updateData(chart, data) {
  const [r, g, b] = [17, 69, 126];
  const [rC, gC, bC] = [255 - r, 255 - g, 255 - b];
  const colors = [
    `rgba(${r}, ${g}, ${b}, 0.5)`,
    `rgba(${rC}, ${gC}, ${bC}, 0.5)`,
  ];

  const update = {
    labels: getUniqueValues(data, 'Quarter'),
    datasets: getUniqueValues(data, 'Transaction Type').map((transType, i) => {
      return {
        label: transType,
        data: data
          .filter(d => d['Transaction Type'] === transType)
          .map(d => d['Transaction Amount']),
        backgroundColor: colors[i],
      };
    }),
  };

  chart.data = update;
  chart.update();

  updateTooltip(chart, data);
}

function updateTooltip(chart, data) {
  const averages = data.map(d => d['Average Transaction']);
  const counts = data.map(d => d['Transaction Count']);
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

  chart.options.tooltips = tooltipUpdate;
  chart.update();
}
