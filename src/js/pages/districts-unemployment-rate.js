import createTable from '../helpers/table-helper';

const queryTimeText = document.getElementById('query-time-text');
const queryTimeVal = document.getElementById('query-time-val');
const regionInput = document.getElementById('region');
const unemploymentRateContainer = document.getElementById(
  'unemployment-rate-table',
);
const progressText = document.getElementById('progress-text');

const unemploymentRateTable = createTable(`#${unemploymentRateContainer.id}`, {
  ajaxRequesting: (url, params) => {
    queryTimeText.classList.add('d-none');
    progressText.innerHTML = 'Loading...';
  },
  ajaxResponse: (url, params, response) => {
    queryTimeVal.innerHTML = response.duration;
    queryTimeText.classList.remove('d-none');

    return response.results;
  },
  ajaxError: (xhr, textStatus, errorThrown) => {
    queryTimeText.classList.add('d-none');
    unemploymentRateContainer.classList.add('d-none');
    progressText.innerHTML = xhr.statusText;
    progressText.classList.remove('d-none');
  },
  dataLoaded: data => {
    if (data.length) {
      queryTimeText.classList.remove('d-none');
      unemploymentRateContainer.classList.remove('d-none');
      progressText.classList.add('d-none');
    } else {
      unemploymentRateContainer.classList.add('d-none');
      progressText.innerHTML = 'No records found';
      progressText.classList.remove('d-none');
    }
  },
});

unemploymentRateTable.setData('/api/unemployment-rate', {
  region: regionInput.value,
});

document.getElementById('form-avg-unemployment-rate').onsubmit = e => {
  e.preventDefault();

  unemploymentRateTable.setData(unemploymentRateTable.getAjaxUrl(), {
    region: regionInput.value,
  });
};
