import createTable from '../helpers/table-helper';

const queryTimeText = document.getElementById('query-time-text');
const queryTimeVal = document.getElementById('query-time-val');
const districtSelect = document.getElementById('district');
const resetButton = document.getElementById('reset-btn');
const committedCrimesForm = document.getElementById(
  'form-avg-committed-crimes',
);
// MULTI SELECT
const districtFiltersContainer = document.getElementById(
  'district-filter-container',
);
const addDistrictBtn = document.getElementById('btn-add-district');
const districtFiltersSet = new Set();

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

resetButton.onclick = () => {
  districtFiltersSet.clear();
  districtFiltersContainer.innerHTML = '';

  committedCrimesTable.setData(committedCrimesTable.getAjaxUrl(), {
    district: '',
  });
};

addDistrictBtn.onclick = () => {
  const districtValue = districtSelect.value;

  if (!districtFiltersSet.has(districtValue)) {
    districtFiltersSet.add(districtValue);

    // add district value as filter
    const spanEl = document.createElement('span');
    spanEl.classList.add('border', 'px-2', 'py-1', 'm-1');
    spanEl.appendChild(document.createTextNode(districtValue));

    // add 'X' button
    const iEl = document.createElement('i');
    iEl.classList.add('material-icons', 'align-top', 'ml-2', 'clear');
    iEl.onclick = () => {
      spanEl.remove();
      districtFiltersSet.delete(districtValue);
      committedCrimesTable.setData(committedCrimesTable.getAjaxUrl(), {
        district: Array.from(districtFiltersSet),
      });
    };
    iEl.innerHTML = 'clear';

    spanEl.appendChild(iEl);

    // add final span to filter container
    districtFiltersContainer.appendChild(spanEl);
  }

  committedCrimesTable.setData(committedCrimesTable.getAjaxUrl(), {
    district: Array.from(districtFiltersSet),
  });
};
