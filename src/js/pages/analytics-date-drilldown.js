import axios from 'axios';
import { Chart } from 'chart.js';
import { getUniqueValues } from '../helpers/chart-helper';

const yearCtx = document.getElementById('year-drilldown');
const yearlyChart = new Chart(yearCtx, {
  type: 'bar',
  data: {},
  options: {
    legend: { display: false },
    tooltips: {},
    scales: {
      xAxes: [
        {
          stacked: false,
          scaleLabel: { display: true, labelString: 'Year' },
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

const quarterCtx = document.getElementById('quarter-drilldown');
const quarterlyChart = new Chart(quarterCtx, {
  type: 'bar',
  data: {},
  options: {
    legend: { display: false },
    tooltips: {},
    scales: {
      xAxes: [
        {
          stacked: false,
          scaleLabel: { display: true, labelString: 'Quarter' },
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

const yearlyStatusText = document.getElementById('yearly-status-text');

const quarterlyDrilldownForm = document.getElementById(
  'form-drilldown-quarterly',
);
const quarterlyYearSelect = document.getElementById('quarterly-year');
const quarterlyStatusText = document.getElementById('quarterly-status-text');
const quarterlyText = document.getElementById('quarterly-text');
let responseData;

// get the data initially and save it locally
axios.get('/api/date-drilldown').then(response => {
  responseData = response.data;
  toggleForm(quarterlyDrilldownForm, true);

  handleYearDrilldownUpdate();
  handleQuarterDrilldownUpdate({ year: 1993 });
});

quarterlyDrilldownForm.onsubmit = e => e.preventDefault();
quarterlyDrilldownForm.onchange = e =>
  handleQuarterDrilldownUpdate({ year: quarterlyYearSelect.value });

function toggleForm(formElement, enable) {
  const elements = formElement.elements;
  for (let i = 0; i < elements.length; i++) {
    if (!enable) elements[i].setAttribute('disabled', '');
    else elements[i].removeAttribute('disabled');
  }
}

function filterData(data, predicate) {
  return data.filter(predicate);
}

function updateData(chart, data, labelsKey, dataKey) {
  const [r, g, b] = [17, 69, 126];
  const color = `rgba(${r}, ${g}, ${b}, 0.5)`;

  const dataUpdate = {
    labels: getUniqueValues(data, labelsKey),
    datasets: [
      {
        label: 'test',
        data: data.map(d => d[dataKey]),
        backgroundColor: color,
      },
    ],
  };

  chart.data = dataUpdate;
  chart.update();

  updateTooltip(chart, data);
}

function updateTooltip(chart, data) {
  const numberFormatter = new Intl.NumberFormat();
  const czechCurrencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
  });
  const averages = data.map(d => d['Average Transaction Amount']);
  const counts = data.map(d => d['Transaction Quantity']);
  const tooltipUpdate = {
    callbacks: {
      label: (tooltipItem, chartData) => {
        return `Total: ${czechCurrencyFormatter.format(
          tooltipItem.value,
        )} | Average: ${czechCurrencyFormatter.format(
          averages[
            tooltipItem.index * chartData.datasets.length +
              tooltipItem.datasetIndex
          ],
        )} | Transactions Made: ${numberFormatter.format(
          counts[
            tooltipItem.index * chartData.datasets.length +
              tooltipItem.datasetIndex
          ],
        )}`;
      },
    },
  };

  chart.options.tooltips = tooltipUpdate;
  chart.update();
}

function handleYearDrilldownUpdate() {
  yearlyStatusText.classList.toggle('d-none', false);
  yearCtx.classList.toggle('d-none', true);

  const filtered = filterData(
    responseData,
    row =>
      row['Year'] !== null &&
      row['Quarter'] === null &&
      row['Month'] === null &&
      row['Day'] === null,
  );

  updateData(yearlyChart, filtered, 'Year', 'Total Transaction');

  yearlyStatusText.classList.toggle('d-none', true);
  yearCtx.classList.toggle('d-none', false);
}

function handleQuarterDrilldownUpdate(params) {
  quarterlyStatusText.classList.toggle('d-none', false);
  quarterCtx.classList.toggle('d-none', true);

  const filtered = filterData(
    responseData,
    row =>
      row['Year'] == params.year &&
      row['Quarter'] !== null &&
      row['Month'] === null &&
      row['Day'] === null,
  );

  updateData(quarterlyChart, filtered, 'Quarter', 'Total Transaction');

  quarterlyStatusText.classList.toggle('d-none', true);
  quarterCtx.classList.toggle('d-none', false);

  quarterlyText.innerText = `(${params.year})`;
}
