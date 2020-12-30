import createTable from '../helpers/table-helper';

const queryTimeText = document.getElementById('query-time-text');
const queryTimeVal = document.getElementById('query-time-val');
const districtSelect = document.getElementById('district');
const resetButton = document.getElementById('reset-btn');
const committedCrimesContainer = document.getElementById(
  'committed-crimes-table',
);
const progressText = document.getElementById('progress-text');

const committedCrimesTable = createTable(`#${committedCrimesContainer.id}`, {
  pagination: 'local',
  paginationSize: 10,
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
    committedCrimesContainer.classList.add('d-none');
    progressText.innerHTML = xhr.statusText;
    progressText.classList.remove('d-none');
  },
  dataLoaded: data => {
    if (data.length) {
      queryTimeText.classList.remove('d-none');
      committedCrimesContainer.classList.remove('d-none');
      progressText.classList.add('d-none');
    } else {
      committedCrimesContainer.classList.add('d-none');
      progressText.innerHTML = 'No records found';
      progressText.classList.remove('d-none');
    }
  },
});

fetch('/api/districts')
  .then(response => response.json())
  .then(data => {
    districtSelect.innerHTML = '';

    data.forEach(d => {
      let option = document.createElement('option');
      let text = document.createTextNode(d);
      option.value = d;

      option.appendChild(text);
      districtSelect.appendChild(option);
    });
  });

committedCrimesTable.setData('/api/committed-crimes', {
  district: districtSelect.value,
});

districtSelect.onchange = e => {
  committedCrimesTable.setData(committedCrimesTable.getAjaxUrl(), {
    district: districtSelect.value,
  });
};

resetButton.onclick = e => {
  committedCrimesTable.setData(committedCrimesTable.getAjaxUrl(), {
    district: '',
  });
};
