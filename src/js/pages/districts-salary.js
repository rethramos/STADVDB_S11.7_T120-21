import createTable from '../helpers/table-helper';

const queryTimeText = document.getElementById('query-time-text');
const queryTimeVal = document.getElementById('query-time-val');
const regionInput = document.getElementById('region');
const salaryContainer = document.getElementById('salary-table');
const progressText = document.getElementById('progress-text');

const salaryTable = createTable(`#${salaryContainer.id}`, {
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
    salaryContainer.classList.add('d-none');
    progressText.innerHTML = xhr.statusText;
    progressText.classList.remove('d-none');
  },
  dataLoaded: data => {
    if (data.length) {
      queryTimeText.classList.remove('d-none');
      salaryContainer.classList.remove('d-none');
      progressText.classList.add('d-none');
    } else {
      salaryContainer.classList.add('d-none');
      progressText.innerHTML = 'No records found';
      progressText.classList.remove('d-none');
    }
  },
});

salaryTable.setData('/api/salary', {
  region: regionInput.value,
});

document.getElementById('form-avg-salary').onsubmit = e => {
  e.preventDefault();

  let region = regionInput.value;

  salaryTable.setData(salaryTable.getAjaxUrl(), {
    region,
  });
};
